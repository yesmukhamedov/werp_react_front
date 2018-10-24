import React, { Component } from 'react'; 
import {Link} from 'react-router-dom';
import { Form, Button, Input, Container, Modal, Header,Icon } from 'semantic-ui-react';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import matchSorter from 'match-sorter';
import ListTableUpdate from './listTableUpdate';

class ListTable extends Component{

    constructor(props){
        super(props);
        this.state = {
            modalOpen: false,
        } 
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose(){
        this.setState({ modalOpen: false })
        console.log("handle close", this.state.modalOpen);
    }

    updateRow(tr){
        console.log("tr::: ", tr)
        this.setState({ modalOpen: true, transaction:tr,})
    }

    render() {
        const props = this.props;
        const columns = [
            {
                Header: 'ID',
                id: 'transaction_id',
                accessor: d=> d.transaction_id,
                width:100,
                maxWidth: 200,
                minWidth:100
            },
            {
                Header: 'Tr Code',
                accessor: 'transaction_code',
                filterMethod: (filter, rows) => matchSorter(rows, filter.value, {keys: ["transaction_code"]}),
                filterAll: true
            },
            {
                Header: 'Название (рус)',
                accessor: 'name_ru',
                filterMethod: (filter, rows) => matchSorter(rows, filter.value, {keys: ["name_ru"]}),
                filterAll: true
            },
            {
                Header: 'Название (En)',
                accessor: 'name_en',
                filterMethod: (filter, rows) => matchSorter(rows, filter.value, {keys: ["name_en"]}),
                filterAll: true
            },
            {
                Header: 'Название (Tr)',
                accessor: 'name_tr',
                filterMethod: (filter, rows) => matchSorter(rows, filter.value, {keys: ["name_tr"]}),
                filterAll: true
                
            },
            {
                Header: 'Действия',
                Cell: props => {
                    return( <Button floated='left' onClick={this.updateRow.bind(this, props.original)} ><Icon name='edit' />Изменить</Button>
                       // <Button floated='left' onClick={this.updateRow.bind(this, props.original.transaction_id)}><Icon name='edit' />Изменить</Button>
                    )
                },
                width:150,
                maxWidth: 200,
                minWidth:100,
                sortable:false,
                filterable:false
           }
        ]
        return(
            <div>
                <div id="table_style">
                    <div className="list_table_header"></div>
                    <div>
                        
                        <ReactTable 
                            columns={columns}
                            data={props.transactions.currentTransactions}
                            resolveData={data => data.map(row => row)}

                            filterable

                            rowsText={'строк'}
                            pageText={'Страница'}
                            ofText={'из'}

                            previousText={'Пред.'}
                            nextText={'След.'}
                            noDataText={"Пожалуйста подождите загружаеться данные..."}
                        />
                        {
                            <Modal size='fullscreen' 
                                open={this.state.modalOpen}
                                onClose={this.handleClose}
                            >
                                <Modal.Header>Изменение транзакции</Modal.Header>
                                <Modal.Content>
                                    <ListTableUpdate props={this.state.transaction} newTransaction={this.props.newTransaction}
                                        handleClose={this.handleClose}
                                    />
                                </Modal.Content>
                            </Modal>
                        }
                    </div>
                </div>   
            </div>
        )
    }
}

export default ListTable;
 /*                     
        <Link className={'ui icon button mini'} to={`/dit/transaction/update/` + value}>
        Изменить
    </Link>
*/