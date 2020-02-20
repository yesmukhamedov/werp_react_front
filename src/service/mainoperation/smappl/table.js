import React, { useState, useEffect } from 'react';
import ReactTableServerSideWrapper from '../../../utils/ReactTableServerSideWrapper';
import 'react-table/react-table.css';
import { injectIntl } from 'react-intl';
import { Button, Icon } from 'semantic-ui-react';

const Table = props => {
  const {
    intl: { messages },
    columnsName = [],
  } = props;

  const [tableColumns, setTableColumns] = useState([]);

  useEffect(() => {
    let p = [];
    let g = 0;
    for (var t = 0; t < columnsName.length; t++) {
      if (columnsName[t].show) {
        if (columnsName[t].Header === messages['customer_story']) {
          p[g] = {
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
        } else {
          p[g] = columnsName[t];
        }
        g++;
      }
    }

    setTableColumns([
      {
        Header: 'id',
        accessor: 'id',
        Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
      },
      ...p,
    ]);
  }, [columnsName]);

  return (
    <ReactTableServerSideWrapper
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
