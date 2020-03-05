import React, { useState, useEffect, Fragment } from 'react';
import ReactTableServerSideWrapper from '../../../utils/ReactTableServerSideWrapper';
import 'react-table/react-table.css';
import { injectIntl } from 'react-intl';
import { Button, Icon, Dropdown, Select, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Masters from './Masters';
import { fetchAppList } from '../../serviceAction';

import '../../service.css';

const Table = props => {
  const {
    intl: { messages },
    columnsName = [],
    headers,
    appList,
    appMasterList,
    searchParams,
    fetchAppList,
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
                <Button icon color="instagram">
                  <Icon name="id card outline"></Icon>
                </Button>
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
    console.log(appList);
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
  console.log(turnOnReactFetch);

  console.log(searchParams);
  return (
    <Fragment>
      <ReactTableServerSideWrapper
        data={serviceRequests}
        columns={tableColumns}
        defaultPageSize={15}
        pages={5}
        filterable={true}
        searchParam={searchParams}
        turnOnReactFetch={turnOnReactFetch}
        showPagination={false}
        requestData={param => {
          console.log('paramsss', param);
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
