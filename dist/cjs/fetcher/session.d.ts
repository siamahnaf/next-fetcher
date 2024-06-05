import type { OptionsType, TmpCookiesObj, CookieValueTypes } from './types';
export { CookieValueTypes } from './types';
export declare const getCookies: (options?: OptionsType) => TmpCookiesObj;
export declare const getCookie: (key: string, options?: OptionsType) => CookieValueTypes;
export declare const addSession: (key: string, data: any, options?: OptionsType) => void;
export declare const deleteSession: (key: string, options?: OptionsType) => void;
