"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServerFetcher = void 0;
var axios_1 = require("axios");
var headers_1 = require("next/headers");
//Root
var fetcher_root_1 = require("./fetcher-root");
var createServerFetcher = function (_a) {
    var _b;
    var next = _a.next, baseURL = _a.baseURL, sessionName = _a.sessionName, cookie = _a.cookie;
    var nextHeader = (0, headers_1.headers)();
    var nextCookie = (0, headers_1.cookies)();
    var rootURL = "".concat(nextHeader.get("x-forwarded-proto"), "://").concat(nextHeader.get("host"));
    if (!next && !baseURL) {
        throw new Error("Please provide base url as you are using not nextjs api.");
    }
    if (!next && baseURL) {
        rootURL = baseURL;
    }
    if (!sessionName && !cookie) {
        throw new Error("Either sessionName or cookie must be provided.");
    }
    var token = undefined;
    if (cookie) {
        token = cookie;
    }
    else {
        token = (_b = nextCookie.get(sessionName)) === null || _b === void 0 ? void 0 : _b.value;
    }
    var apiClient = axios_1.default.create({
        baseURL: rootURL,
        headers: {
            Authorization: token ? "Bearer ".concat(token) : undefined
        }
    });
    return (0, fetcher_root_1.fetcher)(apiClient);
};
exports.createServerFetcher = createServerFetcher;
