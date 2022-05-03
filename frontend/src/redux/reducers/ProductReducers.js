import {
    PRODUCT_REQUEST,
    PRODUCT_SUCCESS,
    PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
} from '../constants/ProductConstants';


export const productListReducer = (state = { products:[] }, { type, payload }) => {

    switch (type) {
        case PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            }
        case PRODUCT_SUCCESS:
            return {
                loading: false,
                products: payload
            }
        case PRODUCT_FAIL:
            return {
                loading: false,
                error: payload
            }
        default:
            return state;
    }
}


export const productDetailsReducer = (state = { product: {} }, { type, payload }) => {
 
    
    switch (type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                product: {}
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: payload
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: payload
            }
        default:
            return state;
    }
}