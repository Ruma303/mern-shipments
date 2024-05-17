import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className='flex flex-col items-center p-4 gap-2 bg-slate-200'>
            <h1 className='text-4xl font-semibold'>MERN Shipments</h1>
            <nav className='flex gap-4 items-center'>
                <Link to='/' className='text-blue-500 font-semibold hover:scale-105'>Home</Link>
                <Link to='/clients' className='text-blue-500 font-semibold hover:scale-105'>Clients</Link>
                <Link to='/orders' className='text-blue-500 font-semibold hover:scale-105'>Orders</Link>
            </nav>
        </header>
    )
}

export default Header