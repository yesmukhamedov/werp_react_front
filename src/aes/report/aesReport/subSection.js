import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default function SubSection(props) {
  const getTrProps = (state, rowInfo, instance) => {
    if (rowInfo) {
      return {
        style: {
          background:
            rowInfo.original.apprej === 0
              ? '#ff4d4d'
              : rowInfo.original.apprej === 1
              ? '#4d94ff'
              : '#f2f2f2',
        },
      };
    }
    return {};
  };

  const columns = [
    {
      Header: props.messages['bukrs'],
      accessor: 'bukrs_name',
      minWidth: 90,
      maxWidth: 250,
    },
    {
      Header: props.messages['country'],
      accessor: 'country_name',
      minWidth: 100,
      maxWidth: 250,
    },
    {
      Header: props.messages['brnch'],
      accessor: 'branch_name',
      minWidth: 100,
      maxWidth: 250,
    },
    {
      Header: props.messages['dep'],
      accessor: 'dep_name',
      minWidth: 100,
      maxWidth: 250,
    },
    {
      Header: props.messages['os_name'],
      accessor: 'os_name',
      minWidth: 100,
      maxWidth: 250,
    },
    {
      Header: props.messages['type1'],
      accessor: 'type1_name',
      minWidth: 100,
      maxWidth: 250,
    },
    {
      Header: props.messages['type2'],
      accessor: 'type2_name',
      minWidth: 100,
      maxWidth: 250,
    },
    {
      Header: props.messages['type3'],
      accessor: 'type3_name',
      minWidth: 100,
      maxWidth: 250,
    },
    {
      Header: props.messages['os_det'],
      accessor: 'detail_name',
      minWidth: 100,
      maxWidth: 250,
    },
    {
      Header: props.messages['rnum'],
      accessor: 'room_name',
      minWidth: 100,
      maxWidth: 250,
    },
    {
      Header: props.messages['status1'],
      accessor: 'status_name',
      minWidth: 100,
      maxWidth: 250,
    },
    {
      Header: props.messages['amount'],
      accessor: 'price',
      minWidth: 90,
      maxWidth: 250,
    },
    {
      Header: props.messages['waers'],
      accessor: 'currency',
      minWidth: 70,
      maxWidth: 250,
    },
    {
      Header: props.messages['owner'],
      accessor: 'se0_name',
      width: 280,
      minWidth: 250,
      maxWidth: 500,
    },
    {
      Header: props.messages['examiner'],
      accessor: 'se1_name',
      width: 280,
      minWidth: 250,
      maxWidth: 500,
    },
    {
      Header: props.messages['examiner2'],
      accessor: 'se2_name',
      width: 280,
      minWidth: 250,
      maxWidth: 500,
    },
    {
      Header: props.messages['examiner3'],
      accessor: 'se3_name',
      width: 280,
      minWidth: 250,
      maxWidth: 500,
    },
    {
      Header: props.messages['buying_date'],
      accessor: 'buying_time',
      minWidth: 150,
      maxWidth: 250,
    },
    {
      Header: props.messages['L__CREATE_DATE'],
      accessor: 'created_date',
      minWidth: 150,
      maxWidth: 250,
    },
    {
      Header: props.messages['L__MODIFIED_DATE'],
      accessor: 'updated_date',
      minWidth: 150,
      maxWidth: 250,
    },
    {
      Header: props.messages['count'],
      accessor: 'quantity',
      minWidth: 90,
      maxWidth: 90,
    },
  ];

  return (
    <div>
      {props.listAes === undefined || props.listAes.length == 0 ? (
        ''
      ) : (
        <ReactTable
          data={props.listAes}
          columns={columns}
          getTrProps={getTrProps.bind(this)}
          rowsText={props.messages['rowsText']}
          pageText={props.messages['pageText']}
          ofText={props.messages['ofText']}
          previousText={props.messages['previousText']}
          nextText={props.messages['nextText']}
          noDataText={props.messages['loadingText']}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      )}
    </div>
  );
}
