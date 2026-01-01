import { Axios, AxiosRequestConfig } from "axios";
interface FetcherResponse<ResponseType> extends Promise<ResponseType> {
    throwOnError: () => FetcherResponse<ResponseType>;
}
interface FetcherRoot {
    get<ResponseType>(endpoint: string, config?: AxiosRequestConfig): FetcherResponse<ResponseType | null>;
    post<ResponseType>(endpoint: string, data: any, config?: AxiosRequestConfig): FetcherResponse<ResponseType | null>;
    put<ResponseType>(endpoint: string, data: any, config?: AxiosRequestConfig): FetcherResponse<ResponseType | null>;
    delete<ResponseType>(endpoint: string, config?: AxiosRequestConfig): FetcherResponse<ResponseType | null>;
}
declare class Fetcher implements FetcherRoot {
    private apiClient;
    private shouldThrowOnError;
    constructor(apiClient: Axios);
    private request;
    private createFetcherResponse;
    get<ResponseType>(endpoint: string, config?: AxiosRequestConfig): FetcherResponse<ResponseType | null>;
    post<ResponseType>(endpoint: string, data: any, config?: AxiosRequestConfig): FetcherResponse<ResponseType | null>;
    put<ResponseType>(endpoint: string, data: any, config?: AxiosRequestConfig): FetcherResponse<ResponseType | null>;
    delete<ResponseType>(endpoint: string, config?: AxiosRequestConfig): FetcherResponse<ResponseType | null>;
}
export declare const fetcher: (apiClient: Axios) => Fetcher;
export type { Fetcher };
