import React from 'react';
import ReactTableWrapper from '../../../../utils/ReactTableWrapper';
import { moneyFormat } from '../../../../utils/helpers';
import { Button, Dropdown } from 'semantic-ui-react';

const Table = props => {
  const { messages, data = [] } = props;
  const options = [
    { key: 'edit', icon: 'edit', text: 'Edit Post', value: 'edit' },
    { key: 'delete', icon: 'delete', text: 'Remove Post', value: 'delete' },
    { key: 'hide', icon: 'hide', text: 'Hide Post', value: 'hide' },
  ];
  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
      width: 100,
    },
    {
      Header: messages['L__COMPANY'],
      accessor: 'companyName',
      Cell: row => (
        <div className="text-wrap" style={{ textAlign: 'center' }}>
          {row.value}
        </div>
      ),
    },
    {
      Header: messages['country'],
      accessor: 'countryName',
      Cell: row => {
        return (
          <div className="text-wrap" style={{ textAlign: 'center' }}>
            {row.value}
          </div>
        );
      },
    },
    {
      Header: messages['L__BRANCH'],
      accessor: 'branchName',
      Cell: row => {
        return (
          <div className="text-wrap" style={{ textAlign: 'center' }}>
            {row.value}
          </div>
        );
      },
    },
    {
      Header: 'Фин. агент',
      accessor: 'collectorFIO',
      Cell: row => {
        return (
          <div className="text-wrap" style={{ textAlign: 'center' }}>
            {row.value}
          </div>
        );
      },
    },
    {
      Header: messages['L__STATUS'],
      accessor: 'statusName',
      Cell: row => {
        return (
          <div className="text-wrap" style={{ textAlign: 'center' }}>
            {row.value}
          </div>
        );
      },
    },
    {
      Header: messages['Table.PhoneNumber'],
      accessor: 'phoneNumber',
      Cell: row => {
        return (
          <div className="text-wrap" style={{ textAlign: 'center' }}>
            {row.value}
          </div>
        );
      },
    },
    {
      Header: messages['payment_method'],
      accessor: 'paymentMethodName',
      Cell: row => {
        return (
          <div className="text-wrap" style={{ textAlign: 'center' }}>
            {row.value}
          </div>
        );
      },
    },
    {
      Header: messages['payment_method'],
      accessor: 'paymentMethodName',
      Cell: row => {
        return (
          <div className="text-wrap" style={{ textAlign: 'center' }}>
            {row.value}
          </div>
        );
      },
    },
    {
      Header: messages['L__CONTRACT_NUMBER'],
      accessor: 'contractNumber',
      Cell: row => {
        return (
          <div className="text-wrap" style={{ textAlign: 'center' }}>
            {row.value}
          </div>
        );
      },
    },
    {
      Header: messages['TBL_H__AMOUNT'],
      accessor: 'collectMoney',
      Cell: row => {
        return (
          <div className="text-wrap" style={{ textAlign: 'center' }}>
            {row.value}
          </div>
        );
      },
    },
    {
      Header: 'Банк',
      accessor: 'bankName',
      Cell: row => {
        return (
          <div className="text-wrap" style={{ textAlign: 'center' }}>
            {row.value}
          </div>
        );
      },
    },
    {
      Header: 'Действие',
      Cell: original => {
        console.log('original', original);
        return (
          <div className="text-wrap" style={{ textAlign: 'center' }}>
            <Button.Group color="teal">
              <Button>Принять</Button>
              <Dropdown
                className="button icon"
                floating
                options={options}
                trigger={<></>}
              />
            </Button.Group>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <ReactTableWrapper data={data} columns={columns} />
    </div>
  );
};
export default Table;
