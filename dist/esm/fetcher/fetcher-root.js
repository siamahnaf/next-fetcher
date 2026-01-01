var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Fetcher {
    constructor(apiClient) {
        this.shouldThrowOnError = false;
        this.apiClient = apiClient;
    }
    request(method, endpoint, data, config) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.apiClient.request(Object.assign({ method, url: endpoint, data }, config))
                    .then(res => res.data)
                    .catch(err => {
                    if (this.shouldThrowOnError) {
                        throw new Error(err.response.data);
                    }
                    else {
                        return null;
                    }
                });
            }
            catch (error) {
                if (this.shouldThrowOnError) {
                    throw error;
                }
                else {
                    return null;
                }
            }
        });
    }
    createFetcherResponse(promise) {
        const wrappedPromise = promise;
        wrappedPromise.throwOnError = () => {
            this.shouldThrowOnError = true;
            return wrappedPromise;
        };
        return wrappedPromise;
    }
    get(endpoint, config) {
        const promise = this.request('get', endpoint, undefined, config);
        return this.createFetcherResponse(promise);
    }
    post(endpoint, data, config) {
        const promise = this.request('post', endpoint, data, config);
        return this.createFetcherResponse(promise);
    }
    put(endpoint, data, config) {
        const promise = this.request('put', endpoint, data, config);
        return this.createFetcherResponse(promise);
    }
    delete(endpoint, config) {
        const promise = this.request('delete', endpoint, undefined, config);
        return this.createFetcherResponse(promise);
    }
}
export const fetcher = (apiClient) => {
    return new Fetcher(apiClient);
};
//# sourceMappingURL=fetcher-root.js.map