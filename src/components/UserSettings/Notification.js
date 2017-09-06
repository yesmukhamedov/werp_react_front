import React, { Component } from 'react';
import {   Message, Icon } from 'semantic-ui-react';

class Notification extends Component {    
    // handleMessageOpen = () => {
    //     this.setState({ visible: true});
    // }

    render() {
        if(this.props.visible) {
            return (
                <Message onDismiss={this.props.handleMsgDismiss}>
                    <Message.Header> <Icon name='attention' />{this.props.message},  {this.props.username}</Message.Header>          
                </Message>
            );            
        } else {
            return null; 
        }
        
    }
}

export default Notification;