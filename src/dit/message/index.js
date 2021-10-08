import React, { useState } from 'react';
import { Tab, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Inbox from './components/Inbox';
import Sent from './components/Sent';
import {
    fetchInboxMessages,
    clearInboxMessages,
    fetchUnreadMessagesCount,
    fetchSentMessages,
    clearSentMessages,
    toggleMarkMessage,
    fetchOneMessage,
} from './messageAction';

const Message = props => {
    const {
        inboxMessages,
        unreadMessagesCount,
        sentMessages,
        oneMessage,
    } = props;

    const panes = [
        {
            menuItem: `Входящие (${unreadMessagesCount})`,
            render: () => (
                <Tab.Pane>
                    <Inbox
                        getInboxMessages={props.fetchInboxMessages}
                        clearInboxMessages={props.clearInboxMessages}
                        inboxMessages={inboxMessages}
                        getUnreadMessagesCount={props.fetchUnreadMessagesCount}
                        unreadMessagesCount={unreadMessagesCount}
                        getSentMessages={props.unreadMessagesCount}
                        toggleMarkMessage={props.toggleMarkMessage}
                        getchOneMessage={props.fetchOneMessage}
                        oneMessage={oneMessage}
                    />
                </Tab.Pane>
            ),
        },
        {
            menuItem: 'Отправленные',
            render: () => (
                <Tab.Pane>
                    <Sent
                        getSentMessages={props.fetchSentMessages}
                        clearSentMessages={props.clearSentMessages}
                        sentMessages={sentMessages}
                    />
                </Tab.Pane>
            ),
        },
    ];

    return (
        <div>
            <Tab
                menu={{ fluid: true, vertical: true, tabular: true }}
                panes={panes}
                menuposition="right"
                panes={panes}
                grid={{ paneWidth: 13, tabWidth: 3 }}
            />
        </div>
    );
};

function mapStateToProps(state) {
    return {
        inboxMessages: state.messageReducer.inboxMessages,
        unreadMessagesCount: state.messageReducer.unreadMessagesCount,
        sentMessages: state.messageReducer.sentMessages,
        oneMessage: state.messageReducer.oneMessage,
    };
}

export default connect(mapStateToProps, {
    fetchInboxMessages,
    clearInboxMessages,
    fetchUnreadMessagesCount,
    fetchSentMessages,
    clearSentMessages,
    toggleMarkMessage,
    fetchOneMessage,
})(Message);
