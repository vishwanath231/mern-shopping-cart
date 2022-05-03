import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='bg-slate-900 py-3 px-2'>
            <div className='max-w-screen-lg mx-auto flex m-2 items-center justify-between'>
            <Link to='/' className='text-base text-white uppercase'>Proshop</Link>
            <Link to='/cart' className='text-base text-white uppercase'>cart</Link>
        </div>
        </div>
    )
}

export default Navbar