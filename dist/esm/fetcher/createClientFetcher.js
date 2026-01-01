import axios from "axios";
import { getCookie } from "./session";
//Root fetcher
import { fetcher } from "./fetcher-root";
export const createClientFetcher = ({ next, baseURL, sessionName, cookie, sessionOptions }) => {
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
        token = getCookie(sessionName, sessionOptions);
    }
    const apiClient = axios.create({
        baseURL: rootURL,
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined
        }
    });
    return fetcher(apiClient);
};
//# sourceMappingURL=createClientFetcher.js.map