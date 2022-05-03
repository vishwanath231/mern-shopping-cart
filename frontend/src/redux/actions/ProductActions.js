import axios from 'axios';
import { 
    PRODUCT_REQUEST,
    PRODUCT_SUCCESS,
    PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL     
} from '../constants/ProductConstants';



export const listProducts = () => async (dispatch) => {

    try {
        dispatch({
            type: PRODUCT_REQUEST
        })
    
    
        const { data }  = await axios.get(`http://localhost:5000/api/products`);
    
        dispatch({
            type: PRODUCT_SUCCESS,
            payload: data
        })

    } catch (err) {
        
        dispatch({
            type: PRODUCT_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
} 



export const getProductDetails = (id) => async (dispatch) => {

    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST
        })
    
    
        const { data }  = await axios.get(`http://localhost:5000/api/products/${id}`);
    
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (err) {
        
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        })
    }
}

