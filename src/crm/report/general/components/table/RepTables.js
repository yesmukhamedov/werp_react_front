import React,{Component} from 'react'
import { Table,Icon } from 'semantic-ui-react'
import {YEAR_OPTIONS,MONTH_OPTIONS} from '../../../../../utils/constants'
import moment from 'moment'
import {REP_894,REP_934} from '../../crmRepUtil'
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
                <Table.Cell key={m+'d'} className={md?md.demoSaleLevelClass:''}>{md?md.demoSaleLevel+'-уровень':'Нет данных'}</Table.Cell>]
        }))
    }

    const renderMonthDataForReco = (monthData) => {
        monthData = monthData || {}
        return months.map((m => {
            let md = monthData[m]

            return [<Table.Cell key={m} width={1} className={md?md.demoRecoLevelClass:''}>{md?(md.demoCount + '/' + md.recoCount):''}</Table.Cell>,
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
                        colSpan={2}
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
                <Table.HeaderCell>1-я категория</Table.HeaderCell>
                <Table.HeaderCell>2-я категория</Table.HeaderCell>
                <Table.HeaderCell>3-я категория</Table.HeaderCell>
                <Table.HeaderCell>4-я категория</Table.HeaderCell>
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