import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Table } from 'semantic-ui-react';

const MmcvContractCRMHistory = props => {
  const {
    contractCRMHistory = [],
    intl: { messages },
  } = props;

  return (
    <div>
      <Table collapsing className="borderLess">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{messages['date']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['Table.Actions']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['employee']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['description']}</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {contractCRMHistory.map(item => {
            return (
              <Table.Row key={item.id}>
                <Table.Cell>{item.crmHistroyDate}</Table.Cell>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.staffName}</Table.Cell>
                <Table.Cell>{item.info}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

function mapStateToProps(state) {
  // console.log(state,'state')
  return {
    language: state.locales.lang,
  };
}

export default connect(mapStateToProps, {})(injectIntl(MmcvContractCRMHistory));
