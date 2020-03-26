import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  Container,
  Form,
  Icon,
  Button,
  Popup,
  Divider,
} from 'semantic-ui-react';
import 'react-table/react-table.css';
import { fetchMyApplicationExodus } from '../smopccicAction';
import { fetchServiceTypeId } from '../../smcs/smcsAction';
import { fetchServiceListManager } from '../../../report/serviceReportAction';
import ReactTableServerSideWrapper from '../../../../utils/ReactTableServerSideWrapper';
import ModalColumns from '../../../../utils/ModalColumns';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  momentToStringYYYYMMDD,
  stringYYYYMMDDToMoment,
} from '../../../../utils/helpers';
import { LinkToSmcuspor } from '../../../../utils/outlink';

const TransferApplicationEntry = props => {
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
    fetchMyApplicationExodus,
    dynamicObject = [],
    srlsmList = [],
  } = props;

  const emptyParam = {
    country: '',
    bukrs: '',
    branchId: '',
    categoryId: '',
    serviceStatusId: '',
    dateStart: '',
    dateEnd: '',
  };

  const initialColumns = [
    {
      Header: 'Id',
      accessor: 'id',
      checked: true,
      filterable: false,
    },
    {
      Header: 'CN',
      accessor: 'contractNumber',
      checked: true,
    },
    {
      Header: 'Заводской номер',
      accessor: 'tovarSn',
      checked: true,
    },
    {
      Header: 'Дата продажи',
      accessor: 'contractDate',
      checked: true,
      filterable: false,
    },
    {
      Header: 'Дата переноса',
      accessor: '999',
      checked: true,
      filterable: false,
    },

    {
      Header: 'Дата заявки',
      accessor: '99985',
      checked: true,
      filterable: false,
    },
    {
      Header: 'ФИО клиента',
      accessor: 'customerFIO',
      checked: true,
    },
    {
      Header: 'Адрес',
      accessor: 'address',
      checked: true,
    },
    {
      Header: 'Телефон',
      accessor: 'address',
      checked: true,
    },
    {
      Header: 'ФИО мастер',
      accessor: 'dealerFIO',
      checked: true,
    },
    {
      Header: 'F1',
      accessor: 'f1',
      checked: true,
      filterable: false,
    },
    {
      Header: 'F2',
      accessor: 'f2',
      checked: true,
      filterable: false,
    },
    {
      Header: 'F3',
      accessor: 'f3',
      checked: true,
      filterable: false,
    },
    {
      Header: 'F4',
      accessor: 'f4',
      checked: true,
      filterable: false,
    },
    {
      Header: 'F5',
      accessor: 'f5',
      checked: true,
      filterable: false,
    },
    {
      Header: 'Категория',
      accessor: 'crmCategory',
      checked: true,
      filterable: false,
    },
    {
      Header: 'Статус заявки',
      accessor: '15',
      checked: true,
      filterable: false,
    },
    {
      Header: '№ заявка',
      accessor: '898',
      checked: true,
      filterable: false,
      Cell: ({ original }) => <h1>{original.contractNumber}</h1>,
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

  const [columns, setColumns] = useState([...initialColumns]);
  const finishColumns = data => {
    setColumns([...data]);
  };

  return (
    <Container fluid className="containerMargin">
      <Form>
        <Form.Group className="spaceBetween">
          <div className="flexDirectionRow"></div>

          <Form.Field className="alignBottom">
            <ModalColumns
              columns={initialColumns}
              finishColumns={finishColumns}
            />
          </Form.Field>
        </Form.Group>
      </Form>
      <ReactTableServerSideWrapper filterable={true} columns={columns} />
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
  fetchMyApplicationExodus,
})(injectIntl(TransferApplicationEntry));
