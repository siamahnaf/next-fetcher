import { OptionsType } from "./types";
interface Props {
    next: boolean;
    baseURL?: string;
    sessionName?: string;
    cookie?: string;
    sessionOptions?: OptionsType;
}
export declare const createServerFetcher: ({ next, baseURL, sessionName, cookie }: Props) => import("./fetcher-root").Fetcher;
export {};
