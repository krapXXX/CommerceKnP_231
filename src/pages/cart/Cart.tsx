import { useContext } from 'react';
import './ui/Cart.css';
import { AppContext } from '../../features/app_context/AppContext';
import CartItemCard from './ui/CartItemCard';

export default function Cart() {
    const{cart}=useContext(AppContext);
    return <>
        <h1 className="display-4">
            <i className="bi bi-cart"></i>&nbsp; My Cart
        </h1>
        {cart.items.map(cartItem=><CartItemCard key ={cartItem.product.id} cartItem={cartItem} />)}
    </>;
}
