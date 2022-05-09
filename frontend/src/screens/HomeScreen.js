import React,{ useEffect } from 'react';
import Product from '../components/Product';
import { connect } from 'react-redux';
import { listProducts } from '../redux/actions/ProductActions';
import Loader from '../components/Loader';
import Message from '../components/Message';


const HomeScreen = ({ productList, listProducts }) => {


    useEffect(() => {
        listProducts()
    }, [listProducts]);


    const {loading, error, products } = productList;

    return (
        <div>
            <div className='text-2xl mt-5 uppercase text-black font-semibold'>Lastest Products</div>
            {
                loading ? <Loader /> :
                error ? <Message error msg={error} /> :
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 gap-y-7 my-5 '>
                    {
                        products.map((val) => (
                            <div key={val._id} >
                                <Product val={val} />
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    )
}


const mapStateToProps = (state) => ({
    productList: state.productList
})

export default connect(mapStateToProps, { listProducts })(HomeScreen);