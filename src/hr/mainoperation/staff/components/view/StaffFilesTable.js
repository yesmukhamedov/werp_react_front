import React from 'react';
import { Table, Button } from 'semantic-ui-react'


export default function StaffFilesTable(props){

    const {files} = props

    let tempContent = files.map(file => {
        return (
            <Table.Row key={file.id}>
                <Table.Cell>{file.file_name}</Table.Cell>
                <Table.Cell>{file.file_size}</Table.Cell>
                <Table.Cell>{file.created_date}</Table.Cell>
                <Table.Cell>
                    <Button onClick={() => props.downloadFile(file.id)}>Скачать</Button>
                    {file.image ? <Button>Просмотр</Button>:''}
                    <Button>Удалить</Button>
                </Table.Cell>
            </Table.Row>
        )
    })
    return <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Название файла</Table.HeaderCell>
                    <Table.HeaderCell>Размер</Table.HeaderCell>
                    <Table.HeaderCell>Дата загрузки</Table.HeaderCell>
                    <Table.HeaderCell>Действия</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>{tempContent}</Table.Body>
        </Table>
}