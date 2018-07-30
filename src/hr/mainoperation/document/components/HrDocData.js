import React from 'react'
import {Segment,Label, Table } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {DOC_TYPE_RECRUITMENT} from '../../../hrUtil'
import {formatDMY,moneyFormat} from '../../../../utils/helpers'

export default function HrDocData (props) {
    const {typeId,items} = props
    let table = ''
    if(typeId === DOC_TYPE_RECRUITMENT){
        table = renderRecruitmentData(items)
    }
    return <Segment raised>
        <Label color="blue" ribbon>
            Данные документа
        </Label>
        {table}
    </Segment>
}

function renderRecruitmentData (items){
    if(!items){
        return (null)
    }
    return <Table celled>
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
                {items.map((item,idx) => {
                    return <Table.Row key={item.id}>
                                <Table.Cell>{idx+1}</Table.Cell>
                                <Table.Cell>{item.staffName}</Table.Cell>
                                <Table.Cell>{item.departmentName}</Table.Cell>
                                <Table.Cell>{item.positionName}</Table.Cell>
                                <Table.Cell>{formatDMY(item.beginDate)}</Table.Cell>
                                <Table.Cell>{item.managerName}</Table.Cell>
                                <Table.Cell>{moneyFormat(item.amount)}</Table.Cell>
                                <Table.Cell>
                                    <Link target={'_blank'} className={'ui icon button mini'} to={`/crm/demo/view/` + 12}>
                                        Просмотр
                                    </Link>
                                </Table.Cell>
                            </Table.Row>
                })}
            </Table.Body>
        </Table>
}