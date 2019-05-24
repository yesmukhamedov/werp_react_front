import React from 'react';
import { Table, Segment, Input, Label } from 'semantic-ui-react';
import { moneyFormat } from '../../../utils/helpers';
const OutputEmployyeAccount = props => {
  const { outputTable, color, header } = props;

  return (
    <Segment>
      <Label color={color} ribbon>
        {header}
      </Label>
      {outputTable && (
        <Table compact>
          <Table.Body>
            {outputTable.map((item, key) => (
              <Table.Row key={key}>
                <Table.Cell>
                  <Input value={item.waers} readOnly />
                </Table.Cell>
                <Table.Cell>
                  <Input value={moneyFormat(item.dmbtr)} readOnly />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </Segment>
  );
};
export default OutputEmployyeAccount;
