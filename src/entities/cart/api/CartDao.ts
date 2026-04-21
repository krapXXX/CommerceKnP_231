import BaseDao from "../../config/BaseDao";
import type CartType from "../model/CartType";

export default class CartDao {
    static #cartKey = "cart-231";
static #cartDefault: CartType = { items: [], price: 0 };

static order(cart: CartType, token: string) {
  return new Promise((resolve, reject) => {
    BaseDao.request("api://cart/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            price: cart.price,
            cartItems: cart.items.map(ci => {
                return {
                    productId: ci.product.id,
                    cnt: ci.cnt,
                    price: ci.price
                };
            })
        })
    }, token)
  .then(r=> {
    if(r.ok)
    {
        return r.json();
    }
    reject(r.status);
  })
  .then(j =>{
    resolve(j)
  })
  .catch(reject);
    });
}

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
            return CartDao.#cartDefault;

    }
}
