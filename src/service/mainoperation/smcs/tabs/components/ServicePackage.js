import React from 'react';
import { Button, Segment, Icon, Divider } from 'semantic-ui-react';
import ReactTableWrapper from '../../../../../utils/ReactTableWrapper';
import { moneyFormat } from '../../../../../utils/helpers';

const ServicePackage = props => {
  const { data = [], onChangeServicePackage, editStatus, currency } = props;

  const columnsDetails = [
    {
      Header: '№',
      accessor: 'matnrCode',
      Cell: ({ original, index }) => <div>{index + 1}</div>,
      width: 50,
    },
    {
      Header: 'Наименование',
      accessor: 'matnrName',
      width: 500,
    },

    {
      Header: 'Цена',
      accessor: 'matnrPrice',
    },
    {
      Header: 'Валюта',
      accessor: 'currencyName',
    },
    {
      Header: 'Количество',
      accessor: 'quantity',
    },
  ];

  const totalServicePackage = data.reduce((total, item) => total + item.sum, 0);
  return (
    <Segment>
      <h5>Сервис пакет</h5>
      <Divider />
      {data.map(item => (
        <Segment color="orange" key={item.servicePackageId}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <p>{item.matnrName}</p>
            <Button
              size="mini"
              color="red"
              onClick={() =>
                onChangeServicePackage(item, 'deleteServicePackage')
              }
            >
              Удалить
            </Button>
          </div>

          <Divider />
          <ReactTableWrapper
            data={item.details}
            columns={columnsDetails}
            className="-striped -highlight"
            pageSize={item.details.length > 10 ? 10 : item.details.length}
          />
        </Segment>
      ))}
      {data.length > 0 ? (
        <Segment>
          Общая сумма: {moneyFormat(totalServicePackage)} {currency}
        </Segment>
      ) : (
        ''
      )}

      <Button
        icon
        labelPosition="left"
        color="green"
        size="small"
        onClick={item =>
          onChangeServicePackage(item, 'modalOpenServicePackage')
        }
        disabled={!editStatus}
      >
        <Icon name="plus" size="small" />
        Добавить сервис пакет
      </Button>
    </Segment>
  );
};

export default ServicePackage;
