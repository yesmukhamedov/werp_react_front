import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Container, Form } from 'semantic-ui-react';
import 'react-table/react-table.css';
import { fetchTransferApplication } from '../smopccicAction';
import { fetchServiceListManager } from '../../../report/serviceReportAction';
import ReactTableWrapper from '../../../../utils/ReactTableWrapper';
import ModalColumns from '../../../../utils/ModalColumns';
import { LinkToSmcuspor } from '../../../../utils/outlink';
import { Link } from 'react-router-dom';

const TransferApplicationEntry = props => {
  const {
    intl: { messages },
    language,
    transferApplicationData,
  } = props;

  const initialColumns = [
    {
      Header: 'Id',
      accessor: 'id',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterable: false,
    },
    {
      Header: messages['brnch'],
      accessor: 'branchId',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: 'CN',
      accessor: 'contractNumber',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: messages['factory_number'],
      accessor: 'tovarSn',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: messages['Crm.DateOfSale'],
      accessor: 'contractDate',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterable: false,
    },
    {
      Header: messages['transfer_date'],
      accessor: 'rescheduledDate',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterable: false,
    },

    {
      Header: messages['Application_Date'],
      accessor: 'applicationDate',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterable: false,
    },
    {
      Header: messages['fio'],
      accessor: 'customerFIO',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: messages['address'],
      accessor: 'address',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: messages['Phone'],
      accessor: 'phoneNumber',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: messages['master'],
      accessor: 'masterFIO',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
    },
    {
      Header: 'F1',
      accessor: 'f1',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterable: false,
    },
    {
      Header: 'F2',
      accessor: 'f2',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterable: false,
    },
    {
      Header: 'F3',
      accessor: 'f3',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterable: false,
    },
    {
      Header: 'F4',
      accessor: 'f4',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterable: false,
    },
    {
      Header: 'F5',
      accessor: 'f5',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterable: false,
    },
    {
      Header: messages['category'],
      accessor: 'crmCategoryId',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterable: false,
    },
    {
      Header: messages['application_status'],
      accessor: 'applicationStatusId',
      checked: true,
      Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      filterable: false,
    },
    {
      Header: messages['request_number'],
      accessor: 'applicationNumber',
      Cell: original => {
        const url = `../mainoperation/smvca?id=${original.value}`;
        return (
          <div style={{ textAlign: 'center' }}>
            <Link to={url} target="_blank">
              {original.value}
            </Link>
          </div>
        );
      },

      checked: true,
      filterable: false,
      fixed: 'right',
      width: 60,
    },
    {
      Header: messages['Table.View'],
      accessor: '16',
      filterable: false,
      Cell: original => (
        <div style={{ textAlign: 'center' }}>
          <LinkToSmcuspor
            contractNumber={original.row.contractNumber}
            text={messages['Table.View']}
          />
        </div>
      ),
      checked: true,
      width: 60,
      fixed: 'right',
    },
  ];
  useEffect(() => {
    props.fetchTransferApplication();
  }, []);

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
      <ReactTableWrapper
        filterable={true}
        columns={columns}
        data={transferApplicationData ? transferApplicationData.data : []}
      />
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    transferApplicationData: state.smopccicReducer.transferApplicationData,
  };
}

export default connect(mapStateToProps, {
  fetchServiceListManager,
  fetchTransferApplication,
})(injectIntl(TransferApplicationEntry));
