import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
export const ReactTableWrapper = props => {
  const {
    showPagination = false,
    defaultPageSize = 20,
    pageSize = undefined,
    className = '-striped -highlight',
    columns = [],
    refToChild = null,
    data = [],
    filterable = false,
    loadingText = undefined,
    noDataText = undefined,
    previousText = undefined,
    nextText = undefined,
    rowsText = undefined,
    pageText = undefined,
    ofText = undefined,
    onFilterChangeReactTable = null,
  } = props;

  return (
    <div>
      <ReactTable
        filterable={filterable}
        ref={refToChild}
        data={data}
        columns={columns}
        pageSize={pageSize}
        defaultPageSize={defaultPageSize}
        showPagination={showPagination}
        className={className}
        loadingText={loadingText}
        noDataText={noDataText}
        previousText={previousText}
        nextText={nextText}
        rowsText={rowsText}
        pageText={pageText}
        ofText={ofText}
        onFilteredChange={onFilterChangeReactTable}
      />
    </div>
  );
};
