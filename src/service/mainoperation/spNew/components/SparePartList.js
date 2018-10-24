import React, { Component } from 'react';
import { Button, Table, Icon } from 'semantic-ui-react';
import uuid from 'uuid';
import _ from 'lodash';
import SparePartListItem from './SparePartListItem';
import ReferenceModal from './ReferenceModal';

export default class SparePartList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sparePartList: [],
      sparePartTotal: 0,
      sparePartListModal: false,
      sourceSparePartUUID: undefined,
      selectedReferenceItems: [],
    };

    this.handleAddEmptySparePartListItem = this.handleAddEmptySparePartListItem.bind(this);
    this.handleRemoveSparePartListItem = this.handleRemoveSparePartListItem.bind(this);
    this.updateCellData = this.updateCellData.bind(this);

    this.selectSparePartItem = this.selectSparePartItem.bind(this);
    this.openSparePartListModal = this.openSparePartListModal.bind(this);
    this.closeSparePartListModal = this.closeSparePartListModal.bind(this);

    this.handleSparePartTypeChange = this.handleSparePartTypeChange.bind(this);
  }

  handleAddEmptySparePartListItem() {
    const listItem = {
      uuid: uuid(),
      id: undefined,
      operTypeId: 1,
      description: '',
      price: '',
      quantity: 1,
      currency: '',
      totalPrice: '',
      code: '',
      submittable: false,
    };
    this.setState({
      ...this.state,
      sparePartList: [...this.state.sparePartList, listItem],
    }, () => {
      this.props.saveChange(this.state.sparePartList, 'sparePartList');
    });
  }

  handleRemoveSparePartListItem(uuid) {
    const newSparePartList = this.state.sparePartList.filter(item => item.uuid !== uuid );
    const newSelectedReferenceItems = this.state.selectedReferenceItems.filter(item => item.uuid !== uuid );

    this.setState({
      ...this.state,
      sparePartList: newSparePartList,
      selectedReferenceItems: newSelectedReferenceItems,
    }, () => {
      this.props.saveChange(this.state.sparePartList, 'sparePartList');
    });
  }

  handleSparePartTypeChange(e, data) {
    console.log(e, data);
  }

  selectSparePartItem(selectedItem) {
    const newSparePartListModal = this.state.sparePartList.map((item) => {
      if (item.uuid === this.state.sourceSparePartUUID) {
        return {
          ...item,
          id: selectedItem.id,
          description: selectedItem.name,
          price: selectedItem.price,
          currency: selectedItem.currency,
          quantity: 1,
          totalPrice: selectedItem.price,
          code: selectedItem.code,
          submittable: true,
        };
      }
      return item;
    });

    const newSelectedReferenceItems = [...this.state.selectedReferenceItems, { id: selectedItem.id, uuid: this.state.sourceSparePartUUID }];

    this.setState({
      ...this.state,
      sparePartList: newSparePartListModal,
      sourceSparePartUUID: undefined,
      sparePartListModal: false,
      selectedReferenceItems: newSelectedReferenceItems,
    }, () => {
      this.props.saveChange(this.state.sparePartList, 'sparePartList');
    });
  }

  updateCellData(index, dataType, value) {
    const updateSparePartList = this.state.sparePartList.map((el, i) => {
      if (i === index) {
        if (dataType === 'price') {
          return {
            ...el,
            [dataType]: value,
            totalPrice: value * el.quantity,
            submittable: true,
          };
        } else if (dataType === 'quantity') {
          return {
            ...el,
            [dataType]: value,
            totalPrice: value * el.price,
            submittable: true,
          };
        } else if (dataType === 'operTypeId') {
          return {
            ...el,
            [dataType]: value,
            // clear other fields
            description: '',
            price: '',
            quantity: 1,
            currency: '',
            totalPrice: '',
            code: '',
            submittable: false,
          };
        }
        return {
          ...el,
          [dataType]: value,
          submittable: true,
        };
      }
      return el;
    });

    this.setState({
      ...this.state,
      sparePartList: updateSparePartList,
    }, () => {
      this.props.saveChange(this.state.sparePartList, 'sparePartList');
    });
  }

  openSparePartListModal(uuid) {
    this.setState({
      ...this.state,
      sparePartListModal: true,
      sourceSparePartUUID: uuid,
    });
  }

  closeSparePartListModal() {
    this.setState({
      ...this.state,
      sparePartListModal: false,
      sourceSparePartUUID: null,
    });
  }

  render() {
    const filteredReferenceList = _.differenceBy(this.props.data, this.state.selectedReferenceItems, 'id');
    return (
      <div>
        <Table celled color="black" striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan="8">
                <Button
                  onClick={this.handleAddEmptySparePartListItem}
                  floated="right"
                  icon
                  labelPosition="left"
                  primary
                  size="small"
                >
                  <Icon name="plus" /> Добавить
                </Button>
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell collapsing>#</Table.HeaderCell>
              <Table.HeaderCell>Операция</Table.HeaderCell>
              <Table.HeaderCell collapsing>Материал</Table.HeaderCell>
              <Table.HeaderCell>Код</Table.HeaderCell>
              <Table.HeaderCell>Описание</Table.HeaderCell>
              <Table.HeaderCell>Цена</Table.HeaderCell>
              <Table.HeaderCell>Количество (шт.)</Table.HeaderCell>
              <Table.HeaderCell>Сумма</Table.HeaderCell>
              <Table.HeaderCell collapsing />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.sparePartList.map((el, idx) => (
              <SparePartListItem
                key={idx}
                idx={idx}
                data={el}
                handleCellChange={this.updateCellData}
                handleOpen={this.openSparePartListModal}
                handleRemove={this.handleRemoveSparePartListItem}
                handleTypeChange={this.handleSparePartTypeChange}
              />
            ))}

          </Table.Body>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan="8" style={{ textAlign: 'right' }}>Total</Table.HeaderCell>
              <Table.HeaderCell style={{ textAlign: 'center' }}>{this.props.totalSum}</Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>

        <ReferenceModal
          visible={this.state.sparePartListModal}
          data={filteredReferenceList}
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
    Header: 'Код',
    accessor: 'code',
  }, {
    Header: 'Цена',
    accessor: 'price',
  }, {
    Header: 'Название',
    accessor: 'name',
  }, {
    Header: 'Валюта',
    accessor: 'currency',
  },
];
