import React from 'react';

import './pagination.scss';

const Pagination = (props)=>{
    
    const { currentPage, maxPageLimit, minPageLimit} = props;
    const totalPages = props.totalPages-1;

    const handlePrevClick = ()=>{
        props.onPrevClick();
    }
    const handleNextClick = ()=>{
        props.onNextClick();
    }
    const handlePageClick = (e)=>{
        props.onPageChange(Number(e.target.id));
    }

    const pages = [];
    for(let i=1 ; i<=totalPages; i++){
        pages.push(i);
    }
   
    // Page Numbers
    const pageNumbers = pages.map(page => {
        if(page <= maxPageLimit  && page > minPageLimit) {
            return(
                <button key={page} id={page} onClick={handlePageClick} 
                    className={currentPage===page ? 'active' : null}
                    tabIndex="0">
                    {page}
                </button>
            );
        }else{
            return null;
        }
    });

    // Page Ellipses
    let pageIncrementEllipses = null;
    if(pages.length > maxPageLimit){
        pageIncrementEllipses = <button onClick={handleNextClick} tabIndex="0">&hellip;</button>
    }
    let pageDecremenEllipses = null;
    if(minPageLimit >=1){
        pageDecremenEllipses = <button onClick={handlePrevClick} tabIndex="0">&hellip;</button> 
    }
    
    return (
        <div className="main">
            <ul className="page-numbers"> 
                <button 
                    onClick={handlePrevClick} 
                    disabled={currentPage === pages[0]} 
                    className="previous"
                    tabIndex="0">
                        Prev
                </button>
                {pageDecremenEllipses}
                    {pageNumbers}
                {pageIncrementEllipses}
                <button 
                    onClick={handleNextClick} 
                    disabled={currentPage === pages[pages.length-1]} 
                    className="next"
                    tabIndex="0">
                        Next
            </button>
            </ul>
        </div>
    )
}

export default Pagination;