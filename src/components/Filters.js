import React, {useContext} from 'react';
import {ProdContext} from '../App';

const Filters = () => {
    const prodContext = useContext(ProdContext);
    let dataFromFilter = prodContext.dataFromFilter;

    const getSortValue = (val) => {
        dataFromFilter(val);
    }

  return (
    <div className='filter-wrap'>
        <select className='filter-dropdown' onChange={(e) => getSortValue(e.target.value)}>
            <option value="">Sort</option>
            <option value="lowToHigh">Price low to high</option>
            <option value="highToLow">Price high to low</option>
            <option value="availableQty">Available quantity</option>
        </select>
    </div>
  )
}

export default Filters