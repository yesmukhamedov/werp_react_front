import React, {Component} from 'react';
import {Container} from 'semantic-ui-react';
import axios from 'axios';
import ContractListTable from './ContractListTable';
import ContractListSearch from './ContractListSearch';
import {ROOT_URL} from '../../../../utils/constants';
import { makeData } from "./Utils";
import moment from 'moment';
import _ from 'lodash';

class ContractListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyOptions: [],
            branchOptions: [],
            stateOptions:[],
            operatorOptions:[],
            selectedCompany: undefined,
            selectedBranch:undefined,
            selectedState:undefined,
            startDate: undefined,
            endDate: undefined,
            result: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
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
            })
        ])
        .then(axios.spread(({data: countryList}, {data: companyList}) => {
            const newCompanyOptions = companyList.map(item => {
                return {
                    key: item.id,
                    value: item.id,
                    text: item.name
                }
            });
            this.setState({
                ...this.state,
                companyOptions: newCompanyOptions,
                operatorOptions: [{ key: 0, value: 0, text: 'Nagima'},
                                  { key: 1, value: 1, text: 'Raushan'},
                                  { key: 2, value: 2, text: 'Assel'}] ,
                branchOptions: [{ key: 1, value: 1, text: 'Branch1'},
                                { key: 2, value: 2, text: 'Branch2'},
                                { key: 3, value: 3, text: 'Branch3'}] ,
                stateOptions: [{ key: 1, value: 1, text: 'State1'},
                               { key: 2, value: 2, text: 'State2'},
                               { key: 3, value: 3, text: 'State3'}] ,  
                result: makeData()
            });
        }))
        .catch((err) => {
            console.log("Error in ContractListPage", err)
        })
    }

    handleInputChange(value, dataType) { 
        console.log(dataType, value) 
        this.setState({
            ...this.state,
            [dataType]: value
        })
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
            branchId: this.state.selectedBranch,
            stateId: this.state.selectedState,
            startDate: startDateUtc,
            endDate: endDateUtc
        }
        console.log(paramsDict)
        const params = _.map(paramsDict, (val, key) => { return (val ? `${key}=${val}` : val === false ? `${key}=${val}` : ``) })
                        .filter(param => param)
                        .join('&')

        console.log("PARAMS", params)
        this.setState({...this.state, result: makeData()})
        // axios.get(`${ROOT_URL}/api/service/packets?${params}`, {
        //     headers: {
        //         authorization: localStorage.getItem('token')
        //     }
        // })
        // .then(({data}) => this.setState({...this.state, result: data}))
        // .catch(err => console.log("ERROR in SPLIST PAGE", err))
    }

    render(){
        return (
            <Container fluid style = {{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em' }}>
                <ContractListSearch 
                    companyOpts={this.state.companyOptions}
                    branchOpts={this.state.branchOptions}
                    stateOpts={this.state.stateOptions}
                    selectedCompany={this.state.selectedCompany}
                    selectedBranch={this.state.selectedBranch}
                    selectedState={this.state.selectedState}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    inputChange={this.handleInputChange}
                    handleSearch={this.handleSearch} />
                <br/>
                <ContractListTable 
                     data={this.state.result}
                     operator={this.state.operatorOptions}/>                    
            </Container>            
        );
    }
}

export default ContractListPage;