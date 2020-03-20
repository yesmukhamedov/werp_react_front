import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

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
  } = props;

  useEffect(() => {
    setValue(prev => {
      const varValue = { ...prev };
      if (data.servCrmHistoryApp) {
        varValue.historyApp = data.servCrmHistoryApp;
      } else if (data.servCrmHistoryCall) {
        varValue.historyCall = data.servCrmHistoryCall;
      } else if (data.servCrmHistoryService) {
        varValue.historyService = data.servCrmHistoryService;
      }
      return varValue;
    });
  }, [
    data.servCrmHistoryCall,
    data.servCrmHistoryCall,
    data.servCrmHistoryService,
  ]);

  if (columns === 'all') {
    return (
      <ReactTableWrapper
        data={data.servCrmHistoryAll ? data.servCrmHistoryAll : initValue}
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
            accessor: 'servTypeName',
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
              <div style={{ textAlign: 'center' }}>{messages['amount']}</div>
            ),
            accessor: 'price',
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>{messages['master']}</div>
            ),
            accessor: 'masterName',
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>{messages['Operator']}</div>
            ),
            accessor: 'staffName',
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
        data={
          data.servCrmHistoryService
            ? data.servCrmHistoryService
            : value.historyService
        }
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
            accessor: 'servTypeName',
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>{messages['amount']}</div>
            ),
            accessor: 'price',
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>{messages['master']}</div>
            ),
            accessor: 'masterName',
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
        data={
          data.servCrmHistoryCall ? data.servCrmHistoryCall : value.historyCall
        }
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
            accessor: 'staffName',
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
        data={
          data.servCrmHistoryApp ? data.servCrmHistoryApp : value.historyApp
        }
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
            accessor: 'appStatusName',
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>
                {messages['type_of_application']}
              </div>
            ),
            accessor: 'appTypeName',
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>{messages['Operator']}</div>
            ),
            accessor: 'staffName',
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>
                {messages['request_number']}
              </div>
            ),
            accessor: 'serviceAppId',
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
