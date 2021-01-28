import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  Icon,
  Container,
  Segment,
  Form,
  Checkbox,
  Menu,
} from 'semantic-ui-react';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
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
import { fetchSrqpwgsList, clearSrqpwgsList } from './srqpwgsAction';
import { f4fetchCategory } from '../../../reference/f4/f4_action';
import OutputErrors from '../../../general/error/outputErrors';
import { errorTableText, excelDownload } from '../../../utils/helpers';
import moment from 'moment';
import TotalCountsTable from '../../../utils/TotalCountsTable';
require('moment/locale/ru');

//Сервис отчеты: Количество и зав цены списанных товаров по сервису
const Srqpwgs = props => {
  const {
    intl: { messages },
    companyOptions = [],
    language,
    branchOptionsService = [],
    category = [],
    srqpwgsList = [],
  } = props;

  const [param, setParam] = useState({
    bukrs: null,
    branchId: null,
    dateAt: '',
    dateTo: '',
    categoryId: null,
    warranty: false,
  });

  const [error, setError] = useState([]);

  useEffect(() => {
    props.f4fetchCategory();
  }, []);

  const total1 = srqpwgsList.reduce((total, item) => total + item.fabPrice, 0);
  const total2 = srqpwgsList.reduce((total, item) => total + item.quantity, 0);

  const columns = [
    {
      Header: messages['Form.Branch'],
      accessor: 'branchName',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
    {
      Header: messages['goods_code'],
      accessor: 'code',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
    {
      Header: messages['L__TITLE'],
      accessor: 'matnrName',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
    },
    {
      Header: messages['factory_price'],
      accessor: 'fabPrice',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
      Footer: () => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {`
        ${messages['Common']}:  
        ${moneyFormat(total1)}
        `}
        </div>
      ),
    },
    {
      Header: messages['count'],
      accessor: 'quantity',
      Cell: row => <TextAlignCenter text={row.value} />,
      filterAll: true,
      Footer: () => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {`
        ${messages['Common']}:  
        ${total2}
        `}
        </div>
      ),
    },
  ];

  const categoryOptions = category.map(item => {
    return {
      key: item.id,
      text: item.name,
      value: item.id,
    };
  });

  const handleClickApply = () => {
    //ВАЛИДАЦИЯ
    if (
      param.bukrs &&
      param.branchId &&
      param.dateAt &&
      param.dateTo &&
      param.categoryId
    ) {
      props.fetchSrqpwgsList({ ...param });
      setError([]);
      props.clearSrqpwgsList();
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
      setError(() => errors);
    }
  };

  //Excel export
  const exportExcel = () => {
    let excelHeaders = [];
    excelHeaders.push(messages['Form.Branch']);
    excelHeaders.push(messages['goods_code']);
    excelHeaders.push(messages['L__TITLE']);
    excelHeaders.push(messages['factory_price']);
    excelHeaders.push(messages['count']);

    excelDownload(
      'service/report/srqpwgs/downloadExcel',
      'srqpwgsResult.xls',
      'outputTable',
      srqpwgsList,
      excelHeaders,
    );
  };

  return (
    <Container fluid style={{ padding: '10px' }}>
      <Segment>
        <h3>{`${messages['service_report']}: ${messages['srqpwgs']}`}</h3>
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
              <label>{messages['branches']}</label>
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
              <label>{messages['product_category']}</label>

              <DropdownClearable
                selection
                options={categoryOptions}
                placeholder={messages['product_category']}
                onChange={(o, { value }) =>
                  setParam({ ...param, categoryId: value })
                }
                value={param.categoryId ? param.categoryId : ''}
                allSelect={false}
                handleClear={() => setParam({ ...param, categoryId: null })}
              />
            </Form.Field>
            <Form.Field className="alignBottom">
              <Checkbox
                checked={param.warranty}
                label={messages['guarantee']}
                onChange={() =>
                  setParam({ ...param, warranty: !param.warranty })
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
        count={srqpwgsList.length}
        text={messages['overallAmount']}
      />
      {srqpwgsList.length > 0 ? (
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
        data={srqpwgsList ? srqpwgsList : []}
        columns={columns}
        showPagination={true}
        className="-striped -highlight"
      />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    companyOptions: state.userInfo.companyOptions,
    branchOptionsService: state.userInfo.branchOptionsService,
    category: state.f4.category,
    srqpwgsList: state.srqpwgsReducer.srqpwgsList,
  };
}

export default connect(mapStateToProps, {
  f4fetchCategory,
  fetchSrqpwgsList,
  clearSrqpwgsList,
})(injectIntl(Srqpwgs));
