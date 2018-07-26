import React from 'react'
import {Segment,Label, Table } from 'semantic-ui-react'

export default function HrDocLog (props) {
    return <Segment raised>
        <Label color="blue" ribbon>
            Журнал действии
        </Label>
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>№</Table.HeaderCell>
                    <Table.HeaderCell>ФИО</Table.HeaderCell>
                    <Table.HeaderCell>Дата/время</Table.HeaderCell>
                    <Table.HeaderCell>Действие</Table.HeaderCell>
                    <Table.HeaderCell>Коментарии</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>АЯПОВ БАХТИЯР</Table.Cell>
                    <Table.Cell>26.07.2018 15:58</Table.Cell>
                    <Table.Cell>Просмотр</Table.Cell>
                    <Table.Cell></Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    </Segment>
}