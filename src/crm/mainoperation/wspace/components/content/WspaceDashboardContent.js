import React from 'react'
import { Card,Table,Header } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import ReactTable from 'react-table';
import "react-table/react-table.css";

export default function WspaceDashboardContent(props){
    const {items} = props
    if(!items){
        return (null)
    }

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
            <Table.Row>
                <Table.Cell>29.04.2018 21:55</Table.Cell>
                <Table.Cell singleLine>705 224 26 45</Table.Cell>
                <Table.Cell>Демо</Table.Cell>
                <Table.Cell textAlign='right'></Table.Cell>
                <Table.Cell>
                    <Link
                        target={'_blank'}
                        className={'ui icon button mini'}
                        to={`/crm/reco/view/1`}>
                        Просмотр рек.
                    </Link>
                </Table.Cell>
            </Table.Row>
        </Table.Body>
    </Table>
}