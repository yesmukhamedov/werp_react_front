import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Container, Form, Divider } from 'semantic-ui-react';
import 'react-table/react-table.css';
import '../../../service.css';
import { fetchTransferApplication } from '../smopspAction';
import { fetchServiceTypeId } from '../../smcs/smcsAction';
import { fetchServiceListManager } from '../../../report/serviceReportAction';
import ReactTableServerSideWrapper from '../../../../utils/ReactTableServerSideWrapper';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  momentToStringYYYYMMDD,
  stringYYYYMMDDToMoment,
} from '../../../../utils/helpers';
import ModalColumns from '../../../../utils/ModalColumns';
import { LinkToSmcuspor } from '../../../../utils/outlink';

const TransferApplication = props => {
  const {
    countryOptions,
    companyOptions = [],
    branches,
    finStatusOption,
    serviceDateTypeOptions,
    categoryOptions,
    warrantyOptions,
  } = props;

  const {
    intl: { messages },
    language,
    fetchTransferApplication,
    dynamicObject = [],
    srlsmList = [],
  } = props;

  const emptyParam = {
    country: '',
    bukrs: '',
    branchId: '',
    finStatus: '',
    categoryId: '',
    serviceDateType: '',
    warranty: '',
    date: '',
    statusApplication: '',
  };

  const [param, setParam] = useState({ ...emptyParam });

  const [serBranchOptions, setSerBranchOptions] = useState([]);

  useEffect(() => {
    const getBranchByBukrs = (branches, bukrs) => {
      let br = branches.filter(item => item.bukrs == bukrs);

      let brSer = br.filter(
        item =>
          item.business_area_id == 5 ||
          item.business_area_id == 6 ||
          item.business_area_id == 9,
      );

      let serBranchOpt = brSer.map(item => {
        return {
          key: item.branch_id,
          text: item.text45,
          value: item.branch_id,
        };
      });
      return serBranchOpt;
    };

    setSerBranchOptions(getBranchByBukrs(branches, param.bukrs));
  }, [param.bukrs]);

  const initialColumns = [
    {
      Header: '№',
      accessor: '1',
      checked: true,
      filterable: false,
    },
    {
      Header: 'CN',
      accessor: '2',
      checked: true,
    },
    {
      Header: 'Филиал',
      accessor: '3',
      checked: true,
    },
    {
      Header: 'Заводской номер',
      accessor: '4',
      checked: true,
    },
    {
      Header: 'Дата продажи',
      accessor: '5',
      checked: true,
      filterable: false,
    },

    {
      Header: 'Дата переноса',
      accessor: '578',
      checked: true,
      filterable: false,
    },
    {
      Header: 'Дата заявки',
      accessor: '598',
      checked: true,
      filterable: false,
    },
    {
      Header: 'ФИО клиента',
      accessor: '6',
      checked: true,
      with: 200,
    },
    {
      Header: 'ИИН клиента',
      accessor: '7',
      checked: true,
      with: 150,
    },
    {
      Header: 'Адрес',
      accessor: '8',
      checked: true,
    },
    {
      Header: 'ФИО дилера',
      accessor: '9',
      checked: true,
      with: 200,
      filterable: false,
    },
    {
      Header: 'F1',
      accessor: '10',
      checked: true,
      filterable: false,
    },
    {
      Header: 'Гарантия',
      accessor: '13cats',
      checked: true,
      filterable: false,
    },

    {
      Header: 'Статус заявки',
      accessor: '13cat88',
      checked: true,
      filterable: false,
    },
    {
      Header: 'Фин. статус',
      accessor: '13cfin',
      checked: true,
      filterable: false,
    },
    {
      Header: 'Заявка',
      accessor: '13cfin',
      checked: true,
      filterable: false,
    },
    {
      Header: 'Просмотр',
      accessor: '16',
      filterable: false,
      Cell: original => (
        <div style={{ textAlign: 'center' }}>
          <LinkToSmcuspor
            contractNumber={original.row.contractNumber}
            text="Просмотр"
          />
        </div>
      ),
      checked: true,
    },
  ];

  const statusApplicationOptions = [
    { key: 1, text: 'Отмена', value: 1 },
    { key: 2, text: 'Выполнен', value: 2 },
  ];

  const handleClickApply = () => {
    fetchTransferApplication({ ...param });
  };

  const [columns, setColumns] = useState([...initialColumns]);
  const finishColumns = data => {
    setColumns([...data]);
  };

  const onInputChange = (o, fieldName) => {
    setParam(prev => {
      const prevParam = { ...prev };
      switch (fieldName) {
        case 'country':
          prevParam.country = o.value;
          break;
        case 'bukrs':
          prevParam.bukrs = o.value;
          break;
        case 'branchId':
          prevParam.branchId = o.value;
          break;

        case 'categoryId':
          prevParam.categoryId = o.value;
          break;
        case 'serviceTypeId':
          prevParam.serviceTypeId = o.value;
          break;

        case 'serviceStatusId':
          prevParam.serviceStatusId = o.value;
          break;

        case 'finStatus':
          prevParam.finStatus = o.value;

        case 'serviceDateType':
          prevParam.serviceDateType = o.value;

        case 'warranty':
          prevParam.warranty = o.value;

        case 'date':
          prevParam.date = o.value;
          break;

        case 'statusApplication':
          prevParam.statusApplication = o.value;
        default:
          prevParam[fieldName] = o.value;
      }
      return prevParam;
    });
  };

  return (
    <Container fluid className="containerMargin">
      <Form>
        <Form.Group widths="equal">
          <Form.Select
            fluid
            label="Страна"
            placeholder="Страна"
            options={countryOptions}
            onChange={(e, o) => onInputChange(o, 'country')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Компания"
            placeholder="Компания"
            options={companyOptions}
            onChange={(e, o) => onInputChange(o, 'bukrs')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Филиал"
            placeholder="Филиал"
            options={serBranchOptions}
            onChange={(e, o) => onInputChange(o, 'branchId')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Фин. Статус"
            placeholder="Фин. Статус"
            options={finStatusOption}
            onChange={(e, o) => onInputChange(o, 'finStatus')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Срок сервиса"
            placeholder="Срок сервиса"
            options={serviceDateTypeOptions}
            onChange={(e, o) => onInputChange(o, 'serviceDateType')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Категория"
            placeholder="Категория"
            options={categoryOptions}
            onChange={(e, o) => onInputChange(o, 'categoryId')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Гарантия"
            placeholder="Гарантия"
            options={warrantyOptions}
            onChange={(e, o) => onInputChange(o, 'categoryId')}
            className="alignBottom"
          />
          <Form.Select
            fluid
            label="Статус заявки"
            placeholder="Статус заявки"
            options={serviceDateTypeOptions}
            onChange={(e, o) => onInputChange(o, 'serviceDateType')}
            className="alignBottom"
          />
        </Form.Group>

        <Form.Group className="spaceBetween">
          <div className="flexDirectionRow">
            <Form.Field className="marginRight">
              <label>Дата</label>
              <DatePicker
                className="datePicker"
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                selected={stringYYYYMMDDToMoment(param.date)}
                onChange={date =>
                  setParam({ ...param, date: momentToStringYYYYMMDD(date) })
                }
                maxDate={new Date()}
                dateFormat="DD.MM.YYYY"
              />
            </Form.Field>
            <Form.Button
              onClick={handleClickApply}
              color="blue"
              className="alignBottom"
            >
              Применить
            </Form.Button>
          </div>

          <Form.Field className="alignBottom">
            <ModalColumns
              columns={initialColumns}
              finishColumns={finishColumns}
            />
          </Form.Field>
        </Form.Group>
      </Form>
      <Divider />
      <ReactTableServerSideWrapper
        filterable={true}
        data={srlsmList}
        columns={columns}
      />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    serviceTypeId: state.smcsReducer.serviceTypeId,
    dynamicObject: state.smopspReducer.dynamicObject,
  };
}

export default connect(mapStateToProps, {
  fetchServiceListManager,
  fetchServiceTypeId,
  fetchTransferApplication,
})(injectIntl(TransferApplication));
