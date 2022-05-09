import { combineReducers } from 'redux';
import { cartReducer } from './cartReducers';
import { productDetailsReducer, productListReducer } from './ProductReducers';

import { 
    userLoginReducer, 
    userRegisterReducer, 
    userDetailsReducer, 
    userUpdateProfileReducer 
} from './userReducers';

import { 
    orderCreateReducer, 
    orderDetailsReducer, 
    orderListMyPayReducer,
    orderPayReducer,
    orderDeliverReducer 
} from './orderReducers';

export const reducers = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,

    cart: cartReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderListMy: orderListMyPayReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer
});