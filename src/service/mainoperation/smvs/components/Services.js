import React from 'react';
import { Button, Segment, Icon, Divider, Dropdown } from 'semantic-ui-react';
import ReactTableWrapper from '../../../../utils/ReactTableWrapper';

const Services = props => {
  const {
    data = [],
    addServices,
    onChangeSettingService,
    handleRemoveService,
    servicesOptions,
    selectServices,
    disabledEdit,
    serviceTypeOptions = [],
  } = props;

  const columns = [
    {
      Header: '№',
      id: 'row',
      maxWidth: 50,
      filterable: false,
      Cell: row => {
        return <div>{row.index + 1}</div>;
      },
    },
    {
      Header: 'Наименование услуг',
      accessor: 'matnrName',
      width: 500,
      Cell: ({ original }) => (
        <Dropdown
          disabled={disabledEdit}
          placeholder="Выбрать"
          fluid
          selection
          value={original.serviceTypeId}
          options={serviceTypeOptions}
          onChange={(e, value) =>
            onChangeSettingService({ original, value }, 'changeServiceType')
          }
        />
      ),
    },
    {
      Header: 'Сумма',
      accessor: 'sum',
    },
    {
      Header: 'Валюта',
      accessor: 'currencyName',
    },
    {
      Header: '',
      accessor: 'delete',
      Cell: ({ original }) => (
        <Button
          disabled={disabledEdit}
          size="mini"
          color="red"
          onClick={() => handleRemoveService(original)}
        >
          Удалить
        </Button>
      ),
    },
  ];

  return (
    <Segment>
      <h5>Услуги</h5>
      <Divider />
      <ReactTableWrapper
        data={data}
        columns={columns}
        className="-striped -highlight"
        pageSize={data.length > 10 ? 10 : data.length}
      />
      <Divider />

      {data.length < 1 ? (
        <Button
          disabled={disabledEdit}
          onClick={addServices}
          icon
          labelPosition="left"
          color="green"
          size="small"
        >
          <Icon name="plus" size="small" /> Добавить услугу
        </Button>
      ) : (
        ''
      )}
    </Segment>
  );
};

export default Services;
