import React, { Component } from "react";
import { Table, Input, Dropdown, Button, Icon } from "semantic-ui-react";
import uuid from "uuid";
import axios from "axios";
import _ from "lodash";
import WarrantyListItem from "./WarrantyListItem";
import ReferenceModal from "./ReferenceModal";
import { ROOT_URL } from "../../../../utils/constants";
import { referenceSparePartList } from "../../../../utils/stubs";
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
      referenceData: referenceSparePartList,
      warrantyModal: true,
      sourceSparePartId: id
    });
  }

  closeModal() {
    this.setState({
      ...this.state,
      referenceData: [],
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
    });
  }

  handleRemoveWarrantyListItem(id) {
    let newWarrantyList = this.state.warrantyList.filter(
      item => item.id !== id
    );
    this.setState({
      ...this.state,
      warrantyList: newWarrantyList
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
    })
  }

  updateCellData(index, dataType, value) {
    const updateSparePartList = this.state.sparePartList.map((el, i) => {
      if (i == index) {
        if (dataType === "price") {
          return {
            ...el,
            [dataType]: value,
            ["total"]: value
          };
        }
        return {
          ...el,
          [dataType]: value
        };
      }
      return el;
    });

    this.setState({
      ...this.state,
      sparePartList: updateSparePartList,
      totalSum: this.calculateTotalSum(updateSparePartList)
    });
  }

  render() {
    return (
      <div className="sp-sparepart-wrapper">
        <table className="sp-sparepart-list">
          <tr className="sp-sparepart-list-header">
            <td colSpan={6}>
              <Button primary onClick={this.handleAddEmptyWarrantyListItem}>
                Добавить
              </Button>
            </td>
          </tr>
          <tr>
            <th>#</th>
            <th>Материал</th>
            <th>Код</th>
            <th>Описание</th>
            <th>Гарантия (в мес.)</th>
            <th></th>
          </tr>
          <tbody>
            {this.state.warrantyList.map((el, idx) => (
              <WarrantyListItem
                key={idx}
                idx={idx}
                data={el}
                handleOpenReference={this.openModal}
                handleCloseReference={this.closeModal}
                handleRemove={this.handleRemoveWarrantyListItem} />
            ))}
          </tbody>
        </table>
        <ReferenceModal 
          data={referenceSparePartList}
          visible={this.state.warrantyModal}
          close={this.closeModal}
          select={this.handleSelectWarrantyItem} />
      </div>
    );
  }
}
