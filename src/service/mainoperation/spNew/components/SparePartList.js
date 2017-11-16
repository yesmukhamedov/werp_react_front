import React, { Component } from "react";
import { Table, Input, Dropdown, Button, Icon } from "semantic-ui-react";
import uuid from "uuid";
import axios from "axios";
import _ from "lodash";
import SparePartListItem from "./SparePartListItem";
import ReferenceModal from "./ReferenceModal";
import { ROOT_URL } from "../../../../utils/constants";
import { referenceSparePartList } from "../../../../utils/stubs";
import "../css/SparePartList.css";

export default class SparePartList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sparePartList: [],
      sparePartTotal: 0,
      totalSum: 0,
      sparePartListModal: false,
      sourceSparePartId: undefined
    };

    this.handleAddEmptySparePartListItem = this.handleAddEmptySparePartListItem.bind(this);
    this.handleRemoveSparePartListItem = this.handleRemoveSparePartListItem.bind(this);
    this.updateCellData = this.updateCellData.bind(this);

    this.selectSparePartItem = this.selectSparePartItem.bind(this);
    this.openSparePartListModal = this.openSparePartListModal.bind(this);
    this.closeSparePartListModal = this.closeSparePartListModal.bind(this);

    this.handleSparePartTypeChange = this.handleSparePartTypeChange.bind(this)
  }

  handleAddEmptySparePartListItem() {
    let listItem = {
      id: uuid(),
      type: 0,
      desc: "",
      price: "",
      quantity: "",
      currency: "",
      total: ""
    };
    this.setState({
      ...this.state,
      sparePartList: [...this.state.sparePartList, listItem]
    });
  }

  handleRemoveSparePartListItem(id) {
    let newSparePartList = this.state.sparePartList.filter(
      item => item.id !== id
    );
    this.setState({
      ...this.state,
      sparePartList: newSparePartList
    });
  }

  handleSparePartTypeChange(e, data) {
      console.log(e, data)
  }

  selectSparePartItem(selectedItem) {
    // // find empty spare part with id
    // let [oldItem] = this.state.sparePartList.filter(
    //   item => item.id === this.state.sourceSparePartId
    // );

    // // update empty spare part with fields from reference
    // oldItem.desc = selectedItem.name;
    // oldItem.price = selectedItem.price;
    // oldItem.currency = selectedItem.currency;
    // oldItem.quantity = 1;
    // oldItem.total = selectedItem.price;
    let newSparePartListModal = this.state.sparePartList.map((item) => {
      if (item.id === this.state.sourceSparePartId) {
        return {
          ...item,
          desc: selectedItem.name,
          price: selectedItem.price,
          currency: selectedItem.currency,
          quantity: 1,
          total: selectedItem.price
        }
      }

      return item;
    })

    let newTotalSum = this.calculateTotalSum(this.state.sparePartList);

    this.setState({
      ...this.state,
      sparePartList: newSparePartListModal,
      sourceSparePartId: undefined,
      sparePartListModal: false,
      totalSum: newTotalSum
    });
  }

  calculateTotalSum(list) {
    return _.sumBy(list, (item) => parseInt(item.price || 0));
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
        } else if (dataType === "type") {
          return {
            ...el,
            [dataType]: value,
            // clear other fields
            desc: "",
            price: "",
            quantity: "",
            currency: "",
            total: ""
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
            <td colSpan={8}>
              <Button primary onClick={this.handleAddEmptySparePartListItem}>
                Добавить
              </Button>
            </td>
          </tr>
          <tr>
            <th>#</th>
            <th>Операция</th>
            <th>Материал</th>
            <th>Описание</th>
            <th>Цена</th>
            <th>Количество (шт.)</th>
            <th>Сумма</th>
            <th></th>
          </tr>
          <tbody>
            {this.state.sparePartList.map((el, idx) => (
              <SparePartListItem
                key={idx}
                idx={idx}
                data={el}
                handleCellChange={this.updateCellData}
                handleOpenReference={this.openSparePartListModal}
                handleRemove={this.handleRemoveSparePartListItem}
                handleTypeChange={this.handleSparePartTypeChange}
              />
            ))}
            <tr className="sp-sparepart-list-footer">
              <td colSpan={7}>Total</td>
              <td>{this.state.totalSum}</td>
            </tr>
          </tbody>
        </table>
        <ReferenceModal
          visible={this.state.sparePartListModal}
          data={this.state.referenceData}
          close={this.closeSparePartListModal}
          open={this.openSparePartListModal}
          select={this.selectSparePartItem}
        />
      </div>
    );
  }
}
