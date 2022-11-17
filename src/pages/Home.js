import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='container'>
      <p className='welcome-txt'>Welcome to Online Shopping</p>
      <Link to="/products" className='shop-link'>Start shopping</Link>
    </div>
  )
}

export default Home