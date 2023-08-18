import React, { useState, useEffect } from 'react';

import './cards.scss';
import Pagination from '../Pagination/pagination';
import Card from '../Card/card';

const Cards = () => {  // Cards Container
    
    const [cards, setCards] = useState([]);
    const [isLoaded, setisLoaded] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageNumberLimit = 5;
    const [maxPageLimit, setMaxPageLimit] = useState(5);
    const [minPageLimit, setMinPageLimit] = useState(0);

    // Fetch API and set into array for mapping
    const fetchCards = () => {
        fetch('https://api.artic.edu/api/v1/artworks?page=' + currentPage )
        .then((response) => response.json())
        .then((data) => {
            setCards(data.data);
            setTotalPages(data.pagination.total_pages);
            setisLoaded(true);
        })
        .catch(error => console.error('Error', error));
    }

    useEffect(() => {
        fetchCards()
    }, [currentPage]);
    
    // Pagination
    const paginationAttributes = {
        currentPage,
        maxPageLimit,
        minPageLimit,
        response: cards,
        totalPages: totalPages
    };

    const onPageChange = (pageNumber)=>{
        setCurrentPage(pageNumber);
        setisLoaded(false);
    }
    const onPrevClick = ()=>{
      if((currentPage-1) % pageNumberLimit === 0){
          setMaxPageLimit(maxPageLimit - pageNumberLimit);
          setMinPageLimit(minPageLimit - pageNumberLimit);
      }
      setCurrentPage(prev=> prev-1);
      setisLoaded(false);
   }

    const onNextClick = ()=>{
       if(currentPage+1 > maxPageLimit){
           setMaxPageLimit(maxPageLimit + pageNumberLimit);
           setMinPageLimit(minPageLimit + pageNumberLimit);
       }
       setCurrentPage(prev=>prev+1);
       setisLoaded(false);
    }
    
    return(
        <div className='container cards-wrapper c-cards'>
            <div className='row'>
                <div className='col-12'>
                
                    <h2>Digital Art Gallery</h2>
                    <p>Click a card to learn more about the piece</p>
                    {/* Mobile pagination */}
                    <section className='pagination d-md-none'>  
                        {
                            <Pagination {...paginationAttributes} 
                            onPrevClick={onPrevClick} 
                            onNextClick={onNextClick}
                            onPageChange={onPageChange} />
                        } 
                    </section>
                    <section className="cards-container">
                        {isLoaded ? (
                            cards.map((card) => 
                                <Card 
                                    key={card.id} 
                                    id={card.id}
                                    {...card} 
                                />
                            )
                        ) : (
                            <div></div>
                        )}
                    </section>
                    {/* Bottom pagination */}
                    <section className='pagination'>
                        {isLoaded ? (
                            <Pagination {...paginationAttributes} 
                            onPrevClick={onPrevClick} 
                            onNextClick={onNextClick}
                            onPageChange={onPageChange} />
                        ) : (
                            <div className="loading">Loading...</div>
                        )} 
                    </section>
                </div>
            </div>
        </div>
    )
}


export default Cards;