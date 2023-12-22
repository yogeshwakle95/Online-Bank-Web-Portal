import React, { useState } from 'react';
import Pagination from "react-js-pagination";
import { NavLink } from 'react-router-dom';


function Pages(props) {
 
  // current page
  const [currentPage, setCurrentPage] = useState(1);
 
  // total records per page to display
  const recordPerPage = 5;
 
  // total number of the records
  
 
  // range of pages in paginator
  const pageRange = 5;

  // handle change event
  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
    // call API to get data based on pageNumber
  }
 
  return (
    <div className="App">
      
      <Pagination
      itemClass="page-item" 
      linkClass="page-link"
        activePage={currentPage}
        itemsCountPerPage={recordPerPage}
        totalItemsCount={props.totalRecords !== undefined ? props.totalRecords : 0}
        pageRangeDisplayed={pageRange}
        onChange={handlePageChange}
      />
    </div>
  );
}
 
export default Pages;