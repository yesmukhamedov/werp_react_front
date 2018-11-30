import React from 'react'
import {Segment,Grid,Label, List,Select,Form,Table,Button } from 'semantic-ui-react'
import {formatDMYMS,formatDMY,moneyFormat} from '../../../../../utils/helpers'
import {Link} from 'react-router-dom'
import DatePicker from 'react-datepicker'
import moment from 'moment'
require('moment/locale/ru')

export default function TransferForm (props){
    let document = Object.assign({},props.document)
    let bukrsOptions = props.bukrsOptions || []
    let branchOptions = props.branchOptions || []
    let items = document.items || []
    let departmentList = props.departmentList || []
    let positionList = props.positionList || []
    let managerOptions = props.managerOptions || []
    let directorOptions = props.directorOptions || []
    let businessAreaOptions = props.businessAreaOptions || []

    return <div>
        <Segment raised>
            <Label color="blue" ribbon>
                Информация о документе
            </Label>
            <Form>
                <Form.Group widths='equal'>
                    <div className="field">
                        <label>Компания</label>
                        <select onChange={(e) => props.handleDocumentChange('bukrs',e.target.value)} value={document.bukrs || ''}>
                            <option value="">Не выбрано</option>
                            {bukrsOptions.map(bukrs => {
                                return <option key={bukrs.key} value={bukrs.key}>{bukrs.text}</option>
                            })}
                        </select>
                    </div>

                    <div className="field">
                        <label>Филиал</label>
                        <select onChange={(e) => props.handleDocumentChange('branchId',e.target.value)} value={document.branchId || ''}>
                            <option value="">Не выбрано</option>
                            {branchOptions.map(branch => {
                                return <option key={branch.key} value={branch.key}>{branch.text}</option>
                            })}
                        </select>
                    </div>

                    <div className="field">
                        <label>Департамент</label>
                        <select onChange={(e) => props.handleDocumentChange('departmentId',e.target.value)} value={document.departmentId || ''}>
                            <option value="">Не выбрано</option>
                            {departmentList.map(dep => {
                                return <option key={dep.dep_id} value={dep.dep_id}>{dep.name_ru}</option>
                            })}
                        </select>
                    </div>

                    <div className="field">
                        <label>Директор</label>
                        <select onChange={(e) => props.handleDocumentChange('directorId',e.target.value)} value={document.directorId || ''}>
                            <option value="">Не выбрано</option>
                            {directorOptions.map(director => {
                                return <option key={director.key} value={director.value}>{director.text}</option>
                            })}
                        </select>
                    </div>

                </Form.Group>

                <Form.Group widths='equal'>
                    <Form.Field label='Номер документа' control='input' disabled={true} />
                    <Form.Field label='Тип документа' control='input' disabled={true} value={document.typeName || ''} />
                    <Form.Field label='Ответственный' control='input' disabled={true} value={document.responsibleName || ''} />
                    <Form.Field label='Дата создания' control='input' disabled={true} value={formatDMYMS(document.createdAt)} />
                    <Form.Field label='Статус' control='input' disabled={true} value={document.statusName || ''} />
                    <Form.Field label='Составил' control='input' disabled={true} value={document.creatorName || ''} />
                </Form.Group>
            </Form>
        </Segment>
        <Segment raised>
                <Label color="blue" ribbon>
                    Данные документа
                </Label>

                <Button disabled={document.bukrs === undefined || document.bukrs === null || document.bukrs.length === 0}
                        primary onClick={props.addItem} floated={'right'}>Добавить</Button>
                <br style={{clear:'both'}}/>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell rowSpan={2}>№</Table.HeaderCell>
                            <Table.HeaderCell rowSpan={2}>Сотрудник снимается с должности</Table.HeaderCell>
                            <Table.HeaderCell colSpan={7}>НОВАЯ ДОЛЖНОСТЬ</Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell>Филиал</Table.HeaderCell>
                            <Table.HeaderCell>Должность</Table.HeaderCell>
                            <Table.HeaderCell>Департамент</Table.HeaderCell>
                            <Table.HeaderCell>Дата начало</Table.HeaderCell>
                            <Table.HeaderCell>Менеджер</Table.HeaderCell>
                            <Table.HeaderCell>Прим.</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>

                        {items.map((item,idx) => {
                            return <Table.Row key={item.staffId}>
                                <Table.Cell>{idx+1}</Table.Cell>
                                <Table.Cell>{item.staffName}</Table.Cell>
                                <Table.Cell>
                                    {<select className="ui fluid dropdown"
                                             onChange={(e) => props.handleItemChange(idx,'branchId',e.target.value)}
                                             style={{maxWidth:'200px'}} value={item.branchId || ''}>
                                        <option value="">Не выбрано</option>
                                        {branchOptions.map(branch => {
                                            return <option key={branch.key} value={branch.key}>{branch.text}</option>
                                        })}
                                    </select>}
                                </Table.Cell>
                                <Table.Cell>
                                    {<select className="ui fluid dropdown" onChange={(e) => props.handleItemChange(idx,'positionId',e.target.value)} style={{maxWidth:'200px'}} value={item.positionId || ''}>
                                        <option value="">Не выбрано</option>
                                        {positionList.map(pos => {
                                            return <option key={pos.position_id} value={pos.position_id}>{pos.text}</option>
                                        })}
                                    </select>}
                                </Table.Cell>
                                <Table.Cell>
                                    {<select className="ui fluid dropdown"
                                             onChange={(e) => props.handleItemChange(idx,'departmentId',e.target.value)}
                                             style={{maxWidth:'200px'}} value={item.departmentId || ''}>
                                        <option value="">Не выбрано</option>
                                        {departmentList.map(dep => {
                                            return <option key={dep.dep_id} value={dep.dep_id}>{dep.name_ru}</option>
                                        })}
                                    </select>}
                                </Table.Cell>
                                <Table.Cell>{
                                    <DatePicker
                                        locale="ru"
                                        label=''
                                        autoComplete="off"
                                        placeholderText={'Дата начала'}
                                        showMonthDropdown showYearDropdown dropdownMode='select'
                                        dateFormat='DD.MM.YYYY' selected={item.beginDate ? moment(item.beginDate) : null}
                                        onChange={(v) => props.handleItemChange(idx,'beginDate',v)} />
                                }</Table.Cell>
                                <Table.Cell>
                                    {<select className="ui fluid dropdown" onChange={(e) => props.handleItemChange(idx,'managerId',e.target.value)} style={{maxWidth:'200px'}} value={item.managerId || ''}>
                                    <option value="">Не выбрано</option>
                                    {props.getManagerOptions(item.branchId).map(manager => {
                                        return <option key={manager.key} value={manager.value}>{manager.text}</option>
                                    })}
                                    </select>}
                                </Table.Cell>
                                <Table.Cell>
                                    <textarea className="ui fluid" onChange={(e) => props.handleItemChange(idx,'note',e.target.value)}></textarea>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button onClick={() => props.removeItem(idx)} icon={'trash'}/>
                                </Table.Cell>
                            </Table.Row>
                        })}
                    </Table.Body>
                </Table>
        </Segment>
    </div>
}