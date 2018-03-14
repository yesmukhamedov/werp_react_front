import React from 'react';
import { Table } from 'semantic-ui-react'

/**
 * Список должностей сотрудника
 */

export default function StaffSalariesTable(props){

    const {salaries} = props

    let tempContent = salaries.map(salary => {
        return (
            <Table.Row key={salary.salaryId} className={salary.prev === true ? 'error':(salary.next === true?'success':'')}>
                <Table.Cell>{salary.salaryId}</Table.Cell>
                <Table.Cell>{salary.statusName}</Table.Cell>
                <Table.Cell>{salary.companyName}</Table.Cell>
                <Table.Cell>{salary.branchName}</Table.Cell>
                <Table.Cell>{salary.departmentName}</Table.Cell>
                <Table.Cell>{salary.beginDate}</Table.Cell>
                <Table.Cell>{salary.endDate}</Table.Cell>
                <Table.Cell>{salary.positionName}</Table.Cell>
                <Table.Cell>{salary.amount}</Table.Cell>
                <Table.Cell>{salary.waers}</Table.Cell>
                <Table.Cell>{salary.note}</Table.Cell>
                <Table.Cell>{salary.payrollDate}</Table.Cell>
                <Table.Cell>

                </Table.Cell>
            </Table.Row>
        )
    })
    return <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>SalaryId</Table.HeaderCell>
                    <Table.HeaderCell>Статус</Table.HeaderCell>
                    <Table.HeaderCell>Компания</Table.HeaderCell>
                    <Table.HeaderCell>Филиал</Table.HeaderCell>
                    <Table.HeaderCell>Департамент</Table.HeaderCell>
                    <Table.HeaderCell>Дата начало</Table.HeaderCell>
                    <Table.HeaderCell>Дата окончания</Table.HeaderCell>
                    <Table.HeaderCell>Должность</Table.HeaderCell>
                    <Table.HeaderCell>Оклад</Table.HeaderCell>
                    <Table.HeaderCell>Валюта</Table.HeaderCell>
                    <Table.HeaderCell>Примечание</Table.HeaderCell>
                    <Table.HeaderCell>Дата выдачи</Table.HeaderCell>
                    <Table.HeaderCell>Действия</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>{tempContent}</Table.Body>
        </Table>
}