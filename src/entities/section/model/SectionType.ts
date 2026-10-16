import type { ProductType } from "../../product/model/IProduct";

export default interface IProductSection {
    title?:       string,
    description?: string,
    slug?:        string,
    imageUrl?:    string,
    products:     Array<ProductType>,
    children?:    Array<IProductSection>
}