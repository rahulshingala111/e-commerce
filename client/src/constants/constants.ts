export const SERVER_CONST = {
    DEV: "DEV",
    UAT: "UAT",
    LIVE: "LIVE"
}

export const SERVER_MODE: string = SERVER_CONST.DEV

const CONSTANTS = Object.freeze({
    path: Object.freeze({
        server_url: SERVER_MODE === "UAT" ? 'https://holy-wombat-definite.ngrok-free.app' : 'http://localhost:3002'
    }),
    LOCAL_STORAGE: {
        CART_ITEMS: "cart_items"
    },
    SESSION_STORAGE: {
        TOKEN: "token",
        USER: "user"
    },
    API_ENDPOINTS: {
        CART: {
            FETCH: (data: number): string => `/product/item/${data}`,
        },
        PRODUCT: {
            FETCH_TEN: `/product/ten`,
            FETCH: (data: string): string => `/product/get${data}`,
            CREATE_COMMENT: `/product/comment`,
            FETCH_COMMENT: (data: string | null) => `/product/comment?product_id=${data}`
        },
        USER: {
            USER_DETAILS: `/user`,
            FETCH_ADDRESS: `/user/address`,
            CREATE_ADDRESS: `/user/address/add`,
        },
        ITEM: {
            FETCH: (data: string | null): string => `/product/item/${data}`,

        },
        CATEGORY: {
            FETCH: `/product/categories`,
        },
        SUB_CATEGORY: {
            FETCH: (id: string | number) => `/product/subcategories?category_id=${id}`
        },
        BRANDS: {
            FETCH: `/product/brands`,
        },
        AUTH: {
            LOGIN: `/auth/login`,
            REGISTER: `/auth/register`
        },

    },
    ROUTES: {
        PRODUCT_PAGE: {
            PRODUCT_BASE: `/product`,
            PRODUCTS_ONLY_CATEGORY: (data: number): string => `/product?category_id=${data}`,
            PRODUCTS_FILTER_GET: (category_id: string | null, brand_id: string | null): string => `/product?category_id=${category_id}&brand_id=[${brand_id}]`
        },
        ITEM_PAGE: {
            ITEM: (id: number | string) => `/item?product_id=${id}`,
            ITEM_BASE: `/item`,
        },
        CART: {
            CART_PAGE: '/cart'
        }
    }
})
export default CONSTANTS;