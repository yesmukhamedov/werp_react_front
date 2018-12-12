import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header,Container,Segment,Divider,Tab,Loader,Icon } from 'semantic-ui-react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import {Link} from 'react-router-dom'
import {fetchWerksRequestsByStatus} from '../actions/logisticsActions'
import {formatDMYMS} from '../../../utils/helpers'
import {WERKS_REQUEST_STATUS_NEW,WERKS_REQUEST_STATUS_CLOSED} from '../../logUtil'

class WerksRequestListPage extends Component{
    constructor (props) {
        super(props)

        this.state = {}

        this.loadItems = this.loadItems.bind(this);
        this.renderDataTable = this.renderDataTable.bind(this);
    }

    componentWillMount(){
        this.loadItems(WERKS_REQUEST_STATUS_NEW);
    }

    loadItems (statusId){
        this.props.fetchWerksRequestsByStatus(statusId)
    }

    onTabChange = (e,data) => {
        if(data.activeIndex === 0){
            this.loadItems(WERKS_REQUEST_STATUS_NEW)
        } else {
            this.loadItems(WERKS_REQUEST_STATUS_CLOSED)
        }
    }

    getDocViewLink(){
        return ''
    }

    renderDataTable () {
        const {items} = this.props;

        return <div>
            {this.props.pageLoading?<Loader active inline='centered' />:
                <ReactTable
                    data={items || []}
                    columns={[
                        {
                            Header: '№',
                            accessor: 'id',
                            maxWidth: 100
                        },
                        {
                            Header: 'Документ',
                            accessor: 'displayName',
                            maxWidth: 200,
                            Cell: (props) => {
                                return "Внутренние документы";
                            }
                        },
                        {
                            Header: 'Филиал ',
                            accessor: 'branchName',
                            maxWidth: 250
                        },
                        {
                            Header: 'Филиал исполнитель',
                            accessor: 'resBranchName',
                            maxWidth: 250
                        },
                        {
                            Header: 'Автор',
                            accessor: 'creatorName',
                            maxWidth: 250
                        },
                        {
                            Header: 'Дата создания',
                            accessor: 'createdAt',
                            Cell: (props) => {
                                const {createdAt} = props.original
                                return formatDMYMS(createdAt)
                            }
                        },
                        {
                            Header: '',
                            accessor: 'contextId',
                            filterable: false,
                            Cell: (props) => {
                                return <Link target={'_blank'} className={'ui icon button mini'} to={this.getDocViewLink(props.original.context,props.original.contextId)}>
                                    Просмотр
                                </Link>
                            }
                        }
                    ]}

                    indexKey="indexKey"
                    defaultPageSize={50}
                    className='-striped -highlight' />}
        </div>
    }

    render (){
        let panes = [
            {menuItem: 'Новые',render:() => this.renderDataTable()},
            {menuItem: 'Закрытые',render:this.renderDataTable}
        ]

        return <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
            <Segment clearing>
                <Header as='h2' floated='left'>
                    Внутренние заявки
                </Header>
                <Link className={'ui icon button primary right floated'} to={`/logistics/werks/requests/create`}>
                    <Icon name='plus' /> Добавить
                </Link>
            </Segment>
            <Divider clearing />
            <Segment attached>
                <Tab onTabChange={this.onTabChange} menu={{ secondary: true, pointing: true }} panes={panes} />
            </Segment>
        </Container>
    }
}

function mapStateToProps (state) {
    return {
        items: state.logisticsReducer.werksRequests
    }
}

export default connect(mapStateToProps, {
    fetchWerksRequestsByStatus
})(WerksRequestListPage)