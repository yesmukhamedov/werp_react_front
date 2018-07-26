import React from 'react'
import {Segment,Label, Table } from 'semantic-ui-react'

export default function HrDocApprovers (props) {
    return <Segment raised>
        <Label color="blue" ribbon>
            Согласующие
        </Label>
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>№</Table.HeaderCell>
                    <Table.HeaderCell>ФИО</Table.HeaderCell>
                    <Table.HeaderCell>Должность</Table.HeaderCell>
                    <Table.HeaderCell>Действие</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>БАУЫРЖАНОВ БАКЫТЖАН</Table.Cell>
                    <Table.Cell>Отдела маркетинга</Table.Cell>
                    <Table.Cell>Стажер-дилер</Table.Cell>
                    <Table.Cell>
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    </Segment>
}