import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Menu, Breadcrumb, Dropdown, Label, Icon } from 'semantic-ui-react';
import { Link } from 'react-router';
import LanguageSwitcher from './LanguageSwitcher';
import Navigate from './Navigate';
import { fetchUnreadMessages } from "../../actions/inbox";

class Header extends Component {
    componentWillMount() {
        if (this.props.authenticated) {
            // TODO replace with valid user id
            const userId = -1;
            this.props.fetchUnreadMessages({userId});
        }
    }

    renderBreadcrumb(translations) {
        // console.log('TRANSLATIONS: ', translations);
        const len = translations ? translations.length : 0;
        const lang = this.props.lang;
        const items = [];
        if (len > 0) {
            const breadcrumb = translations.map(t => t[lang]);
            if (len === 1) {
                items.push([<Breadcrumb.Section active key='0'>{breadcrumb[0]}</Breadcrumb.Section>]);
            } else {
                items.push([<Breadcrumb.Section link key='0'>{breadcrumb[0]}</Breadcrumb.Section>]);
            }
            for (let i = 1; i < len; i++) {
                const last = (i === len - 1);
                items.push(<Breadcrumb.Divider icon='right chevron' key={'d' + i}/>);
                if (last) {
                    items.push(<Breadcrumb.Section active key={i}>{breadcrumb[i]}</Breadcrumb.Section>);
                } else {
                    items.push(<Breadcrumb.Section link key={i}>{breadcrumb[i]}</Breadcrumb.Section>);
                }
            }
        }
        // console.log('ITEMS:', items);
        return (
            <Breadcrumb size='small'>
                {items}
            </Breadcrumb>
        )
    };

    render() {
        return (<Menu secondary attached="top">
                    <Menu.Item onClick={this.props.toggleMenu} >
                        <Icon name="sidebar" />Menu
                    </Menu.Item>

                    <Menu.Item >
                        {/* <Input action={{ type: 'submit', content: 'Go' }} placeholder='Navigate to...' /> */}
                        <Navigate />
                    </Menu.Item>

                    <Menu.Item>
                        {this.renderBreadcrumb(this.props.breadcrumb)}
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
      unread: state.inbox.unread,
      breadcrumb: state.menu.breadcrumb,
      lang: state.locales.lang,
    };
  }
  
export default connect(mapStateToProps, {fetchUnreadMessages})(Header);