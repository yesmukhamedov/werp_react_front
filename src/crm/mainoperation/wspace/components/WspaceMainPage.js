import React, {Component} from 'react'
import _ from 'lodash'
import "react-table/react-table.css";
import { Container,Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
import {MENU_DASHBOARD,MENU_ALL_RECOS,MENU_ITEMS,MENU_BY_RECO,MENU_BY_DATE,MENU_MOVED,MENU_CURRENT_DEMO,ITEMS,RECO_ITEMS_TEMP} from '../wspaceUtil'
import '../css/main-page.css'
import {fetchGroupDealers} from '../../demo/actions/demoAction'
import {toggleRecoListModal,setCurrentRecommender,fetchRecosByReco,fetchRecosByDate,fetchDemoRecos,archiveReco,fetchMovedRecos,fetchTodayCalls,fetchTodayDemos} from '../actions/wspaceAction'
import WspaceHeader from './WspaceHeader'
import WspaceMenu from './WspaceMenu'
import WspaceRecoList from  './WspaceRecoList'
import WspaceDashboard from './WspaceDashboard'
import WspaceRecoListModal from './WspaceRecoListModal'



class WspaceMainPage extends Component {
  constructor (props) {
    super(props)
      this.state = {
        currentStaff:{},
        currentMenu: MENU_DASHBOARD,
          dividerTitle: 'Действии на сегодня'
      }

      this.onSelectStaff = this.onSelectStaff.bind(this)
  }

  componentWillMount () {
      this.props.fetchGroupDealers()
      this.props.fetchTodayCalls()
      this.props.fetchTodayDemos()
  }

  onSelectStaff(staff){
      this.props.fetchRecosByReco(staff.key)
      this.props.fetchRecosByDate(staff.key)
      this.props.fetchMovedRecos(staff.key)
      this.setState({
          ...this.state,
          currentStaff: staff
      })
  }

    onSelectMenu = (menu) => {
      let menuItem = _.find(MENU_ITEMS,{'name':menu})
      let dividerTitle = menuItem?menuItem.pageLabel:'Все действии на сегодня'
        this.setState({
            ...this.state,
            currentMenu: menu,
            dividerTitle: dividerTitle
        })
    }

    recoCardMenuHandle = (itemName,recoId) => {
        if(itemName === 'to_archive'){
            if(window.confirm('Действительно хотите закрыть рекомендацию?')){
                this.props.archiveReco(recoId)
            }
        }else if(itemName === 'view'){
            let win = window.open('/crm/reco/view/' + recoId,'_blank')
            win.focus()
        }
    }

  renderContent = () =>{
      let menuItems = this.props.staffRecoData[this.state.currentMenu] || []
      switch (this.state.currentMenu){
          case MENU_ALL_RECOS:
          case MENU_BY_RECO:
          case MENU_BY_DATE:
          case MENU_MOVED:
              return <WspaceRecoList
                        recoCardMenuHandle={this.recoCardMenuHandle}
                        openRecoListModal={this.openRecoListModal}
                        menu={this.state.currentMenu}
                        items={menuItems}/>
          default:
              return <WspaceDashboard/>
      }
}

openRecoListModal = (recommender) => {
    this.props.setCurrentRecommender(recommender)
    this.props.toggleRecoListModal(true)
    this.props.fetchDemoRecos(recommender.id)
}

closeRecoListModal = () => {
    this.props.toggleRecoListModal(false)
}

  render () {
      const {currentStaff} = this.state
      let menuItems = []
      for(let k in MENU_ITEMS){
          let temp = MENU_ITEMS[k]
          if(this.props.staffRecoData && this.props.staffRecoData[temp.name]){
              temp['count'] = _.size(this.props.staffRecoData[temp.name])
          }else{
              temp['count'] = 0
          }

          menuItems.push(temp)
      }
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
          <WspaceMenu
              loaders={this.props.loaders}
              activeItem={this.state.currentMenu}
              items={menuItems}
              handleItemClick={this.onSelectMenu}/>
          <Divider horizontal>{this.state.dividerTitle}</Divider>
          {this.renderContent()}
          <WspaceRecoListModal
              loaders={this.props.loaders}
              items={this.props.currentRecommenderRecos}
              recommender={this.props.currentRecommender}
              closeRecoListModal={this.closeRecoListModal}
              opened={this.props.recoListModalOpened} />
      </Container>
    )
  }
}

function mapStateToProps (state) {
    return {
        dealers: state.crmDemo.dealers,
        recoListModalOpened: state.crmWspaceReducer.recoListModalOpened,
        currentRecommender: state.crmWspaceReducer.currentRecommender,
        staffRecoData: state.crmWspaceReducer.staffRecoData,
        currentRecommenderRecos: state.crmWspaceReducer.currentRecommenderRecos,
        loaders: state.crmWspaceReducer.loaders
    }
}

export default connect(mapStateToProps, {
    fetchGroupDealers,toggleRecoListModal,setCurrentRecommender,fetchRecosByReco,
    fetchRecosByDate,fetchDemoRecos,archiveReco,fetchMovedRecos,fetchTodayCalls,
    fetchTodayDemos
})(WspaceMainPage)
