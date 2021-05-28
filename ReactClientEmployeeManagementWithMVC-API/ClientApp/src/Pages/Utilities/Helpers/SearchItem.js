import React from 'react';


export const SearchItem = (props) => {
    const { filterHandler, searchHandler } = props;

    return (
        <form className="form-inline d-flex justify-content-center md-form form-sm mt-0">
            <i className="fas fa-search" aria-hidden="true"></i>
            <input className="form-control form-control-lg ml-3  w-75" type="text" placeholder="Search"
                aria-label="Search" onChange={filterHandler}/>
            <button type="button" className="btn btn-outline-info btn-lg ml-1" onClick={searchHandler} style={{fontWeight: "bold"}}>Search</button>
        </form >
    );
        


}