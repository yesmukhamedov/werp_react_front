import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'

// const arrayList= ;
class LazyPagination extends Component {
  constructor (props) {
    super(props)
    this.handleItemClick = this.handleItemClick.bind(this)

    this.state = {buttons: [], activeItem: 1}
  }
  componentWillMount () {
    console.log(this.props.totalRows)
  }
  handleItemClick (pageNumber) {

  }
  renderItem () {
    let {totalRows, currentPage, perPage} = this.props
    let buttonCount = parseInt(totalRows / perPage, 10)
    let a = []
    for (let i = 0; i < buttonCount; i++) {
      a.push({
        idx: i + 1,
        active: i == currentPage,
        perPage: perPage
      })
    }
    let i = 0
    return a.map((item, idx) => {
      return <Menu.Item onClick={() => this.props.onItemClick(item.idx - 1)} key={idx} active={item.active} as='a'>{item.idx}</Menu.Item>
    })
  }

  render () {
    let {currentPage} = this.props
    return <Menu floated='right' pagination>
      {currentPage > 0 ? <Menu.Item as='a' icon>
        <Icon name='left chevron' />
      </Menu.Item> : ''}
      {this.renderItem()}
      <Menu.Item as='a' icon>
        <Icon name='right chevron' />
      </Menu.Item>
    </Menu>
  }
};

export default LazyPagination
