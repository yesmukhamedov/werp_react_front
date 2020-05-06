import React from 'react';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
import 'react-table/react-table.css';

const List = props => {
  const { dynamicObject, tableCols } = props;

  return (
    <div>
      <ReactTableWrapper
        data={dynamicObject ? dynamicObject.data : []}
        pages={2}
        columns={tableCols}
        defaultPageSize={20}
        showPagination={true}
        className="-striped -highlight"
      />
    </div>
  );
};

export default List;
