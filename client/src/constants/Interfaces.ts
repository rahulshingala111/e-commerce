export interface ProductInterface {
    id: number;
    title: string;
    price: number;
    description: string;
    img_path: string;
    categories: CategoriesInterface
}
export interface CategoriesInterface {
    id: number,
    name: string
}


//
export interface ProductCardProps {
    product: ProductInterface;
}
export interface CategoryProps {
    category: Array<CategoriesInterface>;
}

export interface ParamsProps {
    params: {
        category_id: string
    }
}