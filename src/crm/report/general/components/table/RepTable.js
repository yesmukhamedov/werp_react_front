import React,{Component} from 'react'
import { connect } from 'react-redux'
import {REP_894,REP_914,REP_934,REP_935} from '../../crmRepUtil'
import {RepTable894,RepTable914} from './RepTables'


class RepTable extends Component{



    render(){
        const {id} = this.props.meta
        switch (id){
            case REP_894:
            case REP_934:
            case REP_935:
                return <RepTable894 transactionId={id} items={this.props.items} />

            case REP_914:
                return <RepTable914 items={this.props.items} />

            default:
                return <h2>Report Table Not Found!</h2>
        }
    }
}

function mapStateToProps (state) {
    return {
        items: state.crmReportReducer.items,
        meta: state.crmReportReducer.meta
    }
}

export default connect(mapStateToProps, {

})(RepTable)