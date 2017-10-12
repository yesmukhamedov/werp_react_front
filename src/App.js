import React, { Component } from 'react';
import { connect } from 'react-redux';
import TreeMenu from './components/TreeMenu/TreeMenu'
import './App.css';

import {
    Dropdown,
    Segment,
    Menu,
    Icon,
    Sidebar,

    Input, Breadcrumb, Label} from 'semantic-ui-react';

import { Link } from 'react-router';
import LanguageSwitcher from './components/Header/LanguageSwitcher';
import {fetchUnreadMessages} from "./actions/inbox";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {menuVisible: false};
    }

    componentWillMount() {
        if (this.props.authenticated) {
            // TODO replace with valid user id
            const userId = -1;
            // this.props.fetchUnreadMessages({userId});
        }
    }

  render() {
    const token = localStorage.getItem('token');
    // If we have a token, consider the user to be signed in
    if(token) {
      return (
        <div className="wrapper">
            <Menu secondary attached="top">
                <Menu.Item onClick={() => this.setState({ menuVisible: !this.state.menuVisible })} >
                    <Icon name="sidebar" />Menu
                </Menu.Item>

                <Menu.Item >
                    <Input action={{ type: 'submit', content: 'Go' }} placeholder='Navigate to...' />
                </Menu.Item>

                <Menu.Item >
                    <Breadcrumb size='small'>
                    <Breadcrumb.Section link>Home</Breadcrumb.Section>
                    <Breadcrumb.Divider icon='right chevron' />
                    <Breadcrumb.Section link>Registration</Breadcrumb.Section>
                    <Breadcrumb.Divider icon='right chevron' />
                    <Breadcrumb.Section active>Personal Information</Breadcrumb.Section>
                    </Breadcrumb>
                </Menu.Item>

                <Menu.Menu position='right'>
                    <Menu.Item>
                    Inbox<Label color='teal' circular>{this.props.unread}</Label>
                    </Menu.Item>

                    <LanguageSwitcher />

                    <Dropdown item text={this.props.username}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to='/settings'>Settings</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item as={Link} to='/signout'>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            </Menu>
            <Sidebar.Pushable as={Segment} attached="bottom" >
                <Sidebar as={Menu} animation='push' visible={this.state.menuVisible} icon="labeled" vertical>
                    <TreeMenu/>
                </Sidebar>
                <Sidebar.Pusher>
                    {this.props.children}
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </div>
      );
    } else {
      return (          
        <div >
            /* {this.props.children} */
            expired token
        </div>
      );            
    } 
  }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        username: state.auth.username,
        unread: state.inbox.unread
    };
}

export default connect(mapStateToProps, {fetchUnreadMessages})(App);