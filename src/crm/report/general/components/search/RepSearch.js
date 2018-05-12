import React,{Component} from 'react'
import { connect } from 'react-redux'
import {REP_894,REP_914,REP_934,REP_935} from '../../crmRepUtil'
import {RepSearch894} from './RepSearchPanels'
import {fetchItems} from '../../actions/crmReportAction'
import moment from 'moment'

class RepSearch extends Component{

    constructor(props){
        super(props)

        this.state = {
            search: {},
            dateSelectedVals:{}
        }
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

    handleChange = (e,d) => {
        const {name,value} = d
        let search = Object.assign({},this.state.search)

        switch (name){
            case 'bukrs':
                search['branchId'] = null

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
        let dateSelectedVals = Object.assign({},this.state.dateSelectedVals)
        if(v){
            search[name] = moment(v).format('YYYY-MM-DD').toString()
        }else{
            search[name] = null
        }
        //search[name] = v ? v : null
        this.setState({
            ...this.state,
            search: search,
            dateSelectedVals: dateSelectedVals
        })
    }

    fetchItems = () => {
        this.props.loadItems(this.props.meta.id,this.state.search)
    }

    render(){
        const {search,dateSelectedVals} = this.state
        const {id} = this.props.meta
        const {companyOptions,branchOptions,businessAreaList} = this.props
        let filteredBranchOptions = branchOptions?(branchOptions[search['bukrs']] || []):[]

        const fetchItems = () => this.props.fetchItems(id,this.state.search)
        switch (id){
            case REP_934:
            case REP_894:
            case REP_935:
                return <RepSearch894
                    handleDate = {this.handleDate}
                    fetchItems = {fetchItems}
                    handleChange = {this.handleChange}
                    branchOptions = {filteredBranchOptions}
                    businessAreaOptions = {this.businessAreaOptions(search['bukrs'])}
                    companyOptions={companyOptions} />

            case REP_914:
                return <RepSearch894
                    handleDate = {this.handleDate}
                    fetchItems = {fetchItems}
                    handleChange = {this.handleChange}
                    branchOptions = {filteredBranchOptions}
                    businessAreaOptions = {this.businessAreaOptions(search['bukrs'])}
                    companyOptions={companyOptions} />

            default:
                return (null)
        }
    }
}

function mapStateToProps (state) {
    console.log(state)
    return {
        meta: state.crmReportReducer.meta,
        companyOptions: state.userInfo.companyOptions,
        branchOptions: state.userInfo.branchOptionsMarketing,
        businessAreaList: state.f4.businessAreaList
    }
}

export default connect(mapStateToProps, {
fetchItems
})(RepSearch)