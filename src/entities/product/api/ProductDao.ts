import type { ProductType } from "../model/ProductType";

export default class ProductDao {

    static getProduct(slugOrId: string): Promise<ProductType> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                switch (slugOrId) {

                    case "1":
                    case "apple-iphone-17-pro-max-256gb-orange":
                        resolve({
                            id: "1",
                            name: "Apple iPhone 17 Pro Max 256GB (Cosmic Orange)",
                            slug: "apple-iphone-17-pro-max-256gb-orange",
                            price: 73499,
                            discount: 6050,
                            rating: 5,
                            imageUrl: "/img/17.png"
                        });
                        break;

                    case "2":
                    case "navushnyky-apple-airpods-pro-3":
                        resolve({
                            id: "2",
                            name: "Навушники Apple AirPods Pro 3 (MHP43)",
                            slug: "navushnyky-apple-airpods-pro-3",
                            price: 11899,
                            discount: 2200,
                            rating: 5,
                            imageUrl: "/img/airpods.png"
                        });
                        break;

                    default:
                        reject("Not Found: " + slugOrId);
                }
            }, 100);
        });
    }
}
