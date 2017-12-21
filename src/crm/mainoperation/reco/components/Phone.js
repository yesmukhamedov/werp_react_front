import React, {Component} from 'react';
import {Label,Icon,Modal,Tab,Table } from 'semantic-ui-react';
import axios from 'axios';
import {ROOT_URL} from '../../../../utils/constants';
import CallModal from './CallModal';

class Phone extends Component{

    constructor(props) {
        super(props)

        this.state = {
            callModalOpen:false,
            historyItems:[],
            recommender:{}
        }
        this.handlePhoneClick = this.handlePhoneClick.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.onCloseCallModal = this.onCloseCallModal.bind(this);
    }

    handlePhoneClick(){
        axios.get(`${ROOT_URL}/api/crm/call/number-history/` + this.props.phoneId,{
            headers: {
                authorization: localStorage.getItem('token')}
        }).then((res) => {
            this.setState({
                ...this.state,
                historyItems:res.data,
                callModalOpen:true
            })
        }).catch((e) => {
            console.log(e);
        })

        axios.get(`${ROOT_URL}/api/crm/reco/recommender/` + this.props.contextId,{
            headers: {
                authorization: localStorage.getItem('token')}
        }).then((res) => {
            this.setState({
                ...this.state,
                recommender:res.data
            })
        }).catch((e) => {
            console.log(e);
        })
    }

    handleModalClose(){
        this.setState({
            ...this.state,
            opened:false
        })
    }

    renderCallModal(){
        const panes = [
            { menuItem: 'История номера', render:this.renderNumberHistory },
            { menuItem: 'Добавление звонка', render:this.renderCallForm},
            { menuItem: 'Данные рекомендателя', render:this.renderRecommenderInfo },
        ]
        return (
        <Modal size={'large'} open={this.state.opened} onClose={this.handleModalClose}>
            <Modal.Header>Звонок по номеру: {this.props.phoneNumber}</Modal.Header>
            <Modal.Content>
                <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
            </Modal.Content>
        </Modal>
        )
    }

    onCloseCallModal(){
        this.setState({
            ...this.state,
            callModalOpen:false
        })
    }

    onOpenCallModal(e,d){
        console.log('AA')
        console.log(e)
        console.log(d);
    }

    render(){
        const {id,phoneNumber,callResultOptions} = this.props;
        return (
            <p>
                <Label as='a' horizontal={true} onClick={this.handlePhoneClick}>
                    <Icon disabled name='phone' />
                    {phoneNumber}
                </Label>
                <CallModal phoneId={this.props.phoneId} phoneNumber={phoneNumber}
                            onOpen={this.onOpenCallModal}
                           open={this.state.callModalOpen}
                           onClose={this.onCloseCallModal}
                            historyItems={this.state.historyItems}
                            callResultOptions={callResultOptions}
                            callRefuseOptions={this.props.callRefuseOptions}
                            recommender={this.state.recommender}
                            context={this.props.context}
                            contextId={this.props.contextId}/>
            </p>
        )
    }
}

export default Phone;