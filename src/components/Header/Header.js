import React, { Component } from 'react'
import { Input, Menu, Breadcrumb, Dropdown } from 'semantic-ui-react'

class Header extends Component {
    constructor(props) {
        super(props);
    }

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
                    <Dropdown item text='Username'>
                        <Dropdown.Menu>
                            <Dropdown.Item>Setting</Dropdown.Item>
                            <Dropdown.Item>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
              </Menu>
        );
    }
}

export default Header;