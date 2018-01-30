import React, { Component } from 'react';
import {Link} from 'react-router'
import axios from 'axios';
import {Container,Grid,Form,Checkbox,Dropdown,Table,Header,Button} from 'semantic-ui-react';
import {ROOT_URL} from '../../../utils/constants';

class AccountabilityStaffListPage extends Component{

    constructor(props){
        super(props);

        this.state = {
            bukrsOptions:[],
            branchOptions:[],
            items:[],
            selectedBukrs:'',
            limitChecked:false,
            selectedBranches:[],
            errors:{
                bukrsHasError:false
            },
            loading:false
        }

        this.loadItems = this.loadItems.bind(this);
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
                    bukrsOptions:loadedCompanies
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
                    branchOptions:loadedBranches
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
                    selectedBukrs:value,
                    errors:{bukrsHasError:false}
                })

                this.loadBranches(value);
                break

            case 'branch':
                this.setState({
                    ...this.state,
                    selectedBranches:value
                })

                break

            case 'limit':
                let tempCheched = this.state.limitChecked;
                this.setState({
                    ...this.state,
                    limitChecked:!tempCheched
                })
                break
            default:
                break;
        }
    }

    loadItems(){
        if(!this.state.selectedBukrs || this.state.selectedBukrs.length === 0){
            this.setState({
                ...this.state,
                errors:{bukrsHasError:true}
            })

            return;
        }
        this.setState({
            ...this.state,
            loading:true
        })
        axios.get(`${ROOT_URL}/api/logistics/report/accountability-staff`,{
            headers: {
                authorization: localStorage.getItem('token')
            },
            params:{
                bukrs:this.state.selectedBukrs,
                branchIds:this.state.selectedBranches.join(),
                limit:this.state.limitChecked?1:0
            }
        })
            .then((response) => {
                this.setState({
                    ...this.state,
                    items:response.data,
                    loading:false
                })
            }).catch((error) => {
            console.log(error)
            this.setState({
                ...this.state,
                loading:false
            })
        })
    }

    renderSearchForm(){
        return (
            <Form>
                <Form.Field>
                    <label>Компания</label>
                    <Dropdown error={this.state.errors.bukrsHasError} placeholder='Компания' fluid selection options={this.state.bukrsOptions}  onChange={(e, { value }) => this.handleDropdownChange('company',value)}  />
                </Form.Field>
                <Form.Field>
                    <label>Филиал</label>
                    <Dropdown placeholder='Филиал' fluid multiple search selection options={this.state.branchOptions}  onChange={(e, { value }) => this.handleDropdownChange('branch',value)}   />
                </Form.Field>
                <Form.Field>
                    <Checkbox label='Лимит' checked={this.state.limitChecked} onChange={(e) => this.handleDropdownChange('limit','')}  />
                </Form.Field>
                <Button onClick={this.loadItems} loading={this.state.loading}>Сформировать</Button>
            </Form>
        )
    }

    renderData(){
        return (
            <Table celled striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>StaffID</Table.HeaderCell>
                    <Table.HeaderCell>Фамилия</Table.HeaderCell>
                    <Table.HeaderCell>Имя</Table.HeaderCell>
                    <Table.HeaderCell>Отчество</Table.HeaderCell>
                    <Table.HeaderCell>Филиал</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
            {this.state.items.map((item,idx) => {
                return (
                    <Table.Row key={item.staffId}>
                        <Table.Cell>{item.staffId}</Table.Cell>
                        <Table.Cell>{item.lastname}</Table.Cell>
                        <Table.Cell>{item.firstname}</Table.Cell>
                        <Table.Cell>{item.middlename}</Table.Cell>
                        <Table.Cell>{item.branchName}</Table.Cell>
                        <Table.Cell>
                            <Link target="_blank" className={'ui icon button'} to={`/logistics/report/accountability-staff/${item.staffId}`}>
                                Детально
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
                <Header as="h2" block>
                    Отчет о подочетных сотрудниках
                </Header>
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