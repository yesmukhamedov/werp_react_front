import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Form, Container, Divider } from 'semantic-ui-react';
import 'react-table/react-table.css';
import '../../../service.css';
import { fetchServiceTypeId } from '../../../mainoperation/smcs/smcsAction';
import { fetchServiceListManager } from '../../../report/serviceReportAction';
import ReactTableServerSideWrapper from '../../../../utils/ReactTableServerSideWrapper';
import { fetchMyApplicationExodus } from '../smopccocAction';
import ModalColumns from '../../../../utils/ModalColumns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  momentToStringYYYYMMDD,
  stringYYYYMMDDToMoment,
} from '../../../../utils/helpers';
import { LinkToSmcuspor } from '../../../../utils/outlink';

const MyApplicationExodus = props => {
  const {
    intl: { messages },
    language,
    fetchServiceTypeId,
  } = props;

  const {
    serviceTypeId = [],
    srlsmList,
    companyOptions = [],
    countryOptions,
    category,
    serviceStatusList = [],
    contractStatusList,
    branches,
    myApplication,
  } = props;

  const emptyParam = {
    country: '',
    bukrs: '',
    branchId: '',
    categoryId: '',
    serviceTypeId: '',
    serviceStatusId: '',
    dateStart: '',
    dateEnd: '',
  };

  const [param, setParam] = useState({ ...emptyParam });
  const categoryOptions = [
    { key: 1, text: 'Зеленый', value: 'Зеленый' },
    { key: 2, text: 'Желтый', value: 'Желтый' },
    { key: 3, text: 'Красный', value: 'Красный' },
    { key: 4, text: 'Черный', value: 'Черный' },
  ];

  const initialColumns = [
    {
      Header: 'ID',
      accessor: 'id',
      checked: true,
      filterable: false,
    },
    {
      Header: 'Филиал',
      accessor: 'recommenderId',
      checked: true,
    },
    {
      Header: 'Заводской номер',
      accessor: '45',
      checked: true,
    },
    {
      Header: 'Дата продажи',
      accessor: '45',
      checked: true,
      filterable: false,
    },
    {
      Header: 'Дата заявки',
      accessor: '477',
      checked: true,
      filterable: false,
    },
    {
      Header: 'ФИО клиента',
      accessor: '46',
      checked: true,
    },
    {
      Header: 'Адрес',
      accessor: '47',
      checked: true,
    },
    {
      Header: 'Телефон',
      accessor: '48',
      checked: true,
    },
    {
      Header: 'ФИО мастера',
      accessor: '49',
      checked: true,
    },
    {
      Header: 'F1',
      accessor: '50',
      checked: true,
      filterable: false,
    },
    {
      Header: 'F2',
      accessor: '50',
      checked: true,
      filterable: false,
    },
    {
      Header: 'F3',
      accessor: '50',
      checked: true,
      filterable: false,
    },
    {
      Header: 'F4',
      accessor: '50',
      checked: true,
      filterable: false,
    },
    {
      Header: 'F5',
      accessor: '50',
      checked: true,
      filterable: false,
    },
    {
      Header: 'Категория',
      accessor: '505',
      checked: true,
      filterable: false,
    },
    {
      Header: 'Статус заявки',
      accessor: '5088',
      checked: true,
      filterable: false,
    },
    {
      Header: '№ заявки',
      accessor: '5850',
      checked: true,
      filterable: false,
    },
    {
      Header: 'История клиента',
      accessor: '5885',
      checked: true,
      filterable: false,
      Cell: original => (
        <div style={{ textAlign: 'center' }}>
          <LinkToSmcuspor
            contractNumber={original.row.contractNumber}
            text="Просмотр"
          />
        </div>
      ),
    },
  ];

  const [serBranchOptions, setSerBranchOptions] = useState([]);

  useEffect(() => {
    fetchServiceTypeId();
  }, []);

  useEffect(() => {
    const getBranchByBukrs = (branches, bukrs) => {
      let br = branches.filter(item => item.bukrs === bukrs);

      let brSer = br.filter(
        item =>
          item.business_area_id === 5 ||
          item.business_area_id === 6 ||
          item.business_area_id === 9,
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

  const serviceTypeOptions = serviceTypeId.map(item => {
    return {
      key: item.id,
      text: item.nameRu,
      value: item.id,
    };
  });

  const serviceStatusOptions = serviceStatusList.map(item => {
    return {
      key: item.id,
      text: item.nameRu,
      value: item.id,
    };
  });

  const handleClickApply = () => {
    props.fetchMyApplicationExodus({ ...param });
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
        case 'dateStart':
          prevParam.dateStart = o.value;
          break;

        default:
          prevParam[fieldName] = o.value;
      }
      return prevParam;
    });
  };

  const [columns, setColumns] = useState([...initialColumns]);

  const finishColumns = data => {
    setColumns([...data]);
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
            label="Категория"
            placeholder="Фин. Статус"
            options={categoryOptions}
            onChange={(e, o) => onInputChange(o, 'categoryId')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Статус заявки"
            placeholder="Статус заявки"
            options={serviceStatusOptions}
            onChange={(e, o) => onInputChange(o, 'serviceDateType')}
            className="alignBottom"
          />
        </Form.Group>

        <Form.Group className="spaceBetween">
          <div className="flexDirectionRow">
            <Form.Field className="marginRight">
              <label>Дата заявки с</label>
              <DatePicker
                className="date-auto-width"
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                selected={stringYYYYMMDDToMoment(param.dateStart)}
                onChange={date =>
                  setParam({
                    ...param,
                    dateStart: momentToStringYYYYMMDD(date),
                  })
                }
                maxDate={new Date()}
                dateFormat="DD.MM.YYYY"
              />
            </Form.Field>

            <Form.Field className="marginRight">
              <label>Дата заявки по</label>
              <DatePicker
                className="date-auto-width"
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                selected={stringYYYYMMDDToMoment(param.dateEnd)}
                onChange={date =>
                  setParam({ ...param, dateEnd: momentToStringYYYYMMDD(date) })
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
    myApplication: state.smopccocReducer.myApplication,
  };
}

export default connect(mapStateToProps, {
  fetchServiceListManager,
  fetchServiceTypeId,
  fetchMyApplicationExodus,
})(injectIntl(MyApplicationExodus));
