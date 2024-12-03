import React, {useContext, useState} from 'react';
import {ProdContext} from '../App';

const Pagination = ({getPaginationValues}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6); 

    const prodContext = useContext(ProdContext);
    let productList = prodContext.countState.products;
  
    // Get the index of the first and last item to be displayed
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    getPaginationValues(indexOfFirstItem, indexOfLastItem);
  
    // Calculate total pages
    const totalPages = Math.ceil(productList.length / itemsPerPage);
  
    // Handle page change
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    return (
      <div>  
        {/* Pagination Controls */}
        <div className='pagination-wrap'>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              style={{
                margin: '5px',
                backgroundColor: currentPage === index + 1 ? '#4495e9' : '#314c69'
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    );
}

export default Pagination