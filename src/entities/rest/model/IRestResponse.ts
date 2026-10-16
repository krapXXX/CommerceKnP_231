import type IRestMeta from "./IRestMeta";
import type IRestStatus from "./IRestStatus";

export default interface IRestResponse {
    status: IRestStatus,
    meta: IRestMeta,
    data: any,
}