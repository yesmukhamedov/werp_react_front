import React, {Component} from 'react'
import { connect } from 'react-redux'

import { Header,Container,Segment,Divider,Button } from 'semantic-ui-react'
import HrDocActions from './HrDocActions'
import HrDocMainData from './HrDocMainData'
import HrDocData from './HrDocData'
import HrDocApprovers from './HrDocApprovers'
import HrDocLog from './HrDocLog'
import {fetchDocument} from '../actions/hrDocAction'

class HrDocViewPage extends Component{

    componentWillMount (){
        const id = parseInt(this.props.match.params.id,10)
        this.props.fetchDocument(id)
    }

    render (){
        return <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
            <Segment clearing>
                <Header as='h2' floated='left'>
                    Просмотр документа Заявление о приеме на работу, №
                </Header>
                <HrDocActions />
            </Segment>
            <Divider clearing />

            <HrDocMainData item={this.props.document}/>
            <HrDocData/>
            <HrDocApprovers/>
            <HrDocLog/>
        </Container>
    }
}

function mapStateToProps (state) {
    return {
        document:state.hrDocReducer.item,
        actions: state.hrDocReducer.actions
    }
}

export default connect(mapStateToProps, {
    fetchDocument
})(HrDocViewPage)