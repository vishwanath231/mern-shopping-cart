import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_REQUEST
} from '../constants/orderConstants';
import axios from 'axios';
import { logout } from './userActions';


// user new order
export const createOrder = (orderData) => async (dispatch, getState) => {

    try {

        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        

        const { data } = await axios.post('http://localhost:5000/api/orders',orderData, config )

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

        
        localStorage.removeItem('cartItems')
        
    } catch (err) {

        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}


// user order details
export const getOrderDetails = (orderId) => async (dispatch, getState) => {

    try {

        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        const { userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        const { data } = await axios.get(`http://localhost:5000/api/orders/${orderId}`, config )

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })
        
    } catch (err) {

        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
} 




// user get order
export const listMyOrders = () => async (dispatch, getState) => {

    try {
        
        dispatch({
            type: ORDER_LIST_MY_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`http://localhost:5000/api/orders/myorders`, config)

        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data
        })

    } catch (err) {
        
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}


// user pay the order
export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {

    try {
        
        dispatch({
            type: ORDER_PAY_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`http://localhost:5000/api/orders/${orderId}/pay`, paymentResult, config)

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })

    } catch (err) {
        
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }

}


// user deliver order
export const deliverOrder = (orderId) => async (dispatch, getState) => {


    try {
        dispatch({
            type: ORDER_DELIVER_REQUEST,
        })
    
        const {
            userLogin: { userInfo },
        } = getState()
    
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
  
        const { data } = await axios.put(`http://localhost:5000/api/orders/${orderId._id}/deliver`, {}, config)
    
        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: data,
        })

    } catch (error) {
        
        const message =
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload: message,
        })
    }

}