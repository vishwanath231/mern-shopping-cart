import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ val }) => {
    return (
        <div className='bg-white shadow-md rounded-lg dark:bg-gray-800 dark:border-gray-700'>
            <div>
            <Link to={`/product/${val._id}`}>
                <img src={val.image} alt={val.name} className='cursor-pointer rounded-t-lg'/>
            </Link>
            </div>
            <div className='p-4'>
                <Link to={`/product/${val._id}`} className='hover:underline cursor-pointer'>{val.name}</Link>
                <Rating value={val.rating} text={`${val.numReviews} reviews`} />
                <div className='font-semibold text-xl'>₹{val.price}</div>
            </div>
        </div>
    )
}

export default Product