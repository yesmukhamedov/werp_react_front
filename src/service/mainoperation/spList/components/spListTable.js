import React, {Component} from "react"
import ReactTable from "react-table"
import "react-table/react-table.css"
import {Link} from 'react-router'
import moment from 'moment'
import {Checkbox, Icon} from 'semantic-ui-react'

class SpListTable extends Component {
    render() {
        const columns = [
            {
                Header: "#",
                accessor: "timestamp",
                Cell: props => {
                    const {index} = props;
                    return <div>{index+1}</div> 
                },
                maxWidth: 60            
            },
            {
                Header: "Название",
                accessor: "name",
                Cell: props => {
                    const {id, name} = props.original
                    return <div>{id} - {name}</div>
                }                
            },
            {
                Header: "Компания",
                accessor: "companyName",
                maxWidth: 260
            },
            {
                Header: "Страна",
                accessor: "countryName",
                maxWidth: 100
            },
            {
                Header: "Дата начала",
                accessor: "startDate",
                Cell: props => {
                    const {startDate} = props.original;
                    return moment(startDate).format('LL')
                },
                maxWidth: 160
            },
            {
                Header: "Категория",
                accessor: "productCategory",
                maxWidth: 260
            },
            {
                Header: "Товар/МодельВремя",
                accessor: "productName",
                maxWidth: 260
            },
            {
                Header: "Статус",
                accessor: 'active',
                Cell: props => {
                        console.log(props, props); 
                        const {id, active} = props.original;
                        return <Checkbox 
                                    slider 
                                    checked={active} 
                                    onClick={() => this.props.handleActivate(id, active)}/> 
                }, 
                maxWidth: 60
            },
            {
                Header: "Просмотр",
                accessor: '',
                Cell: props => {                        
                        const {id} = props.original;
                        return (<div style={{textAlign: 'center'}}><Link target="_blank" to={`/service/packets/spview/${id}`}>
                                    <Icon name='eye' size='large'/>
                                </Link></div>)
                }, 
                maxWidth: 120
            }
        ]
        return (<ReactTable
                    loading={this.props.loading}   
                    data={this.props.data}
                    columns={columns}
                    pageSizeOptions={[10, 20, 50, 100]}
                    defaultPageSize={20}             
                    previousText="Предыдущий"
                    nextText="Следующий"
                    loadingText="Загружается..."
                    noDataText="Нет записей"
                    pageText="Страница"
                    ofText="из"
                    rowsText="записей"
                    className="-striped -highlight" />);
    }
}

export default SpListTable
