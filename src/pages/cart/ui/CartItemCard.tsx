import { useContext } from "react";
import type CartItem from "../../../entities/cart/model/CartItem";
import './CartItemCard.css';
import { AppContext } from "../../../features/app_context/AppContext";

export default function CartItemCard({ cartItem }: { cartItem: CartItem }) {
    const { cart, setCart,showToast } = useContext(AppContext);

    const incClick = () => {
    let newCart = { ...cart };

    let item = newCart.items.find(
        ci => ci.product.id === cartItem.product.id
    );

    if (!item) return;

     if (
            cartItem.product.stock !== undefined &&
            cartItem.product.stock !== null &&
            item.cnt >= cartItem.product.stock
        ) {
            showToast({
                message: `Oops, Only ${cartItem.product.stock} items left in stock`,
            });
            return;
        }

        item.cnt += 1;
        item.price = item.product.price *item.cnt;

        setCart(newCart);
    };


    const decClick = () => {
        let newCart = { ...cart };
        let item = newCart.items.find(ci => ci.product.id == cartItem.product.id);
        if (!item) return;
        if(item.cnt<=1)
        {
             showToast({
                message: 'Can`t go lower then that, use delete',
            });
            return;
        }
            item.cnt -= 1;
        item.price = item.product.price *item.cnt;

            setCart(newCart);
    };

    return <div className="row m-3 p-2 cart-item-card">
        <div className="col col-2">
            <img
                src={cartItem.product.imageUrl}
                alt={cartItem.product.name}
                className="w-100" />
            <div>
                <button className="btn btn-outline-secondary me-2" onClick={decClick}>-</button>
                {cartItem.cnt}
                <button className="btn btn-outline-secondary ms-2" onClick={incClick}>+</button>

            </div>
        </div>
        <div className="col col-6">
            <h3>{cartItem.product.name}</h3>
            <div>Гарантія 1 рік від {Math.round(cartItem.price * 0.1).toMoney()} грн</div>
            <div>Гарантія 2 роки від {Math.round(cartItem.price * 0.15).toMoney()} грн</div>

        </div>
        <div className="col col-3 text-center">
            <h4>{(cartItem.price ).toMoney()} ₴</h4>
            {cartItem.product.discount &&
                <div className="text-decoration-line-through">
                    {(cartItem.price + (cartItem.product.discount ?? 0)*cartItem.cnt ).toMoney()} ₴</div>
            }
        </div>
        <div className="col col-1"><i className="bi bi-trash"></i></div>
    </div>;
}
