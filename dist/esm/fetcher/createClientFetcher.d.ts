import { OptionsType } from "./types";
interface Props {
    next: boolean;
    baseURL?: string;
    sessionName?: string;
    cookie?: string;
    sessionOptions?: OptionsType;
}
export declare const createClientFetcher: ({ next, baseURL, sessionName, cookie, sessionOptions }: Props) => import("./fetcher-root").Fetcher;
export {};
