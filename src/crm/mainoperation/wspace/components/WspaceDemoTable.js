import React from 'react'
import { Table } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import DemoResultLabel from '../../demo/components/DemoResultLabel'
import {renderRecoCategoryBtn} from '../../../CrmHelper'

export default function WspaceDemoTable(props){
    const {items,menu} = props
    if(!items){
        return <h3>Нет данных!</h3>
    }

    return <Table celled padded>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell singleLine>Клиент</Table.HeaderCell>
                <Table.HeaderCell>Адрес</Table.HeaderCell>
                <Table.HeaderCell>Дата-время</Table.HeaderCell>
                <Table.HeaderCell>Дилер</Table.HeaderCell>
                <Table.HeaderCell>Категория</Table.HeaderCell>
                <Table.HeaderCell>Примечание</Table.HeaderCell>
                <Table.HeaderCell>Результат</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>
            {items.map((item => {
                return <Table.Row key={item.id}>
                    <Table.Cell>{item.clientName}</Table.Cell>
                    <Table.Cell>{item.address}</Table.Cell>
                    <Table.Cell>{item.dateTimeStr}</Table.Cell>
                    <Table.Cell>{item.dealerName}</Table.Cell>
                    <Table.Cell>{item.parentReco?renderRecoCategoryBtn(item.parentReco.categoryId,item.parentReco.categoryName):'Неизвестно'}</Table.Cell>
                    <Table.Cell>{item.note}</Table.Cell>
                    <Table.Cell>
                        <DemoResultLabel resultId={item.resultId} resultName={item.resultName}/>
                    </Table.Cell>
                    <Table.Cell>
                        <Link
                            target={'_blank'}
                            className={'ui icon button mini'}
                            to={`/crm/demo/view/` + item.id}>
                            Просмотр
                        </Link>
                    </Table.Cell>
                </Table.Row>
            }))}
        </Table.Body>
    </Table>
}