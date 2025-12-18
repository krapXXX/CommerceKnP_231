import { useContext } from 'react';
import './ui/Cart.css';
import { AppContext } from '../../features/app_context/AppContext';
import CartItemCard from './ui/CartItemCard';

export default function Cart() {
    const{cart}=useContext(AppContext);
   return <>
    <h1 className="display-4">
        <i className="bi bi-cart"></i>&nbsp;
       My Cart &nbsp;
        {cart.items.length} positions &nbsp;
        {cart.items.reduce((s, ci) => s + ci.cnt, 0)} items &nbsp;
       total price: {cart.items.reduce((s, ci) => s + ci.price, 0)} ₴ 
    </h1>

    {cart.items.map(cartItem =>
        <CartItemCard key={cartItem.product.id} cartItem={cartItem} />
    )}
</>

}
