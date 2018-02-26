import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ReactTable from 'react-table';
import "react-table/react-table.css";
import { Tab,Header,Container,Label,Icon,Button,Segment,Menu,Dropdown } from 'semantic-ui-react'
import axios from 'axios';
import {ROOT_URL} from '../../../../utils/constants';
import moment from 'moment';
import VisitCreateModal from './VisitCreateModal';

class VisitArchivePage extends Component{

    constructor(props) {
        super(props)
        this.loadedSuccess = true;
        this.state = {
            callResultOptions:[],
            callRefuseOptions:[],
            items:[],
            loading:false,
            showCreateModal:false
        }

    this.renderTable = this.renderTable.bind(this)
    this.openCreateModal = this.openCreateModal.bind(this)
    this.closeCreateModal = this.closeCreateModal.bind(this)
    this.loadItems = this.loadItems.bind(this)
  }

  loadItems () {
    axios.get(`${ROOT_URL}/api/crm/visit/archive`, {
      headers: {
        authorization: localStorage.getItem('token')}
    }).then((res) => {
      this.setState({
        ...this.state,
        items: res.data,
        loading: false
      })
    }).catch((e) => {
      console.log(e)
    })
  }

  componentWillMount () {
    this.setState({...this.state, loading: true})

    this.loadItems()
    axios.get(`${ROOT_URL}/api/crm/call/results`, {
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

      this.setState({
        ...this.state,
        callResultOptions: loaded
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

  renderTable () {
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
              Header: 'Дата посещения',
              accessor: 'docDate',
              Cell: row => moment(row.value).format('DD.MM.YYYY')
            },
            {
              Header: 'Посетитель',
              accessor: 'visitorName',
              minWidth: 150
            },
            {
              Header: 'Примечание',
              accessor: 'note'
            },
            {
              Header: 'Действия',
              accessor: 'id',
              Cell: row => (
                <Link className={'ui icon button mini'} to={`/crm/visit/view/` + row.value}>
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

  openCreateModal () {
    this.setState({
      ...this.state,
      showCreateModal: true
    })
  }

  closeCreateModal () {
    this.setState({
      ...this.state,
      showCreateModal: false
    })
  }

  render () {
    return (
      <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
        <Segment clearing>
          <Header as='h2' floated='left'>
                        Список визитов группы
          </Header>
          <Button className={'ui icon button primary right floated'} onClick={this.openCreateModal}>
            <Icon name='plus' /> Добавить
          </Button>
        </Segment>
        {this.renderTable()}
        <VisitCreateModal
          modalOpened={this.state.showCreateModal}
          onClose={this.closeCreateModal}
          afterSave={this.loadItems}
        />
      </Container>
    )
  }
}

export default VisitArchivePage
