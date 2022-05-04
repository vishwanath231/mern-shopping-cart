import { combineReducers } from 'redux';
import { cartReducer } from './cartReducers';
import { productDetailsReducer, productListReducer } from './ProductReducers';

export const reducers = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer
});