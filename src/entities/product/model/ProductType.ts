type ProductType = {
    id: string,
    name: string,
    price: number,
    discount: number | null,
    imageUrl: string,
    rating: number | null,
    slug: string | undefined,
    stock?: number, // наявність (у шт)
}

export type { ProductType };
