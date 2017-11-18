import React, { Component } from "react";
import {Button, Table, Icon, Label} from "semantic-ui-react";
import uuid from "uuid";
import _ from "lodash";
import SparePartListItem from "./SparePartListItem";
import ReferenceModal from "./ReferenceModal";

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
    }, () => {
      this.props.saveChange(this.state.sparePartList, 'sparePartList')
    });
  }

  handleRemoveSparePartListItem(id) {
    let newSparePartList = this.state.sparePartList.filter(
      item => item.id !== id
    );
    this.setState({
      ...this.state,
      sparePartList: newSparePartList
    }, () => {
      this.props.saveChange(this.state.sparePartList, 'sparePartList')
    });
  }

  handleSparePartTypeChange(e, data) {
      console.log(e, data)
  }

  selectSparePartItem(selectedItem) {
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
    }, () => {
      this.props.saveChange(this.state.sparePartList, 'sparePartList')
    });
  }

  calculateTotalSum(list) {
    return _.sumBy(list, (item) => parseInt(item.price || 0));
  }

  updateCellData(index, dataType, value) {
    const updateSparePartList = this.state.sparePartList.map((el, i) => {
      if (i === index) {
        if (dataType === "price") {
          return {
            ...el,
            [dataType]: value
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
    }, () => {
      this.props.saveChange(this.state.sparePartList, 'sparePartList')
    });
  }

  openSparePartListModal(id) {
    this.setState({
      ...this.state,
      sparePartListModal: true,
      sourceSparePartId: id
    });
  }

  closeSparePartListModal() {
    this.setState({
      ...this.state,
      sparePartListModal: false,
      sourceSparePartId: null
    });
  }

  render() {
    return (
      <div>
        
        <Table celled color='black' striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan='7'>
                <Button 
                  onClick={this.handleAddEmptySparePartListItem}
                  floated='right' icon labelPosition='left' primary size='small'>
                  <Icon name='plus' /> Добавить
                </Button>
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell collapsing>#</Table.HeaderCell>
              <Table.HeaderCell>Операция</Table.HeaderCell>
              <Table.HeaderCell collapsing>Материал</Table.HeaderCell>
              <Table.HeaderCell >Описание</Table.HeaderCell>
              <Table.HeaderCell>Цена</Table.HeaderCell>
              <Table.HeaderCell>Количество (шт.)</Table.HeaderCell>
              <Table.HeaderCell>Сумма</Table.HeaderCell>
              <Table.HeaderCell collapsing></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
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
            
          </Table.Body>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan='7' style={{textAlign: 'right'}}>Total</Table.HeaderCell>
              <Table.HeaderCell style={{textAlign: 'center'}}>{this.state.totalSum}</Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>

        <ReferenceModal
          visible={this.state.sparePartListModal}
          data={this.props.data}
          close={this.closeSparePartListModal}
          open={this.openSparePartListModal}
          select={this.selectSparePartItem}
          columns={columns}
        />
      </div>
    );
  }
}

const columns = [
  {
      Header: "Код",
          accessor: "code"
  }, {
      Header: "Цена",
      accessor: "price",
  }, {
      Header: "Название",
      accessor: "name",
  }, {
      Header: "Валюта",
      accessor: "currency",
  }
]
