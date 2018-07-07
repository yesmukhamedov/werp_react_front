import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ReactTable from 'react-table';
import "react-table/react-table.css";
import { Header,Container,Icon,Button,Segment } from 'semantic-ui-react'
import moment from 'moment';
import VisitCreateModal from './VisitCreateModal';
import {fetchArchive,modalToggle,setVisitForUpdate,blankForCreate} from '../actions/visitAction'
import {fetchGroupDealers} from '../../demo/actions/demoAction'
import { connect } from 'react-redux'
import matchSorter from 'match-sorter';

class VisitArchivePage extends Component{

    constructor(props) {
        super(props)
        this.loadedSuccess = true;
        this.state = {
            callResultOptions:[],
            callRefuseOptions:[],
            showCreateModal:false
        }

    this.renderTable = this.renderTable.bind(this)
        this.toUpdate = this.toUpdate.bind(this)
        this.toCreate = this.toCreate.bind(this)
  }

  componentWillMount () {
    this.props.fetchArchive()
      this.props.fetchGroupDealers()
  }

  toUpdate(visit){
        this.props.setVisitForUpdate(visit)
        this.props.modalToggle(true)
  }

  renderTable () {
    return (
      <div>
        <ReactTable
          data={this.props.visits || []}
          columns={[
            {
              Header: '№',
              accessor: 'id',
              maxWidth: 70
            },
            {
              Header: 'Клиент',
              accessor: 'clientName',
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["clientName"] }),
                filterAll: true,
            },
            {
              Header: 'Адрес',
              accessor: 'address',
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["address"] }),
                filterAll: true
            },
            {
              Header: 'Дата посещения',
              accessor: 'docDate',
              filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["docDate"] }),
                filterAll: true,
              Cell: row => moment(row.value).format('DD.MM.YYYY')
            },
            {
              Header: 'Посетитель',
              accessor: 'visitorId',
                minWidth: 150,
                Cell: (row) => {
                  return row.original.visitorName
                },
                filterMethod: (filter, d) => {
                    if (filter.value == 0) {
                        return true;
                    }

                    return filter.value == d[filter.id]
                },
                Filter: ({ filter, onChange }) =>
                    <select
                        onChange={event => onChange(event.target.value)}
                        style={{ width: "100%" }}
                        value={filter ? filter.value : "Все"}
                    >
                        {this.props.dealers.map((d) => {
                            return <option key={d.key} value={d.key}>{d.text}</option>
                        })}
                    </select>
            },
            {
              Header: 'Примечание',
              accessor: 'note',
                filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["note"] }),
                filterAll: true
            },
            {
              Header: 'Действия',
              accessor: 'id',
              Cell: row => (
                <div>
                      <Link className={'ui icon button mini'} to={`/crm/visit/view/` + row.value}>
                                        <Icon name={'eye'}/>
                    </Link>
                    <Button icon size={'mini'} onClick={() => this.toUpdate(row.original)}>
                        <Icon name={'pencil'}/>
                    </Button>
                </div>
              ),
              filterable: false
            }
          ]}

          filterable
          className='-striped -highlight' />
      </div>
    )
  }

  toCreate(){
      this.props.blankForCreate()
      this.props.modalToggle(true)
  }

  render () {
    return (
      <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
        <Segment clearing>
          <Header as='h2' floated='left'>
                        Список визитов группы
          </Header>
        </Segment>
        {this.renderTable()}
        <VisitCreateModal fromComponent="archive" />
      </Container>
    )
  }
}

function mapStateToProps (state) {
    return {
        visits: state.crmVisit.visits,
        dealers:state.crmDemo.dealers
    }
}

export default connect(mapStateToProps, {fetchArchive,modalToggle,setVisitForUpdate,blankForCreate,fetchGroupDealers})(VisitArchivePage)
