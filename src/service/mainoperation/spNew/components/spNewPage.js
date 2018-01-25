import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment'
import _ from "lodash";
import {Container} from 'semantic-ui-react';
import Header from './Header2';
import SparePartList from './SparePartList';
import WarrantyList from './WarrantyList';
import BonusPanel from './BonusPanel';
import {ROOT_URL} from '../../../../utils/constants';




class SpNewPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sparePartOptions: [],
            warrantyOptions: [],
            companyOptions: [],
            countryOptions: [],
            categoryOptions: [],
            productOptions: [],
            selectedCompany: undefined,
            selectedCategory: undefined,
            selectedCountry: undefined,
            selectedProduct: undefined,
            title: '',
            description: '',
            startDate: moment(),
            totalSum: 0,
            masterBonus: 0,
            operatorBonus: 0,
            sparePartList: [],
            warrantyList: []
        }

        this.handleInputChange = this.handleInputChange.bind(this)   
        this.fetchCategories = this.fetchCategories.bind(this)
        this.fetchReferenceList = this.fetchReferenceList.bind(this)
        this.saveServicePacket = this.saveServicePacket.bind(this)
    } 

    componentWillMount() {
        axios.all([
            axios.get(`${ROOT_URL}/api/reference/countries`, {
            headers: {
                authorization: localStorage.getItem('token')}
            }), 
            axios.get(`${ROOT_URL}/api/reference/companies`, {
                headers: {
                    authorization: localStorage.getItem('token')}
            }),
            axios.get(`${ROOT_URL}/api/reference/product-categories`, {
                headers: {
                    authorization: localStorage.getItem('token')}
            })
        ])
        .then(axios.spread(({data: countryList}, {data: companyList}, {data: categoryList}) => {
            const newCountryOptions = countryList.map(item => {
                return {
                    key: item.countryId,
                    text: item.country,
                    value: item.countryId
                }
            })

            const newCompanyOptions = companyList.map(item => {
                return {
                    key: item.id,
                    value: item.id,
                    text: item.name
                }
            })

            const newCategoryOptions = categoryList.map(item => {
                return {
                    key: item.id,
                    value: item.id,
                    text: item.label
                }
            })
            const countryDict = new Map(countryList.map((i) => [i.countryId, i.currency]))
        
            this.setState({
                ...this.state,
                countryOptions: newCountryOptions,
                companyOptions: newCompanyOptions,
                categoryOptions: newCategoryOptions,
                countryDict: countryDict
            }, () => {
                console.log("spNewPage state ", this.state)
            })
        }))
        .catch((err) => {
            console.log("Error in spNewPage", err)
        })
    }

    saveServicePacket() {
        const strVal = this.state.startDate.format('YYYY-MM-DD');
        const startDateUtc = moment.utc(strVal).format();

        // construct servicePacket
        const servicePacket = {
            name: this.state.title,
            description: this.state.description,
            country: {
                countryId: this.state.selectedCountry
            },
            company: {
                id: this.state.selectedCompany
            },
            startDate: startDateUtc,
            productCategory: {
                id: this.state.selectedCategory
            },
            product: {
                id: this.state.selectedProduct
            },
            price: this.state.totalSum,
            totalPrice: this.state.totalSum,            
            masterBonus: this.state.masterBonus,
            operatorBonus: this.state.operatorBonus,
            currency: this.state.countryDict.get(this.state.selectedCountry),
            active: true
        }

        // construct spareParts
        const spareParts = this.state.sparePartList.map(sp => {
            sp.operType = {
                operTypeId: sp.operTypeId
            };
            return sp;
        })

        // construct sparePartsWithWarranty
        const sparePartsWithWarranty = this.state.warrantyList.map(item => { 
            return {
                id: item.id,
                code: item.code,
                description: item.description,
                warrantyMonths: item.warrantyMonths
            }
        })

        // transactionCode
        // transactionId

        const newServicePacket = {
            servicePacket,
            spareParts,
            sparePartsWithWarranty,
            transactionCode: null,
            transactionId: null
        }

        axios.post(`${ROOT_URL}/api/service/packets`, { ...newServicePacket }, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
        .then(response => {
            console.log("RESPONSE OF SAVE", response)
        }) 
        .catch(err => console.log("ERROR DURING SAVE", err))

        console.log("DS to Store:", newServicePacket)
    }

    
    handleInputChange(value, dataType) {
        let clearedFileds = {}
        switch (dataType) {
            case 'selectedCompany': {
                clearedFileds = { 
                    selectedCountry: undefined,
                    selectedCategory: undefined,
                    selectedProduct: undefined,
                    productOptions: []
                }
                break;
            }
            case 'selectedCountry': {
                clearedFileds = { 
                    selectedCategory: undefined,
                    selectedProduct: undefined,
                    productOptions: []
                }
                break;
            }
            case 'selectedCategory': {
                clearedFileds = { 
                    selectedProduct: undefined,
                    productOptions: []
                }
                break;
            }
            case 'sparePartList': {
                clearedFileds = {
                    totalSum: this.calculateTotalSum(value)
                }
                break;
            }
            default: {}
        }

        

        this.setState({
            ...this.state,
            [dataType]: value,
            ...clearedFileds  
        }, () => console.log("handled field ", dataType, " state ", this.state))
    }

    calculateTotalSum(list) {
        return _.sumBy(list, (item) => parseInt(item.totalPrice || 0));
    }

    fetchCategories(companyId, categoryId) {
        axios.get(`${ROOT_URL}/api/reference/products?categoryId=${categoryId}&companyId=${companyId}`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
        .then(({data}) => {
            const newProductOptions = data.map(item => {
                return {
                    key: item.id,
                    value: item.id,
                    text: item.name
                }
            })

            this.setState({
                ...this.state,
                productOptions: newProductOptions
            })
        })
        .catch(err => console.log(err))
    }

    fetchReferenceList(companyId, countryId, productId) {
        axios.all([
            axios.get(`${ROOT_URL}/api/reference/spare-part-warranties?productId=${productId}`, {
            headers: {
                authorization: localStorage.getItem('token')}
            }), 
            axios.get(`${ROOT_URL}/api/reference/spare-part-prices?companyId=${companyId}&countryId=${countryId}&productId=${productId}`, {
                headers: {
                    authorization: localStorage.getItem('token')}
            })
        ])
        .then(axios.spread(({data: warranties}, {data: spareParts}) => {
            this.setState({
                ...this.state,
                sparePartOptions: spareParts,
                warrantyOptions: warranties
            }, () => {
                console.log("spNewPage state ", this.state)
            })
        }))
        .catch((err) => {
            console.log("Error in spNewPage", err)
        })
    }

    


    render(){
        return (
            <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                <Header 
                    countryOpts={this.state.countryOptions}
                    companyOpts={this.state.companyOptions}
                    categoryOpts={this.state.categoryOptions}
                    productOpts={this.state.productOptions}
                    selectedCompany={this.state.selectedCompany}
                    selectedCountry={this.state.selectedCountry}
                    selectedCategory={this.state.selectedCategory}
                    selectedProduct={this.state.selectedProduct}
                    inputChange={this.handleInputChange}
                    fetchCategories={this.fetchCategories}
                    fetchReferenceList={this.fetchReferenceList}
                    title={this.state.title}
                    description={this.state.description}
                    startDate={this.state.startDate}
                    sparePartOptions={this.state.sparePartOptions}
                    warrantyOptions={this.state.warrantyOptions}
                    saveServicePacket={this.saveServicePacket} />
                <p>--<br/>--<br/></p>
                <SparePartList 
                    data={this.state.sparePartOptions}
                    saveChange={this.handleInputChange}
                    totalSum={this.state.totalSum} />
                <p>--<br/>--<br/></p>
                <WarrantyList 
                    data={this.state.warrantyOptions}
                    saveChange={this.handleInputChange} />
                <p>--<br/>--<br/></p>
                <BonusPanel 
                    masterBonus={this.state.masterBonus}
                    operatorBonus={this.state.operatorBonus}
                    totalSum={this.state.totalSum}
                    inputChange={this.handleInputChange} />
            </Container> 
        );
    }
}


export default SpNewPage;