import React, {Component} from 'react'
import "react-table/react-table.css";
import { Grid,Divider,Button, Segment, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import '../css/main-page.css'
import WspaceDashboardMenu from './content/WspaceDashboardMenu'
import WspaceDashboardContent from './content/WspaceDashboardContent'
import WspaceKpiTable from './WspaceKpiTable'
import {fetchTodayCalls,fetchTodayDemos,fetchKpi,WSP_FETCH_TODAY_CALLS,WSP_FETCH_TODAY_DEMOS,WSP_FETCH_KPI} from '../actions/wspaceAction'
import moment from 'moment'
import { injectIntl } from 'react-intl'

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
      const {messages} = this.props.intl
      let {todayCallsByResult,todayDemos, kpiData} = this.props
      let year = moment().year();
      let month = moment().month()+1;
    return <Grid>
        <Grid.Row>
            <Grid.Column width={16}>
                <Segment clearing>
                    <Header as='h3' floated='left'>
                        KPI
                    </Header>
                    <Button
                        loading={this.props.loaders[WSP_FETCH_KPI]}
                        onClick={() => this.props.fetchKpi(year,month)}
                        floated={'right'}
                        style={{marginRight:'3px'}}
                        icon={'refresh'}
                        size={'small'}/>
                </Segment>
            </Grid.Column>
            <Grid.Column width={16}>
                <WspaceKpiTable messages={messages} kpiData={kpiData}/>
            </Grid.Column>
        </Grid.Row>
        <Divider/>

        <Grid.Row>
            <Grid.Column width={16}>
            <Segment clearing>
                <Header as='h3' floated='left'>
                    {messages['Crm.Calls']}
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
                    messages={messages}
                    contentName="calls"
                    items={todayCallsByResult[this.state.currentMenuOfCalls] || []}/>
            </Grid.Column>
        </Grid.Row>

        <Divider/>
        <Grid.Row>
            <Grid.Column width={16}>
                <Segment clearing>
                    <Header as='h3' floated='left'>
                        {messages['Crm.Demonstrations']}
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
                    messages={messages}
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
        kpiData: state.crmWspaceReducer.kpiData,
        loaders: state.crmWspaceReducer.loaders
    }
}

export default connect(mapStateToProps, {
    fetchTodayCalls,fetchTodayDemos,fetchKpi
})(injectIntl(WspaceDashboard))
