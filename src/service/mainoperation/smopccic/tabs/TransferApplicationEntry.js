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
      filterable: false,
    },
    {
      Header: messages['brnch'],
      accessor: 'branchId',
      checked: true,
    },
    {
      Header: 'CN',
      accessor: 'contractNumber',
      checked: true,
    },
    {
      Header: messages['factory_number'],
      accessor: 'tovarSn',
      checked: true,
    },
    {
      Header: messages['Crm.DateOfSale'],
      accessor: 'contractDate',
      checked: true,
      filterable: false,
    },
    {
      Header: messages['transfer_date'],
      accessor: 'rescheduledDate',
      checked: true,
      filterable: false,
    },

    {
      Header: messages['Application_Date'],
      accessor: 'applicationDate',
      checked: true,
      filterable: false,
    },
    {
      Header: messages['fio'],
      accessor: 'customerFIO',
      checked: true,
    },
    {
      Header: messages['address'],
      accessor: 'address',
      checked: true,
    },
    {
      Header: messages['Phone'],
      accessor: 'phoneNumber',
      checked: true,
    },
    {
      Header: messages['master'],
      accessor: 'masterFIO',
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
      Header: messages['category'],
      accessor: 'crmCategoryId',
      checked: true,
      filterable: false,
    },
    {
      Header: messages['application_status'],
      accessor: 'applicationStatusId',
      checked: true,
      filterable: false,
    },
    {
      Header: messages['request_number'],
      accessor: 'applicationNumber',
      checked: true,
      filterable: false,
      Cell: ({ original }) => <span>{original.contractNumber}</span>,
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
