import React, { useState, useEffect, Fragment } from 'react';
import ReactTableServerSideWrapper from '../../../utils/ReactTableServerSideWrapper';
import 'react-table/react-table.css';
import { Button, Icon, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Masters from './Masters';
import { fetchAppList } from '../../serviceAction';
import { LinkToSmcuspor, LinkToSmecam } from '../../../utils/outlink';
import '../../service.css';

const Table = props => {
  const {
    columnsName = [],
    headers,
    appList,
    appMasterList,
    searchParams,
    turnOnReactFetch,
    tableCols,
  } = props;

  const [tableColumns, setTableColumns] = useState([]);
  const [serviceRequests, setServiceRequests] = useState([]);

  useEffect(() => {
    setServiceRequests(appList.data);
  }, [appList]);

  useEffect(() => {
    setTableColumns(tableCols);
  }, [tableCols]);

  return (
    <Fragment>
      <ReactTableServerSideWrapper
        data={serviceRequests}
        columns={tableColumns}
        defaultPageSize={20}
        pages={
          appList.totalPages !== undefined || appList.totalPages !== null
            ? appList.totalPages
            : 15
        }
        pages={5}
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
})(Table);
