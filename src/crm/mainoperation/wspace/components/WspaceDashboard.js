import React, {Component} from 'react'
import "react-table/react-table.css";
import { Grid,Divider,Button, Segment, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import '../css/main-page.css'
import WspaceDashboardMenu from './content/WspaceDashboardMenu'
import WspaceDashboardContent from './content/WspaceDashboardContent'
import {fetchTodayCalls,fetchTodayDemos,WSP_FETCH_TODAY_CALLS,WSP_FETCH_TODAY_DEMOS} from '../actions/wspaceAction'


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
            <Segment clearing>
                <Header as='h3' floated='left'>
                    Звонки
                </Header>
                <Button
                    loading={this.props.loaders[WSP_FETCH_TODAY_CALLS]}
                    onClick={this.props.fetchTodayCalls}
                    floated={'right'}
                    icon={'refresh'}
                    size={'small'}/>
            </Segment>
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
                <Segment clearing>
                    <Header as='h3' floated='left'>
                        Демонстрации
                    </Header>
                    <Button
                        loading={this.props.loaders[WSP_FETCH_TODAY_DEMOS]}
                        onClick={this.props.fetchTodayDemos}
                        floated={'right'}
                        style={{marginRight:'3px'}}
                        icon={'refresh'}
                        size={'small'}/>
                </Segment>
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
        dashboardCallMenus: state.crmWspaceReducer.dashboardCallMenus,
        loaders: state.crmWspaceReducer.loaders
    }
}

export default connect(mapStateToProps, {
    fetchTodayCalls,fetchTodayDemos
})(WspaceDashboard)
