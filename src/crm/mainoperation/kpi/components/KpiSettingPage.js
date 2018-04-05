import React, {Component} from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { connect } from 'react-redux'
import {Container, Header, Segment, Form, Divider, Table,Button,Icon} from 'semantic-ui-react'
import BukrsF4 from '../../../../reference/f4/bukrs/BukrsF4'
import BranchF4 from '../../../../reference/f4/branch/BranchF4'
import YearF4 from '../../../../reference/f4/date/YearF4'
import MonthF4 from '../../../../reference/f4/date/MonthF4'
import {fetchItems,fetchIndicators,blankItem,toggleKpiSettingFormModal} from '../actions/kpiSettingAction'
import KpiFormModal from './KpiFormModal'

class KpiSettingPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      bukrs: null,
      branchId: null,
      positionId:null
    }

    this.loadItems = this.loadItems.bind(this)
      this.renderDataTable = this.renderDataTable.bind(this)
      this.handleDropdownChange = this.handleDropdownChange.bind(this)
      this.showFormModal = this.showFormModal.bind(this)
  }

  componentWillMount () {
      this.loadItems()
      this.props.fetchIndicators()
  }

  loadItems () {
    this.setState({
      ...this.state,
      loading: true
    })
      let {bukrs,branchId,positionId,year,month} = this.state;
    this.props.fetchItems({
        bukrs: bukrs,
        branchId: branchId,
        year: year,
        month: month,
        positionId: positionId
    });
  }

  showFormModal(){
      this.props.blankItem()
      this.props.toggleKpiSettingFormModal(true)
  }

  renderIndicators(items){
      return <Table>
          <Table.Header>
              <Table.Row>
                  <Table.HeaderCell>Индикатор</Table.HeaderCell>
                  <Table.HeaderCell>План</Table.HeaderCell>
                  <Table.HeaderCell>Балл</Table.HeaderCell>
              </Table.Row>
          </Table.Header>
          <Table.Body>
              {items.map((row) => {
                  return <Table.Row key={row.id}>
                      <Table.Cell>{row.indicatorName}</Table.Cell>
                      <Table.Cell>{row.value}</Table.Cell>
                      <Table.Cell>{row.point}</Table.Cell>
                  </Table.Row>
              })}
          </Table.Body>

          <Table.Footer fullWidth>
              <Table.Row>
                  <Table.HeaderCell />
                  <Table.HeaderCell colSpan='2'>
                      <Button icon floated={'right'}>
                          <Icon name='pencil' />
                      </Button>
                  </Table.HeaderCell>
              </Table.Row>
          </Table.Footer>
      </Table>
  }

  renderDataTable () {
    const {items} = this.props;
    return <div>
      <ReactTable
        data={items || []}
        columns={[
          {
            Header: 'Компания',
            accessor: 'bukrsName',
            maxWidth: 150
          },
          {
            Header: 'Филиал',
            accessor: 'branchName',
            maxWidth: 250
          },
          {
            Header: 'Должность',
            accessor: 'positionName',
              maxWidth:120
          },
            {
                Header: 'Год',
                accessor: 'year',
                maxWidth: 120
            },
            {
                Header: 'Месяц',
                accessor: 'month',
                maxWidth: 120
            },
            {
                Header:'Индикаторы',
                accessor:'items',
                Cell:row => this.renderIndicators(row.value)
            }
        ]}

        indexKey="indexKey"
        defaultPageSize={50}
        className='-striped -highlight' />
    </div>
  }

  submitSearch () {
    this.loadItems()
  }

    handleDropdownChange (e, result) {
        const {value,name} = result
        let {bukrs,branchId,month,year} = this.state;
        if(name === 'bukrs'){
            bukrs = value;
        }else if(name === 'branch'){
            branchId = value
        }else if(name === 'month'){
            month = value
        }else if(name === 'year'){
            year = value
        }
        this.setState({
            ...this.state,
            bukrs:bukrs,
            branchId:branchId,
            year:year,
            month:month
        })
    }

  renderSearchForm () {
    return <Form>
      <Form.Group widths='equal'>
        <BukrsF4 handleChange={this.handleDropdownChange} />
        <BranchF4 search handleChange={this.handleDropdownChange} bukrs={this.state.bukrs} />
        <YearF4 handleChange={this.handleDropdownChange} />
        <MonthF4 handleChange={this.handleDropdownChange} />
      </Form.Group>
      <Form.Button onClick={this.loadItems}>Сформировать</Form.Button>
    </Form>
  }

  render () {
    return (
      <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
        <div>
          <Header as='h2' attached='top'>Рейтинг сотрудников отдела маркетинга</Header>
          {this.renderSearchForm()}
            <Button icon primary floated={'right'} onClick={this.showFormModal}>
                <Icon name='plus' /> Добавить
            </Button>
          <Divider clearing />
          <Segment attached>
              <KpiFormModal/>
              {this.renderDataTable()}
          </Segment>
        </div>
      </Container>
    )
  }
}

function mapStateToProps (state) {
    return {
        items:state.crmKpiSetting.items
    }
}

export default connect(mapStateToProps, {fetchItems,fetchIndicators,blankItem,toggleKpiSettingFormModal})(KpiSettingPage)
