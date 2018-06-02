import React,{Component} from 'react'
import { connect } from 'react-redux'
import {REP_954} from '../../hrRepUtil'
import { Modal,Form,TextArea,Button } from 'semantic-ui-react'
import {RepTable954} from './HrRepTables'
import {toggleRepModal,updateDirectorNote} from '../../actions/hrReportAction'


class HrRepTable extends Component{

    constructor(props){
        super(props)

        this.state = {
            demoId: null,
            directorNote: ''
        }
    }

    handleChange = (e,d) => {
        const {name,value} = d
        if(name === 'directorNote'){
            this.setState({
                ...this.state,
                directorNote: value
            })
        }

    }

    openModal = (id,note) => {
        this.props.toggleRepModal(true)
        this.setState({
            demoId: id,
            directorNote: note
        })
    }

    render(){
        const {id} = this.props.meta
        switch (id){
            case REP_954:
                return <RepTable954 transactionId={id} items={this.props.items} />
            default:
                return <h2>Report Table Not Found!</h2>
        }
    }
}

function mapStateToProps (state) {
    return {
        items: state.hrReportReducer.items,
        meta: state.hrReportReducer.meta,
        repModalOpened: state.hrReportReducer.repModalOpened
    }
}

export default connect(mapStateToProps, {
    toggleRepModal,updateDirectorNote
})(HrRepTable)