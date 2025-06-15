import Book from '../components/Book.jsx';
import Header from '../components/Header.jsx';
import {useSelector,useDispatch} from 'react-redux';
import {selectBooks,fetchbooks} from '../store/booksSlice.js';
import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
function BooksPage() {
  const dispatch = useDispatch();

  const books = useSelector(selectBooks).books;
  const pageTitle = "📖 Book List with Router, Redux & Firebase";
  const bookstatus= useSelector(selectBooks).status;
  useEffect(()=>{
    if(bookstatus=='idle'){

      dispatch(fetchbooks());
    }
    
  },[]);


    
    
    return (
      <>
        <div className="container">
            <Header pageTitle={pageTitle} />
            by Nandhika Aparna B R
    
            <div className="books-container">
             { books.length ?
                <div className="books-list">
                    
                    { books.map(book => 
                    
                    <Book key={book.id} book={book}  />
                    
                    )}

                </div> : bookstatus == "pending"?
                <div>
                  Loading...
                </div> : <div>
                  Your book list is empty.   
                  <Link to="/add-book">
                    Click here
                  </Link> to add a new book

                </div>
              }
            </div>
        </div>
      </>
    )
  }
  
  export default BooksPage
  