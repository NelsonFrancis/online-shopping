import React, {useContext, useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import {ProdContext} from '../App';
import {Link} from 'react-router-dom';

const ProductDetail = () => {
    const { id } = useParams();
    const prodContext = useContext(ProdContext);
    let productList = prodContext.countState.products;
    const product = productList.find((product) => product.id === id);
    const [prodNum, setProdNum] = useState(product.prodQty);
    const [availQty, setAvailQty] = useState(product.availableQty);
    const [firstRun, setFirstRun] = useState(false);

    let productNumFun = prodContext.updateProdNum;
    // console.log("prod detail = ", product, id, productList);

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

    const subProd = () => {
        if(prodNum > 0){
            setProdNum(prodNum - 1);
            setAvailQty(availQty + 1);
        }
    }

    useEffect(() => {
        if (firstRun) {
            addToCartClick(product)
          }
          setFirstRun(true);
    },[prodNum])

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
        setProdNum(0);
    }

  return (
    <div className='container padd10'>
        <div className='detail-flex'>
            <div className='img-flex'>
                <img src={product.prodImg} alt='product' className='prod-detail-img' />
            </div>
            <div className='detail-txt-flex'>
                <h1 className='product-detail-hd'>{product.prodName}</h1>
                <p className='product-detail-line'>{product.prodDesc}</p>
                <p className='product-detail-line'>
                    <label className='detail-label'>Available quantity</label>
                    <span className='detail-label-val'>{product.availableQty}</span>
                </p>
                { product.prodQty > 0 
                        ?  
                    <> 
                        <button className='add-btn' onClick={() => addProd()}>+</button>
                        <input className='add-sub-val' type='text' value={prodNum} onChange={() => setProdNum(prodNum)} />
                        <button className='sub-btn' onClick={() => subProd()}>-</button>
                        <br />
                        <button className='prod-sub' onClick={(e) => removeClick(product)}>Remove from Cart</button> 
                        <Link to="/cart" className='proceed-btn'>Proceed to checkout</Link>
                        </> 
                    :
                    <>
                        <button className='prod-add' onClick={() => addProd()}>Add to Cart</button> 
                    </> 
                }
            </div>
        </div>
    </div>
  )
}

export default ProductDetail