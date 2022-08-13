import { API_PATH } from "./api-path"

const NAME_BRAND = "Custom Your Face"

export const INFO_COLLECTIONS_PAGE = {
    PATH: "/collections",
    TITLE: "Collections",
    LIMIT: {
        GET_COLLECTIONS: 12,
        GET_OTHER_COLLECTIONS: 20,
        GET_PRODUCTS_BY_COLLECTION: 12
    },
    API_PATH: {
        GET_COLLECTIONS: API_PATH.COLLECTIONS.GET,
        GET_OTHER_COLLECTIONS: API_PATH.COLLECTIONS.GET,
        GET_PRODUCTS_BY_COLLECTION: API_PATH.PRODUCTS.GET_BY_COLLECTION
    }
}

export const INFO_ACCOUNT_PAGE = {
    PATH: "/account",
    TITLE: "Account"
}

export const INFO_LOGIN_PAGE = {
    PATH: "/login",
    TITLE: "Login"
}

export const INFO_CART_PAGE = {
    PATH: "/cart",
    TITLE: "Cart",
    TITLE_SEO: `Your Shopping Cart - ${NAME_BRAND}`
}

export const INFO_CUSTOMER_REVIEWS_PAGE = {
    PATH: "/customer-reviews",
    TITLE: "Customer Reviews",
    LIMIT: {
        GET_REVIEWS: 5
    },
    API_PATH: {
        GET_REVIEWS: API_PATH.REVIEWS.GET,
        GET_BEST_REVIEWS: API_PATH.REVIEWS.GET_BEST,
        GET_COUNT_REVIEWS: API_PATH.REVIEWS.GET_COUNT
    }
}

export const INFO_HOME_PAGE = {
    PATH: "/",
    TITLE: "",
    LIMIT: {
        GET_REVIEWS: 5,
        GET_BEST_COLLECTIONS: 5,
        GET_OTHER_COLLECTIONS: 5
    },
    API_PATH: {
        GET_REVIEWS: API_PATH.REVIEWS.GET,
        GET_BEST_COLLECTIONS: API_PATH.COLLECTIONS.GET_BEST,
        GET_OTHER_COLLECTIONS: API_PATH.COLLECTIONS.GET,
        GET_BEST_PRODUCTS: API_PATH.PRODUCTS.GET_BEST_PRODUCTS
    }
}

export const INFO_PRODUCTS_PAGE = {
    PATH: "/products",
    TITLE: "",
    LIMIT: {
        GET_REVIEWS: 5
    },
    API_PATH: {
        GET_BEST_PRODUCTS: API_PATH.PRODUCTS.GET_BEST_PRODUCTS,
        GET_DETAIL_PRODUCT: API_PATH.PRODUCTS.GET,
        GET_COUNT_REVIEWS: API_PATH.REVIEWS.GET_COUNT,
        GET_REVIEWS: API_PATH.REVIEWS.GET
    }
}
