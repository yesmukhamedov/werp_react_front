import React from 'react';
import { Table } from 'semantic-ui-react'

/**
 * Список OffData
 */

export default function StaffOffDataTable(props){

    const {offData} = props

    let tempContent = offData.map(d => {
        return (
            <Table.Row key={d.id}>
                <Table.Cell>{d.subCompanyName}</Table.Cell>
                <Table.Cell>{d.position}</Table.Cell>
                <Table.Cell>{d.salary}</Table.Cell>
                <Table.Cell>{d.pension}</Table.Cell>
                <Table.Cell>{d.ipn}</Table.Cell>
                <Table.Cell>{d.note}</Table.Cell>
                <Table.Cell></Table.Cell>
            </Table.Row>
        )
    })
    return <Table celled>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Фирма</Table.HeaderCell>
                <Table.HeaderCell>Должность</Table.HeaderCell>
                <Table.HeaderCell>Оклад</Table.HeaderCell>
                <Table.HeaderCell>ОПВ</Table.HeaderCell>
                <Table.HeaderCell>ИПН</Table.HeaderCell>
                <Table.HeaderCell>Примечание</Table.HeaderCell>
                <Table.HeaderCell>Действия</Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>{tempContent}</Table.Body>
    </Table>
}