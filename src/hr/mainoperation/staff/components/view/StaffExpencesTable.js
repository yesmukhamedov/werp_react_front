import React from 'react';
import { Table } from 'semantic-ui-react'

/**
 * Список Expences
 */

export default function StaffExpencesTable(props){

    const {expences} = props

    let tempContent = expences.map(exp => {
        return (
            <Table.Row key={exp.id}>
                <Table.Cell>{exp.id}</Table.Cell>
                <Table.Cell>{exp.typeName}</Table.Cell>
                <Table.Cell>{exp.amount}</Table.Cell>
                <Table.Cell>{exp.currency}</Table.Cell>
                <Table.Cell>{exp.description}</Table.Cell>
                <Table.Cell>{exp.expenseDate}</Table.Cell>
                <Table.Cell>

                </Table.Cell>
            </Table.Row>
        )
    })
    return <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Тип расхода</Table.HeaderCell>
                    <Table.HeaderCell>Сумма</Table.HeaderCell>
                    <Table.HeaderCell>Валюта</Table.HeaderCell>
                    <Table.HeaderCell>Примечание</Table.HeaderCell>
                    <Table.HeaderCell>Дата</Table.HeaderCell>
                    <Table.HeaderCell>Действия</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>{tempContent}</Table.Body>
        </Table>
}