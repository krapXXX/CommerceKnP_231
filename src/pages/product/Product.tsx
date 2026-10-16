import { useParams } from "react-router-dom";
import "./ui/Product.css";
import { useContext, useEffect, useRef, useState } from "react";
import ProductDao from "../../entities/product/api/ProductDao";
import { AppContext } from "../../features/app_context/AppContext";
import type ProductPageType from "../../entities/product/model/ProductPageType";
import ProductCard from "../../entities/product/ui/ProductCard";

function Recommended({ pageData }: { pageData: ProductPageType }) {
    const scrollRightRef = useRef<HTMLDivElement>(null);

    const scrollRightClick = () => {
        scrollRightRef.current?.scrollBy(50, 0);
    };

    const scrollLeftClick = () => {
        scrollRightRef.current?.scrollBy(-50, 0);
    };

    return (
        <div className="rec-box">
            <div
                className="scroll"
                style={{ left: "15px" }}
                role="button"
                onClick={scrollLeftClick}
            >
                &lt;
            </div>

            <div
                className="recommended-container"
                ref={scrollRightRef}
            >
                <div className="recommended-row">
                    {pageData.recommended.map(product => (
                        <ProductCard
                            product={product}
                            key={product.id}
                        />
                    ))}
                </div>
            </div>

            <div
                className="scroll"
                style={{ right: "15px" }}
                role="button"
                onClick={scrollRightClick}
            >
                &gt;
            </div>
        </div>
    );
}


export default function Product() {
    const { isBusy, setBusy, user } = useContext(AppContext);

    const { slug } = useParams<string>();

    const [pageData, setPageData] =
        useState<ProductPageType | null>(null);

    const [cartError, setCartError] = useState("");

useEffect(() => {
    if (slug) {
        ProductDao
            .getProduct(slug)
            .then(setPageData)
            .catch(err => {
                setPageData(null);
                console.error(err);
            });
    }
}, [slug]);


    const addToCartClick = (versionId: string) => {
        if (!user) {
            setCartError(
                "Для створення замовлення необхідно увійти до системи"
            );
            return;
        }

        setCartError("");

        console.log(
            "Add to cart:",
            pageData?.product.id,
            versionId
        );
    };

if (isBusy) {
    return <h1>Loading...</h1>;
}

if (pageData === null) {
    return <h1>Not Found</h1>;
}


    return (
        <div className="row">

            <div className="row"></div>

            {pageData.product.versions.map(pv => (

                <div
                    className="row mb-3"
                    key={pv.id}
                >

                    {/* Фото версії товару */}
                    <div className="col col-5">

                        <img
                            className="w-100"
                            src={pv.imageUrl}
                            alt={
                                pageData.product.title +
                                " " +
                                (pv.titleAddon ?? "")
                            }
                        />

                    </div>


                    {/* Інформація про версію */}
                    <div className="col col-7 product-info">

                        <h1>
                            {pageData.product.title}
                            {" "}
                            {pv.titleAddon}
                        </h1>


                        {/* Рейтинг */}
                        <div>

                            <div className="product-rating">

                                {Array.from({ length: 5 }).map((_, i) => {

                                    const rating =
                                        pageData.product.rating ?? 0;

                                    if (i + 1 <= Math.floor(rating)) {
                                        return (
                                            <i
                                                key={i}
                                                className="bi bi-star-fill"
                                            ></i>
                                        );
                                    }

                                    if (i < rating) {
                                        return (
                                            <i
                                                key={i}
                                                className="bi bi-star-half"
                                            ></i>
                                        );
                                    }

                                    return (
                                        <i
                                            key={i}
                                            className="bi bi-star"
                                        ></i>
                                    );
                                })}

                            </div>


                            {/* Наявність */}

                            {pv.stock === 0
                                ? (
                                    <div className="product-unavailable">
                                        Передзамовлення
                                    </div>
                                )
                                : pv.stock !== undefined &&
                                  pv.stock > 0 &&
                                  pv.stock < 5
                                    ? (
                                        <div className="product-low-stock">
                                            Залишилось мало
                                        </div>
                                    )
                                    : (
                                        <div className="product-available">
                                            У наявності
                                        </div>
                                    )
                            }

                        </div>


                        {/* Стара ціна */}
                        <div className="product-old-price">

                            {pv.price -
                                (pageData.product.discount ?? 0)}

                        </div>


                        {/* Нова ціна */}
                        <div className="product-new-price">

                            {pv.price}

                        </div>


                        {/* Кнопка кошика */}
                        <button
                            className="btn btn-primary mt-3"
                            onClick={() => addToCartClick(pv.id)}
                        >
                            До кошику
                        </button>


                        {/* Помилка */}
                        {cartError && (

                            <div className="product-cart-error">
                                {cartError}
                            </div>

                        )}

                    </div>

                </div>

            ))}


            <Recommended pageData={pageData} />

        </div>
    );
}