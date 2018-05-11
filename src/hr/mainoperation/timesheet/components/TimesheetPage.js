import React, {Component} from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import {Container,Divider,Header,Button,Segment,Form,Grid,Table,Label,Menu,Icon} from 'semantic-ui-react';
import YearF4 from '../../../../reference/f4/date/YearF4'
import MonthF4 from '../../../../reference/f4/date/MonthF4'
import {fetchItems,saveData} from '../actions/hrTimesheetAction'
import moment from 'moment'

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
            leftPart: true,
            localItems: {}
        }

        this.renderData = this.renderData.bind(this)
    }

    componentWillMount(){
        this.loadItems()
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
        this.props.fetchItems(this.state.search)
    }

    statuses = () => {
        return [
            {
                key: null,
                value: null,
                text: ''
            },
            {
                key: 'PRESENT',
                value: 'PRESENT',
                text: 'П.'
            },
            {
                key: 'MISSING',
                value: 'MISSING',
                text: 'О.'
            },
            {
                key: 'ILL',
                value: 'ILL',
                text: 'Б.'
            },
            {
                key: 'BUSINESS_TRIP',
                value: 'BUSINESS_TRIP',
                text: 'К.'
            }
        ]
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

    renderActionButtons(){
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

            <Button onClick={() => this.props.saveData(this.state.localItems)} primary floated={'right'}>Сохранить</Button>
            </div>
    }

    renderSearchForm () {
        let {companyOptions} = this.props
        const {search} = this.state
        if(!companyOptions){
            companyOptions = []
        }

        let selectedBukrs = search.bukrs
        if(companyOptions.length === 1){
            selectedBukrs = companyOptions[0]['value']
        }

        return <Form>
            <Form.Group widths='equal'>
                {companyOptions.length === 1?'':<Form.Select name='bukrs'
                             label='Компания' options={this.props.companyOptions}
                             placeholder='Компания' onChange={this.handleChange} />}

                <Form.Select
                    name='branchId'
                    search={true}
                    label='Филиал'
                    options={this.branchOptions(selectedBukrs)}
                    placeholder='Филиал'
                    onChange={this.handleChange} />

                <YearF4 value={search.year} handleChange={this.handleChange} />
                <MonthF4 value={search.month} handleChange={this.handleChange} />
            </Form.Group>
            <Form.Button onClick={this.loadItems}>Сформировать</Form.Button>
        </Form>
    }

    handleDayStatusChange = (staffId,dayNumber,value) => {
        console.log('items',this.state.localItems)
        let localItems = Object.assign({},this.state.localItems)
        let item = Object.assign({},localItems[staffId])
        let days = item['days'] || []
        days[dayNumber-1] = {
            number: dayNumber,
            enabled: false,
            status: value
        }

        item['days'] = days
        localItems[staffId] = item

        this.setState({
            ...this.state,
            localItems: localItems
        })
    }

    renderDaysCell = (item) => {
        let days = item.days || []
        const {leftPart} = this.state
        let filteredDays = _.filter(days,function(o){
            if(leftPart){
                return o.number <= 15
            }else {
                return o.number > 15
            }
        })

    let content = filteredDays.map((day => {
                return <Table.Cell negative={day.status === 'MISSING'} key={day.number}>
                    <select onChange={(e) => this.handleDayStatusChange(item.staffId,day.number,e.target.value)}>
                        {this.statuses().map((s => {
                            return <option key={s.key} value={s.value}>{s.text}</option>
                        }))}
                    </select>
                </Table.Cell>
            }))

        return content
    }

    renderData(){
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
                        <Table.HeaderCell>ФИО</Table.HeaderCell>
                        <Table.HeaderCell>Должность</Table.HeaderCell>
                        {days.map((day => {
                            return <Table.HeaderCell key={day}>{day}</Table.HeaderCell>
                        }))}
                        <Table.HeaderCell>П.</Table.HeaderCell>
                        <Table.HeaderCell>Б.</Table.HeaderCell>
                        <Table.HeaderCell>О.</Table.HeaderCell>
                        <Table.HeaderCell>К.</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {items.map((item => {
                        return <Table.Row key={item.staffId}>
                            <Table.Cell>{item.staffName}</Table.Cell>
                            <Table.Cell>{item.positionName}</Table.Cell>
                                {this.renderDaysCell(item)}
                            <Table.Cell>0</Table.Cell>
                            <Table.Cell>0</Table.Cell>
                            <Table.Cell>0</Table.Cell>
                            <Table.Cell>0</Table.Cell>
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

    componentWillReceiveProps(nextProps){
        if(nextProps.items){
            let update = true
            let localItems = Object.assign([],this.state.localItems)
            if(localItems && localItems.length > 0){
                let year = localItems[0]['year']
                let month = localItems[0]['month']
                for(let k in nextProps.items){
                    if(nextProps.items[k]['year'] === year && nextProps.items[k]['month'] === month){
                        update = false
                        break
                    }
                }
            }

            if(update){
                this.setState({
                    ...this.state,
                    localItems: nextProps.items
                })
            }
        }
    }

    render () {
        return (
            <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                <Segment clearing>
                    <Header as='h3' attached='top'>Табель учета рабочего времени сотрудников</Header>
                    {this.renderSearchForm()}
                </Segment>
                <Divider clearing />
                {this.renderData()}
                <Divider/>
            </Container>
        )
    }
}

function mapStateToProps (state) {
    console.log(state.hrTimesheet)
    return {
        companyOptions: state.userInfo.companyOptions,
        items: state.hrTimesheet.items,
        branchOptionsAll: state.userInfo.branchOptionsAll
    }
}

export default connect(mapStateToProps, {
    fetchItems,saveData
})(TimesheetPage)