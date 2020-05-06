import React, { useState, useEffect } from 'react';
import 'react-table/react-table.css';
import { Checkbox, Icon, Button, Table, Modal } from 'semantic-ui-react';
import ReactTableServerSideWrapper from '../../../utils/ReactTableServerSideWrapper';
import { Link } from 'react-router-dom';

const List = props => {
  const {
    dynamicObject,
    fetchSmsrcus,
    turnOnReactFetch,
    searchParams,
    columnsForTable,
  } = props;

  const [tableColumns, setTableColumns] = useState([]);
  let page = dynamicObject.totalPages ? dynamicObject.totalPages : 1;
  useEffect(() => {
    setTableColumns(columnsForTable);
  }, [columnsForTable]);

  return (
    <div>
      <ReactTableServerSideWrapper
        columns={columnsForTable}
        data={Object.keys(dynamicObject).length === 0 ? [] : dynamicObject.data}
        pages={dynamicObject.totalPages}
        filterable={true}
        defaultPageSize={20}
        searchParam={searchParams}
        showPagination={true}
        requestData={param => {
          page = dynamicObject.totalPages;
          fetchSmsrcus({ ...param, page });
        }}
        turnOnReactFetch={turnOnReactFetch}
        className="-striped -highlight"
      />
    </div>
  );
};

export default List;
