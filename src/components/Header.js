import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <header>
        <Link className="logo" to="/">Shop Online</Link>
        <div className='nav'>
            <Link to="/products" className='nav-links'>Products</Link>
            <Link to="/cart" className='nav-links'>Cart</Link>
        </div>
    </header>
  )
}

export default Header