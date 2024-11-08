export interface ProductInterface {
    id: number;
    title: string;
    price: number;
    description: string;
    img_path: string;
    categories: CategoriesInterface,
    brand: BrandInterface,
    review: Array<ReviewInterface>
}
export interface ReviewInterface {
    id: number,
    rating: number,
    review_string: string
}
export interface CategoriesInterface {
    id: number,
    name: string
}
export interface BrandInterface {
    id: number,
    name: string
}


//
export interface ProductCardProps {
    product: ProductInterface;
}
export interface CategoryProps {
    category: Array<CategoriesInterface>;
    brand: Array<BrandInterface>
}
export interface ProductProps {
    products: Array<ProductInterface>
}

export interface BrandInterface {
    id: number,
    name: string
}

export interface ParamsProps {
    params: object
}

export interface AddressInterface {
    id: number,
    address_1: string,
    address_2: string,
    postal_code: string,
    city: string,
    state: string,
    country: string,
    landmark: string
}


export interface CartInterface {
    id: number,
    user_id: number,
    created_at: string,
    updated_at: string,
    status: string,
    cart_item: Array<CartItemInterface>
}
export interface CartItemInterface {
    id: number,
    user_id: number,
    product_id: number,
    qty: number,
    price: number,
    cart_id: number,
    created_at: string,
    updated_at: string,
    product: ProductInterface
}