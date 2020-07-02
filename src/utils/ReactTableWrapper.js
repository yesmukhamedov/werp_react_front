import React, { useState } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import withFixedColumns from 'react-table-hoc-fixed-columns';
import 'react-table-hoc-fixed-columns/lib/styles.css';
import './style.css';

const ReactTableFixedColumns = withFixedColumns(ReactTable);

const ReactTableWrapper = props => {
  const {
    intl: { messages },
  } = props;

  const [selectedRow, setSelectedRow] = useState(-1);

  const {
    showPagination = false,
    defaultPageSize = 20,
    pageSize = undefined,
    className = '-striped -highlight',
    columns = [],
    refToChild = null,
    data = [],
    filterable = false,
    loadingText = messages['loadingText'],
    noDataText = messages['noDataText'],
    previousText = messages['previousText'],
    nextText = messages['nextText'],
    rowsText = messages['rowsText'],
    pageText = messages['pageText'],
    ofText = messages['ofText'],
    onFilterChangeReactTable = null,
    onRowClick = null,
  } = props;

  return (
    <div>
      <ReactTableFixedColumns
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
        getTdProps={(state, rowInfo, column, instance) => {
          if (typeof rowInfo !== 'undefined') {
            return {
              onClick: (e, handleOriginal) => {
                setSelectedRow({ selected: rowInfo.index });
                if (handleOriginal) {
                  handleOriginal();
                }
                //console.log(rowInfo, 'column clicked');
                if (onRowClick && rowInfo) {
                  onRowClick(rowInfo.original, rowInfo.index, column.id);
                }
              },
              // style: {
              //   background:
              //     rowInfo.index === selectedRow.selected ? '#7D3C98' : 'white',
              //   color:
              //     rowInfo.index === selectedRow.selected ? 'white' : 'black',
              // },
            };
          } else {
            return {
              onClick: (e, handleOriginal) => {
                if (handleOriginal) {
                  handleOriginal();
                }
              },
              style: {
                background: 'white',
                color: 'black',
              },
            };
          }
        }}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {})(injectIntl(ReactTableWrapper));
