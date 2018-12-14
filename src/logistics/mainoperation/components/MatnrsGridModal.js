import React from 'react'
import { Modal, Button, Grid,Form } from 'semantic-ui-react'
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const MatnrsGridModal = (props) => {
    return <Modal open={props.open}>
        <Modal.Header>Выберите материал</Modal.Header>
        <Modal.Content>
            <Grid celled>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Form>
                            <Form.Field>
                                <label>Код</label>
                                <input name="code" onChange={props.handleChange} placeholder='Code' />
                            </Form.Field>
                            <Form.Field>
                                <label>Наименование товара</label>
                                <input name="text45" onChange={props.handleChange} placeholder='Name...' />
                            </Form.Field>
                            <Button onClick={props.searchData} type='submit'>Search</Button>
                        </Form>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        {renderItemsTable(props)}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Modal.Content>
        <Modal.Actions>
            <Button negative onClick={props.cancel}>Отмена</Button>
            <Button positive onClick={props.handleSelected} icon='checkmark' labelPosition='right' content='Ок' />
        </Modal.Actions>
    </Modal>
}

const renderItemsTable = (props) => {
    const columns = [
        {
            Header: 'Наименование товара',
            accessor: 'text45'
        },
        {
            Header: 'Code',
            accessor: 'code'
        }
    ];
    const {messages} = props
    return <ReactTable
        loading={props.matnrsLoading}
        data={props.matnrs || []}
        columns={columns}
        pageSizeOptions={[15, 30, 50]}
        defaultPageSize={15}
        previousText={props.formatMessage(messages.previousText)}
        nextText={props.formatMessage(messages.nextText)}
        loadingText={props.formatMessage(messages.loadingText)}
        noDataText={props.formatMessage(messages.noDataText)}
        pageText={props.formatMessage(messages.pageText)}
        ofText={props.formatMessage(messages.ofText)}
        rowsText={props.formatMessage(messages.rowsText)}
        className="-highlight"
        getTrProps={(state, rowInfo) => ({
            onClick: () => props.onRowClick(rowInfo),
            style: {
                background: (rowInfo === undefined ? '' : (props.selectedIdx === rowInfo.index ? 'rgba(241,250,229, 1)' : '')),
                cursor: 'pointer'
            },
        })}
        getTheadProps={() => ({
            style: {
                background: 'rgba(227,232,238, 1)'
            },
        })}
    />
}

export default MatnrsGridModal;