import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Menu, Breadcrumb, Dropdown, Label, Icon } from 'semantic-ui-react';
import { Link } from 'react-router';
import LanguageSwitcher from './LanguageSwitcher';
import { fetchUnreadMessages } from "../../actions/inbox";

class Header extends Component {
    componentWillMount() {
        if (this.props.authenticated) {
            // TODO replace with valid user id
            const userId = -1;
            this.props.fetchUnreadMessages({userId});
        }
    }

    render() {
        return (<Menu secondary attached="top">
                    <Menu.Item onClick={this.props.toggleMenu} >
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
                                <Dropdown.Item as={Link} to='/settings' icon='setting' text='Settings' />
                                <Dropdown.Divider />
                                <Dropdown.Item as={Link} to='/signout' icon='log out' text='Logout' />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>
                </Menu>              
        )
    }
}

function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated,
      username: state.auth.username,
      unread: state.inbox.unread
    };
  }
  
export default connect(mapStateToProps, {fetchUnreadMessages})(Header);