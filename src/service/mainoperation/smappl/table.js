import React, { useState, useEffect, Fragment } from 'react';
import ReactTableServerSideWrapper from '../../../utils/ReactTableServerSideWrapper';
import 'react-table/react-table.css';
import { connect } from 'react-redux';
import { fetchAppList } from '../../serviceAction';
import '../../service.css';

const Table = props => {
  const {
    appList,
    searchParams = {},
    turnOnReactFetch,
    tableCols = [],
    fetchAppList,
  } = props;

  console.log('searchParams', searchParams);

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
        filterable={true}
        turnOnReactFetch={turnOnReactFetch}
        showPagination={false}
        // requestData={param => {
        //   fetchAppList({ ...param });
        // }}
        requestData={params => {
          console.log('params', params);
          props.fetchAppList({
            ...params,
            bukrs: searchParams.bukrs,
            branchId: searchParams.branchId,
            dateOpenAt: searchParams.dateOpenAt,
            dateOpenTo: searchParams.dateOpenTo,
            aDateFrom: searchParams.aDateFrom,
            aDateTo: searchParams.aDateTo,
            tovarCategorys: searchParams.tovarCategorys,
            appStatusIds: searchParams.appStatusIds,
            appTypeIds: searchParams.appTypeIds,
          });
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
