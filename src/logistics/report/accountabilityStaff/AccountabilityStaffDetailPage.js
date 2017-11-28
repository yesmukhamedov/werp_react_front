import React, { Component } from 'react';
import {Link} from 'react-router'
import axios from 'axios';
import {Container,Grid,Table,Header} from 'semantic-ui-react';
import {ROOT_URL} from '../../../utils/constants';

class AccountabilityStaffDetailPage extends Component{

    constructor(props){
        super(props);

        this.state = {
            staff:{
                firstname:'',
                lastname:'',
                middlename:''
            },
            salaries:[],
            items:[]
        }
    }

    componentWillMount(){
        axios.get(`${ROOT_URL}//api/hr/staff/` +  + this.props.params.id,{
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then((response) => {
            this.setState({
                ...this.state,
                staff:response.data
            })
        }).catch((err) => {
            console.log(err);
        })

        axios.get(`${ROOT_URL}//api/hr/staff/` +  + this.props.params.id + '/salaries/current',{
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then((response) => {
            this.setState({
                ...this.state,
                salaries:response.data
            })
        }).catch((err) => {
            console.log(err);
        })

        axios.get(`${ROOT_URL}/api/logistics/report/accountability-staff/` + this.props.params.id,{
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then((response) => {
                this.setState({
                    ...this.state,
                    items:response.data
                })
            }).catch((error) => {
            console.log(error)
        })
    }

    renderStaffData(){
        let stf = this.state.staff;
        let salaries = this.state.salaries;
        return (
            <Table celled striped>
                <Table.Body>
                    <Table.Row>
                        <Table.HeaderCell textAlign={'right'}>StaffID</Table.HeaderCell>
                        <Table.Cell>{stf.staff_id}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell textAlign={'right'}>Фамилия</Table.HeaderCell>
                        <Table.Cell>{stf.lastname}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell textAlign={'right'}>Имя</Table.HeaderCell>
                        <Table.Cell>{stf.firstname}</Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.HeaderCell textAlign={'right'}>Отчество</Table.HeaderCell>
                        <Table.Cell>{stf.middlename}</Table.Cell>
                    </Table.Row>

                    <Table.Row>
                        <Table.HeaderCell textAlign={'right'}>Должности</Table.HeaderCell>
                        <Table.Cell>{
                            salaries.map((sal) => {
                                return <p>{sal.positionName} ({sal.branchName})</p>;
                            })
                        }</Table.Cell>
                    </Table.Row>

                </Table.Body>
            </Table>
        )
    }

    renderBarcode(b){
        return (
            <div key={b} style={'display:block;'}>{b}</div>
        )
    }

    renderSalaryData(){
        let salaries = this.state.salaries;
        return (
            <Table celled striped>
                <Table.Body>
                    {salaries.map((sal) => {
                        return (
                            <Table.Row key={sal.salaryId}>
                                <Table.Cell>{sal.bukrsName}</Table.Cell>
                                <Table.Cell>{sal.branchName}</Table.Cell>
                                <Table.Cell>{sal.positionName}</Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        )
    }

    renderData(){
        return (
            <Table celled striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Склад</Table.HeaderCell>
                    <Table.HeaderCell>Материал</Table.HeaderCell>
                    <Table.HeaderCell>Код</Table.HeaderCell>
                    <Table.HeaderCell>Зав. номер</Table.HeaderCell>
                    <Table.HeaderCell>Количество</Table.HeaderCell>
                    <Table.HeaderCell>Лимит</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
            {this.state.items.map((item,idx) => {
                return (
                    <Table.Row key={item.matnrId} negative={item.qty > item.limit}>
                        <Table.Cell>{item.werksName}</Table.Cell>
                        <Table.Cell>{item.matnrName}</Table.Cell>
                        <Table.Cell>{item.matnrCode}</Table.Cell>
                        <Table.Cell>{
                            item.barcodes.map((brcode) => {
                                return <p>{brcode}</p>
                            })
                        }</Table.Cell>
                        <Table.Cell>{item.qty}</Table.Cell>
                        <Table.Cell>{item.limit}</Table.Cell>
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
                    Материалы в подотчете у сотрудника
                </Header>
                <Grid columns={2} divided>
                    <Grid.Row stretched columns={2}>
                        <Grid.Column computer={6}>
                            {this.renderStaffData()}
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

export default AccountabilityStaffDetailPage;