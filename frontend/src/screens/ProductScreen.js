import React,{ useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Rating from '../components/Rating';
import { connect } from 'react-redux';
import { getProductDetails } from '../redux/actions/ProductActions';
import Loader from '../components/Loader';
import Error from '../components/Error';


const ProductScreen = ({ getProductDetails, productDetails }) => {

    const { id } = useParams();

    useEffect(() => {
        
        getProductDetails(id)

    }, [getProductDetails, id]);

    const { loading, error, product } = productDetails;


    return (
        <div>
            <Link to={'/'} className='hover:bg-slate-200 py-3 px-5 text-sm tracking-wide inline-block my-5 rounded uppercase'>Go Back</Link>
            
            {
                loading ? <Loader /> : 
                error ? <Error msg={error} /> :

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' >
                    <div>
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className=''>
                        <div className='text-2xl font-light mb-3 uppercase'>{product.name}</div>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        <div className='text-base'>Description: {product.description}</div>
                    </div>
                    <div>
                        <div className='border-2'>
                            <div className='flex p-3 justify-between items-center border-b-2' >
                                <div>Price:</div>
                                <div>₹{product.price}</div>
                            </div>

                            <div className='flex p-3 justify-between items-center border-b-2'>
                                <div>Status:</div>
                                <div>{product.countInStock > 0 ? 'In stock' : 'Out Of Stock'}</div>
                            </div>

                            {product.countInStock > 0 && (
                                <div className='flex p-3 justify-between items-center'>
                                    <div>Qty</div>
                                    <select className='px-4 py-1'>
                                    {
                                        [...Array(product.countInStock).keys()].map((x) => (
                                            <option key= {x + 1} value={x + 1} >{x + 1}</option>
                                        ))
                                    }
                                    </select>
                                </div>
                            )}
                        </div>
                        <button className='uppercase text-sm tracking-wide bg-black w-full p-3 text-white disabled:hidden' disabled={product.countInStock === 0}>Add to cart</button>
                    </div>
                </div>

            }
            
        </div>
    )
}


const mapStateToProps = (state) => ({
    productDetails: state.productDetails
})

export default connect(mapStateToProps, { getProductDetails })(ProductScreen);