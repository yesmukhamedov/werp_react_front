import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import SparePartList from './SparePartList';
import ServiceWarrantyList from './ServiceWarrantyList';
import ServicePaymentDetails from './ServicePaymentDetails';




class SpNewPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            referenceData: [],
            companyId: 1000,
            categoryId: 2,
            
        }

        
    }

    // fetchSparePartReference() {
    //     // axios.get(`${ROOT_URL}/api/reference/products`, {
    //     //     headers: { authorization: localStorage.getItem('token') },
    //     //     params: {
    //     //         category: this.state.categoryId,
    //     //         company: this.state.companyId
    //     //     }
    //     // })
    //     // .then(function ({data}) {
    //     //   console.log(data);
    //     // })
    //     // .catch(function (error) {
    //     //   console.log(error);
    //     // });

    //     this.setState({
    //         ...this.state,
    //         referenceData: referenceSparePartList
    //     })
    // }

    


    render(){
        return (
            <div>
                
                {/* <Header/> */}
                {/* <h3>SpNewPage component</h3> */}
                <SparePartList openReference={this.openSparePartListModal} />
                {/* <ServiceWarrantyList /> */}
                {/* <ServicePaymentDetails /> */}
            </div>
        );
    }
}

export default SpNewPage;

const data = [{
    code: "1",
    price: "price",
    title: "title1",
    currency: "currency"
},{
    code: "2",
    price: "price",
    title: "title2",
    currency: "currency"
},{
    code: "3",
    price: "price",
    title: "title3",
    currency: "currency"
},{
    code: "4",
    price: "price",
    title: "title4",
    currency: "currency"
},{
    code: "5",
    price: "price",
    title: "title5",
    currency: "currency"
},{
    code: "6",
    price: "price",
    title: "title6",
    currency: "currency"
},{
    code: "7",
    price: "price",
    title: "title7",
    currency: "currency"
},{
    code: "8",
    price: "price",
    title: "title8",
    currency: "currency"
},{
    code: "9",
    price: "price",
    title: "mitle9",
    currency: "currency"
},{
    code: "10",
    price: "price",
    title: "title10",
    currency: "currency"
},{
    code: "11",
    price: "price",
    title: "title11",
    currency: "currency"
},{
    code: "12",
    price: "price",
    title: "title12",
    currency: "currency"
},{
    code: "13",
    price: "price",
    title: "title13",
    currency: "currency"
},{
    code: "14",
    price: "price",
    title: "title14",
    currency: "currency"
},{
    code: "15",
    price: "price",
    title: "title15",
    currency: "currency"
},{
    code: "16",
    price: "price",
    title: "title16",
    currency: "currency"
},{
    code: "17",
    price: "price",
    title: "title17",
    currency: "currency"
},{
    code: "18",
    price: "price",
    title: "title18",
    currency: "currency"
},{
    code: "19",
    price: "price",
    title: "mitle19",
    currency: "currency"
},{
    code: "20",
    price: "price",
    title: "mitle20",
    currency: "currency"
},{
    code: "21",
    price: "price",
    title: "title21",
    currency: "currency"
},{
    code: "22",
    price: "price",
    title: "title22",
    currency: "currency"
},{
    code: "23",
    price: "price",
    title: "title23",
    currency: "currency"
},{
    code: "24",
    price: "price",
    title: "title24",
    currency: "currency"
},{
    code: "25",
    price: "price",
    title: "title25",
    currency: "currency"
},{
    code: "26",
    price: "price",
    title: "title26",
    currency: "currency"
},{
    code: "27",
    price: "price",
    title: "title27",
    currency: "currency"
},{
    code: "28",
    price: "price",
    title: "title28",
    currency: "currency"
},{
    code: "29",
    price: "price",
    title: "title29",
    currency: "currency"
},{
    code: "30",
    price: "price",
    title: "title30",
    currency: "currency"
}]
