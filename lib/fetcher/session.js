"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSession = exports.addSession = exports.getCookie = exports.getCookies = void 0;
var cookie_1 = require("cookie");
var isClientSide = function () { return typeof window !== 'undefined'; };
var isCookiesFromAppRouter = function (cookieStore) {
    if (!cookieStore)
        return false;
    return ('getAll' in cookieStore &&
        'set' in cookieStore &&
        typeof cookieStore.getAll === 'function' &&
        typeof cookieStore.set === 'function');
};
var isContextFromAppRouter = function (context) {
    return ((!!(context === null || context === void 0 ? void 0 : context.req) && 'cookies' in context.req && isCookiesFromAppRouter(context === null || context === void 0 ? void 0 : context.req.cookies)) ||
        (!!(context === null || context === void 0 ? void 0 : context.res) && 'cookies' in context.res && isCookiesFromAppRouter(context === null || context === void 0 ? void 0 : context.res.cookies)) ||
        (!!(context === null || context === void 0 ? void 0 : context.cookies) && isCookiesFromAppRouter(context.cookies())));
};
var transformAppRouterCookies = function (cookies) {
    var _cookies = {};
    cookies.getAll().forEach(function (_a) {
        var name = _a.name, value = _a.value;
        _cookies[name] = value;
    });
    return _cookies;
};
var stringify = function (value) {
    try {
        if (typeof value === 'string') {
            return value;
        }
        var stringifiedValue = JSON.stringify(value);
        return stringifiedValue;
    }
    catch (e) {
        return value;
    }
};
var decode = function (str) {
    if (!str)
        return str;
    return str.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
};
var getCookies = function (options) {
    if (isContextFromAppRouter(options)) {
        if (options === null || options === void 0 ? void 0 : options.req) {
            return transformAppRouterCookies(options.req.cookies);
        }
        if (options === null || options === void 0 ? void 0 : options.cookies) {
            return transformAppRouterCookies(options.cookies());
        }
    }
    var req;
    // DefaultOptions['req] can be casted here because is narrowed by using the fn: isContextFromAppRouter
    if (options)
        req = options.req;
    if (!isClientSide()) {
        // if cookie-parser is used in project get cookies from ctx.req.cookies
        // if cookie-parser isn't used in project get cookies from ctx.req.headers.cookie
        if (req && req.cookies)
            return req.cookies;
        if (req && req.headers.cookie)
            return (0, cookie_1.parse)(req.headers.cookie);
        return {};
    }
    var _cookies = {};
    var documentCookies = document.cookie ? document.cookie.split('; ') : [];
    for (var i = 0, len = documentCookies.length; i < len; i++) {
        var cookieParts = documentCookies[i].split('=');
        var _cookie = cookieParts.slice(1).join('=');
        var name_1 = cookieParts[0];
        _cookies[name_1] = _cookie;
    }
    return _cookies;
};
exports.getCookies = getCookies;
var getCookie = function (key, options) {
    var _cookies = (0, exports.getCookies)(options);
    var value = _cookies[key];
    if (value === undefined)
        return undefined;
    return decode(value);
};
exports.getCookie = getCookie;
var addSession = function (key, data, options) {
    if (isContextFromAppRouter(options)) {
        var req = options.req, res = options.res, cookiesFn = options.cookies, restOptions = __rest(options, ["req", "res", "cookies"]);
        var payload = __assign({ name: key, value: stringify(data) }, restOptions);
        if (req) {
            req.cookies.set(payload);
        }
        if (res) {
            res.cookies.set(payload);
        }
        if (cookiesFn) {
            cookiesFn().set(payload);
        }
        return;
    }
    var _cookieOptions;
    var _req;
    var _res;
    if (options) {
        // DefaultOptions can be casted here because the AppRouterMiddlewareOptions is narrowed using the fn: isContextFromAppRouter
        var _a = options, req = _a.req, res = _a.res, _options = __rest(_a, ["req", "res"]);
        _req = req;
        _res = res;
        _cookieOptions = _options;
    }
    var cookieStr = (0, cookie_1.serialize)(key, stringify(data), __assign({ path: '/' }, _cookieOptions));
    if (!isClientSide()) {
        if (_res && _req) {
            var currentCookies = _res.getHeader('Set-Cookie');
            if (!Array.isArray(currentCookies)) {
                currentCookies = !currentCookies ? [] : [String(currentCookies)];
            }
            _res.setHeader('Set-Cookie', currentCookies.concat(cookieStr));
            if (_req && _req.cookies) {
                var _cookies = _req.cookies;
                data === '' ? delete _cookies[key] : (_cookies[key] = stringify(data));
            }
            if (_req && _req.headers && _req.headers.cookie) {
                var _cookies = (0, cookie_1.parse)(_req.headers.cookie);
                data === '' ? delete _cookies[key] : (_cookies[key] = stringify(data));
                _req.headers.cookie = Object.entries(_cookies).reduce(function (accum, item) {
                    return accum.concat("".concat(item[0], "=").concat(item[1], ";"));
                }, '');
            }
        }
    }
    else {
        document.cookie = cookieStr;
    }
};
exports.addSession = addSession;
var deleteSession = function (key, options) {
    return (0, exports.addSession)(key, '', __assign(__assign({}, options), { maxAge: -1 }));
};
exports.deleteSession = deleteSession;
