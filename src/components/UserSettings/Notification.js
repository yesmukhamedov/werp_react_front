import React, { Component } from 'react';
import {  Message, Icon } from 'semantic-ui-react';

class Notification extends Component {

    render() {
        if(this.props.visible) {
            return (
                <Message onDismiss={this.props.handleMsgDismiss} positive={this.props.msgType} negative={!this.props.msgType}>
                    <Message.Header> <Icon name='attention' />{this.props.message}</Message.Header>          
                </Message>
            );            
        } else return null;
        
    }
}

export default Notification;