import React, {Component} from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { injectIntl } from 'react-intl';
import {Container,Divider,Header,Button,Segment,Form,Table,Message} from 'semantic-ui-react';
import {fetchItems,saveData,fetchStatuses} from '../actions/hrTimesheetAction'
import moment from 'moment'
import 'moment/locale/ru'
import 'moment/locale/tr'
import {YEAR_OPTIONS} from '../../../../utils/constants'
import {monthsArrayToOptions} from '../../../../utils/helpers'

const currentDate = new Date()
class TimesheetPage extends Component{

    constructor(props){
        super(props)
        this.state = {
            search:{
                bukrs: null,
                branchId: null,
                positionId: null,
                year: currentDate.getFullYear(),
                month: currentDate.getMonth()+1
            },
            selectedItems: {},
            leftPart: true,
            localItems: {}
        }

        this.renderData = this.renderData.bind(this)
    }

    componentWillMount(){
        //this.loadItems()
        this.props.fetchStatuses()
    }

    handleChange = (e,data) => {
        let search = Object.assign({},this.state.search)
        let {name,value} = data
        search[name] = value

        this.setState({
            ...this.state,
            search: search
        })
    }

    loadItems = () => {
        this.setState({
            ...this.state,
            selectedItems: {}
        })
        this.props.fetchItems(this.state.search)
    }

    branchOptions = (bukrs) => {
        if(!bukrs){
            return []
        }
        let {branchOptionsAll} = this.props
        if(!branchOptionsAll || !branchOptionsAll[bukrs]){
            return []
        }

        return branchOptionsAll[bukrs] || []
    }

    saveData = () => {
        const {search,selectedItems}  =this.state
        let data = []

        for(let k in selectedItems){
            let temp = Object.assign({},selectedItems[k])
            temp['staffId'] = k
            temp['year'] = search['year']
            temp['month'] = search['month']

            let tempDays = []
            for(let t in temp['days']){
                tempDays.push(temp['days'][t])
            }

            temp['days'] = tempDays
            data.push(temp)
        }
        this.props.saveData(data)
    }

    renderActionButtons(){
        const {messages} = this.props.intl
        return <div>
            <Button.Group>
                <Button
                    color={'teal'}
                    onClick={() => this.setState({...this.state,leftPart:true})}
                    disabled={this.state.leftPart}
                    active={!this.state.leftPart}
                    icon='left chevron' />
                <Button
                    color={'teal'}
                    onClick={() => this.setState({...this.state,leftPart:false})}
                    disabled={!this.state.leftPart}
                    active={this.state.leftPart}
                    icon='right chevron' />
            </Button.Group>

            <Button onClick={this.saveData} primary floated={'right'}>{messages['Form.Save']}</Button>
            </div>
    }

    renderSearchForm () {
        let {companyOptions} = this.props
        const {messages,locale} = this.props.intl
        const {search} = this.state
        if(!companyOptions){
            companyOptions = []
        }

        let selectedBukrs = search.bukrs
        if(companyOptions.length === 1){
            selectedBukrs = companyOptions[0]['value']
        }

        moment.locale(locale)

        return <Form>
            <Form.Group widths='equal'>
                {companyOptions.length === 1?'':<Form.Select name='bukrs'
                             label={messages['Form.Company']} options={this.props.companyOptions}
                             placeholder={messages['Form.Company']} onChange={this.handleChange} />}

                <Form.Select
                    name='branchId'
                    search={true}
                    label={messages['Form.Branch']}
                    options={this.branchOptions(selectedBukrs)}
                    placeholder={messages['Form.Branch']}
                    onChange={this.handleChange} />

                <Form.Select defaultValue={currentDate.getFullYear()}
                             name='year' label={messages['Form.Year']}
                             options={YEAR_OPTIONS} placeholder={messages['Form.Year']}
                             onChange={this.handleChange} />

                <Form.Select
                    defaultValue={currentDate.getMonth() + 1}
                    name='month' label={messages['Form.Month']}
                    options={monthsArrayToOptions(moment.months())} placeholder={messages['Form.Month']} onChange={this.handleChange} />

            </Form.Group>
            <Form.Button onClick={this.loadItems}>{messages['Form.Form']}</Form.Button>
        </Form>
    }

    handleDayStatusChange = (item,dayNumber,value) => {
        const staffId = item.staffId
        let selectedItems = Object.assign({},this.state.selectedItems)
        if(!selectedItems[staffId]){
            selectedItems[staffId] = {
                bukrs: item.bukrs,
                branchId: item.branchId,
                departmentId: item.departmentId,
                positionId: item.positionId,
                days: {}
            }
        }

        selectedItems[staffId]['days'][dayNumber] = {number: dayNumber,statusName: value,enabled: true}

        this.setState({
            ...this.state,
            selectedItems: selectedItems
        })
    }

    itemStatusCount = (item, status) => {
        let days = item.days || []
        let filteredDays = _.filter(days,function(o){
            return o['status'] === status
        })

        return filteredDays.length
    }

