import React, { Component } from 'react'
import { Button, Header, Icon, Modal, Form, Input, Table } from 'semantic-ui-react'
import ReactTable from "react-table"
import _ from 'lodash'
import "react-table/react-table.css"
import "../css/test.css"

export default class ReferenceModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedItem: undefined,
            selectedIdx: undefined,
            results: [], 
            codeValue: '',
            titleValue: ''
        }

        this.clearState = this.clearState.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({...this.state, results: nextProps.data});
    }

    clearState() {
        this.setState({
            selectedItem: undefined,
            selectedIdx: -1,
            codeValue: '',
            titleValue: ''
        }, this.props.close)
        console.log("clearState");
        // this.props.close();
    }

    handleSearchChange = (e, { value }, type) => {
        switch(type) {
            case "code":
                this.setState({...this.state, codeValue: value});
                break;
            case "title":
                this.setState({...this.state, titleValue: value});
                break;
            default:
                throw new Error("Impossible branch")    
        }    
        
        setTimeout(() => {
            // filter by code
            const reCode = new RegExp(_.escapeRegExp(this.state.codeValue), 'i');
            const codeMatch = result => reCode.test(result.code);
            let filteredByCode = _.filter(this.props.data, codeMatch)

            // filter by title
            const reTitle = new RegExp(_.escapeRegExp(this.state.titleValue), 'i');
            const titleMatch = result => reTitle.test(result.name);
            let filtedByCodeAndTitle = _.filter(filteredByCode, titleMatch)

            this.setState({
                ...this.state,
                results: filtedByCodeAndTitle,
                selectedRow: undefined,
                selectedItem: undefined
            })
        }, 500)
    };

    render() {
        return (
            <Modal open={this.props.visible}>
                <Header icon='filter' content='Материалы' />
                <Modal.Content>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field 
                                control={Input} 
                                label='Код' 
                                placeholder='код' 
                                size="mini" 
                                value={this.state.codeValue}
                                onChange={(e, val) => this.handleSearchChange(e, val, "code")} />
                            <Form.Field 
                                control={Input} 
                                label='Название' 
                                placeholder='название' 
                                size="mini" 
                                onChange={(e, val) => this.handleSearchChange(e, val, "title")} />
                        </Form.Group>
                    </Form>
                    <ReactTable
                        className="-striped -highlight" 
                        data={this.state.results}
                        columns={columns} 
                        showPagination={false}             
                        noDataText="Нет записей"
                        style={{
                            height: "400px"
                        }} 
                        
                        getTrProps={(state, rowInfo , column) => {
                            return {
                                
                                style: {
                                   background: (rowInfo == undefined ? '' : this.state.selectedIdx === rowInfo.index ? 'lightgreen' : '')
                                },
                                onClick: (e, handleOriginal) => {
                                    console.log('A Td Element was clicked!')
                                    console.log('it produced this event:', e)
                                    console.log('It was in this column:', column)
                                    console.log('It was in this row:', rowInfo)
                                    
                                    let { index, original } = rowInfo
                                

                                    // IMPORTANT! React-Table uses onClick internally to trigger
                                    // events like expanding SubComponents and pivots.
                                    // By default a custom 'onClick' handler will override this functionality.
                                    // If you want to fire the original onClick handler, call the
                                    // 'handleOriginal' function.
                                    this.setState({...this.state, selectedIdx: index, selectedItem: original})
                                }
                           }
                        }}  
                        /> 
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red' onClick={this.clearState}>
                        <Icon name='cancel' /> Отменить
                    </Button>
                    <Button color='green' onClick={() => this.props.select(this.state.selectedItem)}>
                        <Icon name='checkmark' /> Выбрать
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

const columns = [
    {
        Header: "Код",
            accessor: "code"
    }, {
        Header: "Цена",
        accessor: "price",
    }, {
        Header: "Название",
        accessor: "name",
    }, {
        Header: "Валюта",
        accessor: "currency",
    }
]