import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';

// const arrayList= ;
class LazyPagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: [],
      activeItem: 1,
      totalRows: 0,
      currentPage: 0,
      perPage: 0, // rowsPerPage
      buttonPerPage: 10,
      showFirstButton: this.props.currentPage > 0,
      showLastButton: false,
    };

    this.handleItemClick = this.handleItemClick.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  handleItemClick(pageNumber) {}
  renderItem(buttonsCount) {
    const { currentPage, perPage } = this.props;
    const buttonsPerPage = this.props.buttonsPerPage || 10;

    const a = [];
    if (buttonsPerPage >= buttonsCount) {
      for (let i = 0; i < buttonsCount; i++) {
        a.push({
          idx: i + 1,
          active: i === currentPage,
          perPage,
        });
      }
    } else {
      const to = Math.min(
        currentPage + (buttonsPerPage - parseInt(buttonsPerPage / 2, 10)),
        buttonsCount,
      );
      const from = Math.max(currentPage - parseInt(buttonsPerPage / 2, 10), 0);

      for (let i = from; i < to; i++) {
        a.push({
          idx: i + 1,
          active: i == currentPage,
          perPage,
        });
      }
    }

    return a.map((item, idx) => (
      <Menu.Item
        onClick={() => this.props.onItemClick(item.idx - 1)}
        key={idx}
        active={item.active}
        as="a"
      >
        {item.idx}
      </Menu.Item>
    ));
  }

  render() {
    const { currentPage, totalRows, perPage } = this.props;
    if (totalRows <= perPage) {
      return null;
    }
    const buttonsCount = Math.ceil(totalRows / perPage);
    return (
      <Menu floated="right" pagination>
        {currentPage > 0 ? (
          <Menu.Item as="a" icon onClick={() => this.props.onItemClick(0)}>
            <Icon name="left chevron" />
          </Menu.Item>
        ) : (
          ''
        )}
        {this.renderItem(buttonsCount)}
        {buttonsCount - 1 > currentPage ? (
          <Menu.Item
            as="a"
            icon
            onClick={() => this.props.onItemClick(buttonsCount - 1)}
          >
            <Icon name="right chevron" />
          </Menu.Item>
        ) : (
          ''
        )}
      </Menu>
    );
  }
}

export default LazyPagination;
