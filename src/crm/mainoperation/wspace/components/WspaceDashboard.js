import React, {Component} from 'react'
import "react-table/react-table.css";
import { Grid,Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
import '../css/main-page.css'
import {DASHBOARD_MENU_ITEMS} from '../wspaceUtil'
import WspaceDashboardMenu from './content/WspaceDashboardMenu'
import WspaceDashboardContent from './content/WspaceDashboardContent'


class WspaceDashboard extends Component {
  constructor (props) {
    super(props)
      this.state = {
          currentMenuOfCalls: 'all'
      }
  }

    handleItemClick = (menu)=> {
        this.setState({
            ...this.state,
            currentMenuOfCalls: menu
        })
    }

  render () {
      let {todayCallsByResult,todayDemos} = this.props

    return <Grid>
        <Grid.Row>
            <Grid.Column width={16}>
                <h3>Звонки</h3>
            </Grid.Column>
            <Grid.Column width={4}>
                <WspaceDashboardMenu
                    items={this.props.dashboardCallMenus}
                    activeItem={this.state.currentMenuOfCalls}
                    handleItemClick={this.handleItemClick}
                />
            </Grid.Column>

            <Grid.Column width={12}>
                <WspaceDashboardContent
                    contentName="calls"
                    items={todayCallsByResult[this.state.currentMenuOfCalls] || []}/>
            </Grid.Column>
        </Grid.Row>

        <Divider/>
        <Grid.Row>
            <Grid.Column width={16}>
                <h3>Демонстрации</h3>
            </Grid.Column>
            <Grid.Column width={16}>
                <WspaceDashboardContent
                    contentName="demos"
                    items={todayDemos}/>
            </Grid.Column>
        </Grid.Row>
    </Grid>
  }
}

function mapStateToProps (state) {
    return {
        dealers: state.crmDemo.dealers,
        todayCallsByResult: state.crmWspaceReducer.todayCallsByResult,
        todayDemos: state.crmWspaceReducer.todayDemos,
        dashboardCallMenus: state.crmWspaceReducer.dashboardCallMenus
    }
}

export default connect(mapStateToProps, {
})(WspaceDashboard)
