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
import { serialize, parse } from 'cookie';
const isClientSide = () => typeof window !== 'undefined';
const isCookiesFromAppRouter = (cookieStore) => {
    if (!cookieStore)
        return false;
    return ('getAll' in cookieStore &&
        'set' in cookieStore &&
        typeof cookieStore.getAll === 'function' &&
        typeof cookieStore.set === 'function');
};
const isContextFromAppRouter = (context) => {
    return ((!!(context === null || context === void 0 ? void 0 : context.req) && 'cookies' in context.req && isCookiesFromAppRouter(context === null || context === void 0 ? void 0 : context.req.cookies)) ||
        (!!(context === null || context === void 0 ? void 0 : context.res) && 'cookies' in context.res && isCookiesFromAppRouter(context === null || context === void 0 ? void 0 : context.res.cookies)) ||
        (!!(context === null || context === void 0 ? void 0 : context.cookies) && isCookiesFromAppRouter(context.cookies())));
};
const transformAppRouterCookies = (cookies) => {
    let _cookies = {};
    cookies.getAll().forEach(({ name, value }) => {
        _cookies[name] = value;
    });
    return _cookies;
};
const stringify = (value) => {
    try {
        if (typeof value === 'string') {
            return value;
        }
        const stringifiedValue = JSON.stringify(value);
        return stringifiedValue;
    }
    catch (e) {
        return value;
    }
};
const decode = (str) => {
    if (!str)
        return str;
    return str.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
};
export const getCookies = (options) => {
    if (isContextFromAppRouter(options)) {
        if (options === null || options === void 0 ? void 0 : options.req) {
            return transformAppRouterCookies(options.req.cookies);
        }
        if (options === null || options === void 0 ? void 0 : options.cookies) {
            return transformAppRouterCookies(options.cookies());
        }
    }
    let req;
    // DefaultOptions['req] can be casted here because is narrowed by using the fn: isContextFromAppRouter
    if (options)
        req = options.req;
    if (!isClientSide()) {
        // if cookie-parser is used in project get cookies from ctx.req.cookies
        // if cookie-parser isn't used in project get cookies from ctx.req.headers.cookie
        if (req && req.cookies)
            return req.cookies;
        if (req && req.headers.cookie)
            return parse(req.headers.cookie);
        return {};
    }
    const _cookies = {};
    const documentCookies = document.cookie ? document.cookie.split('; ') : [];
    for (let i = 0, len = documentCookies.length; i < len; i++) {
        const cookieParts = documentCookies[i].split('=');
        const _cookie = cookieParts.slice(1).join('=');
        const name = cookieParts[0];
        _cookies[name] = _cookie;
    }
    return _cookies;
};
export const getCookie = (key, options) => {
    const _cookies = getCookies(options);
    const value = _cookies[key];
    if (value === undefined)
        return undefined;
    return decode(value);
};
export const addSession = (key, data, options) => {
    if (isContextFromAppRouter(options)) {
        const { req, res, cookies: cookiesFn } = options, restOptions = __rest(options, ["req", "res", "cookies"]);
        const payload = Object.assign({ name: key, value: stringify(data) }, restOptions);
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
    let _cookieOptions;
    let _req;
    let _res;
    if (options) {
        // DefaultOptions can be casted here because the AppRouterMiddlewareOptions is narrowed using the fn: isContextFromAppRouter
        const _a = options, { req, res } = _a, _options = __rest(_a, ["req", "res"]);
        _req = req;
        _res = res;
        _cookieOptions = _options;
    }
    const cookieStr = serialize(key, stringify(data), Object.assign({ path: '/' }, _cookieOptions));
    if (!isClientSide()) {
        if (_res && _req) {
            let currentCookies = _res.getHeader('Set-Cookie');
            if (!Array.isArray(currentCookies)) {
                currentCookies = !currentCookies ? [] : [String(currentCookies)];
            }
            _res.setHeader('Set-Cookie', currentCookies.concat(cookieStr));
            if (_req && _req.cookies) {
                const _cookies = _req.cookies;
                data === '' ? delete _cookies[key] : (_cookies[key] = stringify(data));
            }
            if (_req && _req.headers && _req.headers.cookie) {
                const _cookies = parse(_req.headers.cookie);
                data === '' ? delete _cookies[key] : (_cookies[key] = stringify(data));
                _req.headers.cookie = Object.entries(_cookies).reduce((accum, item) => {
                    return accum.concat(`${item[0]}=${item[1]};`);
                }, '');
            }
        }
    }
    else {
        document.cookie = cookieStr;
    }
};
export const deleteSession = (key, options) => {
    return addSession(key, '', Object.assign(Object.assign({}, options), { maxAge: -1 }));
};
//# sourceMappingURL=session.js.map