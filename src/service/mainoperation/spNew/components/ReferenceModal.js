import React, { Component } from 'react'
import { Button, Header, Icon, Modal, Form, Input, Table } from 'semantic-ui-react'
import ReactTable from "react-table"
import "react-table/react-table.css"

export default class ReferenceModal extends Component {
    render() {
        return (
            <Modal trigger={<Button>Show Modal</Button>} closeIcon>
                <Header icon='filter' content='Материалы' />
                <Modal.Content>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field control={Input} label='Код' placeholder='код' />
                            <Form.Field control={Input} label='Название' placeholder='название' />
                        </Form.Group>
                    </Form>
                    <ReactTable
                        data={data}
                        columns={columns}
                        pageSizeOptions={[]}
                        defaultPageSize={10}                
                        previousText="Предыдущий"
                        nextText="Следующий"
                        loadingText="Загружается..."
                        noDataText="Нет записей"
                        pageText="Страница"
                        ofText="из"
                        rowsText="записей"
                        style={{
                            height: "400px"
                        }}
                        className="-striped -highlight" 
                        />
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red'>
                        <Icon name='cancel' /> Отменить
                    </Button>
                    <Button color='green'>
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
        accessor: "title",
    }, {
        Header: "Валюта",
        accessor: "currency",
    }
]


const data = [{
    code: "",
    price: "price",
    title: "title",
    currency: "currency"
}]