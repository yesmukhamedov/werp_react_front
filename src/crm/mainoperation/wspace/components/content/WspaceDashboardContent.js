import React from 'react'
import _ from 'lodash'
import { Table } from 'semantic-ui-react'
//import {formatDMYMS} from '../../../../../utils/helpers'
import WspaceDemoTable from '../WspaceDemoTable'
import {Link} from 'react-router-dom'
import ReactTable from 'react-table';
import "react-table/react-table.css";

export default function WspaceDashboardContent(props){
    const {items,contentName} = props
    if(!items){
        return (null)
    }

    if(contentName === 'calls'){
        return renderCallsTable(items)
    }else if(contentName === 'demos'){
        return <WspaceDemoTable items={items}/>
    }

    return (null)
}

function renderCallsTable (items){
    const columns = [
        {
            Header: 'Дата-время звонка',
            accessor: 'dateTimeStr',
            maxWidth: 150
        },
        {
            Header: 'Номер',
            accessor: 'phoneNumber'
        },
        {
            Header: 'Результат',
            accessor: 'resultName'
        },
        {
            Header: 'Примечание',
            accessor: 'note'
        },
        {
            Header: 'Ссылка',
            id: 'recoId',
            accessor: (row) => <Link
                target={'_blank'}
                className={'ui icon button mini'}
                to={`/crm/reco/view/` + row.contextId}>
                Просмотр рек.
            </Link>,
            Footer: (
                <span>
                    <strong>Всего:</strong>{' '}{_.size(items)}
                </span>
            )
        }
    ];
    return <div style={{backgroundColor:'white'}}>
            <ReactTable
                    data={items}
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
                />
        </div>
}

function renderCallsTable1(items){
    console.log(items)
    return <Table celled padded>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell singleLine>Дата-время звонка</Table.HeaderCell>
                <Table.HeaderCell>Номер</Table.HeaderCell>
                <Table.HeaderCell>Результат</Table.HeaderCell>
                <Table.HeaderCell>Примечание</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>
            {items.map((item => {
                return <Table.Row key={item.id}>
                    <Table.Cell>{item.dateTime}</Table.Cell>
                    <Table.Cell singleLine>{item.phoneNumber}</Table.Cell>
                    <Table.Cell>{item.resultName}</Table.Cell>
                    <Table.Cell textAlign='right'>{item.note}</Table.Cell>
                    <Table.Cell>
                        <Link
                            target={'_blank'}
                            className={'ui icon button mini'}
                            to={`/crm/reco/view/` + item.recoId}>
                            Просмотр рек.
                        </Link>
                    </Table.Cell>
                </Table.Row>
            }))}
        </Table.Body>
    </Table>
}