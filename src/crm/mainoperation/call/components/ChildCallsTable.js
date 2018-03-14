import React from 'react';
import { Table,Card } from 'semantic-ui-react'
import moment from 'moment'

/**
 * Компонент для рендеринга звонки
 */

export default function ChildCallsTable(props){

    //Список звонков
    const {items} = props;

    return <Card fluid>
        <Card.Content>
            <Card.Header>
                Звонки
            </Card.Header>
        </Card.Content>
        <Card.Content>
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>#</Table.HeaderCell>
                        <Table.HeaderCell>Филиал</Table.HeaderCell>
                        <Table.HeaderCell>Дата-время звонка</Table.HeaderCell>
                        <Table.HeaderCell>Звонил(а)</Table.HeaderCell>
                        <Table.HeaderCell>Номер</Table.HeaderCell>
                        <Table.HeaderCell>Результат</Table.HeaderCell>
                        <Table.HeaderCell>Примечание</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {items.map((item,idx) => {
                        return <Table.Row key={idx}>
                            <Table.Cell>{idx+1}</Table.Cell>
                            <Table.Cell>{item.branchName}</Table.Cell>
                            <Table.Cell>{item.callDate?moment(item.callDate).format('DD.MM.YYYY HH:mm'):''}</Table.Cell>
                            <Table.Cell>{item.callerName}</Table.Cell>
                            <Table.Cell>{item.phoneNumber}</Table.Cell>
                            <Table.Cell>{item.callResultName}</Table.Cell>
                            <Table.Cell>{item.callNote}</Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table>
        </Card.Content>
    </Card>
}