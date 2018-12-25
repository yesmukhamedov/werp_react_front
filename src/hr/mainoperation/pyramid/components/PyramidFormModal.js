import React, { Component } from 'react';
import { Modal, Form, Input, Button } from 'semantic-ui-react';
import {
  toggleFormModal,
  createPyramid,
  updatePyramid,
} from '../actions/hrPyramidAction';
import { connect } from 'react-redux';
import BranchF4 from '../../../../reference/f4/branch/BranchF4';
import StaffListModal from '../../staff/components/StaffListModal';

class PyramidFormModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      localItem: {},
      staffListModalOpened: false,
      loading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.onStaffSelect = this.onStaffSelect.bind(this);
    this.removeStaff = this.removeStaff.bind(this);
  }

  componentWillMount() {}

  closeStaffListModal = () => {
    this.setState({
      ...this.state,
      staffListModalOpened: false,
    });
  };

  positionOptions = () => {
    if (!this.props.positionList) {
      return [];
    }

    let out = [];
    for (let k in this.props.positionList) {
      out.push({
        key: this.props.positionList[k]['position_id'],
        value: this.props.positionList[k]['position_id'],
        text: this.props.positionList[k]['text'],
      });
    }

    return out;
  };

  busAreaOptions(bukrs) {
    if (!this.props.businessAreaList) {
      return [];
    }

    let out = [];
    const { businessAreaList } = this.props;

    for (let k in businessAreaList) {
      if (bukrs == businessAreaList[k]['bukrs']) {
        out.push({
          key: businessAreaList[k]['business_area_id'],
          value: businessAreaList[k]['business_area_id'],
          text: businessAreaList[k]['name'],
        });
      }
    }

    return out;
  }

  renderForm() {
    const { localItem } = this.state;
    return (
      <Form>
        <Form.Group widths="equal">
          <div className="field">
            <label>Сотрудник</label>
            <div className="ui action left icon input">
              <Button
                onClick={() =>
                  this.setState({ ...this.state, staffListModalOpened: true })
                }
                icon={'user'}
              />
              <input
                readOnly
                placeholder="Сотрудник..."
                type="text"
                value={localItem.staffName || ''}
              />
              <Button onClick={() => this.removeStaff()} icon={'trash'} />
            </div>
          </div>

          <Form.Select
            value={localItem.positionId}
            name="positionId"
            search={true}
            selection
            label="Должность"
            selectOnBlur={false}
            options={this.positionOptions()}
            placeholder="Должность"
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Field
            value={localItem.bukrsName || ''}
            control={Input}
            readOnly
            required
            label="Компания"
            placeholder="Компания"
          />
          <Form.Select
            value={localItem.businessAreaId}
            name="businessAreaId"
            search={true}
            selection
            label="Бизнес сфера"
            selectOnBlur={false}
            options={this.busAreaOptions(localItem.bukrs)}
            placeholder="Бизнес сфера"
            onChange={this.handleChange}
          />

          <BranchF4
            value={localItem.branchId}
            search={true}
            handleChange={this.handleChange}
            bukrs={localItem.bukrs}
          />
        </Form.Group>
      </Form>
    );
  }

  handleChange(e, o) {
    console.log(e, o);
    let localItem = Object.assign({}, this.state.localItem);
    const { name, value } = o;
    if (name === 'branch') {
      localItem['branchId'] = value;
    } else {
      localItem[name] = value;
    }

    this.setState({
      ...this.state,
      localItem: localItem,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.item.id !== this.state.localItem.id ||
      nextProps.parentId !== this.state.localItem.parentId
    ) {
      let localItem = Object.assign({}, nextProps.item);
      this.setState({
        ...this.state,
        localItem: localItem,
      });
    }
  }
  onStaffSelect(staff) {
    let localItem = Object.assign({}, this.state.localItem);
    localItem['staffId'] = staff.staffId;
    localItem['staffName'] = staff.lastname + ' ' + staff.firstname;
    if (staff.positions && staff.positions.length > 0) {
      localItem['positionId'] = staff.positions[0]['positionId'];
      localItem['branchId'] = staff.positions[0]['branchId'];
      localItem['businessAreaId'] = staff.positions[0]['businessAreaId'];
    }
    this.setState({
      ...this.state,
      localItem: localItem,
      staffListModalOpened: false,
    });
  }

  removeStaff() {
    let localItem = Object.assign({}, this.state.localItem);
    localItem['staffId'] = null;
    localItem['staffName'] = null;

    this.setState({
      ...this.state,
      localItem: localItem,
    });
  }

  saveItem() {
    this.setState({
      ...this.state,
      loading: true,
    });
    const { localItem } = this.state;
    let resp = null;
    let isNew = false;
    if (
      localItem.id &&
      typeof localItem.id !== 'undefined' &&
      localItem.id > 0
    ) {
      resp = this.props.updatePyramid(localItem);
    } else {
      resp = this.props.createPyramid(localItem);
      isNew = true;
    }

    if (resp) {
      resp
        .then(({ data }) => {
          if (isNew) {
            this.props.handleAfterCreating(data, localItem['parentId']);
          } else {
            this.props.handleAfterUpdating(data, localItem['parentId']);
          }

          this.setState({
            ...this.state,
            loading: false,
          });
          this.props.toggleFormModal(false);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  render() {
    return (
      <div>
        <Modal size={'small'} open={this.props.formModalOpened}>
          <Modal.Header>Добавление сотрудника в иерархию</Modal.Header>
          <Modal.Content>{this.renderForm()}</Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => this.props.toggleFormModal(false)}>
              Отмена
            </Button>
            <Button
              positive
              disabled={this.state.loading}
              loading={this.state.loading}
              icon="checkmark"
              onClick={this.saveItem}
              labelPosition="right"
              content="Сохранить"
            />
          </Modal.Actions>
        </Modal>

        <StaffListModal
          close={this.closeStaffListModal}
          staffs={this.props.allStaffs}
          onSelect={this.onStaffSelect}
          opened={this.state.staffListModalOpened}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    formModalOpened: state.hrPyramid.formModalOpened,
    positionList: state.f4.positionList,
    item: state.hrPyramid.item,
    allStaffs: state.hrStaff.allCurrentStaffs,
    businessAreaList: state.f4.businessAreaList,
  };
}

export default connect(
  mapStateToProps,
  { toggleFormModal, createPyramid, updatePyramid },
)(PyramidFormModal);
