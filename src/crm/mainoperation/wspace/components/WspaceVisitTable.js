import React from 'react'
import { Table, Label, Icon } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {formatDMYMS} from '../../../../utils/helpers'

export default function WspaceVisitTable(props){
    const {items} = props
    if(!items){
        return <h3>Нет данных!</h3>
    }

    return <Table celled padded>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell singleLine>Клиент</Table.HeaderCell>
                <Table.HeaderCell>Адрес</Table.HeaderCell>
                <Table.HeaderCell>Дата посещения</Table.HeaderCell>
                <Table.HeaderCell>Посетитель</Table.HeaderCell>
                <Table.HeaderCell>Примечание</Table.HeaderCell>
                <Table.HeaderCell>Действия</Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>
            {items.map((item => {
                return <Table.Row key={item.id}>
                    <Table.Cell>{item.clientName}</Table.Cell>
                    <Table.Cell>{item.address}</Table.Cell>
                    <Table.Cell>{formatDMYMS(item.docDate)}</Table.Cell>
                    <Table.Cell>{item.visitorName}</Table.Cell>
                    <Table.Cell>{item.note}</Table.Cell>
                    <Table.Cell>
                        <Link
                            target={'_blank'}
                            className={'ui icon button mini'}
                            to={`/crm/visit/view/` + item.id}>
                            Просмотр
                        </Link>

                        <Label as={'a'} onClick={() => props.openRecoListModal(item,'visit')}>
                            <Icon name='unhide' /> Обзвонить
                        </Label>
                    </Table.Cell>
                </Table.Row>
            }))}
        </Table.Body>
    </Table>
}