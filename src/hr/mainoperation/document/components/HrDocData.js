import React from 'react'
import {Segment,Label, Table } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default function HrDocData (props) {
    return <Segment raised>
        <Label color="blue" ribbon>
            Данные документа
        </Label>
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>№</Table.HeaderCell>
                    <Table.HeaderCell>Сотрудник</Table.HeaderCell>
                    <Table.HeaderCell>Департамент</Table.HeaderCell>
                    <Table.HeaderCell>Должность</Table.HeaderCell>
                    <Table.HeaderCell>Дата начало</Table.HeaderCell>
                    <Table.HeaderCell>Менеджер</Table.HeaderCell>
                    <Table.HeaderCell>Оклад</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>БАУЫРЖАНОВ БАКЫТЖАН</Table.Cell>
                    <Table.Cell>Отдела маркетинга</Table.Cell>
                    <Table.Cell>Стажер-дилер</Table.Cell>
                    <Table.Cell>04.07.2018</Table.Cell>
                    <Table.Cell>КАМБАРОВ НУРЖАН</Table.Cell>
                    <Table.Cell>0,00</Table.Cell>
                    <Table.Cell>
                        <Link target={'_blank'} className={'ui icon button mini'} to={`/crm/demo/view/` + 12}>
                            Просмотр
                        </Link>
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    </Segment>
}