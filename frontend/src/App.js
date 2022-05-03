import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes,  } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <div className=' px-2 md:px-0 max-w-screen-lg mx-auto'>
                <Routes>
                    <Route path='/' element={<HomeScreen /> } />
                    <Route path='/product/:id' element={<ProductScreen /> } />
                    <Route path='/cart' element={<CartScreen /> } />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;