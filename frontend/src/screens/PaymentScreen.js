import React,{ useState } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import { connect } from 'react-redux';
import { savePaymentMethod } from '../redux/actions/cartActions';
import { useNavigate } from 'react-router-dom';


const PaymentScreen = ({ cart, savePaymentMethod }) => {

    const { shippingAddress } = cart;

    const navigate = useNavigate()

    if (!shippingAddress.address) {
        navigate('/login/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const submitHandler = e => {
        e.preventDefault();

        savePaymentMethod(paymentMethod)
        navigate('/placeorder')
    }


    return (
        <>
            <CheckoutSteps step1 step2 step3 />

            <div className='w-full md:max-w-lg my-6 mx-auto'>
                <div className='text-2xl  text-black tracking-wider uppercase mb-4 font-bold'>Payment Method</div>
                <form onSubmit={submitHandler}>
                    <label htmlFor='PayPal' className='text-2xl mb-3 font-medium'>Select Method</label>
                    <div className='flex items-center mb-3 md:ml-5'>
                        <input 
                        type='radio' 
                        id='PayPal' 
                        name='PayPal' 
                        checked value='PayPal'
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        required  
                        /> 
                        <div className='ml-2'>PayPal or Credit Cart</div>
                    </div>
                    <button type='submit' className='text-white bg-black focus:ring-4 focus:outline-none uppercase focus:ring-blue-300 font-medium rounded text-xs px-3 py-2.5 text-center '>Continue</button>
                </form>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    cart: state.cart
})

export default connect(mapStateToProps, { savePaymentMethod })(PaymentScreen);