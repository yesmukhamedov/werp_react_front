import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Popup } from 'semantic-ui-react';

import ReactTableWrapper from '../../../utils/ReactTableWrapper';

function HistoryReactTable(props) {
  const emptyValue = {
    historyApp: [],
    historyCall: [],
    historyService: [],
  };
  const [value, setValue] = useState({ ...emptyValue });

  const {
    intl: { messages },
    columns,
    data = {},
    initValue,
    crmHistoryApp = [],
    crmHistoryCall = [],
    crmHistoryServ = [],
  } = props;

  useEffect(() => {
    setValue(prev => {
      const varValue = { ...prev };
      if (data.crmHistoryApp) {
        varValue.historyApp = data.crmHistoryApp;
      } else if (data.crmHistoryCall) {
        varValue.historyCall = data.crmHistoryCall;
      } else if (data.crmHistoryServ) {
        varValue.historyService = data.crmHistoryServ;
      }
      return varValue;
    });
  }, [crmHistoryApp, crmHistoryCall, crmHistoryServ]);

  if (columns === 'all') {
    return (
      <ReactTableWrapper
        data={data ? data : initValue}
        columns={[
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>{messages['date']}</div>
            ),
            accessor: 'crmHistoryDate',
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>
                {messages['typeOfService']}
              </div>
            ),
            accessor: 'serviceTypeName',
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>{messages['call_type']}</div>
            ),
            accessor: 'callDirectionName',
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>
                {messages['call_description']}
              </div>
            ),
            accessor: 'info',
            Cell: row => (
              <Popup
                content={row.value}
                on="hover"
                pinned="true"
                trigger={<div style={{ textAlign: 'center' }}>{row.value}</div>}
              />
            ),
            //<div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>{messages['amount']}</div>
            ),
            accessor: 'servicePrice',
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>{messages['master']}</div>
            ),
            accessor: 'masterFIO',
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>{messages['Operator']}</div>
            ),
            accessor: 'operatorFIO',
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>{messages['service']}</div>
            ),
            accessor: 'serviceId',
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
        ]}
        defaultPageSize={15}
        pages={2}
        previousText={messages['Table.Previous']}
        nextText={messages['Table.Next']}
        showPagination={true}
        className="-striped -highlight"
        pageSizeOptions={[20, 30, 40]}
        loadingText={messages['Table.Next']}
        noDataText={messages['Table.NoData']}
        rowsText={messages['Table.Rows']}
        pageText={messages['Table.Page']}
        ofText={messages['Table.Of']}
      />
    );
  } else if (columns === 'services') {
    return (
      <ReactTableWrapper
        data={crmHistoryServ ? crmHistoryServ : value.historyService}
        columns={[
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>{messages['date']}</div>
            ),
            accessor: 'crmHistoryDate',
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>
                {messages['typeOfService']}
              </div>
            ),
            accessor: 'serviceTypeName',
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>{messages['amount']}</div>
            ),
            accessor: 'servicePrice',
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>{messages['master']}</div>
            ),
            accessor: 'masterFIO',
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>{messages['service']}</div>
            ),
            accessor: 'serviceId',
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
        ]}
        defaultPageSize={15}
        pages={2}
        previousText={messages['Table.Previous']}
        nextText={messages['Table.Next']}
        showPagination={true}
        className="-striped -highlight"
        pageSizeOptions={[20, 30, 40]}
        loadingText={messages['Table.Next']}
        noDataText={messages['Table.NoData']}
        rowsText={messages['Table.Rows']}
        pageText={messages['Table.Page']}
        ofText={messages['Table.Of']}
      />
    );
  } else if (columns === 'calls') {
    return (
      <ReactTableWrapper
        data={crmHistoryCall ? crmHistoryCall : value.historyCall}
        columns={[
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>{messages['date']}</div>
            ),
            accessor: 'crmHistoryDate',
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>{messages['call_type']}</div>
            ),
            accessor: 'callDirectionName',
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>
                {messages['call_description']}
              </div>
            ),
            accessor: 'info',
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>{messages['Operator']}</div>
            ),
            accessor: 'operatorFIO',
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
        ]}
        defaultPageSize={15}
        pages={2}
        previousText={messages['Table.Previous']}
        nextText={messages['Table.Next']}
        showPagination={true}
        className="-striped -highlight"
        pageSizeOptions={[20, 30, 40]}
        loadingText={messages['Table.Next']}
        noDataText={messages['Table.NoData']}
        rowsText={messages['Table.Rows']}
        pageText={messages['Table.Page']}
        ofText={messages['Table.Of']}
      />
    );
  } else if (columns === 'requests') {
    return (
      <ReactTableWrapper
        data={crmHistoryApp ? crmHistoryApp : value.historyApp}
        columns={[
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>{messages['date']}</div>
            ),
            accessor: 'crmHistoryDate',
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>
                {messages['application_status']}
              </div>
            ),
            accessor: 'applicationStatusName',
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>
                {messages['type_of_application']}
              </div>
            ),
            accessor: 'applicationTypeName',
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>{messages['Operator']}</div>
            ),
            accessor: 'operatorFIO',
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>
                {messages['request_number']}
              </div>
            ),
            accessor: 'applicationId',
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
        ]}
        defaultPageSize={15}
        pages={2}
        previousText={messages['Table.Previous']}
        nextText={messages['Table.Next']}
        showPagination={true}
        className="-striped -highlight"
        pageSizeOptions={[20, 30, 40]}
        loadingText={messages['Table.Next']}
        noDataText={messages['Table.NoData']}
        rowsText={messages['Table.Rows']}
        pageText={messages['Table.Page']}
        ofText={messages['Table.Of']}
      />
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(injectIntl(HistoryReactTable));
