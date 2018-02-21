import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {Container, Divider, Menu, Table, Icon, Header, Button, Segment, Form, Grid} from 'semantic-ui-react'
import {ROOT_URL} from '../../../../utils/constants'
import BukrsF4 from '../../../../reference/f4/bukrs/BukrsF4'
import BranchF4 from '../../../../reference/f4/branch/BranchF4'
import PositionF4 from '../../../../reference/f4/position/PositionF4'

const PAGINATION_TOTAL_COUNT_KEY = 'X-Pagination-Total-Count'
const PAGINATION_CURRENT_PAGE_KEY = 'X-Pagination-Current-Page'
const PAGINATION_PER_PAGE_KEY = 'X-Pagination-Per-Page'

class StaffList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      items: [],
      queryParams: {
        bukrs: '',
        branchIds: [],
        iinBin: '',
        firstName: '',
        lastName: '',
        departmentId: 0,
        positionId: 0,
        page: 0
      }
    }

    this.handleDropdownChange = this.handleDropdownChange.bind(this)
    this.loadItems = this.loadItems.bind(this)
  }

  componentWillMount () {
    this.loadItems()
  }

  loadItems () {
    const {queryParams} = this.state
    if (queryParams.branchIds) {
      queryParams['branchIds'] = queryParams.branchIds.join()
    }

    axios.get(`${ROOT_URL}/api/hr/staff`, {
      headers: {
        authorization: localStorage.getItem('token')
      },
      params: this.state.queryParams
    })
      .then((response) => {
        console.log(response.headers[PAGINATION_CURRENT_PAGE_KEY])
        console.log(response['data'])
        this.setState({
          ...this.state,
          items: response['data']
        })
      }).catch((error) => {
        console.log(error)
      })
  }

  redirectToView (e, staffId) {
    this.props.history.pushState(null, '/hr/staff/view/' + staffId)
  }

  renderTableHeader () {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>StaffID</Table.HeaderCell>
          <Table.HeaderCell>Фамилия</Table.HeaderCell>
          <Table.HeaderCell>Имя</Table.HeaderCell>
          <Table.HeaderCell>Отчество</Table.HeaderCell>
          <Table.HeaderCell>ИИН</Table.HeaderCell>
          <Table.HeaderCell>Должности</Table.HeaderCell>
          <Table.HeaderCell>Действия</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    )
  }

  renderTableBody () {
    return (
      <Table.Body>
        {this.state.items.map((item, idx) => {
          return (
            <Table.Row key={idx}>
              <Table.Cell>{item.staffId}</Table.Cell>
              <Table.Cell>{item.lastname}</Table.Cell>
              <Table.Cell>{item.firstname}</Table.Cell>
              <Table.Cell>{item.middlename}</Table.Cell>
              <Table.Cell>{item.iin}</Table.Cell>
              <Table.Cell />
              <Table.Cell>
                <Link className={'ui icon button'} to={`/hr/staff/view/${item.staffId}`}>
                  <Icon name='eye' />
                </Link>

                <Link className={'ui icon button'} to={`/hr/staff/update/${item.staffId}`}>
                  <Icon name='pencil' />
                </Link>

              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    )
  }

  renderTableFooter () {
    return (
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan='7'>
            <Menu floated='right' pagination>
              <Menu.Item as='a' icon>
                <Icon name='left chevron' />
              </Menu.Item>
              <Menu.Item as='a'>1</Menu.Item>
              <Menu.Item as='a'>2</Menu.Item>
              <Menu.Item as='a'>3</Menu.Item>
              <Menu.Item as='a'>4</Menu.Item>
              <Menu.Item as='a' icon>
                <Icon name='right chevron' />
              </Menu.Item>
            </Menu>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    )
  }

  renderSearchPanel () {
    return <div>
      <Header as='h4' attached='top'>
                Расширенный поиск
      </Header>
      <Segment attached>
        <Form>
          <BukrsF4 handleChange={this.handleDropdownChange} />
          <BranchF4 search multiple handleChange={this.handleDropdownChange} bukrs={this.state.queryParams.bukrs} />
          <PositionF4 handleChange={this.handleDropdownChange} />
          <Form.Field>
            <Form.Select name='resultIds' label='Результат'
              fluid multiple selection options={this.state.resultOptions} placeholder='Результат' onChange={this.handleDropdown} />
          </Form.Field>

          <Button loading={this.state.btnLoading} onClick={this.loadItems} type='submit'>Сформировать</Button>
        </Form>
      </Segment>
    </div>
  }

  handleDropdownChange (e, o) {
    let {name, value} = o
    let {queryParams} = this.state
    switch (name) {
      case 'bukrs':
        queryParams[name] = value
        queryParams['branchIds'] = []
        break

      case 'branch':
        queryParams['branchIds'] = value
        break

      case 'position':
        queryParams['positionId'] = value
        break

      case 'resultIds':
        queryParams[name] = value
        break

      default:
        queryParams[name] = value
        break
    }

    this.setState({
      ...this.state,
      queryParams: queryParams
    })
  }

  render () {
    return (
      <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
        <Header as='h2' block>
                    Список сотрудников
        </Header>
        <Divider />
        <Grid>
          <Grid.Column floated='left' width={4}>
            {this.renderSearchPanel()}
          </Grid.Column>

          <Grid.Column floated='left' width={12}>
            <Table celled striped>
              {this.renderTableHeader()}
              {this.renderTableBody()}
              {this.renderTableFooter()}
            </Table>
          </Grid.Column>
        </Grid>
        <Divider />
      </Container>
    )
  }
}

export default StaffList
