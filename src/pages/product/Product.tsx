import { useParams } from "react-router-dom";
import "./ui/Product.css";
import { useContext, useEffect, useState } from "react";
import ProductDao from "../../entities/product/api/ProductDao";
import { AppContext } from "../../features/app_context/AppContext";
import type ProductPageType from "../../entities/product/model/ProductPageType";
import ProductCard from "../../entities/product/ui/ProductCard";

export default function Product() {
const {isBusy, setBusy} = useContext(AppContext);

    const { slug } = useParams<string>();
    const [pageData, setPageData] = useState<ProductPageType | null>(null);

    useEffect(() => {
        if (slug) {
            setBusy(true);
            ProductDao
                .getProduct(slug)
                .then(setPageData)
                .catch(err => {
                    setPageData(null);
                    console.error(err);
                })
                .finally(()=>setBusy(false));
        }
    }, [slug]);

    return pageData == undefined ? <h1>Loading...</h1>
        : pageData == null && isBusy ? <h1>Not Found</h1>
            :
            <div className="row">
                <div className="row"></div>

                <div className="row">
                    <div className="col col-5">
                        <img className="w-100" src={pageData?.product.imageUrl} alt={pageData?.product.name} />
                    </div>
                     <div className="col col-7">
                <h1>{pageData?.product.name}</h1>
                <div>
                   <div className="product-rating">
                {Array.from({ length: 5 }).map((_, i) => {
                    if (i + 1 <= Math.floor( pageData.product.rating ?? 0)) {
                        return <i key={i} className="bi bi-star-fill"></i>;
                    }

                    if (i <  (pageData.product.rating ?? 0)) {
                        return <i key={i} className="bi bi-star-half"></i>;
                    }

                    return <i key={i} className="bi bi-star"></i>;
                })}
            </div>
                    {pageData.product.stock == 0
                        ? <div className="product-unavailable">Очікується</div>
                        : <div className="product-available">У наявності</div>}
                </div>
                <div className="product-old-price">{pageData.product.price - (pageData.product.discount ?? 0)}</div>
                <div className="product-new-price">{pageData.product.price}</div>
            </div>
            </div>

             <div className="products-container">
        {pageData?.recommended.map(product => <ProductCard product ={product} key={product.id} />)}
   </div>
            
            </div>

}
