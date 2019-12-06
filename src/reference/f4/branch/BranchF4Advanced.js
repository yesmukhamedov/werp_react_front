import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

const BranchF4Advanced = props => {
  const {
    intl: { messages },
  } = props;

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

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {})(injectIntl(BranchF4Advanced));
