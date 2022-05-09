import React,{ useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Rating from '../components/Rating';
import { connect } from 'react-redux';
import { getProductDetails } from '../redux/actions/ProductActions';
import Loader from '../components/Loader';
import Message from '../components/Message';


const ProductScreen = ({ getProductDetails, productDetails }) => {

    const [qty, setQty] = useState(1);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        
        getProductDetails(id)

    }, [getProductDetails, id]);

    const addToCart = () => {

        navigate(`/cart/${id}?qty=${qty}`)
    }

    const { loading, error, product } = productDetails;


    return (
        <div>
            <Link to={'/'} style={{ textDecoration: "none" }} className='hover:bg-slate-200 py-3 px-4 text-sm  font-medium tracking-wide inline-block text-black  my-5 rounded uppercase'>Go Back</Link>
            
            {
                loading ? <Loader /> : 
                error ? <Message error msg={error} /> :

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
                                <div>${product.price}</div>
                            </div>

                            <div className='flex p-3 justify-between items-center border-b-2'>
                                <div>Status:</div>
                                <div>{product.countInStock > 0 ? 'In stock' : 'Out Of Stock'}</div>
                            </div>

                            {product.countInStock > 0 && (
                                <div className='flex p-3 justify-between border-b-2 items-center'>
                                    <div>Qty</div>
                                    <select value={qty} className='px-4 py-1' onChange={(e) => setQty(e.target.value)}>
                                    {
                                        [...Array(product.countInStock).keys()].map((x) => (
                                            <option key= {x + 1} value={x + 1} >{x + 1}</option>
                                        ))
                                    }
                                    </select>
                                </div>
                            )}

                            <div className='p-3'>
                                <button 
                                    className='uppercase text-sm tracking-wide bg-black w-full p-3 text-white disabled:hidden' 
                                    disabled={product.countInStock === 0}
                                    onClick={addToCart}
                                >
                                Add to cart</button>
                            </div>
                        </div>
                        
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