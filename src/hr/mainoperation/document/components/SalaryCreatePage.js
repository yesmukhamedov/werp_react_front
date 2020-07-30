import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Header,
  Container,
  Segment,
  Divider,
  Table,
  Button,
} from 'semantic-ui-react';
import { handleAction, fetchDocument } from '../actions/hrDocAction';
import {
  toggleStaffListModal,
  fetchAllManagers,
  fetchAllDirectors,
} from '../../staff/actions/hrStaffAction';
import {
  f4FetchPositionList,
  f4FetchBusinessAreaList,
  f4FetchDepartmentList,
  f4FetchCurrencyList,
} from '../../../../reference/f4/f4_action';
import { toggleSalaryListModal } from '../../salary/actions/hrSalaryAction';
import { fetchAllCurrentStaffs } from '../../staff/actions/hrStaffAction';
import { notify } from '../../../../general/notification/notification_action';
import { injectIntl } from 'react-intl';
import DatePicker from 'react-datepicker';
import { DOC_ACTION_ADD_SALARY } from '../../../hrUtil';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
require('moment/locale/ru');

class SalaryCreatePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffListModalOpened: false,
      localDocument: {},
    };
  }

  componentWillMount() {
    let docId = parseInt(this.props.match.params.id, 10);
    this.props.fetchDocument(docId);
    this.loadReferences();
  }

  loadReferences() {
    this.props.f4FetchDepartmentList();
    this.props.f4FetchPositionList('hr_document');
    this.props.fetchAllManagers();
    this.props.f4FetchBusinessAreaList();
    this.props.fetchAllCurrentStaffs([]);
    this.props.fetchAllDirectors();
    this.props.f4FetchCurrencyList('hr_doc');
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.document &&
      nextProps.document.id !== this.state.localDocument.id
    ) {
      this.setState({
        localDocument: Object.assign({}, nextProps.document),
      });
    }
  }

  getBranchOptions = bukrs => {
    let branchOptions = this.props.branchOptions;
    if (!branchOptions || !branchOptions[bukrs]) {
      return [];
    }
    return branchOptions[bukrs];
  };

  getBusinessAreaOptions = bukrs => {
    let businessAreaList = this.props.businessAreaList;
    if (!businessAreaList) {
      return [];
    }

    let out = [];
    for (let k in businessAreaList) {
      if (businessAreaList[k]['bukrs'] === bukrs) {
        out.push({
          key: businessAreaList[k]['business_area_id'],
          value: businessAreaList[k]['business_area_id'],
          text: businessAreaList[k]['name'],
        });
      }
    }
    return out;
  };

  getManagerOptions = branchId => {
    let managerOptions = this.props.managersByBranchOptions;
    if (!managerOptions || !managerOptions[branchId]) {
      return [];
    }

    return managerOptions[branchId];
  };

  handleItemChange = (index, fieldName, fieldValue) => {
    let doc = Object.assign({}, this.state.localDocument);
    let items = doc.items || [];
    if (!items[index]) {
      return;
    }

    if (fieldName === 'beginDate' || fieldName === 'endDate') {
      if (fieldValue) {
        fieldValue = fieldValue.valueOf();
      } else {
        fieldValue = null;
      }
    }

    if (fieldName === 'branchId') {
      items[index]['managerId'] = null;
    }

    items[index][fieldName] = fieldValue;
    doc['items'] = items;
    this.setState({
      ...this.state,
      localDocument: doc,
    });
  };

  render() {
    const { localDocument } = this.state;
    const items = localDocument['items'] || [];
    //const { messages, locale } = this.props.intl;
    const { positionList, currencyList } = this.props;
    let pageTitle = 'Добавление должностей Док №' + localDocument['id'];
    let managerOptions = this.getManagerOptions(localDocument['branchId']);
    let businessAreaOptions = this.getBusinessAreaOptions(
      localDocument['bukrs'],
    );

    return (
      <Container
        fluid
        style={{
          marginTop: '2em',
          marginBottom: '2em',
          paddingLeft: '2em',
          paddingRight: '2em',
        }}
      >
        <Segment clearing>
          <Header as="h2" floated="left">
            {pageTitle}
          </Header>

          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>№</Table.HeaderCell>
                <Table.HeaderCell>Сотрудник</Table.HeaderCell>
                <Table.HeaderCell>Должность</Table.HeaderCell>
                <Table.HeaderCell>Дата начало</Table.HeaderCell>
                <Table.HeaderCell>Менеджер</Table.HeaderCell>
                <Table.HeaderCell>Бизнес сфера</Table.HeaderCell>
                <Table.HeaderCell>Оклад</Table.HeaderCell>
                <Table.HeaderCell>Валюта</Table.HeaderCell>
                <Table.HeaderCell>Тип</Table.HeaderCell>
                <Table.HeaderCell>Прим.</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {items.map((item, idx) => (
                <Table.Row key={item.staffId}>
                  <Table.Cell>{idx + 1}</Table.Cell>
                  <Table.Cell>{item.staffName}</Table.Cell>
                  <Table.Cell>
                    {
                      <select
                        className="ui fluid dropdown"
                        onChange={e =>
                          this.handleItemChange(
                            idx,
                            'positionId',
                            e.target.value,
                          )
                        }
                        style={{ maxWidth: '200px' }}
                        value={item.positionId || ''}
                      >
                        <option value="">Не выбрано</option>
                        {positionList.map(pos => (
                          <option key={pos.position_id} value={pos.position_id}>
                            {pos.text}
                          </option>
                        ))}
                      </select>
                    }
                  </Table.Cell>
                  <Table.Cell>
                    {
                      <DatePicker
                        locale="ru"
                        label=""
                        autoComplete="off"
                        placeholderText="Дата начала"
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        dateFormat="DD.MM.YYYY"
                        selected={
                          item['beginDate'] ? moment(item['beginDate']) : null
                        }
                        onChange={v =>
                          this.handleItemChange(idx, 'beginDate', v)
                        }
                      />
                    }
                  </Table.Cell>
                  <Table.Cell>
                    {
                      <select
                        className="ui fluid dropdown"
                        onChange={e =>
                          this.handleItemChange(
                            idx,
                            'managerId',
                            e.target.value,
                          )
                        }
                        style={{ maxWidth: '200px' }}
                        value={item.managerId || ''}
                      >
                        <option value="">Не выбрано</option>
                        {managerOptions.map(manager => (
                          <option key={manager.key} value={manager.value}>
                            {manager.text}
                          </option>
                        ))}
                      </select>
                    }
                  </Table.Cell>
                  <Table.Cell>
                    {
                      <select
                        className="ui fluid dropdown"
                        onChange={e =>
                          this.handleItemChange(
                            idx,
                            'businessAreaId',
                            e.target.value,
                          )
                        }
                        style={{ maxWidth: '200px' }}
                        value={item.businessAreaId || ''}
                      >
                        <option value="">Не выбрано</option>
                        {businessAreaOptions.map(bus => (
                          <option key={bus.key} value={bus.value}>
                            {bus.text}
                          </option>
                        ))}
                      </select>
                    }
                  </Table.Cell>
                  <Table.Cell>
                    <input
                      type="number"
                      value={item.amount || 0}
                      onChange={e =>
                        this.handleItemChange(idx, 'amount', e.target.value)
                      }
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <select
                      className="ui fluid dropdown"
                      onChange={e =>
                        this.handleItemChange(idx, 'currency', e.target.value)
                      }
                      style={{ maxWidth: '200px' }}
                      value={item['currency'] || ''}
                    >
                      <option value="">Не выбрано</option>
                      {currencyList.map(cur => (
                        <option key={cur.currency} value={cur.currency}>
                          {cur.currency}
                        </option>
                      ))}
                    </select>
                  </Table.Cell>
                  <Table.Cell>
                    {
                      <select
                        className="ui fluid dropdown"
                        onChange={e =>
                          this.handleItemChange(
                            idx,
                            'additional',
                            e.target.value,
                          )
                        }
                        style={{ maxWidth: '200px' }}
                        value={item.additional || ''}
                      >
                        <option value="0">Не выбрано</option>
                        <option value="1">Доп. работа</option>
                      </select>
                    }
                  </Table.Cell>
                  <Table.Cell>
                    <textarea
                      className="ui fluid"
                      onChange={e =>
                        this.handleItemChange(idx, 'note', e.target.value)
                      }
                    >
                      {item['note']}
                    </textarea>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Segment>
        <Divider clearing />
        <Button
          primary
          onClick={() =>
            this.props.handleAction(
              localDocument,
              DOC_ACTION_ADD_SALARY,
              localDocument['items'],
            )
          }
        >
          Сохранить
        </Button>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    document: state.hrDocReducer.document,
    actions: state.hrDocReducer.actions,
    bukrsOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsAll,
    staffListModalOpened: state.hrStaff.staffListModalOpened,
    managersByBranchOptions: state.hrStaff.managersByBranchOptions,
    directorsByBranchOptions: state.hrStaff.directorsByBranchOptions,
    allStaffs: state.hrStaff.allStaffs,
    allCurrentStaffs: state.hrStaff.allCurrentStaffs,
    departmentList: state.f4.departmentList,
    positionList: state.f4.positionList,
    businessAreaList: state.f4.businessAreaList,
    currencyList: state.f4.currencyList,
    loader: state.loader,
  };
}

export default connect(mapStateToProps, {
  toggleStaffListModal,
  handleAction,
  fetchAllDirectors,
  f4FetchPositionList,
  f4FetchBusinessAreaList,
  f4FetchDepartmentList,
  fetchAllManagers,
  toggleSalaryListModal,
  fetchAllCurrentStaffs,
  notify,
  f4FetchCurrencyList,
  fetchDocument,
})(injectIntl(SalaryCreatePage));
