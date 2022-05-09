import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGOUT,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
} from '../constants/userConstants';
import axios from 'axios'
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants';
import { CART_ITEM_RESET, CART_SHIPPING_ADDRESS_RESET, CART_PAYMENT_METHOD_RESET } from '../constants/cartConstants'; 



export const login = (loginData) => async (dispatch) => {

    try {
        
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        const { data } = await axios.post(`http://localhost:5000/api/users/login`, loginData, config)
    
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (err) {
     
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}




export const register = (registerData) => async (dispatch) => {

    try {
        
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        const { data } = await axios.post(`http://localhost:5000/api/users/register`, registerData, config)
    
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (err) {
     
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}




export const getUserDetails = (id) => async (dispatch, getState) => {

    try {
        
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`http://localhost:5000/api/users/${id}`, config)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (err) {
        
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}



export const updateUserProfile = (user) => async (dispatch, getState) => {

    try {
        
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`http://localhost:5000/api/users/profile`, user, config)

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })

    } catch (err) {
        
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}




export const logout = () => (dispatch) => {

    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')

    dispatch({type: USER_LOGOUT })

    dispatch({ type: USER_DETAILS_RESET })

    dispatch({ type: ORDER_LIST_MY_RESET })
}