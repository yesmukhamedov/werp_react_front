import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/ContractListAction';
import {Container,  Dimmer, Loader} from 'semantic-ui-react';
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
        this.props.getDirectories();
        //this.setState({ ...this.state, result: makeData() });
    }

    componentWillUnmount() {
        this.props.clearContractListStore()
    }

    handleInputChange(value, dataType) { 
        //console.log(dataType, value) 
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
        if(this.props.directories){
            return (
                <Container fluid style = {{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em' }}>
                    <ContractListSearch 
                        companyOpts={this.props.directories.companyOptions}
                        branchOpts={this.props.directories.branchOptions}
                        stateOpts={this.props.directories.stateOptions}
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
                        operator={this.props.directories.operatorOptions}/>                    
                </Container>            
            );
        }
        return (
            <Dimmer active>
                <Loader indeterminate>Fetching directories...</Loader>
            </Dimmer>
        )
    }
}

function mapStateToProps(state) {
    return {
        directories: state.contractList.directories
    };
}

export default connect(mapStateToProps, actions) (ContractListPage);