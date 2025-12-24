import type CartType from "../model/CartType";

export default class CartDao {
    static #cartKey = "cart-231";

    static #cardDefault: CartType = {
        items: [],
        price: 0
    };

    static save(cart: CartType) {
        window.localStorage.setItem(
            CartDao.#cartKey,
            JSON.stringify(cart)
        );
    }

    static restoreSaved(): CartType {
           const data = window.localStorage.getItem(CartDao.#cartKey);
    if(data) {
        try {
            return JSON.parse(data);
        }
        catch(err) {
            console.error("Cart restore error:", err);
        }
    }
            return CartDao.#cardDefault;

    }
}
