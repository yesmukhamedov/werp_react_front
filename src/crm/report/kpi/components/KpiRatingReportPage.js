import React, {Component} from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import axios from 'axios'
import {Container, Header, Segment, Form, Divider, Tab,Loader} from 'semantic-ui-react'
import {ROOT_URL} from '../../../../utils/constants'
import BukrsF4 from '../../../../reference/f4/bukrs/BukrsF4'
import BranchF4 from '../../../../reference/f4/branch/BranchF4'
import YearF4 from '../../../../reference/f4/date/YearF4'
import MonthF4 from '../../../../reference/f4/date/MonthF4'

const currentDate = new Date()

const DEALER_POSITION_ID = 4;
const STAZHER_DEALER_POSITION_ID = 67;
const MANAGER_POSITION_ID = 3;
const DIRECTOR_POSITION_ID = 10;

class KpiRatingReportPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
        items:{
            STAZHER_DEALER_POSITION_ID:[],
            DEALER_POSITION_ID: [],
            MANAGER_POSITION_ID:[],
            DIRECTOR_POSITION_ID:[]
        },
      loading: false,
      bukrs: '',
      branches: [],
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      positionId:STAZHER_DEALER_POSITION_ID,
        loadedMap:{}
    }

    this.handleDropdownChange = this.handleDropdownChange.bind(this)
    this.loadItems = this.loadItems.bind(this)
    this.onTabChange = this.onTabChange.bind(this)
      this.renderDataTable = this.renderDataTable.bind(this)
  }

  componentWillMount () {
      this.loadItems()
  }

  loadItems () {
    this.setState({
      ...this.state,
      loading: true
    })
      let {bukrs,branches,positionId,year,month,items} = this.state;
    axios.get(`${ROOT_URL}/api/crm/report/kpi-rating`, {
      headers: {
        authorization: localStorage.getItem('token')
      },
      params: {
        bukrs: bukrs,
        branchIds: branches.join(','),
        year: year,
        month: month,
        positionId: positionId
      }
    }).then((res) => {
        items[positionId] = res.data
      this.setState({
        ...this.state,
        items:items,
        loading: false
      })
    }).catch((e) => {
      console.log(e)
      this.setState({
        ...this.state,
        loading: false
      })
    })
  }

onTabChange(e,data){
      let positionId = STAZHER_DEALER_POSITION_ID
      switch (data.activeIndex){
          case 1:
              positionId = DEALER_POSITION_ID
              break

          case 2:
              positionId = MANAGER_POSITION_ID
              break

          case 3:
              positionId = DIRECTOR_POSITION_ID
              break

          default:{}
      }

      this.setState({...this.state,positionId:positionId})
}

  renderDataTable (positionId) {
    const {loading,items} = this.state;
    if(loading){
        return <div>
                    <Loader style={{'marginTop':100}} active={true}/>
                </div>
    }
    return <div>
      <ReactTable
        data={items[positionId] || []}
        columns={[
          {
            Header: 'Компания',
            accessor: 'bukrsName',
            maxWidth: 100
          },
          {
            Header: 'Филиал',
            accessor: 'branchName',
            maxWidth: 150
          },
          {
            Header: 'Сотрудник',
            accessor: 'name'
          },
          {
            Header: 'KPI %',
            id: 'totalScore',
            maxWidth: 150,
            accessor: row => this.roundedValue(row.totalScore)
          }
        ]}

        defaultSorted={[
          {
            id: 'score',
            desc: true
          }
        ]}
        defaultPageSize={50}
        className='-striped -highlight' />
    </div>
  }

  submitSearch () {
    this.loadItems()
  }

  handleDropdownChange (e, result) {
    const {value} = result
    this.setState({name:value})
  }

  renderSearchForm () {
    return <Form>
      <Form.Group widths='equal'>
        <BukrsF4 handleChange={this.handleDropdownChange} />
        <BranchF4 search multiple handleChange={this.handleDropdownChange} bukrs={this.state.bukrs} />
        <YearF4 handleChange={this.handleDropdownChange} />
        <MonthF4 handleChange={this.handleDropdownChange} />
      </Form.Group>
      <Form.Button onClick={this.loadItems}>Сформировать</Form.Button>
    </Form>
  }

  render () {
      const panes = [
          { menuItem: 'Стажеры', render: () => this.renderDataTable(STAZHER_DEALER_POSITION_ID) },
          { menuItem: 'Дилеры', render: () => this.renderDataTable(DEALER_POSITION_ID) },
          { menuItem: 'Менеджеры', render: () => this.renderDataTable(MANAGER_POSITION_ID) },
          { menuItem: 'Директоры', render: () => this.renderDataTable(DIRECTOR_POSITION_ID) }
      ]
    return (
      <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
        <div>
          <Header as='h2' attached='top'>Рейтинг сотрудников отдела маркетинга</Header>
          {this.renderSearchForm()}
          <Divider clearing />
          <Segment attached>
              <Tab onTabChange={this.onTabChange} menu={{ secondary: true, pointing: true }} panes={panes} />
          </Segment>
        </div>
      </Container>
    )
  }

  roundedValue (v) {
    return Math.round(v * 100) / 100
  }
}

export default KpiRatingReportPage
