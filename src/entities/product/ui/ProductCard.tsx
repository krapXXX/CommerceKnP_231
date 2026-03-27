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
    const { cart, setCart, showToast, } = useContext(AppContext);
   
    const navigate = useNavigate();

    const buyClick = () => {
        price: cart.price + product.price
        let newCart = { ...cart, };
        let item = newCart.items.find(i => i.product.id == product.id);
        if (item) {
            item.cnt += 1;
            item.price += product.price;
        }
        else {
            newCart.items.push({
                product: product,
                price: product.price,
                cnt: 1
            });
        }
        setCart(newCart);
        showToast({ message: product.title + " added to cart!" });
    };


    return <div className="product-card">
        <Link to={"/product/" + (product.slug ?? product.id)}>
            {product.discount && product.discount > 0 &&
                <div className='product-card-discount' >
                    <Label type={LabelTypes.Violet} title={product.discount + " ₴"} />
                </div>}

            <div className='product-card-imgs '>
                <img src={product.imageUrl} alt={product.title} />
            </div>

            <div className="product-card-rating">
                {Array.from({ length: 5 }).map((_, i) => {
                    if (i + 1 <= Math.floor( product.rating ?? 0)) {
                        return <i key={i} className="bi bi-star-fill"></i>;
                    }

                    if (i < ( product.rating ?? 0) ){
                        return <i key={i} className="bi bi-star-half"></i>;
                    }

                    return <i key={i} className="bi bi-star"></i>;
                })}
            </div>



            <p className="two-line-ellipsis">{product.title}</p>
        </Link>
        <div className="product-card-footer">
            {(() => {
                const cartItem = cart.items.find(ci => ci.product.id === product.id);
                if (cartItem) {
                    return (
                        <SiteButton
                            buttonType={ButtonTypes.Red}
                            action={() => navigate("/cart")}>
                            <i className="bi bi-cart-check"></i>&thinsp;
                            <span>In Cart</span>
                        </SiteButton>
                    );
                }
                if (product.stock !== undefined && product.stock !== null && product.stock <= 0) {
                    return (
                        <SiteButton buttonType={ButtonTypes.White}>
                            <i className="bi bi-cart-x"></i>&thinsp;
                            <span>Out of stock</span>
                        </SiteButton>
                    );
                }
                return (
                    <SiteButton
                        buttonType={ButtonTypes.Red}
                        action={buyClick}>
                        <i className="bi bi-cart"></i>&thinsp;
                        <span>Buy</span>
                    </SiteButton>
                );
            })()}
        </div>

   
   </div>
}