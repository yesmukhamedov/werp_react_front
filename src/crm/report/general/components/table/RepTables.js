import React,{Component} from 'react'
import { Table,Icon,Label,Button,Message } from 'semantic-ui-react'
import {YEAR_OPTIONS,MONTH_OPTIONS} from '../../../../../utils/constants'
import moment from 'moment'
import DemoResultLabel from '../../../../mainoperation/demo/components/DemoResultLabel'
import {REP_894,REP_934} from '../../crmRepUtil'
import {RECO_CATEGORY_COLORS} from '../../../../crmUtil'
import '../../css/repStyle.css'
/**
 *Отчет Демо/Продажа
 */
export function RepTable894(props){
    let {items,transactionId} = props
    if(!items){
        items = []
    }
    let currentMonth = parseInt(moment().format('M'))
    let date = moment().subtract(3,'month')
    let prevMonth = parseInt(date.format('M'))
    let months = []
    for(let k = prevMonth; k <= currentMonth; k++){
        months.push(k)
    }
    const renderMonthDataForSale = (monthData) => {
        monthData = monthData || {}
        return months.map((m => {
            let md = monthData[m]

            return [<Table.Cell key={m} width={1} className={md?md.demoSaleLevelClass:''}>{md?(md.demoCount + '/' + md.saleCount):''}</Table.Cell>,
                <Table.Cell
                    key={m+'avg'}
                    width={1}
                    className={md?md.demoSaleLevelClass:''}>{md?md.demoSaleAvg:''}</Table.Cell>,
                <Table.Cell key={m+'d'} className={md?md.demoSaleLevelClass:''}>{md?md.demoSaleLevel+'-уровень':'Нет данных'}</Table.Cell>]
        }))
    }

    const renderMonthDataForReco = (monthData) => {
        monthData = monthData || {}
        return months.map((m => {
            let md = monthData[m]

            return [<Table.Cell key={m} width={1} className={md?md.demoRecoLevelClass:''}>{md?(md.demoCount + '/' + md.recoCount):''}</Table.Cell>,
                <Table.Cell
                    key={m+'avg'}
                    width={1}
                    className={md?md.demoRecoLevelClass:''}>{md?md.recoSaleAvg:''}</Table.Cell>,
                <Table.Cell key={m+'d'} className={md?md.demoRecoLevelClass:''}>{md?md.demoRecoLevel+'-уровень':'Нет данных'}</Table.Cell>]
        }))
    }

    const renderMonthDataForDemo = (monthData) => {
        monthData = monthData || {}
        return months.map((m => {
            let md = monthData[m]

            return [<Table.Cell key={m} width={1} className={md?md.demoLevelClass:''}>{md?(md.demoCount):''}</Table.Cell>,
                <Table.Cell key={m+'d'} className={md?md.demoLevelClass:''}>{md?md.demoLevel+'-уровень':'Нет данных'}</Table.Cell>]
        }))
    }

    return <Table celled striped>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>ФИО</Table.HeaderCell>
                {months.map((m => {
                    return <Table.HeaderCell
                        colSpan={3}
                        key={m}>{MONTH_OPTIONS[m-1]?MONTH_OPTIONS[m-1]['text']:''}
                        </Table.HeaderCell>
                }))}
            </Table.Row>
        </Table.Header>

        <Table.Body>

                {items.map((item => {
                    return <Table.Row key={item.staffId}>
                            <Table.Cell>{item.staffName}</Table.Cell>
                            {transactionId === REP_894?
                                            renderMonthDataForSale(item.monthData):
                                            (transactionId === REP_934?renderMonthDataForReco(item.monthData):renderMonthDataForDemo(item.monthData))}
                        </Table.Row>
                }))}

        </Table.Body>
    </Table>
}

export function RepTable914(props){
    let cats = [1,2,3,4]
    let {items} = props
    if(!items){
        items = []
    }

    return <Table celled>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>ФИО</Table.HeaderCell>
                <Table.HeaderCell>Золото</Table.HeaderCell>
                <Table.HeaderCell>Серебро</Table.HeaderCell>
                <Table.HeaderCell>Бронза</Table.HeaderCell>
                <Table.HeaderCell>Железо</Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>

            {items.map((item => {
                return <Table.Row key={item.staffId}>
                    <Table.Cell>{item.staffName}</Table.Cell>
                    {cats.map((cat => {
                        return <Table.Cell key={cat}>{item.recos[cat] || '0'}</Table.Cell>
                    }))}
                </Table.Row>
            }))}

        </Table.Body>
    </Table>
}

export function RepTable740(props){
    let cats = [1,2,3,4]
    let {items} = props
    if(!items){
        items = []
    }

    const renderRecos = (item) => {
        return <Label.Group>
                <Label>
                    Всего
                    <Label.Detail>{item.recoCount}</Label.Detail>
                </Label>
                {item.recosByCategory.map((rc) => {
                    return <Label
                        key={rc.id}
                        color={RECO_CATEGORY_COLORS[rc.id]}>
                        {rc.name}
                        <Label.Detail>{rc.count}</Label.Detail>
                        </Label>
                })}
            </Label.Group>
    }

    return <Table  celled striped>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell width={2}>Дилер</Table.HeaderCell>
                <Table.HeaderCell width={2}>Категория</Table.HeaderCell>
                <Table.HeaderCell width={2}>Дата-время</Table.HeaderCell>
                <Table.HeaderCell width={2}>Результат</Table.HeaderCell>
                <Table.HeaderCell width={3}>Кол. рек.</Table.HeaderCell>
                <Table.HeaderCell width={4}>Примечание директора</Table.HeaderCell>
                <Table.HeaderCell width={1}></Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body>

            {items.map((item => {
                return <Table.Row key={item.id}>
                    <Table.Cell>{item.staffName}</Table.Cell>
                    <Table.Cell>
                        <Button size='tiny' basic color={RECO_CATEGORY_COLORS[item.categoryId] || 'grey'}>{item.categoryName}</Button>
                    </Table.Cell>

                    <Table.Cell>{item.dateTime}</Table.Cell>
                    <Table.Cell>
                        <DemoResultLabel resultId={item.resultId} resultName={item.resultName}/>
                    </Table.Cell>
                    <Table.Cell>{renderRecos(item)}</Table.Cell>
                    <Table.Cell>
                        {item.directorNote?<Message compact size={'small'}>{item.directorNote}</Message>:''}
                    </Table.Cell>
                    <Table.Cell>
                        <a onClick={() => props.openModal(item.id,item.directorNote)}><Icon link={true} name={'pencil'}/></a>
                    </Table.Cell>
                </Table.Row>
            }))}

        </Table.Body>
    </Table>
}