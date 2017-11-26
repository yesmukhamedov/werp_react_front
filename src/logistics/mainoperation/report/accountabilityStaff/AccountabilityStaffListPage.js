import React, { Component } from 'react';
import {Link} from 'react-router'
import axios from 'axios';
import {Container,Segment,Grid,Form,Checkbox,Dropdown,Divider,Menu,Table,Icon,Header,Button} from 'semantic-ui-react';
import {ROOT_URL} from '../../../../utils/constants';

class AccountabilityStaffListPage extends Component{

    constructor(props){
        super(props);

        this.state = {
            companies:[],
            branches:[],
            items:[],
            selectedCompany:'',
            selectedBranch:0
        }
    }

    componentWillMount(){
        axios.get(`${ROOT_URL}/api/reference/companies`,{
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then((response) => {
                let loadedCompanies = response.data.map(item => {
                    return {
                        key: item.id,
                        text: item.name,
                        value: item.id
                    }
                })
                this.setState({
                    ...this.state,
                    companies:loadedCompanies
                })
            }).catch((error) => {
            console.log(error)
        })
    }

    loadBranches(bukrs){
        axios.get(`${ROOT_URL}/api/reference/branches/` + bukrs,{
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then((response) => {
                let loadedBranches = response.data.map(item => {
                    return {
                        key: item.branch_id,
                        text: item.text45,
                        value: item.branch_id
                    }
                })
                this.setState({
                    ...this.state,
                    branches:loadedBranches
                })
            }).catch((error) => {
            console.log(error)
        })
    }

    handleDropdownChange(fieldName,value){
        switch (fieldName){
            case 'company':
                this.setState({
                    ...this.state,
                    selectedCompany:value
                })

                this.loadBranches(value);
                break

            case 'branch':
                this.setState({
                    ...this.state,
                    selectedBranch:value
                })

                break
        }
    }

    loadItems(){
        axios.get(`${ROOT_URL}/api/logistics/report/accountability-staff`,{
            headers: {
                authorization: localStorage.getItem('token')
            },
            params:{
            }
        })
            .then((response) => {
                let loadedBranches = response.data.map(item => {
                    return {
                        key: item.branch_id,
                        text: item.text45,
                        value: item.branch_id
                    }
                })
                this.setState({
                    ...this.state,
                    branches:loadedBranches
                })
            }).catch((error) => {
            console.log(error)
        })
    }

    renderSearchForm(){
        return (
            <Form>
                <Form.Field>
                    <label>Компания</label>
                    <Dropdown placeholder='Компания' fluid selection options={this.state.companies}  onChange={(e, { value }) => this.handleDropdownChange('company',value)}  />
                </Form.Field>
                <Form.Field>
                    <label>Филиал</label>
                    <Dropdown placeholder='Филиал' fluid selection options={this.state.branches}  onChange={(e, { value }) => this.handleDropdownChange('branch',value)}   />
                </Form.Field>
                <Form.Field>
                    <Checkbox label='Лимит' />
                </Form.Field>
                <Button onClick={this.loadItems}>Submit</Button>
            </Form>
        )
    }

    renderData(){
        return (
            <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>StaffID</Table.HeaderCell>
                    <Table.HeaderCell>ФИО</Table.HeaderCell>
                    <Table.HeaderCell>Филиал</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
            {this.state.items.map((item,idx) => {
                return (
                    <Table.Row key={item.staff_id}>
                        <Table.Cell>{item.staff_id}</Table.Cell>
                        <Table.Cell>{item.fullname}</Table.Cell>
                        <Table.Cell>{item.branchName}</Table.Cell>
                        <Table.Cell>
                            <Link className={'ui icon button'} to={`/hr/staff/view/${item.staff_id}`}>
                                <Icon name='eye' large />
                            </Link>
                        </Table.Cell>
                    </Table.Row>
                )
            })}
        </Table.Body>
            </Table>
        )
    }

    render(){
        return (
            <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                <Grid columns={2} divided>
                    <Grid.Row stretched columns={2}>
                        <Grid.Column computer={4} >
                            {this.renderSearchForm()}
                        </Grid.Column>
                        <Grid.Column  computer={10}>
                            {this.renderData()}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

export default AccountabilityStaffListPage;