import React, { useEffect } from 'react'
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/actions/cartActions';

const CartScreen = ({ cart, addToCart, removeFromCart }) => {

    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const qty = location.search ? Number(location.search.split('=')[1]) : 1


    useEffect(() => {
        addToCart(id, qty)
    }, [addToCart, id, qty]);

    const removeFromCartHandler = (id) => {
        removeFromCart(id);
    }


    const { cartItems } = cart;


    return (
        <>

            <div className='uppercase text-2xl my-6 tracking-wider font-medium'>shopping cart</div>

            <div className='flex justify-between flex-col md:flex-row' >
                <div className='p-4 w-full'>
                    {
                        cartItems.map(item => (
                            <div key={item.product} className='mb-4'>
                                <div className='flex justify-between '>
                                    <img src={item.image} alt={item.name} className='text-center w-20' />
                                    <Link to={`/product/${item.product}`} className='underline text-slate-500'>{item.name}</Link>
                                    
                                    <div className='text-slate-500'>₹{item.price}</div>
                                    
                                    <div className='text-slate-500'>
                                        <select value={item.qty} className='' onChange={(e) => addToCart(item.product ,Number(e.target.value))}>
                                            {
                                                [...Array(item.countInStock).keys()].map((x) => (
                                                    <option key= {x + 1} value={x + 1} >{x + 1}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    
                                    <div className=''>
                                        <button className='text-orange-800' onClick={() => removeFromCartHandler(item.product)}><i className='fas fa-trash'></i></button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='w-1/2'>
                    <div className='border-2'>
                        <div className='p-3 border-b-2'>
                            <h2 className='text-2xl pb-3'>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0) }) items</h2>
                            <div>₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2) }</div>
                        </div>
                        <div className='p-3'>
                            <button
                            className='uppercase  text-sm tracking-wide bg-black w-full p-3 text-white'
                            >Proceed To Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
         
        </>
        
    )
}

const mapStateToProps = (state) => ({
    cart: state.cart
})

export default connect(mapStateToProps, { addToCart, removeFromCart })(CartScreen);

