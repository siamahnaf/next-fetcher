import axios from "axios";
import { cookies, headers } from "next/headers";
//Root
import { fetcher } from "./fetcher-root";
export const createServerFetcher = ({ next, baseURL, sessionName, cookie }) => {
    var _a;
    const nextHeader = headers();
    const nextCookie = cookies();
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
    const apiClient = axios.create({
        baseURL: rootURL,
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined
        }
    });
    return fetcher(apiClient);
};
//# sourceMappingURL=createServerFetcher.js.map