import type { ProductType } from "../../product/model/IProduct";

export default interface CartItem {
    product: ProductType,
    cnt: number,
    price: number
}
