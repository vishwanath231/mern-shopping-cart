import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../redux/actions/cartActions';
import { connect } from 'react-redux';


const ShippingScreen = ({ cart, saveShippingAddress }) => {

    const navigate = useNavigate()

    const { shippingAddress }  = cart;

    const [data, setData] = useState({
        address: shippingAddress.address,
        city: shippingAddress.city,
        postalCode: shippingAddress.postalCode,
        country: shippingAddress.country
    });


    const changeHandler = e => {
    
        const { name, value } = e.target;
    
        setData({
            ...data,
            [name]: value
        })
        
    }

    const submitHandler = e => {
        e.preventDefault()

        saveShippingAddress(data);
        navigate('/payment')
    } 


    return (
        <>
            <CheckoutSteps step1 step2 />

            <div className='w-full md:max-w-lg my-6 mx-auto'>
                <div className='text-2xl  text-black tracking-wider uppercase mb-4 font-bold'>shipping</div>
                <form onSubmit={submitHandler}>
                    <div className="mb-6">
                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">Address</label>
                        <input 
                            type="text" 
                            id="address" 
                            name='address'
                            value={data.address}
                            onChange={changeHandler}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter address"
                            required 
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">City</label>
                        <input 
                            type="text" 
                            id="city" 
                            name='city'
                            value={data.city}
                            onChange={changeHandler}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter city" 
                            required 
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="postalCode" className="block mb-2 text-sm font-medium text-gray-900">Postal Code</label>
                        <input 
                            type="text" 
                            id="postalCode" 
                            name='postalCode'
                            value={data.postalCode}
                            onChange={changeHandler}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                            placeholder='Enter postal code'
                            required 
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900">Country</label>
                        <input 
                            type="text" 
                            id="country" 
                            name='country'
                            value={data.country}
                            onChange={changeHandler}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                            placeholder='Enter country'
                            required 
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="text-white uppercase bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm w-full  px-5 py-2.5 text-center "
                    >Continue</button>

                </form>
            </div>
        </>
    )
}


const mapStateToProps = (state) => ({
    cart: state.cart
})

export default connect(mapStateToProps, { saveShippingAddress })(ShippingScreen);