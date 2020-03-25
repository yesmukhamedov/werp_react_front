import React, { useState, useEffect, Fragment } from 'react';
import ReactTableServerSideWrapper from '../../../utils/ReactTableServerSideWrapper';
import 'react-table/react-table.css';
import { injectIntl } from 'react-intl';
import { Button, Icon, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Masters from './Masters';
import { fetchAppList } from '../../serviceAction';
import { LinkToSmcuspor, LinkToSmecam } from '../../../utils/outlink';
import '../../service.css';

const Table = props => {
  const {
    intl: { messages },
    columnsName = [],
    headers,
    appList,
    appMasterList,
    searchParams,
    turnOnReactFetch,
  } = props;

  const [tableColumns, setTableColumns] = useState([]);
  const [serviceRequests, setServiceRequests] = useState([]);
  const [masterList, setMasterList] = useState([]);

  useEffect(() => {
    let p = [];
    let g = 0;
    for (var t = 0; t < columnsName.length; t++) {
      if (columnsName[t].show) {
        if (headers[t].Header === messages['customer_story']) {
          p[g] = {
            Header: headers[t].Header,
            ...columnsName[t],
            filterable: false,
            Cell: ({ row }) => (
              <div style={{ textAlign: 'center' }}>
                <LinkToSmcuspor contractNumber={row._original.contractNumber} />
              </div>
            ),
          };
        } else if (headers[t].Header === messages['Masters']) {
          p[g] = {
            Header: headers[t].Header,
            ...columnsName[t],
            Cell: ({ row }) => (
              <div style={{ textAlign: 'center' }}>
                {row._original.masterName}
                <Masters
                  master={row._original.masterName}
                  masterList={masterList}
                  id={row._original.masterId}
                  request={row._original}
                  searchParams={searchParams}
                />
              </div>
            ),
          };
        } else if (headers[t].Header === `№ ${messages['Applications']}`) {
          p[g] = {
            Header: headers[t].Header,
            ...columnsName[t],
            filterable: false,
            Cell: ({ row }) => (
              <div style={{ textAlign: 'center' }}>
                <LinkToSmecam id={row._original.id} />
              </div>
            ),
          };
        } else {
          p[g] = {
            ...columnsName[t],
            Header: headers[t].Header,
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          };
        }
        g++;
      }
    }
    setTableColumns([...p]);
  }, [columnsName, masterList]);

  useEffect(() => {
    setServiceRequests(appList.data);
  }, [appList]);

  useEffect(() => {
    if (appMasterList !== undefined) {
      let masters = appMasterList.map(item => {
        return {
          key: item.staffId,
          text: item.fullFIO,
          value: item.staffId,
        };
      });
      setMasterList(masters);
    }
  }, [appMasterList]);

  return (
    <Fragment>
      <ReactTableServerSideWrapper
        data={serviceRequests}
        columns={tableColumns}
        defaultPageSize={20}
        pages={
          appList.totalPages !== undefined || appList.totalPages !== null
            ? appList.totalPages
            : 5
        }
        filterable={true}
        searchParam={searchParams}
        turnOnReactFetch={turnOnReactFetch}
        showPagination={false}
        requestData={param => {
          fetchAppList({ ...param });
        }}
        className="-striped -highlight"
      />
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    appList: state.serviceReducer.appList,
    appMasterList: state.serviceReducer.appMasterList,
  };
};

export default connect(mapStateToProps, {
  fetchAppList,
})(injectIntl(Table));
