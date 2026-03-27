import type ProductPageType from "../model/ProductPageType";
const p1 = {
    id: "1",
    title: "Apple iPhone 17 Pro Max 256GB (Cosmic Orange)",
    slug: "apple-iphone-17-pro-max-256gb-orange",
    price: 73499,
    discount: 6050,
    rating: 5,
    imageUrl: "/img/17.png",
    stock:10
};
const p2 = {
    id: "2",
    title: "Навушники Apple AirPods Pro 3 (MHP43)",
    slug: "Навушники Apple AirPods Pro 3 (MHP43)",
    price: 11899,
    discount: 2200,
    rating: 5,
    imageUrl: "/img/airpods.png",
    stock:2
};
const p3 = {
    id: "3",
    title: "Apple iPhone 17 Air 256GB (Space Black) (e-Sim)",
    slug: "Apple iPhone 17 Air 256GB (Space Black) (e-Sim)",
    price: 52599,
    discount: 5100,
    rating: 2.5,
    imageUrl: "/img/17Air.webp",
    stock:0
};
const p4 = {
    id: "4",
    title: "MacBook Air 13 Retina, Midnight, 256GB, 10 CPU / 8 GPU, 16GB RAM with Apple M4 (2025) (MW123)",
    price: 41999,
    discount: 8000,
    rating: 4.5,
    imageUrl: "/img/mac.webp", slug: "MacBook Air 13 Retina, Midnight",
    stock: 15
};
const p5 = {
    id: "5",
    title: "Apple iPad 11 128GB, Wi-Fi (Silver) (2025) (MD3Y4)",
    price: 17199,
    discount: 1300,
    rating: 3,
    imageUrl: "/img/ipad.webp", 
    slug: "Apple iPad 11 128GB, Wi-Fi (Silver) (2025) (MD3Y4)",
    stock: 25
};
const p6 = {
    id: "6", title: "Apple iPhone 15 256GB (Pink)", 
    slug: "apple-iphone-15-256gb--pink-",
    price: 37999, discount: 2800, rating: 5, 
    imageUrl: "/img/pink15.webp",
    stock: 0
}
export default class ProductDao {

    static getProduct(slugOrId: string): Promise<ProductPageType> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const allProducts = [p1, p2, p3, p4, p5,p6];
                const p = allProducts.find(p => p.slug === slugOrId || p.id === slugOrId);

                if (!p) {
                    reject("Not Found: " + slugOrId);
                } else {
                    resolve({
                        product: p,
                        
                        recommended: allProducts.filter(x => x.id !== p.id)
                    });
                }
            }, 700);

        });
    }
}
