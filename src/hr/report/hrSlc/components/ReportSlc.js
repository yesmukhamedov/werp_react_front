import React, { useState, useEffect } from 'react';
import {
  Segment,
  Table,
  Menu,
  Label,
  Icon,
  Container,
  Divider,
} from 'semantic-ui-react';

const ReportSlc = props => {
  const { filterMapPoints = [] } = props;

  const filterDealer = filterMapPoints.filter(item => item.position == 'Дилер');
  return (
    <Container fluid style={{ padding: '30px', height: '100%' }}>
      <Divider horizontal>Дилеры</Divider>
      <Table celled size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>№</Table.HeaderCell>
            <Table.HeaderCell>ФИО</Table.HeaderCell>
            <Table.HeaderCell>Должность</Table.HeaderCell>
            <Table.HeaderCell>Статус</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {filterDealer.map((item, index) => (
            <Table.Row>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{item.fullName}</Table.Cell>
              <Table.Cell>{item.position}</Table.Cell>
              <Table.Cell>{item.status}</Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Divider horizontal>Мастеры</Divider>
      <Table celled size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>№</Table.HeaderCell>
            <Table.HeaderCell>ФИО</Table.HeaderCell>
            <Table.HeaderCell>Должность</Table.HeaderCell>
            <Table.HeaderCell>Статус</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>Арман</Table.Cell>
            <Table.Cell>Дилер</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Divider horizontal>Штатные сотрудники</Divider>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>№</Table.HeaderCell>
            <Table.HeaderCell>ФИО</Table.HeaderCell>
            <Table.HeaderCell>Должность</Table.HeaderCell>
            <Table.HeaderCell>Статус</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>Арман</Table.Cell>
            <Table.Cell>Дилер</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Divider horizontal>Финансовые агенты</Divider>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>№</Table.HeaderCell>
            <Table.HeaderCell>ФИО</Table.HeaderCell>
            <Table.HeaderCell>Должность</Table.HeaderCell>
            <Table.HeaderCell>Статус</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>Арман</Table.Cell>
            <Table.Cell>Дилер</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  );
};

export default ReportSlc;
