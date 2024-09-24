export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    img_path: string;
    categories: Categories
}
export interface Categories {
    id: number,
    name: string
}


//
export interface ProductCardProps {
    product: Product;
}
export interface CategoryProps {
    category: Array<Categories>;
}