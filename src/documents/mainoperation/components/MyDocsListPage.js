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

class DocumentListPage extends Component{
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
                            accessor: 'id',
                            filterable: false,
                            Cell: ({value}) => <Link target={'_blank'} className={'ui icon button mini'} to={`/hr/doc/view/` + value}>
                                Просмотр
                            </Link>
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
        let panes = []
        for (const [k, v] of Object.entries(getMdStatuses())) {
            panes.push({
                menuItem: v,
                render: () => this.renderDataTable()
            })
        }

        let createMenuOptions = []
        for(const [k,v] of Object.entries(getMdContexts())){
            createMenuOptions.push({
                key: k,
                value: k,
                text: v
            })
        }

        return <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
            <Segment clearing>
                <Header as='h2' floated='left'>
                    Мои документы
                </Header>

                <Menu color={'blue'} compact floated={'right'}>
                    <Dropdown onChange={(e,d) => this.createHandler(d.value)} text='Добавить' options={createMenuOptions} simple item />
                </Menu>
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
})(DocumentListPage)