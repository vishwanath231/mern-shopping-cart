import React,{ useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { login } from '../redux/actions/userActions';
import { connect } from 'react-redux';


const LoginScreen = ({ userLogin, login }) => {

    const location = useLocation();
    const navigate = useNavigate();

    const { loading, error, userInfo } = userLogin;

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo]);


    const [data, setData] = useState({
        email: '',
        password: '',
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

        login(data);
    }





    return (

        <div className='w-full md:max-w-md my-6 mx-auto'>
            <div className='text-2xl text-black tracking-wider uppercase mb-4 font-bold'>sign in</div>
            {error && <Error msg={error} /> }
            {loading && <Loader />}
            <form onSubmit={submitHandler}>
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email Address</label>
                    <input 
                        type="email" 
                        id="email" 
                        name='email'
                        onChange={changeHandler}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="example@support.com"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                    <input 
                        type="password" 
                        id="password"
                        name='password'
                        onChange={changeHandler} 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                        placeholder='*****'
                    />
                </div>

                <button 
                    type="submit" 
                    
                    className="text-white bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center "
                >Submit</button>

                <div className='text-gray-500 mt-4'>New customer! <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className='text-black'>Register</Link></div>
            </form>
        </div>
    )
}


const mapStateToProps = (state) => ({
    userLogin: state.userLogin
})

export default connect(mapStateToProps, { login })(LoginScreen);