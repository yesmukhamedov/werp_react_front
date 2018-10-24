import React from 'react'
import {Segment,Label, Table, Icon, Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {DOC_TYPE_RECRUITMENT,DOC_TYPE_TRANSFER} from '../../../hrUtil'
import {formatDMY,moneyFormat} from '../../../../utils/helpers'

export default function HrDocData (props) {
    const {typeId} = props
    let table = ''
    switch (typeId){
        case DOC_TYPE_RECRUITMENT:
            table = renderRecruitmentData(props)
            break

        case DOC_TYPE_TRANSFER:
            table = renderTransferData(props)
            break

        default:{}
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
    const currencyList = props.currencyList || []

    if(!items){
        return (null)
    }
    return <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>№</Table.HeaderCell>
                    <Table.HeaderCell>Сотрудник</Table.HeaderCell>
                    <Table.HeaderCell>Департамент</Table.HeaderCell>
                    <Table.HeaderCell>Бизнес сфера</Table.HeaderCell>
                    <Table.HeaderCell>Должность</Table.HeaderCell>
                    <Table.HeaderCell>Дата начало</Table.HeaderCell>
                    <Table.HeaderCell>Менеджер</Table.HeaderCell>
                    <Table.HeaderCell>Оклад</Table.HeaderCell>
                    <Table.HeaderCell>{amountEditMode?'Валюта': 'Прим.'}</Table.HeaderCell>
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
                                <Table.Cell>{item.businessAreaName}</Table.Cell>
                                <Table.Cell>{item.positionName}</Table.Cell>
                                <Table.Cell>{formatDMY(item.beginDate)}</Table.Cell>
                                <Table.Cell>{item.managerName}</Table.Cell>
                                <Table.Cell>{amountEditMode ? <input onChange={(e) => props.handleItemChange('amount',item.id,e.target.value)}
                                                                     type="number" value={item.amount || 0}/>:moneyFormat(item.amount) + ' ' + item.currency}</Table.Cell>
                                <Table.Cell>{amountEditMode?
                                    <select className="ui fluid dropdown"
                                            onChange={(e) => props.handleItemChange('currency',item.id,e.target.value)} value={item.currency || ''}>
                                        <option value="">Не выбрано</option>
                                        {currencyList.map(c => {
                                            return <option value={c.currency} key={c.currency_id}>{c.currency}</option>
                                        })}
                                    </select>
                                    :item.note}</Table.Cell>
                                <Table.Cell>

                                </Table.Cell>
                            </Table.Row>
                })}
            </Table.Body>
        </Table>
}

function renderTransferData (props){
    const items = props.items
    const amountEditMode = props.amountEditMode || false
    const currencyList = props.currencyList || []

    if(!items){
        return (null)
    }
    return <Table celled>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>№</Table.HeaderCell>
                <Table.HeaderCell>Сотрудник снимается с должности</Table.HeaderCell>
                <Table.HeaderCell>Новый филиал</Table.HeaderCell>
                <Table.HeaderCell>Департамент</Table.HeaderCell>
                <Table.HeaderCell>Должность</Table.HeaderCell>
                <Table.HeaderCell>Дата начало</Table.HeaderCell>
                <Table.HeaderCell>Менеджер</Table.HeaderCell>
                <Table.HeaderCell>Оклад</Table.HeaderCell>
                <Table.HeaderCell>{amountEditMode?'Валюта': 'Прим.'}</Table.HeaderCell>
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
                    <Table.Cell>{item.branchName}</Table.Cell>
                    <Table.Cell>{item.departmentName}</Table.Cell>
                    <Table.Cell>{item.positionName}</Table.Cell>
                    <Table.Cell>{formatDMY(item.beginDate)}</Table.Cell>
                    <Table.Cell>{item.managerName}</Table.Cell>
                    <Table.Cell>{amountEditMode ? <input onChange={(e) => props.handleItemChange('amount',item.id,e.target.value)}
                                                         type="number" value={item.amount || 0}/>:moneyFormat(item.amount) + ' ' + item.currency}</Table.Cell>
                    <Table.Cell>{amountEditMode?
                        <select className="ui fluid dropdown"
                                onChange={(e) => props.handleItemChange('currency',item.id,e.target.value)} value={item.currency || ''}>
                            <option value="">Не выбрано</option>
                            {currencyList.map(c => {
                                return <option value={c.currency} key={c.currency_id}>{c.currency}</option>
                            })}
                        </select>
                        :item.note}</Table.Cell>
                    <Table.Cell>

                    </Table.Cell>
                </Table.Row>
            })}
        </Table.Body>
    </Table>
}