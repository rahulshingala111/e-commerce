const CONSTANTS = Object.freeze({
    path: Object.freeze({
        server_url: 'http://localhost:3002'
    }),
    LOCAL_STORAGE: {
        CART_ITEMS: "cart_items"
    },
    SESSION_STORAGE: {
        TOKEN: "token"
    },
    API_ENDPOINTS: {
        CART: {
            FETCH: (data: number): string => `/product/item/${data}`,
        },
        PRODUCT: {
            FETCH_TEN: `/product/ten`,
            FETCH: (data: string): string => `/product/get?${data}`,
        },
        USER: {
            FETCH_ADDRESS: `/user/address`,
            CREATE_ADDRESS: `/user/address/add`,
        },
        ITEM: {
            FETCH: (data: string | null): string => `/product/item/${data}`,

        },
        CATEGORY: {
            FETCH: `/product/categories`,
        },
        BRANDS: {
            FETCH: `/product/brands`,
        },
        AUTH: {
            LOGIN: `/auth/login`,
            REGISTER : `/auth/register`
        },

    },
    ROUTES: {
        PRODUCT_PAGE: {
            PRODUCT_BASE: `/product`,
            PRODUCTS_ONLY_CATEGORY: (data: number): string => `/product?category_id=${data}`,
            PRODUCTS_FILTER_GET: (category_id: string | null, brand_id: string | null): string => `/product?category_id=${category_id}&brand_id=[${brand_id}]`
        }
    }
})
export default CONSTANTS;