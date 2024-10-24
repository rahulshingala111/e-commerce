export interface ProductInterface {
    id: number;
    title: string;
    price: number;
    description: string;
    img_path: string;
    categories: CategoriesInterface,
    brand: BrandInterface
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
    params: {
        category_id: string | null,
        brand_id: string | null
    }
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