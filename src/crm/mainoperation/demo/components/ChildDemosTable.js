import React from 'react';
import { Table,Card } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import moment from 'moment'

/**
 * Компонент для рендеринга дочерние демо
 */

export default function ChildDemosTable(props){

    //Список демо
    const {items} = props;

    return <Card fluid>
        <Card.Content>
            <Card.Header>
                Демонстрации
            </Card.Header>
        </Card.Content>
        <Card.Content>
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>#</Table.HeaderCell>
                        <Table.HeaderCell>Филиал</Table.HeaderCell>
                        <Table.HeaderCell>Клиент</Table.HeaderCell>
                        <Table.HeaderCell>Дата-время</Table.HeaderCell>
                        <Table.HeaderCell>Звонил(а)</Table.HeaderCell>
                        <Table.HeaderCell>Результат</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {items.map((item,idx) => {
                        return <Table.Row key={idx}>
                            <Table.Cell>{idx+1}</Table.Cell>
                            <Table.Cell>{item.branchName}</Table.Cell>
                            <Table.Cell>{item.clientName}</Table.Cell>
                            <Table.Cell>{item.dateTime?moment(item.dateTime).format('DD.MM.YYYY HH:mm'):''}</Table.Cell>
                            <Table.Cell>{item.appointer}</Table.Cell>
                            <Table.Cell>{item.resultName}</Table.Cell>
                            <Table.Cell>--</Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table>
        </Card.Content>
    </Card>
}