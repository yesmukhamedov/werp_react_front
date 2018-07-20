import React, {Component} from 'react'
import _ from 'lodash'
import "react-table/react-table.css";
import { Container,Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
import {MENU_DASHBOARD,MENU_ALL_RECOS,MENU_ITEMS,MENU_BY_RECO,MENU_BY_DATE,MENU_MOVED,MENU_CURRENT_DEMO,MENU_CURRENT_VISIT} from '../wspaceUtil'
import '../css/main-page.css'
import {fetchGroupDealers} from '../../demo/actions/demoAction'
import {toggleRecoListModal,setCurrentRecommender,fetchRecosByReco,fetchRecosByDate,fetchDemoRecos,
    archiveReco,fetchMovedRecos,fetchTodayCalls,fetchTodayDemos,fetchCurrentDemos,fetchCurrentVisits,fetchVisitRecos,
    handleFilter,fetchKpi,wspClearState} from '../actions/wspaceAction'
import {blankForCreate,modalToggle} from '../../visit/actions/visitAction'
import {fetchCallResults,fetchPhoneMeta} from '../../reco/actions/recoAction'
import {fetchReasons} from '../../demo/actions/demoAction'
import WspaceHeader from './WspaceHeader'
import WspaceMenu from './WspaceMenu'
import WspaceRecoList from  './WspaceRecoList'
import WspaceDashboard from './WspaceDashboard'
import WspaceRecoListModal from './WspaceRecoListModal'
import WspacePhoneModal from  './WspacePhoneModal'
import WspaceDemoTable from './WspaceDemoTable'
import WspaceVisitTable from './WspaceVisitTable'
import WspaceRecoFilter from './WspaceRecoFilter'
import WspaceVisitTableHeader from './WspaceVisitTableHeader'

import moment from 'moment'

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
      this.props.fetchCallResults()
      this.props.fetchReasons()
      this.props.fetchKpi(moment().year(),moment().month()+1)

  }

  onSelectStaff(staff){
      this.props.fetchRecosByReco(staff.key)
      this.props.fetchRecosByDate(staff.key)
      this.props.fetchCurrentDemos(staff.key)
      this.props.fetchCurrentVisits(staff.key)
      //this.props.fetchMovedRecos(staff.key)
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

    doFilterData = (filters, items) => {
        if(!filters){
            return items
        }

        let out = items
        if(filters.clientName){
            out = _.filter(items, function (o){
                return _.startsWith(_.toLower(o.clientName),_.toLower(filters.clientName))
            })
        }

        if(filters.docDate){
            if(this.state.currentMenu === MENU_BY_RECO){
                out = _.filter(items,function(o){
                    return _.startsWith(o.dateTimeStr,filters.docDate)
                })
            }else if(this.state.currentMenu === MENU_BY_DATE){
                out = _.filter(items,function(o){
                    return _.startsWith(o.callDateStr,filters.docDate)
                })
            }
        }

        if(filters.phoneNumber){
            if(this.state.currentMenu === MENU_BY_RECO){

            }else if(this.state.currentMenu === MENU_BY_DATE) {
                out = _.filter(items, function (o){
                    if(!o.phones){
                        return false
                    }

                    let b = false
                    for(let k in o.phones){
                        if(_.startsWith(o.phones[k].phoneNumber,filters.phoneNumber)){
                            b = true
                            break
                        }
                    }

                    return b
                })
            }
        }

        if(filters.categoryId){
            if(this.state.currentMenu === MENU_BY_RECO) {
                out = _.filter(items, function (o){
                    if(!o.parentReco){
                        return false
                    }

                    return o.parentReco.categoryId === filters.categoryId
                })
            }else {
                out = _.filter(items, function (o){
                    return o.categoryId === filters.categoryId
                })
            }
        }

        if(filters.resultId){
            if(this.state.currentMenu === MENU_BY_RECO) {
                out = _.filter(items, function (o){
                    return o.resultId === filters.resultId
                })
            }
        }

        return out
    }

    prepareForCreateVisit = () => {
        this.props.blankForCreate(0,this.state.currentStaff.key)
        this.props.modalToggle(true)
    }

  renderContent = () =>{
      let menuItems = this.props.staffRecoData[this.state.currentMenu] || []
      let filters = this.props.filters[this.state.currentMenu] || {}
      menuItems = this.doFilterData(filters,menuItems)
      switch (this.state.currentMenu){
          case MENU_ALL_RECOS:
          case MENU_BY_RECO:
          case MENU_BY_DATE:
          case MENU_MOVED:
              return<div>
                  <WspaceRecoFilter
                      handleFilter = {this.props.handleFilter}
                      menu={this.state.currentMenu} filters={filters}/>
                  <WspaceRecoList
                            recoCardMenuHandle={this.recoCardMenuHandle}
                            openRecoListModal={this.openRecoListModal}
                            menu={this.state.currentMenu}
                            items={menuItems}/>
              </div>

          case MENU_CURRENT_DEMO:
              return <WspaceDemoTable items={menuItems}/>

          case MENU_CURRENT_VISIT:
              return <div>
                      <WspaceVisitTableHeader prepareForCreate={this.prepareForCreateVisit} />
                      <WspaceVisitTable
                          openRecoListModal={this.openRecoListModal}
                          items={menuItems} />
                  </div>
          default:
              return <WspaceDashboard/>
      }
}

openRecoListModal = (recommender,context) => {
      if('visit' === context){
          this.props.setCurrentRecommender(recommender)
          this.props.fetchVisitRecos(recommender.id)
          console.log(recommender)
      }else{
          this.props.setCurrentRecommender(recommender)
          this.props.fetchDemoRecos(recommender.id)
      }

        this.props.toggleRecoListModal(true)
}

closeRecoListModal = () => {
    this.props.toggleRecoListModal(false)
}

    componentDidMount(){
      this.props.fetchPhoneMeta()
    }

    componentWillUnmount(){
      this.props.wspClearState()
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
              recoCardMenuHandle={this.recoCardMenuHandle}
              loaders={this.props.loaders}
              items={this.props.currentRecommenderRecos}
              recommender={this.props.currentRecommender}
              closeRecoListModal={this.closeRecoListModal}
              opened={this.props.recoListModalOpened} />

          <WspacePhoneModal/>
      </Container>
    )
  }
}

function mapStateToProps (state) {
    let filters = state.crmWspaceReducer.filters
    return {
        dealers: state.crmDemo.dealers,
        recoListModalOpened: state.crmWspaceReducer.recoListModalOpened,
        currentRecommender: state.crmWspaceReducer.currentRecommender,
        staffRecoData: state.crmWspaceReducer.staffRecoData,
        currentRecommenderRecos: state.crmWspaceReducer.currentRecommenderRecos,
        loaders: state.crmWspaceReducer.loaders,
        filters: filters
    }
}

export default connect(mapStateToProps, {
    fetchGroupDealers,toggleRecoListModal,setCurrentRecommender,fetchRecosByReco,
    fetchRecosByDate,fetchDemoRecos,archiveReco,fetchMovedRecos,fetchTodayCalls,
    fetchTodayDemos,fetchCallResults,fetchReasons,fetchCurrentDemos,fetchCurrentVisits,
    fetchVisitRecos, handleFilter, fetchKpi,blankForCreate,modalToggle,wspClearState,
    fetchPhoneMeta
})(WspaceMainPage)
