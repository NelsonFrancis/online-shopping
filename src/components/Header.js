import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {ProdContext} from '../App';
import { FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const prodContext = useContext(ProdContext);
  const cartCount = prodContext.cartCount;
  return (
    <header>
        <Link className="logo" to="/">Online Shopping</Link>
        <div className='nav'>
            <Link to="/products" className='nav-links'>Products</Link>
            <Link to="/cart" className={cartCount > 0 ? 'nav-links cart-num' : 'nav-links'}><FaShoppingCart /> {cartCount > 0 ? `(${cartCount})` : ''}</Link>
        </div>
    </header>
  )
}

export default Header