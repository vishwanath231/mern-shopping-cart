import React, {useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Message from '../components/Message'
import Loader from '../components/Loader';
import { getOrderDetails, payOrder, deliverOrder } from '../redux/actions/orderActions';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../redux/constants/orderConstants';
// import { PayPalButton } from 'react-paypal-button-v2'
import axios from 'axios';


const OrderScreen = () => {

    const { id } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate();

    // const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails
    
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    useEffect(() => {

        if (!userInfo) {
            navigate('/login')
        }

                
        // const addPayPalScript = async () => {

        //     const { data: clientId} = await axios.get('http://localhost:5000/api/config/paypal')
        //     const script = document.createElement('script')
        //     script.type = "text/javascript"
        //     script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
        //     script.async = true
        //     script.onload = () => {
        //         setSdkReady(true)
        //     }

        //     document.body.appendChild(script)
        // }


       
        if (!order || order._id !== id || successPay || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(id))
        } 

    }, [dispatch, id, order, userInfo, navigate, successPay, successDeliver])


    if (!loading) {
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
      
        order.itemsPrice = addDecimals(
            order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        )
    }


    const successPaymenthandler = () => {

        const paymentResult =  {
            id: userInfo.user.id,
            status: 'success',
            update_time: Date.now(),
            email_address: userInfo.user.email
        }
        
        dispatch(payOrder(id, paymentResult))
    }


    return loading ? <Loader /> : error ? <Message error msg={error} /> :
        <div className='flex justify-between flex-col md:flex-row'>
                <div className='p-4 w-full'>
                    <div className='mb-10'>
                        <h2>shipping address</h2>
                        <p>
                            <strong>Name: </strong> {order.user.name}
                        </p>
                        <p>
                            <strong>Email: </strong>{' '}
                            <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                        </p>
                        <p>
                            <strong>Address: </strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                            {order.shippingAddress.postalCode},{' '}
                            {order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? (
                            <Message msg={`Delivered on ${order.deliveredAt}`} />
                        ) : (
                            <Message error msg={'Not Delivered'} />
                        )}
                    </div>
                    <hr />
                    <div className='my-10'>
                        <h2>Payment Method</h2>
                        <strong>Method: </strong>
                        {order.paymentMethod}
                        {order.isPaid ? (
                            <Message msg={`Paid on ${order.paidAt}`} />
                        ) : (
                            <Message error msg={'Not Paid'} />
                        )}
                    </div>
                    <hr />
                    <div className='my-10'>
                        <h2>Order Items</h2>
                        {
                        order.orderItems.map((item, index) => (
                            <div key={index} className='mb-4'>
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
                <div className='w-full p-4 md:w-1/2 my-0 mx-auto'>
                    <div className='border-2'>
                        <h2 className='p-3 border-b-2'>Order Summary</h2>
                        <div className='flex p-3 justify-between items-center border-b-2' >
                            <div>Items</div>
                            <div>₹{order.itemsPrice}</div>
                        </div>
                        <div className='flex p-3 justify-between items-center border-b-2' >
                            <div>Shipping</div>
                            <div>₹{order.shippingPrice}</div>
                        </div>
                        <div className='flex p-3 justify-between items-center border-b-2' >
                            <div>Tax</div>
                            <div>₹{order.taxPrice}</div>
                        </div>
                        <div className='flex p-3 justify-between items-center border-b-2' >
                            <div>Total</div>
                            <div>₹{order.totalPrice}</div>
                        </div>
                        {
                            !order.isPaid && (
                                <div className='p-3'>
                                    <button 
                                    className='uppercase text-sm tracking-wide bg-black w-full p-3 text-white disabled:hidden' 
                                    disabled={order.orderItems === 0}
                                    onClick={successPaymenthandler}
                                >PayPal</button>
                                </div>
                            )
                        }
                        {/* {
                            !order.isPaid && (
                                <div className='p-3'>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? ( <Loader /> ) : (
                                        <PayPalButton 
                                        amount={order.totalPrice}
                                        onSuccess={successPaymenthandler} />
                                    )}
                                </div>
                            )
                        } */}
                        { userInfo &&
                        userInfo.user.isAdmin &&
                        order.isPaid &&
                        !order.isDelivered && (
                            <div className='p-3'>
                                <button 
                                    className='uppercase text-sm tracking-wide bg-black w-full p-3 text-white disabled:hidden' 
                                    disabled={order.orderItems === 0}
                                >
                                Mark as Delivered</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
    
}

export default OrderScreen;
