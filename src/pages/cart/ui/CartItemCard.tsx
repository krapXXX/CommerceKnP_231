import type CartItem from "../../../entities/cart/model/CartItem";
import './CartItemCard.css';

function toMoney(sum: number): string {
    return sum.toLocaleString('uk-UA');
}


export default function CartItemCard({ cartItem }: { cartItem: CartItem }) {
    return <div className="row m-3 p-2 cart-item-card">
        <div className="col col-2">
            <img
                src={cartItem.product.imageUrl}
                alt={cartItem.product.name}
                className="w-100" />
            <div>
                <button className="btn btn-outline-secondary me-2">-</button>
                {cartItem.cnt}
                <button className="btn btn-outline-secondary ms-2">+</button>

            </div>
        </div>
        <div className="col col-6">
            <h3>{cartItem.product.name}</h3>
            <div>Гарантія 1 рік від 2 549 грн</div>
            <div>Гарантія 2 роки від 2 549 грн</div>
        </div>
        <div className="col col-3 text-center">
            <h4>{toMoney(cartItem.price)} ₴</h4>
            {cartItem.product.discount &&
                <div className="text-decoration-line-through">
                    {toMoney(cartItem.price + (cartItem.product.discount ?? 0) * cartItem.cnt)} ₴</div>
            }
        </div>
        <div className="col col-1"><i className="bi bi-trash"></i></div>
    </div>;
}
