import React from "react";
import './header.scss'

const Header = () => {
    
    return (
        <header className='container-fluid'>
            <div className='row'>
                <div className='col-12 col-md-8 offset-md-2'>
                    <h1>Art Institute of Chicago</h1>
                </div>
                <div className="col-12 col-md-2">
                    <a className="btn" target="_blank" rel="noreferrer" href="https://www.artic.edu/">Check us out!</a>
                </div>
            </div> 
        </header>
    );
};

export default Header;