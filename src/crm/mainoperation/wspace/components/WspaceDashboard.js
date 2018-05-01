import React, {Component} from 'react'
import "react-table/react-table.css";
import { Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import '../css/main-page.css'
import {DASHBOARD_MENU_ITEMS} from '../wspaceUtil'
import WspaceDashboardMenu from './content/WspaceDashboardMenu'
import WspaceDashboardContent from './content/WspaceDashboardContent'

class WspaceDashboard extends Component {
  constructor (props) {
    super(props)
      this.state = {}
  }

  render () {
    return <Grid>
        <Grid.Row>
            <Grid.Column width={4}>
                <WspaceDashboardMenu items={DASHBOARD_MENU_ITEMS} activeItem="all"/>
            </Grid.Column>

            <Grid.Column width={12}>
                <WspaceDashboardContent items={[]}/>
            </Grid.Column>
        </Grid.Row>
    </Grid>
  }
}

function mapStateToProps (state) {
    return {
        dealers: state.crmDemo.dealers
    }
}

export default connect(mapStateToProps, {
})(WspaceDashboard)
