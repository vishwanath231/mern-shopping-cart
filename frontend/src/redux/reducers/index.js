import { combineReducers } from 'redux';
import { productDetailsReducer, productListReducer } from './ProductReducers';

export const reducers = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer

});