import React,{Component} from 'react'
import { Header,Container,Icon,Segment,Divider,Tab,Loader } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { connect } from 'react-redux'
import {fetchRecruitmentItems} from '../actions/hrDocAction'
import {formatDMYMS} from '../../../../utils/helpers'

class HrRecruitmentPage extends Component{

    constructor (props) {
        super(props)
        this.state = {
            currentStatus:1
        }
        this.renderDataTable = this.renderDataTable.bind(this)
        this.onTabChange = this.onTabChange.bind(this)
    }

    componentWillMount (){
        this.props.fetchRecruitmentItems(this.state.currentStatus)
    }

    onTabChange(e,data){
        this.setState({...this.state,currentStatus: data.activeIndex+1})
        this.props.fetchRecruitmentItems(data.activeIndex+1)
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

    render(){
        const panes = [
            { menuItem: 'Созданные', render: () => this.renderDataTable() },
            { menuItem: 'Входящие', render: () => this.renderDataTable() },
            { menuItem: 'Отправленные', render: () => this.renderDataTable() },
            { menuItem: 'Согласованные', render: () => this.renderDataTable() },
            { menuItem: 'Закрытые', render: () => this.renderDataTable() },
            { menuItem: 'Отказанные', render: () => this.renderDataTable() }
        ]

        return (
            <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                <Segment clearing>
                    <Header as='h2' floated='left'>
                        Заявки о приеме на работу
                    </Header>
                    <Link className={'ui icon button primary right floated'} to={`/hr/doc/recruitment/create`}>
                        <Icon name='plus' /> Добавить
                    </Link>
                </Segment>
                <Divider clearing />
                <Segment attached>
                    <Tab onTabChange={this.onTabChange} menu={{ secondary: true, pointing: true }} panes={panes} />
                </Segment>
            </Container>
        )
    }
}

function mapStateToProps (state) {
    return {
        items: state.hrDocReducer.items,
        pageLoading: state.hrDocReducer.pageLoading
    }
}

export default connect(mapStateToProps, {
    fetchRecruitmentItems
})(HrRecruitmentPage)