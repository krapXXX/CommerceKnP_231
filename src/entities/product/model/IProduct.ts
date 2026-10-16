import type IProductVersion from "./IProductVersion";

export default interface IProduct {
    id:          string,
    title:       string,
    description: string,
    discount?:   number,
    imageUrl:    string,
    rating?:     number,
    slug?:       string,
    versions:    IProductVersion[],
}