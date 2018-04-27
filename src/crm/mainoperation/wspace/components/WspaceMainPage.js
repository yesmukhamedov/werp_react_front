import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ReactTable from 'react-table';
import "react-table/react-table.css";
import { Tab,Header,Container,Icon,Segment,Label,Divider } from 'semantic-ui-react'
import moment from 'moment';
import { connect } from 'react-redux'
import {RECO_CATEGORIES} from '../../../crmUtil'
import '../css/main-page.css'
import {fetchGroupDealers} from '../../demo/actions/demoAction'
import WspaceHeader from './WspaceHeader'
import WspaceMenu from './WspaceMenu'

class WspaceMainPage extends Component {
  constructor (props) {
    super(props)
      this.state = {
        currentStaff:{}
      }

      this.onSelectStaff = this.onSelectStaff.bind(this)
  }

  componentWillMount () {
      this.props.fetchGroupDealers()
  }

  onSelectStaff(staff){
      this.setState({
          ...this.state,
          currentStaff: staff
      })
  }

  render () {
      const {currentStaff} = this.state
    return (
      <Container fluid className={'main-container'}>
          <WspaceHeader
              dealers={this.props.dealers}
              currentId={currentStaff.value}
              onSelect={this.onSelectStaff}
          />
          <Divider horizontal>
              {currentStaff && currentStaff.text ?currentStaff.text:''}
          </Divider>
          <WspaceMenu/>
      </Container>
    )
  }
}

function mapStateToProps (state) {
    return {
        dealers: state.crmDemo.dealers
    }
}

export default connect(mapStateToProps, {
    fetchGroupDealers
})(WspaceMainPage)
