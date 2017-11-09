import React, { Component } from 'react';
import Header from './Header';
import ReferenceModal from './ReferenceModal';
import ServiceProductList from './ServiceProductList';


class SpNewPage extends Component {
    render(){
        return (
            <div>
                <Header/>
                <h3>SpNewPage component</h3>
                <ServiceProductList />
                <ReferenceModal />
            </div>
        );
    }
}

export default SpNewPage;