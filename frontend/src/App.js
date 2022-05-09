import React from 'react';
import { BrowserRouter, Route, Routes,  } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Container>
                <Routes>
                    <Route path='/' element={<HomeScreen /> } />
                    <Route path='/product/:id' element={<ProductScreen /> } />
                    <Route path='/cart' element={<CartScreen /> } />
                    <Route path='/cart/:id' element={<CartScreen /> } />
                    <Route path='/login' element={<LoginScreen />} />
                    <Route path='/register' element={<RegisterScreen /> } />
                    <Route path='/login/shipping' element={<ShippingScreen /> } />
                    <Route path='/register/shipping' element={<ShippingScreen /> } />
                    <Route path='/payment' element={<PaymentScreen /> } />
                    <Route path='/placeorder' element={<PlaceOrderScreen /> } />
                    <Route path='/order/:id' element={<OrderScreen /> } />
                    <Route path='/profile' element={<ProfileScreen /> } />
                </Routes>
            </Container>
        </BrowserRouter>
    )
}

export default App;