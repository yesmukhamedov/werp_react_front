import React, {Component} from 'react'
import {Link} from 'react-router'
import {
    Table,
    Icon,
    Container,
    Checkbox
} from 'semantic-ui-react'
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'
import SearchPanel from './SearchPanel'
import {ROOT_URL} from '../../../../utils/constants'

export default class SpList extends Component {
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
            startDate: undefined,
            endDate: undefined,
            servicePacketId: undefined,
            sparePartPosDescription: undefined,
            sparePartId: undefined,
            result: []
        }

        this.handleInputChange = this.handleInputChange.bind(this)   
        this.fetchCategories = this.fetchCategories.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleActivateServicePacket = this.handleActivateServicePacket.bind(this)
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

            this.setState({
                ...this.state,
                countryOptions: [
                    {
                        key: -1,
                        value: -1,
                        text: 'Все страны'
                    }, ...newCountryOptions
                ],
                companyOptions: newCompanyOptions,
                categoryOptions: [{
                    key: -1,
                    value: -1,
                    text: 'Все категории'
                }, ...newCategoryOptions]
            }, () => {
                console.log("spListPage state ", this.state)
            })
        }))
        .catch((err) => {
            console.log("Error in spListPage", err)
        })
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
                productOptions: [
                    {
                        key: -1,
                        value: -1,
                        text: 'Все продукты'
                    }, ...newProductOptions]
            })
        })
        .catch(err => console.log(err))
    }

    handleInputChange(value, dataType) {
        let clearedFileds = {}
        switch (dataType) {
            case 'selectedCountry': {
                clearedFileds = {
                    selectedCategory: undefined,
                    selectedProduct: undefined,
                    productOptions: []
                }
                break;
            }
            case 'selectedCompany': {
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
            default: {}
        }

        this.setState({
            ...this.state,
            [dataType]: value,
            ...clearedFileds  
        }, () => console.log("handled field ", dataType, " state ", this.state))
    }

    handleSearch() {

        let startDateUtc = undefined
        let endDateUtc = undefined
        if (this.state.startDate) {
            const startVal = this.state.startDate.format('YYYY-MM-DD');
            startDateUtc = moment.utc(startVal).format();
        }

        if (this.state.endDate) {
            const endVal = this.state.endDate.format('YYYY-MM-DD');
            endDateUtc = moment.utc(endVal).format();
        }


        const paramsDict = {
            companyId: this.state.selectedCompany,
            countryId: this.state.selectedCountry,
            productId: this.state.selectedProduct,
            productCategoryId: this.state.selectedCategory,
            startDate: startDateUtc,
            endDate: endDateUtc,
            servicePacketId: this.state.servicePacketId,
            sparePartPosDescription: this.state.sparePartPosDescription,
            sparePartId: this.state.sparePartId
        }

        const params = _.map(paramsDict, (val, key) => { return (val ? `${key}=${val}` : ``) })
                        .filter(param => param)
                        .join('&')

        console.log("PARAMS", params)
        axios.get(`${ROOT_URL}/api/service/packets?${params}`, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
        .then(({data}) => this.setState({...this.state, result: data}))
        .catch(err => console.log("ERROR in SPLIST PAGE", err))
    }

    handleActivateServicePacket(id, activationState) {
        axios.put(`${ROOT_URL}/api/service/packets/${id}`, {active: !activationState}, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
        .then(() => {
            const newResult = this.state.result.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        active: !activationState
                    }
                }
                return item
            })

            this.setState({...this.state, result: newResult})
        })
        .catch(err => console.log("ERROR could not change activation state of %d with error %s", id, JSON.stringify(err)))
    }

    render() { 
        return (
            <Container
                fluid
                style = {{
                marginTop: '2em',
                marginBottom: '2em',
                paddingLeft: '2em',
                paddingRight: '2em' }}> 

                <SearchPanel 
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
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    servicePacketId={this.state.servicePacketId}
                    sparePartPosDescription={this.state.sparePartPosDescription}
                    sparePartId={this.state.sparePartId}
                    handleSearch={this.handleSearch} />
                <Table celled color='black' striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell collapsing>#</Table.HeaderCell>
                            <Table.HeaderCell>Название</Table.HeaderCell>
                            <Table.HeaderCell>Компания</Table.HeaderCell>
                            <Table.HeaderCell>Страна</Table.HeaderCell>
                            <Table.HeaderCell>Дата начала</Table.HeaderCell>
                            <Table.HeaderCell>Категория</Table.HeaderCell>
                            <Table.HeaderCell>Товар/Модель</Table.HeaderCell>
                            <Table.HeaderCell collapsing></Table.HeaderCell>
                            <Table.HeaderCell collapsing></Table.HeaderCell>
                        </Table.Row>
                        {this.state.result.map((item, idx) => {
                            const {
                                id,
                                name,
                                companyName,
                                countryName,
                                startDate,
                                productCategory,
                                productName,
                                active
                            } = item
                            return (
                                <Table.Row key={idx}>
                                    <Table.Cell>{idx+1}</Table.Cell>
                                    <Table.Cell>{`${id} - ${name}`}</Table.Cell>
                                    <Table.Cell>{companyName}</Table.Cell>
                                    <Table.Cell>{countryName}</Table.Cell>
                                    <Table.Cell>{moment(startDate).format('DD.MM.YYYY')}</Table.Cell>
                                    <Table.Cell>{productCategory}</Table.Cell>
                                    <Table.Cell>{productName}</Table.Cell>
                                    <Table.Cell collapsing>
                                        <Checkbox 
                                            slider 
                                            checked={active}
                                            onClick={() => this.handleActivateServicePacket(id, active)} />
                                    </Table.Cell>
                                    <Table.Cell collapsing>
                                        <Link target="_blank" to={`/service/packets/spview/${id}`}>
                                            <Icon name='eye' size='large' />
                                        </Link>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Header>
                    <Table.Body></Table.Body>
                </Table> 
            </Container>
        )
    }
}