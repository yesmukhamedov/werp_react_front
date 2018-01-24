import React, { Component } from "react";
import {Button, Table, Icon} from "semantic-ui-react";
import uuid from "uuid";
import _ from "lodash";
import WarrantyListItem from "./WarrantyListItem";
import ReferenceModal from "./ReferenceModal";
import "../css/SparePartList.css";

export default class WarrantyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warrantyList: [],
      warrantyModal: false,
      sourceSparePartUUID: undefined,
      selectedReferenceItems: []
    }

    // handler for adding empty item to list
    this.handleAddEmptyWarrantyListItem = this.handleAddEmptyWarrantyListItem.bind(this)
    // handler for removing item from list
    this.handleRemoveWarrantyListItem = this.handleRemoveWarrantyListItem.bind(this)
    // handler for selecting item from reference modal
    this.handleSelectWarrantyItem = this.handleSelectWarrantyItem.bind(this)
    this.updateCellData = this.updateCellData.bind(this)
    
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal(uuid) {
    console.log("openModal is executed")
    this.setState({
      ...this.state,
      warrantyModal: true,
      sourceSparePartUUID: uuid
    });
  }

  closeModal() {
    this.setState({
      ...this.state,
      warrantyModal: false,
      sourceSparePartUUID: null
    });
  }

  handleAddEmptyWarrantyListItem() {
    let listItem = {
      uuid: uuid(),
      sparePartId: "",
      description: "",
      code: "",
      warrantyMonths: "",
      submittable: false, 
      sparePartId: undefined
    };
    this.setState({
      ...this.state,
      warrantyList: [...this.state.warrantyList, listItem]
    }, () => {
      this.props.saveChange(this.state.warrantyList, 'warrantyList')
    });
  }

  handleRemoveWarrantyListItem(uuid) {
    const newWarrantyList = this.state.warrantyList.filter(
      item => item.uuid !== uuid
    );

    const newSelectedReferenceItems = this.state.selectedReferenceItems.filter(
      item => item.uuid !== uuid
    )
    this.setState({
      ...this.state,
      warrantyList: newWarrantyList,
      selectedReferenceItems: newSelectedReferenceItems
    }, () => {
      this.props.saveChange(this.state.warrantyList, 'warrantyList')
    });
  }

  handleSelectWarrantyItem(selectedItem) {
    console.log("selectedItem", selectedItem, "sourceID", this.state.sourceSparePartUUID)
    const newWarrantyList = this.state.warrantyList.map(item => {
      if (item.uuid === this.state.sourceSparePartUUID) {
        return {
          ...item, 
          id: selectedItem.id,
          description: selectedItem.name,
          code: selectedItem.code,
          warrantyMonths: Math.max(selectedItem.warrantyMonths, 1),
          submittable: true
        }
      }
      return item
    })

    const newSelectedReferenceItems = [...this.state.selectedReferenceItems, { id: selectedItem.id, uuid: this.state.sourceSparePartUUID }]
  
    this.setState({
      ...this.state,
      warrantyModal: false,
      warrantyList: newWarrantyList,
      sourceSparePartUUID: undefined,
      selectedReferenceItems: newSelectedReferenceItems
    }, () => {
      this.props.saveChange(this.state.warrantyList, 'warrantyList')
    })
  }

  updateCellData(index, dataType, value) {
    const updateWarrantyList = this.state.warrantyList.map((el, i) => {
      if (i === index) {
        return {
          ...el,
          [dataType]: value,
          submittable: true
        };
      }
      return el;
    });

    this.setState({
      ...this.state,
      warrantyList: updateWarrantyList
    }, () => {
      this.props.saveChange(this.state.warrantyList, 'warrantyList')
    });
  }

  render() {
    const filteredReferenceList = _.differenceBy(this.props.data, this.state.selectedReferenceItems, 'id')
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
                handleCellChange={this.updateCellData}
                handleRemove={this.handleRemoveWarrantyListItem} />
            ))}
          </Table.Body>
        </Table>
        <ReferenceModal 
          data={filteredReferenceList}
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
