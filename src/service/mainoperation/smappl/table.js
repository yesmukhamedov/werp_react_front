import React, { useState, useEffect } from 'react';
import ReactTableServerSideWrapper from '../../../utils/ReactTableServerSideWrapper';
import 'react-table/react-table.css';
import { injectIntl } from 'react-intl';
import { Button, Icon, Dropdown, Select } from 'semantic-ui-react';

import '../../service.css';

const Table = props => {
  const {
    intl: { messages },
    columnsName = [],
    headers,
  } = props;

  const [tableColumns, setTableColumns] = useState([]);
  const [serviceRequests, setServiceRequests] = useState([
    {
      id: 1,
      contractNumber: 'wadwadwa',
      appStatusIds: 'awdawd',
      appTypeIds: 'dwadawd',
      customerName: 'awdawd',
      branchName: 'dawdaw',
      address: 'wadaw',
      operatorName: 'wawdaw',
      aDate: 'awdawd',
      tovarSn: 'awdaw',
      inPhoneNum: 'dawdawd',
      masterName: 'wadawdaw',
      matnr: 'Roboclean',
      serviceId: 25,
    },
    {
      id: 2,
      contractNumber: 'wadwadwa',
      appStatusIds: 'awdawd',
      appTypeIds: 'dwadawd',
      customerName: 'awdawd',
      branchName: 'dawdaw',
      address: 'wadaw',
      operatorName: 'wawdaw',
      aDate: 'awdawd',
      tovarSn: 'awdaw',
      inPhoneNum: 'dawdawd',
      masterName: 'wadawdaw',
      matnr: 'Roboclean',
      serviceId: 25,
    },
  ]);
  const [masterList, setMasterList] = useState([
    { key: 2, text: 'Ахметов М.', value: 2 },
    { key: 1, text: 'Токсанбаев Д.', value: 1 },
    { key: 3, text: 'Сериков Б.', value: 3 },
  ]);

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
                <Dropdown
                  className="dropDownZindex"
                  options={masterList}
                  placeholder="I open on focus"
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
  }, [columnsName]);

  return (
    <ReactTableServerSideWrapper
      data={serviceRequests}
      columns={tableColumns}
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
};

export default injectIntl(Table);
