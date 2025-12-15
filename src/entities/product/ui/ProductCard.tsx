import { Link, useNavigate } from "react-router-dom";
import SiteButton from "../../../features/buttons/SiteButton";
import ButtonTypes from "../../../features/buttons/types/ButtonTypes";
import Label from "../../../features/label/Label";
import LabelTypes from "../../../features/label/types/LabelTypes";
import type { ProductType } from "../model/ProductType";
import './ProductCard.css';
import { AppContext } from "../../../features/app_context/AppContext";
import { useContext } from "react";

export default function ProductCard({ product }: { product: ProductType }) {
   const {cart,setCart,showToast} = useContext (AppContext);
  const navigate = useNavigate();

const buyClick = () => {
        price: cart.price + product.price
   let newCart ={...cart,};
   let item = newCart.items.find(i=>i.product.id == product.id);
   if(item )
   {
item.cnt +=1;
item.price += product.price;
   }
   else{
newCart.items.push({
     product: product,
            price: product.price,
            cnt: 1
});
   }
    setCart(newCart);
    showToast({message: product.name + " added to cart!"});
};


   return <div className="product-card">
        <Link to ={"/product/" +(product.slug ?? product.id)}>
        {product.discount && product.discount > 0 &&
            <div className='product-card-discount' >
                <Label type={LabelTypes.Violet} title={product.discount + " ₴"} />
            </div>}

            <div className = 'product-card-imgs'>
        <img src={product.imageUrl} alt={product.name} />
        </div>

        <div className='product-card-rating'>{product.rating}</div>
        <p>{product.name}</p>
</Link>
        <div className="product-card-footer">
    {cart.items.find(ci => ci.product.id == product.id)
        ? <SiteButton
            buttonType={ButtonTypes.Red}
            action={() => navigate("/cart")}>
            <i className="bi bi-cart-check"></i>&thinsp;
            <span>У кошику</span>
        </SiteButton>
        : <SiteButton
            buttonType={ButtonTypes.Red}
            action={buyClick}>
            <i className="bi bi-cart"></i>&thinsp;
            <span>Купити</span>
        </SiteButton>
    }
    <span>{product.price} грн</span>
</div>

    </div>
}