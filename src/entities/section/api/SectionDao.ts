import type { HomePageSection } from "../../../features/section_card/types/section";
import type { SectionType } from "../model/SectionType";

export default class SectionDao {

    static cacheSections: Array<HomePageSection> | undefined;

    static getSections() {
        return new Promise<Array<HomePageSection>>((resolve, _) => {
            if (typeof SectionDao.cacheSections != 'undefined') {
                resolve(SectionDao.cacheSections);
            }
            else {
                setTimeout(() => {
                    SectionDao.cacheSections =
                        [

                            {
                                "imageUrl": "/img/apple.webp",
                                "title": "apple",
                                "slug": "apple",
                            },
                            {
                                "imageUrl": "/img/airpods.webp",
                                "title": "airpods",
                                "slug": "airpods",

                            },
                            {
                                "imageUrl": "/img/iphone.webp",
                                "title": "iphone",
                                "slug": "iphone",
                            },
                            {
                                "imageUrl": "/img/apple2hand.webp",
                                "title": "apple2hand",
                                "slug": "apple2hand",
                            },
                            {
                                "imageUrl": "/img/android.webp",
                                "title": "android",
                                "slug": "android",
                            },
                            {
                                "imageUrl": "/img/dyson.webp",
                                "title": "dyson",
                                "slug": "dyson",
                            },
                            {
                                "imageUrl": "/img/gamingstation.png",
                                "title": "gamingstation",
                                "slug": "gamingstation",
                            },
                            {
                                "imageUrl": "/img/laptop.png",
                                "title": "laptop",
                                "slug": "laptop",
                            },
                            {
                                "imageUrl": "/img/display.png",
                                "title": "display",
                                "slug": "display",
                            },
                            {
                                "imageUrl": "/img/camera.png",
                                "title": "camera",
                                "slug": "camera",
                            },
                            {
                                "imageUrl": "/img/actioncamera.png",
                                "title": "actioncamera",
                                "slug": "actioncamera",
                            },
                            {
                                "imageUrl": "/img/tv.png",
                                "title": "tv",
                                "slug": "tv",
                            },
                            {
                                "imageUrl": "/img/combine.webp",
                                "title": "combine",
                                "slug": "combine",
                            },
                            {
                                "imageUrl": "/img/headphones.webp",
                                "title": "headphones",
                                "slug": "headphones",
                            },
                            {
                                "imageUrl": "/img/./joystick.webp",
                                "title": "joystick",
                                "slug": "joystick",
                            },
                            {
                                "imageUrl": "/img/watches.webp",
                                "title": "watches",
                                "slug": "watches",
                            },
                            {
                                "imageUrl": "/img/vacume.webp",
                                "title": "vacume",
                                "slug": "vacume",
                            },
                            {
                                "imageUrl": "/img/keyboard.webp",
                                "title": "keyboard",
                                "slug": "keyboard",
                            },

                        ];

                    resolve(SectionDao.cacheSections);
                }, 300)
            }
        }
        )

    }


    static getSection(slug: string) {
        return new Promise<SectionType>((resolve, reject) => {
            setTimeout(() => {
                switch (slug) {
                    case 'apple': resolve({
                        products: [
                            {
                                id: "1",
                                name: "Apple iPhone 17 Pro Max 256GB (Cosmic Orange)",
                                price: 73499, discount: 6050, rating: 7,
                                imageUrl: "/img/17.png", slug: "apple-iphone-17-pro-max-256gb-orange"
                            }, 
                            {
                               
                                id: "2",
                                name: "Навушники Apple AirPods Pro 3 (MFHP4)(2025)",
                                price: 11899, 
                                discount: 2200, 
                                rating: 5,
                                imageUrl: "/img/airpods.png", slug: "Навушники Apple AirPods Pro 3 (MFHP4)(2025)"
                            },

                        ]
                    }); break;
                    default: reject('"Slug not found"');
                }
            }, 300);
        });
    }

}