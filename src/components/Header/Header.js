import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Breadcrumb, Dropdown, Label, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import jwt from 'jwt-simple';
import { defineMessages, intlShape, injectIntl } from 'react-intl';
import LanguageSwitcher from './LanguageSwitcher';
import TransactionSearchbar from './TransactionSearchbar';
import { fetchUnreadMessages } from '../../actions/inbox';
import { breadcrumbChanged } from '../../actions/tree_menu';
import { calcBreadcrumb } from '../../utils/helpers';
import { fetchTreeMenu } from '../../actions/tree_menu';
import { fetchUserInfo } from '../../general/userInfo/userInfo_action';
import { signoutUser } from '../../actions/auth';

class Header extends Component {
  componentWillMount() {
    if (this.props.authenticated) {
      const token = localStorage.getItem('token');
      if (token) {
        const payload = jwt.decode(token, 'secret');
        const userId = payload.userId;
        this.props.fetchUnreadMessages({ userId });
        this.props.fetchTreeMenu(userId);
        this.props.fetchUserInfo();
      }
    }
  }

  handleTransactionSelected(transactionCode) {
    const leafNode = this.props.transactions[transactionCode];
    const breadcrumb = calcBreadcrumb(leafNode);
    this.props.breadcrumbChanged(breadcrumb);
  }

  renderBreadcrumb(translations) {
    const len = translations ? translations.length : 0;
    const lang = this.props.lang;
    const items = [];
    if (len > 0) {
      const breadcrumb = translations.map(t => t[lang]);
      if (len === 1) {
        items.push([
          <Breadcrumb.Section active key="0">
            {breadcrumb[0]}
          </Breadcrumb.Section>,
        ]);
      } else {
        items.push([
          <Breadcrumb.Section link key="0">
            {breadcrumb[0]}
          </Breadcrumb.Section>,
        ]);
      }
      for (let i = 1; i < len; i++) {
        const last = i === len - 1;
        items.push(<Breadcrumb.Divider icon="right chevron" key={`d${i}`} />);
        if (last) {
          items.push(
            <Breadcrumb.Section active key={i}>
              {breadcrumb[i]}
            </Breadcrumb.Section>,
          );
        } else {
          items.push(
            <Breadcrumb.Section link key={i}>
              {breadcrumb[i]}
            </Breadcrumb.Section>,
          );
        }
      }
    }
    // console.log('ITEMS:', items);
    return <Breadcrumb size="small">{items}</Breadcrumb>;
  }

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <Menu secondary attached="top">
        <Menu.Item onClick={this.props.toggleMenu}>
          <Icon name="sidebar" />
          {formatMessage(messages.menu)}
        </Menu.Item>

        <Menu.Item>
          {/* <Input action={{ type: 'submit', content: 'Go' }} placeholder='Navigate to...' /> */}
          <TransactionSearchbar
            transactions={this.props.transactions}
            transactionSelected={this.handleTransactionSelected.bind(this)}
          />
        </Menu.Item>

        <Menu.Item>{this.renderBreadcrumb(this.props.breadcrumb)}</Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item>
            {formatMessage(messages.inbox)}
            <Label color="teal" circular>
              {this.props.unread}
            </Label>
          </Menu.Item>

          <LanguageSwitcher />

          <Dropdown item text={localStorage.getItem('username')}>
            <Dropdown.Menu>
              <Dropdown.Item onClick={this.props.signOut}>
                <Icon name="log out" />
                {formatMessage(messages.logout)}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    );
  }
}

const messages = defineMessages({
  menu: {
    id: 'Header.Menu.MenuLabel',
    defaultMessage: 'Menu',
  },
  inbox: {
    id: 'Header.Menu.Inbox',
    defaultMessage: 'Inbox',
  },
  settings: {
    id: 'Header.Menu.Settings',
    defaultMessage: 'Settings',
  },
  logout: {
    id: 'Header.Menu.Logout',
    defaultMessage: 'Logout',
  },
});

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    username: state.auth.username,
    unread: state.inbox.unread,
    breadcrumb: state.menu.breadcrumb,
    lang: state.locales.lang,
    // routes: state.menu.routes,
    treeMenu: state.menu.tree,
    transactions: state.menu.transactions,
  };
}

Header.propTypes = {
  intl: intlShape.isRequired,
};

export default connect(
  mapStateToProps,
  {
    fetchUnreadMessages,
    breadcrumbChanged,
    fetchTreeMenu,
    fetchUserInfo,
    signOut: signoutUser,
  },
)(injectIntl(Header));
