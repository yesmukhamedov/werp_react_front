import React, { useState } from 'react';
import ReactTable from 'react-table';
import withFixedColumns from 'react-table-hoc-fixed-columns';
import 'react-table/react-table.css';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import debounce from 'lodash/debounce';
import 'react-table-hoc-fixed-columns/lib/styles.css';

const ReactTableFixedColumns = withFixedColumns(ReactTable);

const ReactTableServerSideWrapper = props => {
  const {
    intl: { messages },
  } = props;

  const {
    defaultPageSize = 20,
    className = '-striped -highlight',
    columns = [],
    data = [],
    filterable = false,
    searchParam = {},
    loadingText = messages['loadingText'],
    noDataText = messages['noDataText'],
    previousText = messages['previousText'],
    nextText = messages['nextText'],
    rowsText = messages['rowsText'],
    pageText = messages['pageText'],
    ofText = messages['ofText'],
    requestData = () => {},
    pages = 0,
    loading = false,
    turnOnReactFetch = false,
  } = props;

  const fetchData = (params, instance) => {
    const { pageSize, page, sorted = [], filtered = [] } = params;
    // console.log(sorted, 'sorted');
    let orderBy = null;
    let direction = null;
    // let filter = '';

    for (let i = 0; i < sorted.length; i++) {
      let item = sorted[i];

      orderBy = item.id;
      direction = item.desc ? 'DESC' : 'ASC';
    }

    let param = { ...searchParam, orderBy, direction, page, size: pageSize };

    for (let i = 0; i < filtered.length; i++) {
      let item = filtered[i];

      param = { ...param, [item.id]: item.value };
      // if (filter !== null && filter.length > 0) {
      //   filter = filter + ';';
      // }
      // filter = filter + item.id + '==*' + item.value + '*';
    }

    // if (filter !== null && filter.length > 0) {
    //   if (searchText !== null && searchText.length > 0) {
    //     filter = searchText + ';(' + filter + ')';
    //   }
    // }

    // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
    // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.

    // Request the data however you want.  Here, we'll use our mocked service we created earlier

    if (turnOnReactFetch) {
      requestData(param);
    }
  };
  return (
    <div>
      <ReactTableFixedColumns
        manual // Forces table not to paginate or sort automatically, so we can handle it server-side
        data={data}
        pages={pages} // Display the total number of pages
        loading={loading} // Display the loading overlay when we need it
        onFetchData={debounce(fetchData, 1000)} // Request new data when things change
        columns={columns}
        defaultPageSize={defaultPageSize}
        className={className}
        loadingText={loadingText}
        noDataText={noDataText}
        previousText={previousText}
        nextText={nextText}
        rowsText={rowsText}
        pageText={pageText}
        ofText={ofText}
        filterable={filterable}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  {},
)(injectIntl(ReactTableServerSideWrapper));
