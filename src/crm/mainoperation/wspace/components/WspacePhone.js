import React,{Component} from 'react'
import { Label, Icon } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {fetchPhoneNumberHistory,setCurrentPhone} from '../actions/wspaceAction'

class WspacePhone extends Component{

    onClickNumber = (phoneId) => {
        this.props.fetchPhoneNumberHistory(phoneId)
        this.props.setCurrentPhone(this.props.phone)
    }

    render (){
        const {phone} = this.props
        return <Label
            key={phone.id}
            as='a'
            horizontal
            onClick={() => this.onClickNumber(phone.id)}>
            <Icon loading={this.props.loaders['PHONE_' + phone.id]} name='call' />
            {phone.phoneNumber}
        </Label>
    }
}

function mapStateToProps (state){
    return {
        loaders: state.crmWspaceReducer.loaders
    }
}

export default connect(mapStateToProps,{
    fetchPhoneNumberHistory,setCurrentPhone
})(WspacePhone)