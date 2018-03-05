import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ReactTable from 'react-table';
import "react-table/react-table.css";
import { Tab,Header,Container,Icon,Segment } from 'semantic-ui-react'
import axios from 'axios';
import {ROOT_URL} from '../../../../utils/constants';
import Phone from './Phone';
import moment from 'moment';
import { connect } from 'react-redux'
import {fetchRecoCurrentData,fetchCallResults,fetchReasons} from '../actions/recoAction';

class RecoCurrentPage extends Component {
  constructor (props) {
    super(props)
    this.loadedSuccess = true
    this.state = {
      // callResultOptions: [],
      // callRefuseOptions: [],
      // usedItems: [],
      // newItems: [],
      // doneItems: [],
      // movedItems: []
    }

    this.renderTabUsed = this.renderTabUsed.bind(this)
    this.renderTabNew = this.renderTabNew.bind(this)
    this.renderTabDemoDone = this.renderTabDemoDone.bind(this)
    this.renderTableMoved = this.renderTableMoved.bind(this)
    this.loadItems = this.loadItems.bind(this)
    this.onCallSaved = this.onCallSaved.bind(this)
  }

  loadItems () {

  }

  componentWillMount () {
      this.props.fetchRecoCurrentData('new')
      this.props.fetchRecoCurrentData('demo-done')
      this.props.fetchRecoCurrentData('moved')
      this.props.fetchRecoCurrentData('used')
      this.props.fetchReasons(1)
      this.props.fetchCallResults()
  }

  renderPhoneCall (e, d) {
    console.log(e)
    console.log(d)
  }

  onCallSaved () {
    console.log('TEST')
    this.loadItems()
  }

  renderPhoneNumbers (recoId, phones) {
    return <div>
      {phones.map((p) => {
        return <Phone
          callRefuseOptions={this.props.callResults}
          callResultOptions={this.props.callResults}
          key={p.id} phoneNumber={p.phoneNumber} phoneId={p.id}
          context='reco' contextId={recoId}
          onCallSaved={this.onCallSaved}
        />
      })}
    </div>
  }

  renderTable (items) {

    return (
      <div>
        <ReactTable
          defaultFilterMethod={(filter, row) => {
            const colName = filter.id === 'phoneNumbers' ? 'phonesAsStr' : filter.id
            if (filter.value && filter.value.length > 0 && row[colName] && row[colName]) {
              return row[colName].toLowerCase().includes(filter.value.toLowerCase())
            }
          }}
          data={items}
          columns={[
            {
              Header: 'Клиент',
              accessor: 'clientName'
            },
            {
              Header: '',
              accessor: 'phonesAsStr',
              show: false
            },
            {
              Header: 'Рекомендатель',
              accessor: 'recommenderName'
            },
            {
              Header: 'Дата звонка',
              id: 'callDate',
              accessor: (row) => {
                if (row['callDate']) {
                  return moment(row['callDate']).format('DD.MM.YYYY HH:mm')
                }
                return ''
              }
            },
            {
              Header: 'Тел. номера',
              id: 'phoneNumbers',
              accessor: row => this.renderPhoneNumbers(row.id, row.phones)
            },
            {
              Header: 'Отв. сотрудник',
              accessor: 'responsibleName'
            },
            {
              Header: 'Примечание',
              accessor: 'note'
            },
            {
              Header: 'Категория',
              accessor: 'categoryName'
              // id:"categoryId",
              // Cell:row => <Button color={categoryButtons[row.id]}>{row.id}</Button>
            },
            {
              Header: 'Статус',
              accessor: 'statusName'
            },
            {
              Header: '',
              accessor: 'id',
              filterable: false,
              Cell: ({value}) => <Link className={'ui icon button mini'} to={`/crm/reco/view/` + value}>
                                Просмотр
              </Link>
            }
          ]}
          previousText={'Пред.'}
          nextText={'След.'}
          defaultPageSize={50}
          filterable
          className='-striped -highlight' />
      </div>
    )
  }

  renderTabDemoDone () {
    return this.renderTable(this.props.doneItems)
  }

  renderTabNew () {
    return this.renderTable(this.props.newItems)
  }

  renderTabUsed () {
    return this.renderTable(this.props.usedItems)
  }

  renderTableMoved () {
    return this.renderTable(this.props.movedItems)
  }

  render () {
    const panes = [
      { menuItem: 'Использованные', render: this.renderTabUsed },
      { menuItem: 'Новые', render: this.renderTabNew },
      { menuItem: 'Пройденные (для перезвона)', render: this.renderTabDemoDone },
      { menuItem: 'Перенесенные', render: this.renderTableMoved }
    ]
    return (
      <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
        <Segment clearing>
          <Header as='h2' floated='left'>
                        Текущие рекомендации
          </Header>
          <Link className={'ui icon button primary right floated'} to={`/crm/reco/create`}>
            <Icon name='plus' /> Добавить
          </Link>
        </Segment>
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
      </Container>
    )
  }
}

function mapStateToProps (state) {
    return {
        newItems:state.crmReco.newItems,
        doneItems:state.crmReco.doneItems,
        usedItems:state.crmReco.usedItems,
        movedItems:state.crmReco.movedItems,
        reasons:state.crmReco.reasons,
        callResults:state.crmReco.callResults
    }
}

export default connect(mapStateToProps, {fetchRecoCurrentData,fetchReasons,fetchCallResults})(RecoCurrentPage)