    renderDaysCell = (item) => {
        let days = item.days || []
        let statuses = this.props.statuses
        const {locale} = this.props.intl
        if(!statuses){
            statuses = []
        }
        const {leftPart,selectedItems} = this.state
        let filteredDays = _.filter(days,function(o){
            if(leftPart){
                return o.number <= 15
            }else {
                return o.number > 15
            }
        })

        let staffSelectedItem = selectedItems[item.staffId] || {}
        let staffDays = staffSelectedItem['days'] || {}
        //let selectedItems[item.staffId + '_' + item.year + '_' + item.month]

    let content = filteredDays.map((day => {
                let opValue = staffDays[day.number]?staffDays[day.number]['statusName'] : (day['statusName']||'') //(day) @ToDo
                return <Table.Cell negative={opValue === 'MISSING'} positive={opValue === 'PRESENT'} key={day.number}>
                    <select value={opValue} onChange={(e) => this.handleDayStatusChange(item,day.number,e.target.value)}>
                        {statuses.map((s => {
                            return <option key={s.name} value={s.name}>{this.statusCodeByLocale(s,locale)}</option>
                        }))}
                    </select>
                </Table.Cell>
            }))

        return content
    }

    renderData(){
        const {messages,locale} = this.props.intl
        let {items} = this.props
        const {year,month} = this.state.search
        const {leftPart} = this.state
        if(!items){
            items = []
        }

        let nextMonthDate = new Date(year, month, 0);
        let lastDay = parseInt(moment(nextMonthDate).format('DD'),10)
        let days = []
        if(leftPart){
            for(let day = 1; day <= 15; day++){
                days.push(day)
            }
        }else{
            for(let day = 16; day <= lastDay; day++){
                days.push(day)
            }
        }


        return <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
            <Segment clearing>
                {this.renderActionButtons()}
            </Segment>
            <Divider clearing />
            <div style={{overflowX: 'scroll',fontSize:'12px'}}>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>{messages['Table.NameSurname']}</Table.HeaderCell>
                        <Table.HeaderCell>{messages['Table.Position']}</Table.HeaderCell>
                        {days.map((day => {
                            return <Table.HeaderCell key={day}>{day}</Table.HeaderCell>
                        }))}
                        {/*<Table.HeaderCell>П.</Table.HeaderCell>*/}
                        {/*<Table.HeaderCell>Б.</Table.HeaderCell>*/}
                        {/*<Table.HeaderCell>О.</Table.HeaderCell>*/}
                        {/*<Table.HeaderCell>К.</Table.HeaderCell>*/}
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {items.map((item => {
                        return <Table.Row key={item.staffId}>
                            <Table.Cell>{item.staffName}</Table.Cell>
                            <Table.Cell>{item.positionName}</Table.Cell>
                                {this.renderDaysCell(item)}
                            {/*<Table.Cell>{this.itemStatusCount(item,'PRESENT')}</Table.Cell>*/}
                            {/*<Table.Cell>{this.itemStatusCount(item,'ILL')}</Table.Cell>*/}
                            {/*<Table.Cell>{this.itemStatusCount(item,'MISSING')}</Table.Cell>*/}
                            {/*<Table.Cell>{this.itemStatusCount(item,'BUSINESS_TRIP')}</Table.Cell>*/}
                        </Table.Row>
                    }))}
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                    </Table.Row>
                </Table.Footer>
            </Table>
            </div>
            <Divider/>
        </Container>
    }

    statusCodeByLocale = (status, locale) => {
        if(locale === 'en'){
            return status.codeEn
        } else if(locale === 'tr') {
            return status.codeTr
        }

        return status.code
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.items){
            // let update = true
            // let localItems = Object.assign([],this.state.localItems)
            // if(localItems && localItems.length > 0){
            //     console.log(localItems)
            //     let year = localItems[0]['year']
            //     let month = localItems[0]['month']
            //     for(let k in nextProps.items){
            //         if(nextProps.items[k]['year'] === year && nextProps.items[k]['month'] === month){
            //             update = false
            //             break
            //         }
            //     }
            // }
            //
            // if(update){
            //     this.setState({
            //         ...this.state,
            //         localItems: nextProps.items
            //     })
            // }
        }
    }

    renderStatusDescriptions(){
        const {locale,messages} = this.props.intl
        let statuses = this.props.statuses
        if(!statuses){
            statuses = []
        }
        return <Message>
                    <Message.Header>{messages['Hr.Timesheet.StatusDescriptionTitle']}</Message.Header>
                    <Message.List>
                        {statuses.map((status => {
                            return <Message.Item key={status.code}>
                                    <strong>{this.statusCodeByLocale(status,locale)}</strong>
                                     - {locale === 'en' ? status.descriptionEn : (locale === 'tr' ? status.descriptionTr : status.description)}
                                </Message.Item>
                        }))}
                    </Message.List>
                </Message>
    }

    render () {
        const {messages} = this.props.intl
        return (
            <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                <Segment clearing>
                    <Header as='h3' attached='top'>{messages['Hr.Timetable.Header']}</Header>
                    {this.renderSearchForm()}
                </Segment>
                <Divider clearing />
                {this.renderData()}
                <Divider/>
                {this.renderStatusDescriptions()}
            </Container>
        )
    }
}

function mapStateToProps (state) {
    return {
        companyOptions: state.userInfo.companyOptions,
        items: state.hrTimesheet.items,
        statuses: state.hrTimesheet.statuses,
        branchOptionsAll: state.userInfo.branchOptionsAll
    }
}

export default connect(mapStateToProps, {
    fetchItems,saveData,fetchStatuses
})(injectIntl(TimesheetPage))