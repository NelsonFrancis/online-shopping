import Product from '../components/Product';
import {ProdContext} from '../App';
import React, {useContext} from 'react';
import Filters from '../components/Filters';

const Products = () => {
    const prodContext = useContext(ProdContext);
    let productList = prodContext.countState.products;
    console.log("product list", productList);
    
    return (<>
      <Filters />
      <div className='container'>
          {productList ? 
          <>
            {productList.map(prodData => {
                return <Product data={prodData} key={prodData.id} />
              })
            }
          </> : 
          <p className='no-prod'>No products found</p>
          }
            
      </div>
      </>
    )
}

export default Products