"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientFetcher = void 0;
var axios_1 = require("axios");
var session_1 = require("./session");
//Root fetcher
var fetcher_root_1 = require("./fetcher-root");
var createClientFetcher = function (_a) {
    var next = _a.next, baseURL = _a.baseURL, sessionName = _a.sessionName, cookie = _a.cookie, sessionOptions = _a.sessionOptions;
    var rootURL = "";
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
        token = (0, session_1.getCookie)(sessionName, sessionOptions);
    }
    var apiClient = axios_1.default.create({
        baseURL: rootURL,
        headers: {
            Authorization: token ? "Bearer ".concat(token) : undefined
        }
    });
    return (0, fetcher_root_1.fetcher)(apiClient);
};
exports.createClientFetcher = createClientFetcher;
