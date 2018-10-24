import React from 'react';
import { Table } from 'semantic-ui-react'

/**
 * Addresses List
 */

export default function StaffContactTable(props){
    let {addresses,countryOptions,stateOptions,cityOptions,regionOptions} = props
    if(!addresses){
        addresses = []
    }

    console.log(addresses)

    let tempContent = addresses.map(d => {
        return (
            <Table.Row key={d.id}>
                <Table.Cell>{d.typeName}</Table.Cell>
                <Table.Cell>{d.countryName}</Table.Cell>
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
                <Table.HeaderCell>Тип</Table.HeaderCell>
                <Table.HeaderCell>Страна</Table.HeaderCell>
                <Table.HeaderCell>Область</Table.HeaderCell>
                <Table.HeaderCell>Город</Table.HeaderCell>
                <Table.HeaderCell>Адрес</Table.HeaderCell>
                <Table.HeaderCell>Тел номер</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>{tempContent}</Table.Body>
    </Table>
}

function getTextFromOptions(address){

}