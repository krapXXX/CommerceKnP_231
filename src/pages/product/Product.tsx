import { useParams } from "react-router-dom";
import "./ui/Product.css";
import { useEffect, useState } from "react";
import type { ProductType } from "../../entities/product/model/ProductType";
import ProductDao from "../../entities/product/api/ProductDao";

export default function Product() {

    const { slug } = useParams<string>();
    const [pageData, setPageData] = useState<ProductType | null>(null);

    useEffect(() => {
        if (slug) {
            ProductDao
                .getProduct(slug)
                .then(setPageData)
                .catch(err => {
                    setPageData(null);
                    console.error(err);
                })
                .finally();
        }
    }, []);

    return pageData == undefined ? <h1>Loading...</h1>
        : pageData == null ? <h1>Not Found</h1>
            :
            <div className="row">
                <div className="row"></div>

                <div className="row">
                    <div className="col col-5">
                        <img className="w-100" src={pageData?.imageUrl} alt={pageData?.name} />
                    </div>
                     <div className="col col-7">
                <h1>{pageData?.name}</h1>
                <div>
                   <div className="product-rating">
                {Array.from({ length: 5 }).map((_, i) => {
                    if (i + 1 <= Math.floor( pageData.rating ?? 0)) {
                        return <i key={i} className="bi bi-star-fill"></i>;
                    }

                    if (i <  (pageData.rating ?? 0)) {
                        return <i key={i} className="bi bi-star-half"></i>;
                    }

                    return <i key={i} className="bi bi-star"></i>;
                })}
            </div>
                    {pageData.stock == 0
                        ? <div className="product-unavailable">Очікується</div>
                        : <div className="product-available">У наявності</div>}
                </div>
                <div className="product-old-price">{pageData.price - (pageData.discount ?? 0)}</div>
                <div className="product-new-price">{pageData.price}</div>
            </div>
            </div>

            </div>;
}
