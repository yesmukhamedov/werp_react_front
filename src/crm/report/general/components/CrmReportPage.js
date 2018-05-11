import React,{Component} from 'react'
import { connect } from 'react-redux'
import { Header,Container,Segment,Divider } from 'semantic-ui-react'

import {fetchItems,fetchMeta} from '../actions/crmReportAction'
import {f4FetchBusinessAreaList} from '../../../../reference/f4/f4_action'
import RepSearch  from './search/RepSearch'
import RepTable from './table/RepTable'

class CrmReportPage extends Component{

    constructor(props){
        super(props)
        this.state = {
            search: {}
        }
    }

    componentWillMount(){
        const id = parseInt(this.props.match.params.id, 10)
        this.props.fetchMeta(id)
        this.props.f4FetchBusinessAreaList()
    }

    render(){

        return <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
            <Segment clearing>
                <Header as='h2' floated='left'>{this.props.meta.title}</Header>
            </Segment>
            <Divider />
            <RepSearch />
            <RepTable/>
        </Container>
    }
}

function mapStateToProps (state) {
    return {
        meta: state.crmReportReducer.meta
    }
}

export default connect(mapStateToProps, {
    fetchItems,fetchMeta,f4FetchBusinessAreaList
})(CrmReportPage)