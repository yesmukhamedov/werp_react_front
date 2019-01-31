import React, { Component } from 'react';
import ReactTable from 'react-table';

class SubSection extends Component {
  getTrProps = (state, rowInfo, instance) => {
    if (rowInfo) {
      return {
        style: {
          background:
            rowInfo.original.apprej == 0
              ? '#ff4d4d'
              : rowInfo.original.apprej == 1
              ? '#4d94ff'
              : '#f2f2f2',
        },
      };
    }
    return {};
  };
  render() {
    const { listAes, messages } = this.props;

    const columns = [
      {
        Header: messages['bukrs'],
        accessor: 'bukrs_name',
        minWidth: 90,
        maxWidth: 250,
      },
      {
        Header: messages['country'],
        accessor: 'country_name',
        minWidth: 100,
        maxWidth: 250,
      },
      {
        Header: messages['brnch'],
        accessor: 'branch_name',
        minWidth: 100,
        maxWidth: 250,
      },
      {
        Header: messages['dep'],
        accessor: 'dep_name',
        minWidth: 100,
        maxWidth: 250,
      },
      {
        Header: messages['os_name'],
        accessor: 'os_name',
        minWidth: 100,
        maxWidth: 250,
      },
      {
        Header: messages['type1'],
        accessor: 'type1_name',
        minWidth: 100,
        maxWidth: 250,
      },
      {
        Header: messages['type2'],
        accessor: 'type2_name',
        minWidth: 100,
        maxWidth: 250,
      },
      {
        Header: messages['type3'],
        accessor: 'type3_name',
        minWidth: 100,
        maxWidth: 250,
      },
      {
        Header: messages['os_det'],
        accessor: 'detail_name',
        minWidth: 100,
        maxWidth: 250,
      },
      {
        Header: messages['rnum'],
        accessor: 'room_name',
        minWidth: 100,
        maxWidth: 250,
      },
      {
        Header: messages['status1'],
        accessor: 'status_name',
        minWidth: 100,
        maxWidth: 250,
      },
      {
        Header: messages['amount'],
        accessor: 'price',
        minWidth: 90,
        maxWidth: 250,
      },
      {
        Header: messages['waers'],
        accessor: 'currency',
        minWidth: 70,
        maxWidth: 250,
      },
      {
        Header: messages['owner'],
        accessor: 'se0_name',
        width: 280,
        minWidth: 250,
        maxWidth: 500,
      },
      {
        Header: messages['examiner'],
        accessor: 'se1_name',
        width: 280,
        minWidth: 250,
        maxWidth: 500,
      },
      {
        Header: messages['examiner2'],
        accessor: 'se2_name',
        width: 280,
        minWidth: 250,
        maxWidth: 500,
      },
      {
        Header: messages['examiner3'],
        accessor: 'se3_name',
        width: 280,
        minWidth: 250,
        maxWidth: 500,
      },
      {
        Header: messages['buying_date'],
        accessor: 'buying_time',
        minWidth: 150,
        maxWidth: 250,
      },
      {
        Header: messages['L__CREATE_DATE'],
        accessor: 'created_date',
        minWidth: 150,
        maxWidth: 250,
      },
      {
        Header: messages['L__MODIFIED_DATE'],
        accessor: 'updated_date',
        minWidth: 150,
        maxWidth: 250,
      },
      {
        Header: messages['count'],
        accessor: 'quantity',
        minWidth: 90,
        maxWidth: 90,
      },
    ];

    return (
      <div>
        {listAes === undefined || listAes.length == 0 ? (
          ''
        ) : (
          <ReactTable
            data={listAes}
            columns={columns}
            getTrProps={this.getTrProps}
            rowsText={messages['rowsText']}
            pageText={messages['pageText']}
            ofText={messages['ofText']}
            previousText={messages['previousText']}
            nextText={messages['nextText']}
            noDataText={messages['loadingText']}
            defaultPageSize={10}
            className="-striped -highlight"
          />
        )}
      </div>
    );
  }
}
export default SubSection;
