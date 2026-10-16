import type IProduct from "./IProduct";

export default interface ProductPageType {
    product: IProduct,
    recommended?: Array<IProduct>,
}