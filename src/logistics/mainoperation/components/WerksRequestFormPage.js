import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header,Container,Icon,Segment,Divider,Tab,Loader,Menu,Dropdown, Button } from 'semantic-ui-react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import {Link} from 'react-router-dom'
import browserHistory from '../../../utils/history'
import {formatDMYMS} from '../../../utils/helpers'
import {fetchMydocs} from '../actions/documentAction'
import {MD_STATUS_CREATE,getMdStatuses,getDocViewLink,getDocCreateLink,getMdContexts} from '../../documentUtil'

class WerksRequestFormPage extends Component{
    constructor (props) {
        super(props)

        this.state = {
            currentStatus:MD_STATUS_CREATE
        }
    }

    componentWillMount(){
        this.props.fetchMydocs(this.state.currentStatus)
    }

    onTabChange = (e,data) => {
        this.setState({...this.state,currentStatus: data.activeIndex+1})
        this.props.fetchMydocs(data.activeIndex+1)
    }

    renderDataTable () {
        const {mydocs} = this.props;

        return <div>
            {this.props.pageLoading?<Loader active inline='centered' />:
                <ReactTable
                    data={mydocs || []}
                    columns={[
                        {
                            Header: '№',
                            accessor: 'id',
                            maxWidth: 100
                        },
                        {
                            Header: 'Тип документа',
                            accessor: 'displayName',
                            maxWidth: 200
                        },
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
                                return <Link target={'_blank'} className={'ui icon button mini'} to={getDocViewLink(props.original.context,props.original.contextId)}>
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

    createHandler = (v) => {
        browserHistory.push(getDocCreateLink(v))
    }

    render (){
        let panes = [
            {menuItem: 'Новые',render:() => {}}
        ]

        return <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
            <Segment clearing>
                <Header as='h2' floated='left'>
                    Мои документы
                </Header>
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
        mydocs: state.documentReducer.mydocs,
        pageLoading: state.documentReducer.pageLoading
    }
}

export default connect(mapStateToProps, {
    fetchMydocs
})(WerksRequestFormPage)