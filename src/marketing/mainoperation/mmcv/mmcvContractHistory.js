import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Table } from 'semantic-ui-react';

const MmcvContractHistory = props => {
  const {
    contractHistory = [],
    language,
    intl: { messages },
  } = props;

  const getOperTypeName = id => {
    switch (id) {
      case 1:
        return messages['toAdd'];
      case 2:
        return messages['toRemove'];
      case 3:
        return messages['toChange'];
      case 4:
        return messages['toIssue'];
      case 5:
        return messages['toReturn'];
      default:
        return '';
    }
  };

  return (
    <div>
      <Table collapsing className="borderLess">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{messages['id']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['date']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['section']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['operation']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['oldValue']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['newValue']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['description']}</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {contractHistory.map(item => {
            return (
              <Table.Row key={item.id}>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{item.recDate}</Table.Cell>
                <Table.Cell>{item.operOnText}</Table.Cell>
                <Table.Cell>{getOperTypeName(item.operType)}</Table.Cell>
                <Table.Cell>{item.oldText}</Table.Cell>
                <Table.Cell>{item.newText}</Table.Cell>
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

export default connect(
  mapStateToProps,
  {},
)(injectIntl(MmcvContractHistory));
