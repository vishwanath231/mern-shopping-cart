import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_RESET,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_RESET,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_RESET
} from '../constants/orderConstants';


export const orderCreateReducer = (state = {}, { type, payload }) => {

    switch (type) {
        case ORDER_CREATE_REQUEST:
            return {
                loading: true
            }

        case ORDER_CREATE_SUCCESS:
            
            return {
                loading: false,
                success: true,
                order: payload
            }
    
        case ORDER_CREATE_FAIL: 
            return {
                loading: false,
                error: payload
            }
        
        case ORDER_CREATE_RESET:
            return {}

        default:
            return state;
    }

}

// user order details
export const orderDetailsReducer = (state = {loading: true, orderItems: {}, shippingAddress: {} }, { type, payload }) => {

    switch (type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ORDER_DETAILS_SUCCESS: 
            return {
                loading: false,
                order: payload
            }

        case ORDER_DETAILS_FAIL: 
            return {
                loading: false,
                error: payload
            }

        default:
            return state;
    }

}


// user order
export const orderListMyPayReducer = (state = { orders: [] }, { type, payload }) => {


    switch (type) {
        case ORDER_LIST_MY_REQUEST:
            return {
                loading: true
            }

        case ORDER_LIST_MY_SUCCESS: 
            return {
                loading: false,
                orders: payload
            }

        case ORDER_LIST_MY_FAIL:
            return {
                loading: false,
                error: payload
            }
        
        case ORDER_LIST_MY_RESET: {
            return {
                orders: []
            }
        }

        default:
            return state;
    }

}



// user pay the order 
export const orderPayReducer = (state = {}, { type, payload }) => {

    switch (type) {
        case ORDER_PAY_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case ORDER_PAY_FAIL:
            return {
                loading: false,
                error: payload
            }

        case ORDER_PAY_RESET:
            return { }
             
        default:
            return state
    }
}


// user deliver
export const orderDeliverReducer = (state = {}, { type, payload }) => {

    switch (type) {
        case ORDER_DELIVER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ORDER_DELIVER_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case ORDER_DELIVER_FAIL:
            return {
                loading: false,
                error: payload
            }

        case ORDER_DELIVER_RESET:
            return { }
             
        default:
            return state
    }
}