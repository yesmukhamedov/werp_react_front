import React, {Component} from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import {Link} from 'react-router';
import moment from 'moment';
import {Checkbox, Icon} from 'semantic-ui-react';

class ContractListTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedIdx: undefined
        }
        this.handleAttributeChange = this.handleAttributeChange.bind(this)
    }

    handleAttributeChange(field, value) {
        console.log("FIELD", field, "VALUE", value)
    }

    render() {
        const options = this.props.operator.map((el, idx) => {
            return (
                <option value={el.text} key={idx}>
                    {el.text}
                </option>
            )                    
        })
        const columns = [        
            {
                Header: "SN договор",
                accessor: "SNcontract",
                maxWidth: 100,
                filterable:true       
            },            
            {
                Header: "Дата договора",
                accessor: "contractDate",
                Cell: props => {
                    const {contractDate} = props.original;
                    return moment(contractDate).format('DD.MM.YYYY')
                },
                maxWidth: 160
            }, 
            {
                Header: "ФИО",
                accessor: "fio",
                maxWidth: 260 
            },
            {
                Header: "Филиал",
                accessor: "branch",
                maxWidth: 160
            },
            {
                Header: "Продукт",
                accessor: "product",
                maxWidth: 160
            },
            {
                Header: "ФИО Диллера",
                accessor: "dealer",
                maxWidth: 160
            },
            {
                Header: "Состояние",
                accessor: "state",
                maxWidth: 160
            },
            {
                Header: "Последнее примечание",
                accessor: "lastNote",
                maxWidth: 160
            },
            {
                Header: "Обновлено",
                accessor: "updated",
                Cell: props => {
                    const {updated} = props.original;
                    return moment(updated).format('DD.MM.YYYY, hh:mm:ss')
                },
                maxWidth: 160
            },
            {
                Header: "Оператор",
                accessor: "operator",
                id:"opr",
                filterable:true,
                filterMethod: (filter, row) => {
                    if (filter.value === "0") {
                        return true;
                    }
                    return String(row[filter.id]) === filter.value
                },
                Filter: ({ filter, onChange }) =>
                        <select
                            onChange={event => onChange(event.target.value)}
                            style={{ width: "100%" }}
                            value={filter ? filter.value : "0"}
                        >
                            <option value="0">Show All</option>
                            {options}
                        </select>
            },
            {
                
                Cell: props => {                        
                        const {SNcontract} = props.original;
                        return (<div style={{textAlign: 'center'}}><Link target="_blank" to={`/newIssuePage/${SNcontract}`}>
                                    <Icon name='eye' size='large'/>
                                </Link></div>)
                }, 
                maxWidth: 60
            }
        ]        
        return (<ReactTable
                    loading={this.props.loading}   
                    data={this.props.data}
                    columns={columns}
                    pageSizeOptions={[10, 20, 30, 50]}
                    defaultPageSize={10}             
                    previousText="Предыдущий"
                    nextText="Следующий"
                    loadingText="Загружается..."
                    noDataText="Нет записей"
                    pageText="Страница"
                    ofText="из"
                    rowsText="записей"
                    className="-striped -highlight"
                    getTrProps={(state, rowInfo , column) => {
                        return {                            
                            onClick: (e, handleOriginal) => {
                                // console.log('A Td Element was clicked!')
                                // console.log('it produced this event:', e)
                                // console.log('It was in this column:', column)
                                // console.log('It was in this row:', rowInfo)
                                
                                //let { index, original } = rowInfo

                                // IMPORTANT! React-Table uses onClick internally to trigger
                                // events like expanding SubComponents and pivots.
                                // By default a custom 'onClick' handler will override this functionality.
                                // If you want to fire the original onClick handler, call the
                                // 'handleOriginal' function.
                                this.setState({...this.state, selectedIdx: rowInfo.index})
                            },
                            style: {
                                background: (rowInfo === undefined ? '' :
                                 (this.state.selectedIdx === rowInfo.index ? 'rgba(169, 221, 236, 1)' : ""))
                            }
                       }
                    }} />);
    }
}

export default ContractListTable
