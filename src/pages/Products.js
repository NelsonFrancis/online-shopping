import Product from '../components/Product';
import {ProdContext} from '../App';
import React, {useContext} from 'react';

const Products = () => {
    const prodContext = useContext(ProdContext);
    let productList = prodContext.countState.products;
    return (
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
    )
}

export default Products