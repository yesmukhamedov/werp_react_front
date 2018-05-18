import React, {Component} from 'react'
import _ from 'lodash'
import "react-table/react-table.css";
import { Tab,Header,Container,Icon,Segment,Label,Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
import {MENU_DASHBOARD,MENU_ALL_RECOS,MENU_ITEMS,MENU_BY_RECO,MENU_BY_DATE,MENU_MOVED,MENU_CURRENT_DEMO,ITEMS,RECO_ITEMS_TEMP} from '../wspaceUtil'
import '../css/main-page.css'
import {fetchGroupDealers} from '../../demo/actions/demoAction'
import {toggleRecoListModal,setCurrentRecommender} from '../actions/wspaceAction'
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
  }

  onSelectStaff(staff){
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

  renderContent = () =>{
      switch (this.state.currentMenu){
          case MENU_ALL_RECOS:
          case MENU_BY_RECO:
          case MENU_BY_DATE:
          case MENU_MOVED:
              return <WspaceRecoList openRecoListModal={this.openRecoListModal} menu={this.state.currentMenu} items={ITEMS[this.state.currentMenu]}/>
          default:
              return <WspaceDashboard/>
      }
}

openRecoListModal = (recommender) => {
    this.props.setCurrentRecommender(recommender)
    this.props.toggleRecoListModal(true)
}

closeRecoListModal = () => {
    this.props.toggleRecoListModal(false)
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
          <WspaceMenu
              activeItem={this.state.currentMenu}
              handleItemClick={this.onSelectMenu}/>
          <Divider horizontal>{this.state.dividerTitle}</Divider>
          {this.renderContent()}
          <WspaceRecoListModal
              items={RECO_ITEMS_TEMP}
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
        currentRecommender: state.crmWspaceReducer.currentRecommender
    }
}

export default connect(mapStateToProps, {
    fetchGroupDealers,toggleRecoListModal,setCurrentRecommender
})(WspaceMainPage)
