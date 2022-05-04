import React,{ useEffect } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';



const PlaceOrderScreen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector((state) => state.cart)

    if (!cart.shippingAddress.address) {
        navigate('/login/shipping/')
    }else if (!cart.paymentMethod) {
        navigate('/payment')
    }

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
    cart.taxPrice = addDecimals(Number((cart.itemsPrice /100) * 5).toFixed(2))
    cart.totalPrice = (
        Number(cart.itemsPrice) + 
        Number(cart.shippingPrice) + 
        Number(cart.taxPrice)).toFixed(2)

    
    const placeOrderHandler = () => {
        
    }


    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <div className='flex justify-between flex-col md:flex-row'>
                <div className='p-4 w-full'>
                    <div className='my-10'>
                        <h2>shipping address</h2>
                        <p>
                            <strong>Address: </strong>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                            {cart.shippingAddress.postalCode},{' '}
                            {cart.shippingAddress.country}
                        </p>
                    </div>
                    <hr />
                    <div className='my-10'>
                        <h2>Payment Method</h2>
                        <strong>Method: </strong>
                        {cart.paymentMethod}
                    </div>
                    <hr />
                    <div className='my-10'>
                        <h2>Order Items</h2>
                        {
                        cart.cartItems.map(item => (
                            <div key={item.product} className='mb-4'>
                                <div className='grid gap-3 grid-cols-2'>
                                    <div className='flex '>
                                        <img src={item.image} alt={item.name} className=' w-20' />
                                        <Link to={`/product/${item.product}`} className='underline ml-4 text-slate-500'>{item.name}</Link>
                                    </div>
                                    <div className='text-slate-500 '>₹{item.qty} x ₹{item.price} = ₹{item.qty * item.price}</div>
                                </div>
                            </div>
                        ))
                    }
                    </div>
                </div>
                <div className='w-full md:w-1/2 my-0 mx-auto'>
                    <div className='border-2'>
                        <h2 className='p-3 border-b-2'>Order Summary</h2>
                        <div className='flex p-3 justify-between items-center border-b-2' >
                            <div>Items</div>
                            <div>₹{cart.itemsPrice}</div>
                        </div>
                        <div className='flex p-3 justify-between items-center border-b-2' >
                            <div>Shipping</div>
                            <div>₹{cart.shippingPrice}</div>
                        </div>
                        <div className='flex p-3 justify-between items-center border-b-2' >
                            <div>Tax</div>
                            <div>₹{cart.taxPrice}</div>
                        </div>
                        <div className='flex p-3 justify-between items-center border-b-2' >
                            <div>Total</div>
                            <div>₹{cart.totalPrice}</div>
                        </div>
                        <div className='p-3'>
                            <button 
                                className='uppercase text-sm tracking-wide bg-black w-full p-3 text-white disabled:hidden' 
                                disabled={cart.cartItems === 0}
                                onClick={placeOrderHandler}
                            >
                            Place Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PlaceOrderScreen;