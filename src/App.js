import React, { useReducer, useEffect } from 'react';
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
  const initialState = {
    products: []
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
        default:
          return state
      }
      return newState
    }
    
    const prodUrl = 'https://62b9a40fff109cd1dc97470c.mockapi.io/api/userlist/ecommerce';
    useEffect(() => {
      axios.get(prodUrl)
      .then(response => {
        initialState.products = response.data;
      })
      .catch(err => console.log(err))
    }, []);
  
 
  const [count, dispatch] = useReducer(reducerFunction, initialState);
  return (
    <ProdContext.Provider value={{countState: count, countDispatch: dispatch}}>
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
