import type CartItem from "./CartItem";

export default interface CartType {
    items: Array<CartItem>,
    price: number
}
