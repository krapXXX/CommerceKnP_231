import type IRestPagination from "./IRestPagination";

export default interface IRestMeta {
    serviceName: string,
    dataType: string,
    serverTime: number,
    cacheTime: number,
    manipulations?: string[],
    links?: Record<string, string>,
    parameters?: Record<string, object>,
    pagination?: IRestPagination,
}