import Product from '../components/Product';
import {ProdContext} from '../App';
import React, {useContext, useState} from 'react';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';

const Products = () => {
    const prodContext = useContext(ProdContext);
    let productList = prodContext.countState.products;
    let loader = prodContext.loader;
    console.log("product list", productList);
    const [indexFirstItem, setindexFirstItem] = useState();
    const [indexLastItem, setindexLastItem] = useState();

    const getPaginationValues = (indexOfFirstItem, indexOfLastItem) => {
      console.log("pag", indexOfFirstItem, indexOfLastItem);
      setindexFirstItem(indexOfFirstItem);
      setindexLastItem(indexOfLastItem);
    }

    // Slice the data array to display the current page's items
    const currentItems = productList.slice(indexFirstItem, indexLastItem);

    return (<>
      <Filters />
      <div className='container'>
        {loader && <div className='loader-wrap'><img src='images/loader.gif' alt='loader' className='loader' /></div>}
          {currentItems ? 
          <>
            {currentItems.map(prodData => {
                return <Product data={prodData} key={prodData.id} />
              })
            }           
          </> : 
          <p className='no-prod'>No products found</p>
          }
             
      </div>
      {productList && <Pagination getPaginationValues={getPaginationValues}/>}
      </>
    )
}

export default Products