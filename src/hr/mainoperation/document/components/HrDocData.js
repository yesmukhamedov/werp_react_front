import React from 'react'
import {Segment,Label, Table, Icon, Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {DOC_TYPE_RECRUITMENT} from '../../../hrUtil'
import {formatDMY,moneyFormat} from '../../../../utils/helpers'

export default function HrDocData (props) {
    const {typeId} = props
    let table = ''
    if(typeId === DOC_TYPE_RECRUITMENT){
        table = renderRecruitmentData(props)
    }
    return <Segment raised>
        <Label color="blue" ribbon>
            Данные документа
        </Label>
        {props.amountEditMode?
            <Button color={'green'} onClick={props.saveDocumentItems} floated={'right'}>Сохранить изменения</Button>
            :''}
        {table}
    </Segment>
}

function renderRecruitmentData (props){
    const items = props.items
    const amountEditMode = props.amountEditMode || false
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
                    <Table.HeaderCell>Прим.</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {items.map((item,idx) => {
                    return <Table.Row key={item.id}>
                                <Table.Cell>{idx+1}</Table.Cell>
                                <Table.Cell>
                                    {item.staffName}
                                    &nbsp;
                                    <Link target={'_blank'} className={'ui icon button mini right floated'} to={`/hr/staff/view/` + item.staffId}>
                                        <Icon name={'eye'}/>
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>{item.departmentName}</Table.Cell>
                                <Table.Cell>{item.positionName}</Table.Cell>
                                <Table.Cell>{formatDMY(item.beginDate)}</Table.Cell>
                                <Table.Cell>{item.managerName}</Table.Cell>
                                <Table.Cell>{amountEditMode ? <input onChange={(e) => props.handleAmountChange(item.id,e.target.value)} type="number" value={item.amount || 0}/>:moneyFormat(item.amount)}</Table.Cell>
                                <Table.Cell>{item.note}</Table.Cell>
                                <Table.Cell>

                                </Table.Cell>
                            </Table.Row>
                })}
            </Table.Body>
        </Table>
}