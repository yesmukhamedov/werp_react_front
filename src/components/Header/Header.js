import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Menu, Breadcrumb, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router';
import LanguageSwitcher from './LanguageSwitcher';

class Header extends Component {

    render() {
        return (
              <Menu fixed='top'>            
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
                        Inbox
                    </Menu.Item>
                    <LanguageSwitcher />
                    <Dropdown item text={this.props.username}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to='/settings'>Setting</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item as={Link} to='/signout'>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
              </Menu>
        );
    }
}

function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated,
      username: state.auth.username
    };
  }
  
export default connect(mapStateToProps)(Header);