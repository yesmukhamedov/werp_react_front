import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Icon, Segment, Form, Dropdown, Menu } from 'semantic-ui-react';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
import moment from 'moment';
import TextAlignCenter from '../../../utils/TextAlignCenter';
import DropdownClearable from '../../../utils/DropdownClearable';
import SelectWithCheckBox from '../../../utils/Dropdown/selectWithCheckBox';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  momentToStringYYYYMMDD,
  moneyFormat,
  stringYYYYMMDDToMoment,
} from '../../../utils/helpers';
import {
  f4FetchServiceAppStatus,
  f4fetchCategory,
} from '../../../reference/f4/f4_action';
import { fetchSrtbbList, clearSrtbbList } from './srtbbAction';
import OutputErrors from '../../../general/error/outputErrors';
import { errorTableText, excelDownload } from '../../../utils/helpers';
import TotalCountsTable from '../../../utils/TotalCountsTable';
require('moment/locale/ru');

//Сервис отчеты: Итого по филиалам
const Srtbb = props => {
  const {
    intl: { messages },
    companyOptions = [],
    language,
    serviceAppStatus = [],
    branchOptionsService = [],
    category = [],
    srtbbList = [],
  } = props;

  const [param, setParam] = useState({
    bukrs: null,
    branchId: null,
    dateAt: '',
    dateTo: '',
    serviceStatusId: null,
    categoryId: null,
  });

  const [error, setError] = useState([]);

  useEffect(() => {
    props.f4FetchServiceAppStatus();
    props.f4fetchCategory();
  }, []);

  const serviceAppStatusOptions = serviceAppStatus.map(item => {
    return {
      key: item.id,
      text: item.name,
      value: item.id,
    };
  });

  const categoryOptions = category.map(item => {
    return {
      key: item.id,
      text: item.name,
      value: item.id,
    };
  });

  const totalAmountT = srtbbList.reduce(
    (total, item) => total + item.totalAmount,
    0,
  );
  const totalMasterAmount = srtbbList.reduce(
    (total, item) => total + item.masterAmount,
    0,
  );
  const totalOperatorAmount = srtbbList.reduce(
    (total, item) => total + item.operatorAmount,
    0,
  );

  const columns = [
    {
      Header: messages['L__BRANCH'],
      accessor: 'branchName',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
    {
      Header: messages['waers'],
      accessor: 'waers',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
    {
      Header: messages['totalAmount'],
      accessor: 'totalAmount',
      Cell: row => <TextAlignCenter text={moneyFormat(row.value)} />,
      filterAll: true,
      Footer: () => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {`
        ${messages['Common']}:         
         ${moneyFormat(totalAmountT)}
        `}
        </div>
      ),
    },
    {
      Header: messages['master_award'],
      accessor: 'masterAmount',
      Cell: row => <TextAlignCenter text={moneyFormat(row.value)} />,
      filterAll: true,
      Footer: () => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {`
        ${messages['Common']}:  
        ${moneyFormat(totalMasterAmount)}
        `}
        </div>
      ),
    },
    {
      Header: messages['operator_award'],
      accessor: 'operatorAmount',
      Cell: row => <TextAlignCenter text={moneyFormat(row.value)} />,
      filterAll: true,
      Footer: () => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {`
        ${messages['Common']}:  
        ${moneyFormat(totalOperatorAmount)}
        `}
        </div>
      ),
    },
  ];

  const handleClickApply = () => {
    //ВАЛИДАЦИЯ
    if (
      param.bukrs &&
      param.branchId &&
      param.dateAt &&
      param.dateTo &&
      param.categoryId &&
      param.serviceStatusId
    ) {
      props.clearSrtbbList();
      props.fetchSrtbbList({ ...param });
      setError([]);
    } else {
      const errors = [];
      if (!param.bukrs) {
        errors.push(errorTableText(5));
      }
      if (!param.branchId) {
        errors.push(errorTableText(7));
      }
      if (!param.dateAt) {
        errors.push(errorTableText(13));
      }
      if (!param.dateTo) {
        errors.push(errorTableText(14));
      }
      if (!param.categoryId) {
        errors.push(errorTableText(109));
      }
      if (!param.serviceStatusId) {
        errors.push(errorTableText(109));
      }
      setError(() => errors);
    }
  };
  //Excel export
  const exportExcel = () => {
    let excelHeaders = [];
    excelHeaders.push(messages['L__BRANCH']);
    excelHeaders.push(messages['waers']);
    excelHeaders.push(messages['totalAmount']);
    excelHeaders.push(messages['master_award']);
    excelHeaders.push(messages['operator_award']);

    excelDownload(
      'service/report/srtbb/downloadExcel',
      'srtbbResult.xls',
      'outputTable',
      srtbbList,
      excelHeaders,
    );
  };

  return (
    <div>
      <Segment>
        <h3>{`${messages['service_report']}: ${messages['srtbb']}`}</h3>
      </Segment>
      <Segment>
        <Form>
          <Form.Group widths="equal">
            <Form.Field required>
              <label>{messages['bukrs']}</label>
              <DropdownClearable
                selection
                options={companyOptions}
                placeholder={messages['bukrs']}
                onChange={(o, { value }) =>
                  setParam({ ...param, bukrs: value })
                }
                value={param.bukrs ? param.bukrs : ''}
                allSelect={false}
                handleClear={() =>
                  setParam({ ...param, bukrs: null, branchId: null })
                }
              />
            </Form.Field>
            <Form.Field required>
              <label>{messages['TBL_H__BRANCH']}</label>
              <SelectWithCheckBox
                listItem={branchOptionsService[param.bukrs]}
                onSelectDone={selBranchesFromChild => {
                  let arrBranchId = selBranchesFromChild
                    .map(element => element.value)
                    .join();
                  setParam({ ...param, branchId: arrBranchId });
                }}
              />
            </Form.Field>
            <Form.Field className="marginRight" required>
              <label>{messages['Form.DateFrom']}</label>
              <DatePicker
                isClearable
                placeholderText={messages['Form.DateFrom']}
                className="date-auto-width"
                autoComplete="off"
                locale={`${language}`}
                dropdownMode="select" //timezone="UTC"
                selected={
                  param.dateAt == '' ? '' : stringYYYYMMDDToMoment(param.dateAt)
                }
                onChange={date =>
                  setParam({
                    ...param,
                    dateAt: momentToStringYYYYMMDD(date),
                  })
                }
                dateFormat="DD.MM.YYYY"
              />
            </Form.Field>
            <Form.Field className="marginRight" required>
              <label>{messages['Form.DateTo']}</label>
              <DatePicker
                isClearable
                placeholderText={messages['Form.DateTo']}
                className="date-auto-width"
                autoComplete="off"
                locale={`${language}`}
                dropdownMode="select" //timezone="UTC"
                selected={
                  param.dateTo == '' ? '' : stringYYYYMMDDToMoment(param.dateTo)
                }
                onChange={date =>
                  setParam({
                    ...param,
                    dateTo: momentToStringYYYYMMDD(date),
                  })
                }
                dateFormat="DD.MM.YYYY"
              />
            </Form.Field>
            <Form.Field required>
              <label>{messages['service_status']}</label>
              <Dropdown
                selection
                multiple
                placeholder={messages['service_status']}
                options={serviceAppStatusOptions ? serviceAppStatusOptions : []}
                onChange={(e, { value }) =>
                  setParam({
                    ...param,
                    serviceStatusId: value.length > 0 ? value.join() : null,
                  })
                }
                value={
                  param.serviceStatusId
                    ? param.serviceStatusId.split(',').map(Number)
                    : []
                }
              />
            </Form.Field>
            <Form.Field required>
              <label>{messages['product_category']}</label>
              <Dropdown
                selection
                multiple
                placeholder={messages['product_category']}
                options={categoryOptions ? categoryOptions : []}
                onChange={(e, { value }) =>
                  setParam({
                    ...param,
                    categoryId: value.length > 0 ? value.join() : null,
                  })
                }
                value={
                  param.categoryId
                    ? param.categoryId.split(',').map(Number)
                    : []
                }
              />
            </Form.Field>
            <Form.Button
              onClick={handleClickApply}
              color="blue"
              className="alignBottom"
            >
              <Icon name="search" />
              {messages['apply']}
            </Form.Button>
          </Form.Group>
        </Form>
      </Segment>
      <OutputErrors errors={error} />
      <TotalCountsTable
        text={messages['overallAmount']}
        count={srtbbList.length}
      />
      {srtbbList.length > 0 ? (
        <Menu stackable size="small">
          <Menu.Item>
            <img
              alt=""
              className="clickableItem"
              src="/assets/img/xlsx_export_icon.png"
              onClick={exportExcel}
            />
          </Menu.Item>
        </Menu>
      ) : (
        ''
      )}
      <ReactTableWrapper
        data={srtbbList ? srtbbList : []}
        columns={columns}
        showPagination={true}
        className="-striped -highlight"
      />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    companyOptions: state.userInfo.companyOptions,
    branchOptionsService: state.userInfo.branchOptionsService,
    serviceAppStatus: state.f4.serviceAppStatus,
    category: state.f4.category,
    srtbbList: state.srtbbReducer.srtbbList,
  };
}

export default connect(mapStateToProps, {
  f4FetchServiceAppStatus,
  f4fetchCategory,
  fetchSrtbbList,
  clearSrtbbList,
})(injectIntl(Srtbb));
