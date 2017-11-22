import React, { Component } from 'react';
import {Link} from 'react-router'
import axios from 'axios';
import {Container,Divider,Menu,Table,Icon,Header,Button} from 'semantic-ui-react';
import {ROOT_URL} from '../../../../utils/constants';

const PAGINATION_TOTAL_COUNT_KEY = 'X-Pagination-Total-Count';
const PAGINATION_CURRENT_PAGE_KEY = 'X-Pagination-Current-Page';
const PAGINATION_PER_PAGE_KEY = 'X-Pagination-Per-Page';

class StaffList extends Component{

    constructor(props){
        super(props);

        this.state = {
            items:[],
            queryParams:{
                companyId:'',
                branchId:0,
                iin:'',
                firstname:'',
                lastname:'',
                departmentId:0,
                page:0
            },
            pagination:{
                currentPage:0,

            }
        }
    }

    componentWillMount(){
        this.loadItems();
    }

    loadItems(){
        axios.get(`${ROOT_URL}/api/hr/staff`,{
            headers: {
                authorization: localStorage.getItem('token')
            },
            params:this.state.queryParams
        })
            .then((response) => {
                console.log(response.headers[PAGINATION_CURRENT_PAGE_KEY])
                console.log(response['data']);
                this.setState({
                    ...this.state,
                    items:response['data']
                })
            }).catch((error) => {
                console.log(error)
        })
    }

    redirectToView(e,staffId){
        this.props.history.pushState(null,'/hr/staff/view/' + staffId);
    }

    renderTableHeader(){
        return (
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>StaffID</Table.HeaderCell>
                    <Table.HeaderCell>Фамилия</Table.HeaderCell>
                    <Table.HeaderCell>Имя</Table.HeaderCell>
                    <Table.HeaderCell>Отчество</Table.HeaderCell>
                    <Table.HeaderCell>ИИН</Table.HeaderCell>
                    <Table.HeaderCell>Должности</Table.HeaderCell>
                    <Table.HeaderCell>Действия</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        )
    }

    renderTableBody(){
        return (
            <Table.Body>
                {this.state.items.map((item,idx) => {

                    return (
                        <Table.Row key={idx}>
                            <Table.Cell>{item.staffId}</Table.Cell>
                            <Table.Cell>{item.lastname}</Table.Cell>
                            <Table.Cell>{item.firstname}</Table.Cell>
                            <Table.Cell>{item.middlename}</Table.Cell>
                            <Table.Cell>{item.iin}</Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell>
                                <Link className={'ui icon button'} to={`/hr/staff/view/${item.staffId}`}>
                                    <Icon name='eye' large />
                                </Link>

                                <Link className={'ui icon button'} to={`/hr/staff/update/${item.staffId}`}>
                                    <Icon name='pencil' large />
                                </Link>

                            </Table.Cell>
                        </Table.Row>
                    )
                })}
            </Table.Body>
        )
    }

    renderTableFooter(){
        return (
            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan='7'>
                        <Menu floated='right' pagination>
                            <Menu.Item as='a' icon>
                                <Icon name='left chevron' />
                            </Menu.Item>
                            <Menu.Item as='a'>1</Menu.Item>
                            <Menu.Item as='a'>2</Menu.Item>
                            <Menu.Item as='a'>3</Menu.Item>
                            <Menu.Item as='a'>4</Menu.Item>
                            <Menu.Item as='a' icon>
                                <Icon name='right chevron' />
                            </Menu.Item>
                        </Menu>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        )
    }

    render(){
        return (
            <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                <Header as="h2" block>
                    Список сотрудников
                </Header>
                <Divider/>
                <Table celled striped>
                    {this.renderTableHeader()}
                    {this.renderTableBody()}
                    {this.renderTableFooter()}
                </Table>
            </Container>
        )
    }
}

export default StaffList;