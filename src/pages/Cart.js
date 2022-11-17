import React, {useContext} from 'react';
import {ProdContext} from '../App';

const Cart = () => {
  const cartContext = useContext(ProdContext);
  let cartProd = cartContext.countState.products.filter(c => c.prodQty > 0);
  let calcPrice = []
  let totalPrice = 0

  if(cartProd.length > 0){
    cartProd.map(c => {
      let calc = c.prodPrice * c.prodQty
      calcPrice.push(calc)
    })
    totalPrice = calcPrice.reduce((a, b) => a + b, 0)
  }
  
  return (
    <div className='container-cart'>
      <p className='cart-line'>Total products added to cart <span className='cart-value'>{cartProd.length}</span></p>
      <p className='cart-line'>Total price <span className='cart-value'>&#8377; {totalPrice.toFixed(2)}</span></p> 
      <div className='cart-prod-wrap'>
        <h4 className='product-hd'>Products ({cartProd.length})</h4>
        <table>
          <thead>
            <th>Product</th>
            <th>Price (&#8377;)</th>
            <th>Quanity</th>
            <th>Total Cost (&#8377;)</th>
          </thead>
          <tbody>
            {
              cartProd.length > 0 ? 
                <>
                  {
                    cartProd.map(prod => {
                      return ( <tr key={prod.id}>
                          <td>
                            <img src={prod.prodImg} className='prod-img-cart' alt='product' />
                            <span className='prod-text-cart'>{prod.prodName}</span>
                          </td>
                          <td>{prod.prodPrice}</td>
                          <td>{prod.prodQty}</td>
                          <td>{prod.prodQty * prod.prodPrice}</td>
                        </tr>
                      )
                    })
                  }
                </>
              : 
              <tr>
                <td colSpan='4'><span className='cart-empty'>Cart is empty.</span></td>
              </tr>
            }
          </tbody>
        </table>        
      </div>
    </div>
  )
}

export default Cart