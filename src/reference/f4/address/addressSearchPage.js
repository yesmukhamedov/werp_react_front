import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { injectIntl } from 'react-intl';
import { Dimmer, Loader } from 'semantic-ui-react';

import { f4ClearAnyObject, f4FetchAddresses } from '../f4_action';

const AddressSearchPage = props => {
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);
  const {
    // addressTypes,
    customerId = 0,
    intl: { messages },
    addresses = [],
  } = props;

  //componentWillRecieveProps
  useEffect(() => {
    //getting all addresses
    if (customerId && customerId > 0) {
      props.f4FetchAddresses({ customerId }, bool =>
        setIsLoadingAddresses(bool),
      );
    } else props.f4ClearAnyObject('F4_CLEAR_ADDRESSES');
  }, [customerId]);

  const getAddressTypeName = id => {
    switch (id) {
      case 1:
        return messages['homeAddress'];
      case 2:
        return messages['workAddress'];
      case 3:
        return messages['registrationAddress'];
      case 4:
        return messages['additionalAddress'];
      default:
        return messages['noDataText'];
    }
  };

  const getColumns = () => {
    let t1columns = [];
    let t1r1c1 = {},
      t1r1c2 = {},
      t1r1c3 = {},
      t1r1c4 = {},
      t1r1c5 = {};

    t1r1c1 = {
      Header: ({ value }) => <b>{messages['addrType']}</b>,
      accessor: 'addrType',
      width: 160,
      className: 'clickableItem',
      Cell: obj => <span>{getAddressTypeName(obj.original.addrType)}</span>,
    };
    t1r1c2 = {
      Header: ({ value }) => <b>{messages['address']}</b>,
      width: 320,
      id: 'address',
      accessor: d => d.address,
      className: 'clickableItem',
    };

    t1r1c3 = {
      Header: ({ value }) => <b>{messages['telMob1']}</b>,
      width: 140,
      id: 'telMob1',
      accessor: d => d.telMob1,
      className: 'clickableItem',
    };
    t1r1c4 = {
      Header: ({ value }) => <b>{messages['telDom']}</b>,
      width: 140,
      id: 'telDom',
      accessor: d => d.telDom,
      className: 'clickableItem',
    };
    t1r1c5 = {
      Header: ({ value }) => <b>{messages['telMob2']}</b>,
      width: 140,
      id: 'telMob2',
      accessor: d => d.telMob2,
      className: 'clickableItem',
    };

    t1columns.push(t1r1c1);
    t1columns.push(t1r1c2);
    // t1columns.push(t1r1c3);
    // t1columns.push(t1r1c4);
    // t1columns.push(t1r1c5);

    return t1columns;
  };

  return (
    <div>
      <Dimmer active={isLoadingAddresses}>
        <Loader />
      </Dimmer>
      <ReactTable
        data={addresses}
        columns={getColumns()}
        defaultPageSize={10}
        showPagination
        className="-striped -highlight"
        loadingText={messages['loadingText']}
        noDataText={messages['noDataText']}
        previousText={messages['previousText']}
        nextText={messages['nextText']}
        rowsText={messages['rowsText']}
        pageText={messages['pageText']}
        ofText={messages['ofText']}
        showPageSizeOptions={false}
        getTrProps={(state, rowInfo, column) => {
          return {
            onClick: (e, handleOriginal) => {
              if (props.onAddressSelect) {
                props.onAddressSelect(rowInfo.original);
              }
              if (props.close) {
                props.close();
              }
            },
          };
        }}
      />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    addresses: state.f4.addresses,
  };
}

export default connect(mapStateToProps, { f4ClearAnyObject, f4FetchAddresses })(
  injectIntl(AddressSearchPage),
);
