import React from 'react';
import { Button, Table, Dropdown, Segment, Icon } from 'semantic-ui-react';

const Services = props => {
  const {
    data = [],
    addServices,
    servicesOptions,
    handleRemoveService,
    selectServices,
    waers,
  } = props;

  return (
    <Segment>
      {data.map((item, index) => (
        <Table celled key={index}>
          <Table.Body>
            <Table.Row key={index}>
              <Table.Cell width={1}>{index + 1}</Table.Cell>
              <Table.Cell width={7} style={{ margin: '0', padding: '0' }}>
                <Dropdown
                  placeholder="Выбрать"
                  fluid
                  selection
                  value={item.serviceTypeId}
                  options={servicesOptions}
                  onChange={(e, value) => selectServices(item.id, value)}
                />
              </Table.Cell>
              <Table.Cell width={2}>{item.sum}</Table.Cell>
              <Table.Cell width={2}>{waers}</Table.Cell>
              <Table.Cell style={{ margin: '0', padding: '0' }}>
                <Button color="red" onClick={() => handleRemoveService(item)}>
                  Удалить
                </Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      ))}
      {data.length < 1 ? (
        <Button
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
