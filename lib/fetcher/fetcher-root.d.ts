import { Axios, AxiosRequestConfig } from "axios";
interface FetcherResponse<ResponseType> extends Promise<ResponseType> {
    throwOnError: () => FetcherResponse<ResponseType>;
}
interface FetcherRoot {
    get<ResponseType>(endpoint: string, config?: AxiosRequestConfig): FetcherResponse<ResponseType>;
    post<ResponseType>(endpoint: string, data: any, config?: AxiosRequestConfig): FetcherResponse<ResponseType>;
    put<ResponseType>(endpoint: string, data: any, config?: AxiosRequestConfig): FetcherResponse<ResponseType>;
    delete<ResponseType>(endpoint: string, config?: AxiosRequestConfig): FetcherResponse<ResponseType>;
}
declare class Fetcher implements FetcherRoot {
    private apiClient;
    private shouldThrowOnError;
    constructor(apiClient: Axios);
    private request;
    private createFetcherResponse;
    get<ResponseType>(endpoint: string, config?: AxiosRequestConfig): FetcherResponse<ResponseType>;
    post<ResponseType>(endpoint: string, data: any, config?: AxiosRequestConfig): FetcherResponse<ResponseType>;
    put<ResponseType>(endpoint: string, data: any, config?: AxiosRequestConfig): FetcherResponse<ResponseType>;
    delete<ResponseType>(endpoint: string, config?: AxiosRequestConfig): FetcherResponse<ResponseType>;
}
export declare const fetcher: (apiClient: Axios) => Fetcher;
export type { Fetcher };
