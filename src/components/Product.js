import React, {useContext, useEffect, useState} from 'react';
import {ProdContext} from '../App';
import {Link} from 'react-router-dom';

const Product = ({data}) => {
    const prodContext = useContext(ProdContext);
    const [prodNum, setProdNum] = useState(data.prodQty);
    const [availQty, setAvailQty] = useState(data.availableQty);
    const [firstRun, setFirstRun] = useState(false);

    let productNumFun = prodContext.updateProdNum;
    

    const addToCartClick = (prodData) => {
        let updatedProd = {...prodData, availableQty: availQty, prodQty: prodNum}
       
        prodContext.countDispatch({
            type: 'ADD_PROD',
            payload: {
                products: [{...updatedProd }],
            }
        });
        let cartProd = prodContext.countState.products.filter(c => c.prodQty > 0);
        // console.log("cartProd", cartProd.length);
        productNumFun(cartProd.length + 1);
    }

    const addProd = () => {
        if(availQty > 0){
            setProdNum(prodNum + 1);
            setAvailQty(availQty - 1);
        }
        
    }

    useEffect(() => {
        if (firstRun) {
            addToCartClick(data)
          }
          setFirstRun(true);
    },[prodNum])

    const subProd = () => {
        if(prodNum > 0){
            setProdNum(prodNum - 1);
            setAvailQty(availQty + 1);
        }
    }

    const removeClick = (rmProduct) => {
        let updatedProd = {...rmProduct, availableQty: rmProduct.availableQty + rmProduct.prodQty, prodQty: 0}
        prodContext.countDispatch({
            type: 'REMOVE_PROD',
            payload: {
                products: [{...updatedProd }],
            }
        });
        let cartProd = prodContext.countState.products.filter(c => c.prodQty > 0);
        productNumFun(cartProd.length - 1);
    }
    
  return (
    <>
        <div className='prod-frame'>
            <img src={data.prodImg} className='prod-img' alt='product' />
            <h3 className='prod-title'><Link to={`/products/${data.id}`}>{data.prodName}</Link></h3>
            <p className='prod-desc'><span className='theme-label'>Price</span> &#8377;{data.prodPrice}</p>
            <p className='prod-desc'><span className='theme-label'>Available Quantity</span> {availQty}</p>
            <p className='prod-desc'><span className='theme-label'>Product Description</span> {data.prodDesc}</p>           
      
            { data &&  
                data.prodQty > 0 
                        ?  
                    <> 
                        <button className='add-btn' onClick={() => addProd()}>+</button>
                        <input className='add-sub-val' type='text' value={prodNum} onChange={() => setProdNum(prodNum)} />
                        <button className='sub-btn' onClick={() => subProd()}>-</button>
                        <br />
                        <button className='prod-sub' onClick={(e) => removeClick(data)}>Remove from Cart</button> 
                        <Link to="/cart" className='proceed-btn'>Proceed to checkout</Link>
                        </> 
                    :
                    <>
                        <button className='prod-add' onClick={() => addProd()}>Add to Cart</button> 
                    </> 
                
            }
        </div>
    </>
  )
}

export default Product