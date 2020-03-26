import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Container, Form } from 'semantic-ui-react';
import 'react-table/react-table.css';
import '../../../service.css';
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
      Header: 'ID',
      accessor: '1',
      checked: true,
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
    },
    {
      Header: 'F1',
      accessor: '10',
      checked: true,
    },
    {
      Header: 'F2',
      accessor: '11',
      checked: true,
    },

    {
      Header: 'F3',
      accessor: '12',
      checked: true,
    },

    {
      Header: 'F4',
      accessor: '13',
      checked: true,
    },
    {
      Header: 'F5',
      accessor: '13f5',
      checked: true,
    },
    {
      Header: 'Категория',
      accessor: '13cat',
      checked: true,
    },
    {
      Header: 'Фин. статус',
      accessor: '13cfin',
      checked: true,
    },
    {
      Header: 'Просмотр',
      accessor: '16',
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
            options={serBranchOptions}
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
          <Form.Button
            fluid
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

      <ReactTableServerSideWrapper data={srlsmList} columns={columns} />
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
