import React from 'react';
import './MainContainer.css';

const MainContainer = (props) => {
    return (
        <div className="main-container">
            {props.children} 
        </div>
    )
} 

export default MainContainer;