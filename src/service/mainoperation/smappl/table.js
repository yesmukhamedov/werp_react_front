import React, { useState, useEffect, Fragment } from 'react';
import ReactTableServerSideWrapper from '../../../utils/ReactTableServerSideWrapper';
import 'react-table/react-table.css';
import { injectIntl } from 'react-intl';
import { Button, Icon, Dropdown, Select } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Masters from './Masters';

import '../../service.css';

const Table = props => {
  const {
    intl: { messages },
    columnsName = [],
    headers,
    appList,
    appMasterList,
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
    if (appList !== undefined) {
      setServiceRequests(appList.data);
      console.log(appList);
    }
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
      {serviceRequests.length !== 0 ? (
        <ReactTableServerSideWrapper
          data={serviceRequests.length === 0 ? [] : serviceRequests}
          columns={tableColumns}
          defaultPageSize={15}
          pages={appList.totalPages}
          showPagination={true}
          className="-striped -highlight"
        />
      ) : null}
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    appList: state.serviceReducer.dynamicObject.appList,
    appMasterList: state.serviceReducer.dynamicObject.appMasterList,
  };
};

export default connect(mapStateToProps)(injectIntl(Table));
