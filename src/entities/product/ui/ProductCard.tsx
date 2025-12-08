import { Link } from "react-router-dom";
import SiteButton from "../../../features/buttons/SiteButton";
import ButtonTypes from "../../../features/buttons/types/ButtonTypes";
import Label from "../../../features/label/Label";
import LabelTypes from "../../../features/label/types/LabelTypes";
import type { ProductType } from "../model/ProductType";
import './ProductCard.css';

export default function ProductCard({ product }: { product: ProductType }) {
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
        <div className ='product-card-footer'>
            <SiteButton buttonType={ButtonTypes.Red} text="Купити" />
            <span>{product.price  + " ₴"}</span>
        </div>
    </div>
}