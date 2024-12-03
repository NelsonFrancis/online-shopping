import React, { useReducer, useEffect, useState } from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Products from './pages/Products';
import Header from './components/Header';
import axios from 'axios';
import Payment from './pages/Payment';

export const ProdContext = React.createContext();

function App() {
  const [prod, setProd] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loader, setLoader] = useState(false);
  const initialState = {
    products: prod
  };
    const reducerFunction = (state, action) => {
      let newState
      
      switch(action.type){
        case 'ADD_PROD':
          let filteredProduct = state.products.map(filteredProd => action.payload.products.find(p => p.id === filteredProd.id) || filteredProd)
          newState = {
            products: filteredProduct
          }
          break;
        case 'REMOVE_PROD':
          let filteredProducts = state.products.map(filteredProd => action.payload.products.find(p => p.id === filteredProd.id) || filteredProd)
          newState = {
            products: filteredProducts
          }
          break;
        case 'SORT_LOW_HIGH':
          let sortLowToHighProducts = state.products.sort((a, b) => a.prodPrice - b.prodPrice);
          newState = {
            products: sortLowToHighProducts
          }
          break;
        case 'SORT_HIGH_LOW':
          let sortHighToLowProducts = state.products.sort((a, b) => b.prodPrice - a.prodPrice);
          newState = {
            products: sortHighToLowProducts
          }
          break;
        case 'AVAILABLE_QTY':
          let availableQtyProducts = state.products.sort((a, b) => b.availableQty - a.availableQty);
          newState = {
            products: availableQtyProducts
          }
          break;
        default:
          return state
      }
      return newState
    }
    
    const prodUrl = 'https://62b9a40fff109cd1dc97470c.mockapi.io/api/userlist/ecommerce';
    useEffect(() => {
      setLoader(true);
      axios.get(prodUrl)
      .then(response => {
        initialState.products = response.data;
        setProd(response.data);
        setLoader(false);
      })
      .catch(err => {
        console.log(err);
        setLoader(false);
      })
    }, []);

    const updateProdNum = (num) => {
      console.log("prod num = ", num);
      setCartCount(num);
    }
  
 
  const [count, dispatch] = useReducer(reducerFunction, initialState);
  // console.log("count", initialState);
  return (
    <ProdContext.Provider value={{countState: count, countDispatch: dispatch, updateProdNum, cartCount, loader}}>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/products' element={<Products />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/payment" element={<Payment />} />
        </Routes>
      </div>
    </ProdContext.Provider>
  );
}

export default App;
