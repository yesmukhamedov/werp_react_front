import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ReactTable from 'react-table'
import { Header, Container, Segment, Form, Table, Loader } from 'semantic-ui-react'
import LazyPagination from '../../../../general/pagination/LazyPagination'
import axios from 'axios'
import {ROOT_URL} from '../../../../utils/constants'
import DatePicker from 'react-datepicker'
import moment from 'moment'

class DemoArchivePage extends Component {
  constructor (props) {
    super(props)
    this.loadedSuccess = true
    this.state = {
      callResultOptions: [],
      callRefuseOptions: [],
      items: [],
      page: 0,
      perPage: 30,
      totalRows: 0,
      dealers: [],
      results: [],
      dateFrom: null,
      dateTo: null,
      searchModel: {
        id: 0,
        clientName: '',
        dealerId: 0,
        appointedBy: 0,
        resultId: '',
        dateFrom: '',
        dateTo: ''
      },
      loading: false
    }

    this.renderTable = this.renderTable.bind(this)
    this.onPaginationItemClick = this.onPaginationItemClick.bind(this)
    this.loadItems = this.loadItems.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  loadItems (page) {
    this.setState({...this.state, loading: true})
    let {searchModel} = this.state
    let temp = []
    temp.push('page=' + page)
    temp.push('perPage=' + this.state.perPage)
    for (let key in searchModel) {
      if (searchModel.hasOwnProperty(key)) {
        if (key != 'dateFrom' && key != 'dateTo') { temp.push(key + '=' + encodeURIComponent(searchModel[key])) }
      }
    }
    let q = temp.join('&')
    axios.get(`${ROOT_URL}/api/crm/demo/archive?` + q, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
      .then((res) => {
        this.setState({
          ...this.state,
          items: res.data['items'],
          totalRows: res.data['meta']['totalRows'],
          page: res.data['meta']['page'],
          loading: false
        })
      }).catch((e) => {
        console.log(e)
      })
  }

  componentWillMount () {
    this.loadItems(0)

    axios.get(`${ROOT_URL}/api/hr/pyramid/crm/group-dealers`, {
      headers: {
        authorization: localStorage.getItem('token')}
    }).then((res) => {
      let loaded = res.data.map((item) => {
        return {
          key: item.staffId,
          text: item.lastname + ' ' + item.firstname,
          value: item.staffId
        }
      })
      loaded.unshift({
        key: 0,
        text: 'Не выбрано',
        value: 0
      })
      this.setState({
        ...this.state,
        dealers: loaded
      })
    }).catch((e) => {
      console.log(e)
    })

    axios.get(`${ROOT_URL}/api/crm/demo/results`, {
      headers: {
        authorization: localStorage.getItem('token')}
    }).then((res) => {
      let loaded = Object.keys(res.data).map((k) => {
        return {
          key: k,
          text: res.data[k],
          value: k
        }
      })

      loaded.unshift({
        key: '',
        text: 'Не выбрано',
        value: ''
      })

      this.setState({
        ...this.state,
        results: loaded
      })
    }).catch((e) => {
      console.log(e)
    })

    axios.get(`${ROOT_URL}/api/reference/reasons/1`, {
      headers: {
        authorization: localStorage.getItem('token')}
    }).then((res) => {
      let loaded = res.data.map((item) => {
        return {
          key: item.id,
          text: item.name,
          value: item.id
        }
      })

      this.setState({
        ...this.state,
        callRefuseOptions: loaded
      })
    }).catch((e) => {
      console.log(e)
    })
  }

  renderPhoneCall (e, d) {
    console.log(e)
    console.log(d)
  }

  onPaginationItemClick (page) {
    this.loadItems(page)
  }

  handleChange (fieldName, o) {
    let {searchModel} = this.state
    let {value} = o

    switch (fieldName) {
      case 'dealerId':
      case 'resultId':
        searchModel[fieldName] = value
        break

      default:
        break
    }

    this.setState({...this.state, searchModel: searchModel})
  }

  handleChangeDate (p1, p2) {
    console.log(p1)
    console.log(p2)
  }

  renderSearchForm () {
    return <Form>
      <Form.Group widths='equal'>
        <Form.Select fluid label='Дилер' options={this.state.dealers} placeholder='Дилер' onChange={(e, v) => this.handleChange('dealerId', v)} />
        <Form.Select fluid label='Результат' options={this.state.results} placeholder='Результат' onChange={(e, v) => this.handleChange('resultId', v)} />
        <Form.Input fluid label='ФИО клиента' placeholder='ФИО клиента' />
        <Form.Field>
          <label>Дата С</label>
          <DatePicker
            label=''
            placeholderText={'Дата-время звонка'}
            showMonthDropdown showYearDropdown dropdownMode='select'
            dateFormat='DD.MM.YYYY HH:mm'
            selected={this.state.dateFrom}
            onChange={(v) => this.handleChangeDate(v)}
          />
        </Form.Field>
        <Form.Field>
          <label>Дата По</label>
          <DatePicker
            label=''
            placeholderText={'Дата-время звонка'}
            showMonthDropdown showYearDropdown dropdownMode='select'
            dateFormat='DD.MM.YYYY HH:mm'
            selected={this.state.dateTo}
            onChange={(v) => this.handleChangeDate(v)}
          />
        </Form.Field>
        <Form.Field>
          <label>&nbsp;</label>
          <Form.Button onClick={() => this.loadItems(0)}>Сформировать</Form.Button>
        </Form.Field>
      </Form.Group>
    </Form>
  }

  renderTable () {
    if (this.state.loading) {
      return <Loader active />
    }
    return <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>№</Table.HeaderCell>
          <Table.HeaderCell>Филиал</Table.HeaderCell>
          <Table.HeaderCell>Клиент</Table.HeaderCell>
          <Table.HeaderCell>Отв. сотрудник</Table.HeaderCell>
          <Table.HeaderCell>Назначел(а)</Table.HeaderCell>
          <Table.HeaderCell>Результат</Table.HeaderCell>
          <Table.HeaderCell>Дата-время демо</Table.HeaderCell>
          <Table.HeaderCell />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {this.state.items.map((item, idx) => {
          return <Table.Row key={idx}>
            <Table.Cell>{item.id}</Table.Cell>
            <Table.Cell>{item.branchName}</Table.Cell>
            <Table.Cell>{item.clientName}</Table.Cell>
            <Table.Cell>{item.dealerName}</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>{item.resultName}</Table.Cell>
            <Table.Cell>{item.dateTime}</Table.Cell>
            <Table.Cell><Link className={'ui icon button mini'} to={`/crm/demo/view/` + item.id}>
                            Просмотр
            </Link></Table.Cell>
          </Table.Row>
        })}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan='8'>
            <LazyPagination
              onItemClick={this.onPaginationItemClick}
              totalRows={this.state.totalRows}
              currentPage={this.state.page}
              perPage={this.state.perPage} />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  }

  renderTable1 () {
    return (
      <div>
        <ReactTable
          loading={this.state.loading}
          data={this.state.items}
          columns={[
            {
              Header: '№',
              accessor: 'id',
              maxWidth: 70
            },
            {
              Header: 'Клиент',
              accessor: 'clientName'
            },
            {
              Header: 'Адрес',
              accessor: 'address'
            },
            {
              Header: 'Дата-время',
              accessor: 'dateTime',
              Cell: row => moment(row.value).format('DD.MM.YYYY HH:mm')
            },
            {
              Header: 'Дилер',
              accessor: 'dealerName',
              minWidth: 150
            },
            {
              Header: 'Примечание',
              accessor: 'note'
            },

            {
              Header: 'Результат',
              accessor: 'resultName'
            },
            {
              Header: 'Действия',
              accessor: 'id',
              Cell: row => (
                <Link className={'ui icon button mini'} to={`/crm/demo/view/` + row.value}>
                                    Просмотр
                </Link>
              ),
              filterable: false
            }
          ]}

          filterable
          className='-striped -highlight' />
      </div>
    )
  }

  render () {
    return (
      <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
        <Segment clearing>
          <Header as='h2' floated='left'>
                        Архив демонстрации группы
          </Header>
        </Segment>
        <Segment clearing>
          {this.renderSearchForm()}
        </Segment>
        {this.renderTable()}
      </Container>
    )
  }
}

export default DemoArchivePage
