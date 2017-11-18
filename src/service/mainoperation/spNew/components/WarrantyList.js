import React, { Component } from "react";
import {Button, Table, Icon} from "semantic-ui-react";
import uuid from "uuid";
import WarrantyListItem from "./WarrantyListItem";
import ReferenceModal from "./ReferenceModal";
import "../css/SparePartList.css";

export default class WarrantyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warrantyList: [],
      warrantyModal: false,
      sourceSparePartId: undefined
    }

    // handler for adding empty item to list
    this.handleAddEmptyWarrantyListItem = this.handleAddEmptyWarrantyListItem.bind(this)
    // handler for removing item from list
    this.handleRemoveWarrantyListItem = this.handleRemoveWarrantyListItem.bind(this)
    // handler for selecting item from reference modal
    this.handleSelectWarrantyItem = this.handleSelectWarrantyItem.bind(this)
    // 
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal(id) {
    console.log("openModal is executed")
    this.setState({
      ...this.state,
      warrantyModal: true,
      sourceSparePartId: id
    });
  }

  closeModal() {
    this.setState({
      ...this.state,
      warrantyModal: false,
      sourceSparePartId: null
    });
  }

  handleAddEmptyWarrantyListItem() {
    let listItem = {
      id: uuid(),
      desc: "",
      code: "",
      warrantyPeriod: ""
    };
    this.setState({
      ...this.state,
      warrantyList: [...this.state.warrantyList, listItem]
    }, () => {
      this.props.saveChange(this.state.warrantyList, 'warrantyList')
    });
  }

  handleRemoveWarrantyListItem(id) {
    let newWarrantyList = this.state.warrantyList.filter(
      item => item.id !== id
    );
    this.setState({
      ...this.state,
      warrantyList: newWarrantyList
    }, () => {
      this.props.saveChange(this.state.warrantyList, 'warrantyList')
    });
  }

  handleSelectWarrantyItem(selectedItem) {
    console.log("selectedItem", selectedItem, "sourceID", this.state.sourceSparePartId)
    const newWarrantyList = this.state.warrantyList.map(item => {
      if (item.id === this.state.sourceSparePartId) {
        return {
          ...item, 
          desc: selectedItem.name,
          code: selectedItem.code,
          warrantyPeriod: -1
        }
      }
      return item
    })
    
    console.log(newWarrantyList)

    this.setState({
      ...this.state,
      warrantyModal: false,
      warrantyList: newWarrantyList,
      sourceSparePartId: undefined,
    }, () => {
      this.props.saveChange(this.state.warrantyList, 'warrantyList')
    })
  }

  render() {
    return (
      <div>
        <Table celled color='black' striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan='6'>
                <Button 
                  onClick={this.handleAddEmptyWarrantyListItem}
                  floated='right' icon labelPosition='left' primary size='small'>
                  <Icon name='plus' /> Добавить
                </Button>
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell collapsing>#</Table.HeaderCell>
              <Table.HeaderCell collapsing>Материал</Table.HeaderCell>
              <Table.HeaderCell>Код</Table.HeaderCell>
              <Table.HeaderCell>Описание</Table.HeaderCell>
              <Table.HeaderCell>Гарантия (в мес.)</Table.HeaderCell>
              <Table.HeaderCell collapsing></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.warrantyList.map((el, idx) => (
              <WarrantyListItem
                key={idx}
                idx={idx}
                data={el}
                handleOpenReference={this.openModal}
                handleCloseReference={this.closeModal}
                handleRemove={this.handleRemoveWarrantyListItem} />
            ))}
          </Table.Body>
        </Table>
        <ReferenceModal 
          data={this.props.data}
          visible={this.state.warrantyModal}
          close={this.closeModal}
          select={this.handleSelectWarrantyItem}
          columns={columns} />
      </div>
    );
  }
}

const columns = [
  {
      Header: "Код",
          accessor: "code"
  }, {
      Header: "Название",
      accessor: "name",
  }, {
      Header: "Гарантия (в мес.)",
      accessor: "warrantyMonths",
  }
]
