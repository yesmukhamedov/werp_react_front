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
    this.handleAddEmptySparePartListItem = this.handleAddEmptySparePartListItem.bind(this)
    // handler for removing item from list
    this.handleRemoveSparePartListItem = this.handleRemoveSparePartListItem.bind(this)
  }

  handleAddEmptySparePartListItem() {
    let listItem = {
      id: uuid(),
      type: undefined,
      desc: "",
      price: undefined,
      quantity: "",
      currency: "",
      total: undefined
    };
    this.setState({
      ...this.state,
      warrantyList: [...this.state.warrantyList, listItem]
    });
  }

  handleRemoveSparePartListItem(id) {
    let newWarrantyList = this.state.warrantyList.filter(
      item => item.id !== id
    );
    this.setState({
      ...this.state,
      warrantyList: newWarrantyList
    });
  }

  handleSparePartTypeChange(e, data) {
      console.log(e, data)
  }

  selectSparePartItem(selectedItem) {
    // find empty spare part with id
    let [oldItem] = this.state.sparePartList.filter(
      item => item.id === this.state.sourceSparePartId
    );

    // update empty spare part with fields from reference
    oldItem.desc = selectedItem.name;
    oldItem.price = selectedItem.price;
    oldItem.currency = selectedItem.currency;
    oldItem.quantity = 1;
    oldItem.total = selectedItem.price;

    let newTotalSum = this.calculateTotalSum(this.state.sparePartList);

    this.setState({
      ...this.state,
      sourceSparePartId: undefined,
      sparePartListModal: false,
      totalSum: newTotalSum
    });
  }

  calculateTotalSum(list) {
    return _.sumBy(list, "price");
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

  openSparePartListModal(id) {
    this.setState({
      ...this.state,
      referenceData: referenceSparePartList,
      sparePartListModal: true,
      sourceSparePartId: id
    });
  }

  closeSparePartListModal() {
    this.setState({
      ...this.state,
      referenceData: [],
      sparePartListModal: false,
      sourceSparePartId: null
    });
  }

  render() {
    return (
      <div className="sp-sparepart-wrapper">
        <table className="sp-sparepart-list">
          <tr className="sp-sparepart-list-header">
            <td colSpan={6}>
              <Button primary onClick={this.handleAddEmptySparePartListItem}>
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
                handleOpenReference={this.openSparePartListModal}
                handleRemove={this.handleRemoveSparePartListItem} />
            ))}
          </tbody>
        </table>
        <ReferenceModal />
      </div>
    );
  }
}
