import { useParams } from "react-router-dom";
import "./ui/Product.css"
import { useState } from "react";
import type { ProductType } from "../../entities/product/model/ProductType";

export default function Product() {
    const { slug } = useParams<string>();
    const [pageData, setPageData] = useState<ProductType | null>(null);

    return<>
    <h1>Product {slug}</h1>
    </>
   
}