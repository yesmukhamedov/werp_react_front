import React, { PureComponent } from 'react';
import { Table, Dropdown, Segment, Input, Label } from 'semantic-ui-react';
import { handleFocus, moneyFormat } from '../../../utils/helpers';
import { injectIntl } from 'react-intl';
import { messages } from '../../../locales/defineMessages';

require('moment/locale/ru');

class FaicfpPosition extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { bseg, cashBankHkontOptions, hkontOptions, waers } = this.props;
    const { formatMessage } = this.props.intl;

    if (bseg === undefined || bseg[0] === undefined || bseg[1] === undefined) {
      return '';
    }

    // console.log(hkontOptions,'hkontOptions')
    const shkzgOptions = [
      { key: 1, text: formatMessage(messages.incoming), value: 'S' },
      { key: 2, text: formatMessage(messages.outgoing), value: 'H' },
    ];
    return (
      <Segment padded size="small">
        <Label color="red" ribbon>
          {formatMessage(messages.position)}
        </Label>

        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                {formatMessage(messages.hkont)}
              </Table.HeaderCell>
              <Table.HeaderCell>
                {formatMessage(messages.shkzg)}
              </Table.HeaderCell>
              <Table.HeaderCell>
                {formatMessage(messages.amount)}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Dropdown
                  placeholder={formatMessage(messages.cashBank)}
                  selection
                  options={cashBankHkontOptions || []}
                  value={bseg[0].hkont}
                  onChange={(e, { value }) =>
                    this.props.onInputChange(value, 'hkont', 0)
                  }
                />
              </Table.Cell>
              <Table.Cell>
                <Dropdown
                  selection
                  options={shkzgOptions || []}
                  value={bseg[0].shkzg}
                  onChange={(e, { value }) =>
                    this.props.onInputChange(value, 'shkzg', 0)
                  }
                />
              </Table.Cell>
              <Table.Cell>
                <Input
                  label={waers}
                  labelPosition="left"
                  color="teal"
                  value={moneyFormat(bseg[0].summa)}
                  onFocus={handleFocus}
                  maxLength="18"
                  onChange={(e, { value }) =>
                    this.props.onInputChange(value, 'summa', 0)
                  }
                />
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>
                <Dropdown
                  placeholder={formatMessage(messages.hkont)}
                  selection
                  options={hkontOptions || []}
                  value={bseg[1].hkont}
                  onChange={(e, { value }) =>
                    this.props.onInputChange(value, 'hkont', 1)
                  }
                />
              </Table.Cell>
              <Table.Cell>
                <Dropdown
                  selection
                  options={shkzgOptions || []}
                  value={bseg[1].shkzg}
                  disabled={true}
                />
              </Table.Cell>
              <Table.Cell>
                <Input
                  label={waers}
                  labelPosition="left"
                  color="teal"
                  value={moneyFormat(bseg[1].summa)}
                  maxLength="18"
                  disabled={true}
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Segment>
    );
  }
}

export default injectIntl(FaicfpPosition);
