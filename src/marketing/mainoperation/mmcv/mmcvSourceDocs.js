import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Table } from 'semantic-ui-react';
import { LinkToFa03BelnrBukrsGjahr } from '../../../utils/outlink';
import { moneyFormat } from '../../../utils/helpers';

const MmcvSourceDocs = props => {
  const {
    sourceDocs = [],
    totalSourceDoscPayment = 0,
    waers,
    // language,
    intl: { messages },
  } = props;

  return (
    <div>
      <Table collapsing className="borderLess">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{messages['belnr']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['bldat']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['gjahr']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['blart']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['description']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['amount']}</Table.HeaderCell>
            <Table.HeaderCell>{messages['waers']}</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sourceDocs.map(item => {
            return (
              <Table.Row key={item.belnr.toString() + item.gjahr.toString()}>
                <Table.Cell>
                  <LinkToFa03BelnrBukrsGjahr
                    belnr={item.belnr}
                    bukrs={item.bukrs}
                    gjahr={item.gjahr}
                  />
                </Table.Cell>
                <Table.Cell>{item.bldat}</Table.Cell>
                <Table.Cell>{item.gjahr}</Table.Cell>
                <Table.Cell>{item.blart}</Table.Cell>
                <Table.Cell>{item.info}</Table.Cell>
                <Table.Cell>{moneyFormat(item.amount)}</Table.Cell>
                <Table.Cell>{item.waers}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell />
            <Table.HeaderCell>
              {moneyFormat(totalSourceDoscPayment)}
            </Table.HeaderCell>
            <Table.HeaderCell>{waers}</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Footer>
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

export default connect(mapStateToProps, {})(injectIntl(MmcvSourceDocs));
