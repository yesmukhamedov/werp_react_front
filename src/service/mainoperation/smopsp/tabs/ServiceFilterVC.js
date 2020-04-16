import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Container, Form, Divider } from 'semantic-ui-react';
import 'react-table/react-table.css';
import { fetchServicePacketPlan } from '../smopspAction';
import { fetchServiceTypeId } from '../../smcs/smcsAction';
import { fetchServiceListManager } from '../../../report/serviceReportAction';
import ReactTableServerSideWrapper from '../../../../utils/ReactTableServerSideWrapper';
import ModalColumns from './../../../../utils/ModalColumns';
import { LinkToSmcuspor } from '../../../../utils/outlink';

const ServiceFilterVC = props => {
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
    fetchServicePacketPlan,
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
  };

  const [param, setParam] = useState({ ...emptyParam });
  const [serviceBranchOptions, setServiceBranchOptions] = useState([]);

  useEffect(() => {
    let servBrOptions = branches
      .filter(
        item =>
          item.business_area_id == 5 ||
          item.business_area_id == 6 ||
          item.business_area_id == 9,
      )
      .map(item => {
        return {
          key: item.branch_id,
          text: item.text45,
          value: item.branch_id,
          country_id: item.country_id,
          bukrs: item.bukrs,
        };
      });
    if (param.country !== '' && param.bukrs !== '') {
      let servBranchOptions = servBrOptions
        .filter(item => item.country_id === param.country)
        .filter(item => item.bukrs === param.bukrs);
      setServiceBranchOptions([...servBranchOptions]);
    } else if (param.country !== '' && param.bukrs === '') {
      let servBranchOptions = servBrOptions.filter(
        item => item.country_id === param.country,
      );
      setServiceBranchOptions([...servBranchOptions]);
    } else if (param.country === '' && param.bukrs !== '') {
      let servBranchOptions = servBrOptions.filter(
        item => item.bukrs === param.bukrs,
      );

      setServiceBranchOptions([...servBranchOptions]);
    } else if (param.country === '' && param.bukrs === '') {
      setServiceBranchOptions([...servBrOptions]);
    }
  }, [branches, param.country, param.bukrs]);

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
      Header: 'Заводской номер',
      accessor: '4',
      checked: true,
    },
    {
      Header: 'Дата продажи',
      accessor: '5',
      checked: true,
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
      accessor: '13cat5',
      checked: true,
      filterable: false,
    },
    {
      Header: 'Категория',
      accessor: '13cat',
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

  const handleClickApply = () => {
    fetchServicePacketPlan({ ...param });
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

        case 'finStatus':
          prevParam.finStatus = o.value;

        case 'serviceDateType':
          prevParam.serviceDateType = o.value;

        case 'warranty':
          prevParam.warranty = o.value;
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
            options={countryOptions}
            placeholder="Страна"
            onChange={(e, o) => onInputChange(o, 'country')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Компания"
            options={companyOptions}
            placeholder="Компания"
            onChange={(e, o) => onInputChange(o, 'bukrs')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Филиал"
            options={serviceBranchOptions}
            placeholder="Филиал"
            onChange={(e, o) => onInputChange(o, 'branchId')}
            className="alignBottom"
          />
          <Form.Select
            fluid
            label="Фин. Статус"
            options={finStatusOption}
            placeholder="Фин. Статус"
            onChange={(e, o) => onInputChange(o, 'finStatus')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Срок сервиса"
            options={serviceDateTypeOptions}
            placeholder="Фин. Статус"
            onChange={(e, o) => onInputChange(o, 'serviceDateType')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Категория"
            options={categoryOptions}
            placeholder="Категория"
            onChange={(e, o) => onInputChange(o, 'categoryId')}
            className="alignBottom"
          />

          <Form.Select
            fluid
            label="Гарантия"
            options={warrantyOptions}
            placeholder="Гарантия"
            onChange={(e, o) => onInputChange(o, 'warranty')}
            className="alignBottom"
          />
        </Form.Group>

        <Form.Group className="spaceBetween">
          <Form.Button
            onClick={handleClickApply}
            color="blue"
            className="alignBottom"
          >
            Применить
          </Form.Button>

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
  fetchServicePacketPlan,
})(injectIntl(ServiceFilterVC));
