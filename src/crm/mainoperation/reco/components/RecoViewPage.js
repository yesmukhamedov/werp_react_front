import React, {Component} from 'react';
import {Link} from 'react-router'
import ReactTable from 'react-table';
import { Tab,Header,Container,Label,Icon,Button,Segment } from 'semantic-ui-react'
import axios from 'axios';
import {ROOT_URL} from '../../../../utils/constants';
import Phone from './Phone';

class RecoViewPage extends Component{

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentWillMount(){
        axios.get(`${ROOT_URL}/api/crm/reco/` + this.props.params.id,{
            headers: {
                authorization: localStorage.getItem('token')}
        }).then((res) => {
            this.setState({
                ...this.state,
                usedItems:res.data
            })
        }).catch((e) => {
            console.log(e);
        })
    }

    render(){
        return <Header />;
    }
}

export default RecoViewPage;