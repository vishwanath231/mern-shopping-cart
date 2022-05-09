import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector }from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails , updateUserProfile } from '../redux/actions/userActions';
import { listMyOrders } from '../redux/actions/orderActions';

const ProfileScreen = () => {

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const [message, setMessage] = useState(null);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails;

    const orderListMy = useSelector(state => state.orderListMy);
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;


    useEffect(() => {
        
        
        if (!userInfo) {
            navigate('/login')
        }else{
            
            if (!user.name) {
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            }else {

                setData({
                    name: user.name,
                    email: user.email,
                    password: '',
                    password2: ''
                })
            }
        }

    }, [dispatch, navigate, user, userInfo]);


    const changeHandler = e => {
        const { name, value } = e.target;

        setData({
            ...data,
            [name]: value
        })
    }

    const submitHandler = e => {
        e.preventDefault()


        if (data.password !== data.password2) {
            setMessage('Password do not match')
        }else{
            dispatch(updateUserProfile({
                id: user._id,
                name: data.name,
                email: data.email,
                password: data.password
            }))
        }
       
    }

    return (
        <div className='flex justify-between flex-col lg:flex-row'>
            <div className='mt-4'>
                <h2 className='mb-4'>Profile Update</h2>
                {message && <Message msg={message} />}
                {
                    loading ? ( <Loader /> ) : 
                    error  ? ( <Message error msg={error} /> ) : (
                        <form onSubmit={submitHandler}>
                            <div className="mb-6">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name='name'
                                    value={data.name}
                                    onChange={changeHandler}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Jhon Doe" 
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email Address</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name='email'
                                    value={data.email}
                                    onChange={changeHandler}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="example@support.com" 
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    name='password'
                                    value={data.password}
                                    onChange={changeHandler}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                                    placeholder='*****'
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password2" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                                <input 
                                    type="password" 
                                    id="password2" 
                                    name='password2'
                                    value={data.password2}
                                    onChange={changeHandler}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                                    placeholder='*****'
                                />
                            </div>

                            <button 
                                type="submit" 
                                className="text-white bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center "
                            >Update</button>
                        </form>

                    ) 
                }
                
            </div>
            <div className='mt-4 md:ml-6'>
                <h2 className='mb-4'>My Orders</h2>
                <div className="relative overflow-x-auto shadow-md sm:rounded">
                    {
                        loadingOrders ? ( <Loader /> ) :
                        errorOrders ? ( <Message error msg={errorOrders} /> ) : 
                        (
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">ID</th>
                                        <th scope="col" className="px-4 py-3">DATE</th>
                                        <th scope="col" className="px-4 py-3">TOTAL</th>
                                        <th scope="col" className="px-4 py-3">PAID</th>
                                        <th scope="col" className="px-4 py-3">DELIVERED</th>
                                        <th scope="col" className="px-4 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order._id} className="bg-white border-b">
                                            <td className="px-6 py-4 ">{order._id}
                                            </td>
                                            <td className="px-6 py-4">{order.createdAt.substring(0, 10)}</td>
                                            <td className="px-6 py-4">${order.totalPrice}</td>
                                            <td className="px-6 py-4">
                                                {loadingOrders ? <Loader /> : order.isPaid ? (
                                                order.paidAt.substring(0, 10)
                                                ) : (
                                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {loadingOrders ? <Loader /> : order.isDelivered ? (
                                                order.deliveredAt.substring(0, 10)
                                                ) : (
                                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link to={`/order/${order._id}`} className="">
                                                    <button type="button" className="focus:outline-none text-black uppercase bg-gray-300 hover:bg-gray-200 focus:ring-4 font-bold focus:ring-purple-300 font-medium rounded text-xs px-3 py-2.5 mb-2">Details</button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )
                    }
                </div>
                

            </div>
        </div>
    )
}

export default ProfileScreen;




