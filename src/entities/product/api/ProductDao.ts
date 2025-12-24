import type ProductPageType from "../model/ProductPageType";
const p1 = {
    id: "1",
    name: "Apple iPhone 17 Pro Max 256GB (Cosmic Orange)",
    slug: "apple-iphone-17-pro-max-256gb-orange",
    price: 73499,
    discount: 6050,
    rating: 5,
    imageUrl: "/img/17.png"
};
const p2 = {
    id: "2",
    name: "Навушники Apple AirPods Pro 3 (MHP43)",
    slug: "Навушники Apple AirPods Pro 3 (MHP43)",
    price: 11899,
    discount: 2200,
    rating: 5,
    imageUrl: "/img/airpods.png"
};
const p3 = {
    id: "3",
    name: "Apple iPhone 17 Air 256GB (Space Black) (e-Sim)",
    slug: "Apple iPhone 17 Air 256GB (Space Black) (e-Sim)",
    price: 52599,
    discount: 5100,
    rating: 2.5,
    imageUrl: "/img/17Air.webp",
};
export default class ProductDao {

    static getProduct(slugOrId: string): Promise<ProductPageType> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                switch (slugOrId) {

                    case p1.id:
                    case p1.slug:
                        resolve({
                            product: p1,
                            recommended: [p2, p3]
                        });
                        break;

                    case p2.id:
                    case p2.slug:
                        resolve({
                            product: p2,
                            recommended: [p1, p3]
                        });
                        break;

                    case p3.id:
                    case p3.slug:
                        resolve({
                            product: p3,
                            recommended: [p1, p2]
                        });
                        break;

                    default:
                        reject("Not Found: " + slugOrId);
                }
            }, 100);
        });
    }
}
