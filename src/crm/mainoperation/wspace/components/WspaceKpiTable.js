import React from 'react'
import { Table } from 'semantic-ui-react'

export default function WspaceKpiTable(props){
    const {kpiData} = props
    console.log('Hello',kpiData)
    if(!kpiData){
        return <h3>Нет данныхs!</h3>
    }

    let items = Object.assign([],kpiData.items)

    return <Table celled padded>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell singleLine>ФИО</Table.HeaderCell>
                <Table.HeaderCell>Категория</Table.HeaderCell>
                <Table.HeaderCell>Балл за звонок</Table.HeaderCell>
                <Table.HeaderCell>Количество звонков</Table.HeaderCell>
                <Table.HeaderCell>Набранный балл ({kpiData.totalScore})</Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>
            {items.map((item => {
                return <Table.Row key={item.indicatorId}>
                    <Table.Cell>{kpiData.staffName}</Table.Cell>
                    <Table.Cell>{item.indicatorName}</Table.Cell>
                    <Table.Cell>{item.point}</Table.Cell>
                    <Table.Cell>{item.doneValue}</Table.Cell>
                    <Table.Cell>{item.score}</Table.Cell>
                </Table.Row>
            }))}
        </Table.Body>
    </Table>
}