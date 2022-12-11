import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';

function SearchResult() {
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(window.location.search)
    const query = queryParams.get("q");
    const [ searchResult, setSearchResult ] = useState([]);
    const [page, setPage] = useState(1);
    const prevBtn = useRef();
    const nextBtn = useRef();
    const [pageCount, setPageCount]= useState(1);
   
    useEffect( ()=>{
        const search = async () => {
            const resp = await fetch(`https://api.github.com/search/users?q=${query}&page=${page}`);
            const response = await resp.json();
            // console.log(response);
            
            if(response.items){
                if(page ===1)setPageCount(Math.ceil(response.total_count/30))
                setSearchResult(response.items);
            }
        };
        search();
    },[page, query])

    return (
        <div className="flex-box">
            <div className="container flex-col-box">
                {
                    searchResult.length !== 0 &&
                    <div className='search-item-container'>
                        <div className='extra'>
                            <h3>
                                Search Result for {query}
                            </h3>
                            <span>Total Pages: {pageCount} </span>
                        </div>
                        {
                        searchResult.map( (em) => {
                        return(
                            <div className='flex-box search-item' onClick={(e)=>navigate(`/user?u=${em.login}`)} key={em.login}>
                                <div className='search-user-img-box'>
                                    <img src={em.avatar_url} className="search-user-img" alt='userAvatar'></img>
                                </div>
                                <div>
                                    {em.login + " Profile: " + em.html_url}
                                </div>
                            </div>
                        )
                        })}
                        <div className='pagin'>
                            <div className='btn' ref={prevBtn} 
                                onClick={
                                    async (e) => {
                                        page === 1 ? setPage(1) : setPage( page - 1 );
                                        
                                    }
                                }
                            >
                                Prev   
                            </div>
                            <div className="page" >page={page}</div>
                            <div className="btn" ref={nextBtn}
                                onClick={
                                    async (e) => {
                                        page === pageCount ? setPage(pageCount) : setPage( page + 1 );
                                        
                                    }
                                }
                            >
                                Next
                            </div>
                        </div>
                    </div>
                }
                {
                    searchResult.length ===0 &&
                    <div>
                        nothing to show
                        </div>
                }
                
            </div>
        </div>
    )
}

export default SearchResult