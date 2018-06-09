import React,{Component} from 'react'
import { connect } from 'react-redux'
import {REP_954,REP_955} from '../../hrRepUtil'
import {RepSearch954} from './HrRepSearchPanels'
import {fetchItems} from '../../actions/hrReportAction'
import {fetchAllManagers} from '../../../../../hr/mainoperation/staff/actions/hrStaffAction'
import moment from 'moment'

class HrRepSearch extends Component{

    constructor(props){
        super(props)

        this.state = {
            search: {},
            managersLoaded: false
        }
    }

    componentWillMount(){
    }

    positionOptions = () => {
        const posList = this.props.positionList
        if(!posList){
            return []
        }

        let out = []
        for(let k in posList){
            out.push({
                key: posList[k]['position_id'],
                value: posList[k]['position_id'],
                text:  posList[k]['text']
            })
        }

        return out
    }

    branchOptions = (bukrs) => {
        if(!bukrs){
            return []
        }

        const {branchOptions} = this.props
        if(!branchOptions){
            return []
        }

        return branchOptions[bukrs] || []
    }

    businessAreaOptions = (bukrs) => {
        if(!bukrs){
            return []
        }

        const {businessAreaList} = this.props
        if(!businessAreaList){
            return []
        }

        let filteredList = businessAreaList?(businessAreaList.filter(b => b.bukrs === bukrs)):[]

        let out = [{
            key: null,
            value: null,
            text: 'Не выбрано'
        }]
        for(let k in filteredList){
            out.push({
                key: filteredList[k]['business_area_id'],
                value: filteredList[k]['business_area_id'],
                text: filteredList[k]['name']
            })
        }

        return out
    }

    managersByBranchOptions = (branchId) => {
        if(!branchId){
            return []
        }

        const {managersByBranchOptions} = this.props
        if(!managersByBranchOptions){
            return []
        }

        return managersByBranchOptions[branchId] || []
    }

    handleChange = (e,d) => {
        const {name,value} = d
        let search = Object.assign({},this.state.search)

        switch (name){
            case 'bukrs':
                search['branchId'] = null
                search['branchIds'] = null
                search[name] = value
                break

            case 'branchIds':
            case 'positionIds':
                if(value && value.length > 0){
                    search[name] = value.join(',')
                }else{
                    search[name] = null
                }

                break

            default:
                search[name] = value

        }

        this.setState({
            ...this.state,
            search: search
        })
    }

    handleDate = (v,name) => {
        let search = Object.assign({},this.state.search)
        if(v){
            search[name] = moment(v).format('YYYY-MM-DD').toString()
        }else{
            search[name] = null
        }
        //search[name] = v ? v : null
        this.setState({
            ...this.state,
            search: search
        })
    }

    fetchItems = () => {
        this.props.loadItems(this.props.meta.id,this.state.search)
    }

    componentWillReceiveProps(nextProps){

        if(nextProps['match'] && nextProps['match']['params']){
            this.setState({
                ...this.state,
                search: {}
            })
        }
    }

    render(){
        const {search} = this.state
        const {id} = this.props.meta
        const {companyOptions,branchOptions,businessAreaList} = this.props
        let filteredBranchOptions = branchOptions?(branchOptions[search['bukrs']] || []):[]

        const fetchItems = () => this.props.fetchItems(id,this.state.search)
        switch (id){
            case REP_954:
            case REP_955:
                return <RepSearch954
                        handleDate = {this.handleDate}
                        dateFrom={search['dateFrom'] || null}
                        dateTo={search['dateTo'] || null}
                        fetchItems = {fetchItems}
                        handleChange = {this.handleChange}
                        departmentOptions={this.props.departmentOptions}
                        positionOptions={this.positionOptions()}
                        branchOptions = {filteredBranchOptions}
                        businessAreaOptions = {this.businessAreaOptions(search['bukrs'])}
                        companyOptions={companyOptions} />
            default:
                return (null)
        }
    }
}

function mapStateToProps (state) {
    return {
        meta: state.hrReportReducer.meta,
        companyOptions: state.userInfo.companyOptions,
        branchOptions: state.userInfo.branchOptionsMarketing,
        businessAreaList: state.f4.businessAreaList,
        departmentOptions: state.f4.departmentOptions,
        positionList: state.f4.positionList,
        managersByBranchOptions: state.hrStaff.managersByBranchOptions
    }
}

export default connect(mapStateToProps, {
fetchItems,fetchAllManagers
})(HrRepSearch)