import React, { useEffect, useState } from 'react';
import {
  Button,
  Segment,
  Icon,
  Divider,
  Input,
  Checkbox,
} from 'semantic-ui-react';
import ReactTableWrapper from '../../../../utils/ReactTableWrapper';
import { moneyFormat } from '../../../../utils/helpers';

const ServicePackage = props => {
  const { data = [], currency, matnrServicePackage = [] } = props;

  const [servicePackage, setServicePackage] = useState([]);
  console.log('servicePackage', servicePackage);
  useEffect(() => {
    if (data.length > 0 && matnrServicePackage.length > 0) {
      setServicePackage(
        matnrServicePackage.map(item => {
          return {
            ...item,
            details: data.filter(el => el.servicePackageId == item.id),
          };
        }),
      );
    } else {
      setServicePackage([]);
    }
  }, [matnrServicePackage, data]);

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
      {servicePackage.map((item, index) => {
        if (item.details.length > 0) {
          return (
            <Segment color="orange" key={index}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <p>{item.name}</p>
              </div>

              <Divider />
              <ReactTableWrapper
                data={item.details}
                columns={columnsDetails}
                className="-striped -highlight"
                pageSize={item.details.length > 10 ? 10 : item.details.length}
              />

              {data.length > 0 ? (
                <Segment>
                  Общая сумма: {moneyFormat(totalServicePackage)} {currency}
                </Segment>
              ) : (
                ''
              )}
            </Segment>
          );
        }
      })}
    </Segment>
  );
};

export default ServicePackage;
