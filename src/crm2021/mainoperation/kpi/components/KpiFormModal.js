import React, { Component } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import _ from 'lodash';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import {
  toggleKpiSettingFormModal,
  createItem,
  updateItem,
} from '../actions/kpiSettingAction';
import YearF4 from '../../../../reference/f4/date/YearF4';
import MonthF4 from '../../../../reference/f4/date/MonthF4';
import PositionF4 from '../../../../reference/f4/position/PositionF4';

class KpiFormModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      localItem: {
        id: -1,
      },
      errors: {
        dealerId: false,
        resultId: false,
        reasonId: false,
        dateTime: false,
        clientName: false,
        address: false,
        locationId: false,
      },
    };

    this.close = this.close.bind(this);
    this.renderUpdateForm = this.renderUpdateForm.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleIndicatorChange = this.handleIndicatorChange.bind(this);
  }

  componentWillMount() {}

  branchOptions = bukrs => {
    let { branchOptionsMarketing } = this.props;
    if (!branchOptionsMarketing || !branchOptionsMarketing[bukrs]) {
      return [];
    }

    let out = [
      {
        key: null,
        value: null,
        text: 'Для всех филиалов',
      },
    ].concat(branchOptionsMarketing[bukrs]);

    return out;
  };

  renderUpdateForm() {
    let { companyOptions } = this.props;
    let { localItem } = this.state;
    return (
      <Form>
        <Form.Group widths="equal">
          <Form.Select
            name="bukrs"
            label="Компания"
            options={companyOptions}
            value={localItem.bukrs}
            placeholder="Компания"
            onChange={this.handleDropdownChange}
          />

          <Form.Select
            name="branchId"
            value={localItem.branchId}
            search={true}
            selection
            label="Филиал"
            options={this.branchOptions(localItem.bukrs)}
            placeholder="Для всех филиалов"
            onChange={this.handleDropdownChange}
          />

          <YearF4
            value={localItem.year}
            handleChange={this.handleDropdownChange}
          />
          <MonthF4
            value={localItem.month}
            handleChange={this.handleDropdownChange}
          />
          <PositionF4
            value={localItem.positionId}
            handleChange={this.handleDropdownChange}
          />
        </Form.Group>

        <Form.Group>
          <Button floated={'right'} onClick={this.addItem}>
            Добавить индикатор
          </Button>
          <br />
        </Form.Group>

        {this.renderIndicators(localItem.items || [])}
      </Form>
    );
  }

  removeItem = indicatorId => {
    let localItem = Object.assign({}, this.state.localItem);

    localItem['items'] = _.remove(localItem.items, function(obj) {
      return obj.indicatorId !== indicatorId;
    });

    this.setState({
      ...this.state,
      localItem: localItem,
    });
  };

  addItem = () => {
    let localItem = Object.assign({}, this.state.localItem);
    let indicators = Object.assign({}, this.props.indicators);

    for (let k in localItem['items']) {
      delete indicators[localItem['items'][k]['indicatorId']];
    }

    let indicatorId = 0;
    for (let k in indicators) {
      indicatorId = k;
      break;
    }

    if (indicatorId === 0) {
      window.alert('Все индикаторы выбраны');
      return;
    }

    localItem['items'].push({
      id: null,
      indicatorId: parseInt(indicatorId, 10),
      indicatorName: '',
      doneValue: null,
      point: null,
      score: null,
      value: null,
    });

    this.setState({
      ...this.state,
      localItem: localItem,
    });
  };

  renderIndicators(items) {
    return items.map((item, idx) => {
      return (
        <Form.Group widths="equal" key={idx}>
          <Form.Select
            name="indicatorId"
            label="Индикатор"
            value={item.indicatorId}
            options={this.props.indicatorOptions}
            placeholder="Индикатор"
            onChange={(e, o) =>
              this.handleIndicatorChange('indicatorId', idx, o)
            }
          />

          <Form.Input
            onChange={(e, o) => this.handleIndicatorChange('value', idx, o)}
            name="value"
            label="План"
            type="number"
            value={item.value || 0}
          />

          <Form.Input
            onChange={(e, o) => this.handleIndicatorChange('point', idx, o)}
            name="point"
            label="Балл"
            type="number"
            value={item.point || 0}
          />

          <Form.Field>
            <label>&nbsp;</label>
            <Button
              onClick={() => this.removeItem(item.indicatorId)}
              icon="trash"
            />
          </Form.Field>
        </Form.Group>
      );
    });
  }

  handleIndicatorChange(fieldName, key, o) {
    let localItem = Object.assign({}, this.state.localItem);
    let items = localItem['items'];
    if (items[key]) {
      let item = items[key];
      switch (fieldName) {
        case 'indicatorId':
        case 'value':
        case 'point':
          item[fieldName] = o.value;
          break;

        default:
          break;
      }

      items[key] = item;
    } else {
      console.log('NO');
    }

    localItem['items'] = items;
    this.setState({
      ...this.state,
      localItem: localItem,
    });
  }

  handleDropdownChange(e, o) {
    const { name, value } = o;
    let localItem = Object.assign({}, this.state.localItem);
    switch (name) {
      case 'bukrs':
      case 'year':
      case 'month':
      case 'branchId':
        localItem[name] = value;
        break;

      case 'position':
        localItem['positionId'] = value;
        break;

      default: {
      }
    }

    this.setState({
      ...this.state,
      localItem: localItem,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.item.id !== this.state.localItem.id) {
      let localItem = Object.assign({}, nextProps.item);
      this.setState({
        ...this.state,
        localItem: localItem,
      });
    }
  }

  saveItem() {
    let { localItem } = this.state;
    console.log('localitem: ', localItem);
    if (
      localItem.id &&
      typeof localItem.id !== 'undefined' &&
      localItem.id > 0
    ) {
      this.props.updateItem(localItem);
    } else {
      this.props.createItem(localItem);
    }
  }

  close() {
    this.props.toggleKpiSettingFormModal(false);
  }

  // copyData = () => {
  //     let localItem = Object.assign({},this.state.localItem)
  // }

  render() {
    const { open } = this.props;
    return (
      <Modal size={'large'} open={open}>
        <Modal.Header>Добавление/Редактирование KPI настройки</Modal.Header>
        <Modal.Content scrolling>{this.renderUpdateForm()}</Modal.Content>
        <Modal.Actions>
          <Button
            negative
            onClick={() => this.props.toggleKpiSettingFormModal(false)}
          >
            Отмена
          </Button>
          <Button
            positive
            icon="checkmark"
            onClick={this.saveItem}
            labelPosition="right"
            content="Сохранить"
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    open: state.crmKpiSetting.openKpiFormModal,
    item: state.crmKpiSetting.item,
    indicators: state.crmKpiSetting.indicators,
    indicatorOptions: state.crmKpiSetting.indicatorOptions,
    branchOptionsMarketing: state.userInfo.branchOptionsMarketing,
    companyOptions: state.userInfo.companyOptions,
  };
}

export default connect(mapStateToProps, {
  toggleKpiSettingFormModal,
  createItem,
  updateItem,
})(KpiFormModal);
