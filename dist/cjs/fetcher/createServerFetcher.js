"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServerFetcher = void 0;
const axios_1 = __importDefault(require("axios"));
const headers_1 = require("next/headers");
//Root
const fetcher_root_1 = require("./fetcher-root");
const createServerFetcher = ({ next, baseURL, sessionName, cookie }) => {
    var _a;
    const nextHeader = (0, headers_1.headers)();
    const nextCookie = (0, headers_1.cookies)();
    let rootURL = `${nextHeader.get("x-forwarded-proto")}://${nextHeader.get("host")}`;
    if (!next && !baseURL) {
        throw new Error("Please provide base url as you are using not nextjs api.");
    }
    if (!next && baseURL) {
        rootURL = baseURL;
    }
    if (!sessionName && !cookie) {
        throw new Error("Either sessionName or cookie must be provided.");
    }
    let token = undefined;
    if (cookie) {
        token = cookie;
    }
    else {
        token = (_a = nextCookie.get(sessionName)) === null || _a === void 0 ? void 0 : _a.value;
    }
    const apiClient = axios_1.default.create({
        baseURL: rootURL,
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined
        }
    });
    return (0, fetcher_root_1.fetcher)(apiClient);
};
exports.createServerFetcher = createServerFetcher;
//# sourceMappingURL=createServerFetcher.js.map