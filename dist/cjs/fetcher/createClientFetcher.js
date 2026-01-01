"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientFetcher = void 0;
const axios_1 = __importDefault(require("axios"));
const session_1 = require("./session");
//Root fetcher
const fetcher_root_1 = require("./fetcher-root");
const createClientFetcher = ({ next, baseURL, sessionName, cookie, sessionOptions }) => {
    let rootURL = "";
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
        token = (0, session_1.getCookie)(sessionName, sessionOptions);
    }
    const apiClient = axios_1.default.create({
        baseURL: rootURL,
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined
        }
    });
    return (0, fetcher_root_1.fetcher)(apiClient);
};
exports.createClientFetcher = createClientFetcher;
//# sourceMappingURL=createClientFetcher.js.map