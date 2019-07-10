import React, { useState } from 'react';
import { Grid, Input, Form, Segment, Button } from 'semantic-ui-react';

export default function SearchByNum(props) {
  const [searchPms, setSearchPms] = useState([]);

  const searchByContractNum = () => {
    props.searContrSecOpts(searchPms);
  };
  const inputChange = (fieldName, o) => {
    switch (fieldName) {
      case 'contract_number':
        searchPms['contract_number'] = o.value;
        break;
      case 'tovarSerial':
        searchPms['tovarSerial'] = o.value;
        break;
      case 'old_sn':
        searchPms['old_sn'] = o.value;
        break;
      default:
        searchPms[fieldName] = o.value;
    }
    setSearchPms({ ...searchPms });
  };

  const { messages } = props;
  return (
    <div>
      <Segment>
        <Form>
          <Grid>
            <Grid.Row>
              <Grid.Column width={5}>
                <Form.Field
                  onChange={(e, o) => inputChange('contract_number', o)}
                  control={Input}
                  label={messages['L__CONTRACT_NUMBER']}
                />
              </Grid.Column>
              <Grid.Column width={5}>
                <Form.Field
                  onChange={(e, o) => inputChange('tovarSerial', o)}
                  control={Input}
                  label={' Товар SN (Заводской номер) '}
                />
              </Grid.Column>
              <Grid.Column width={6}>
                <Form.Field
                  onChange={(e, o) => inputChange('old_sn', o)}
                  control={Input}
                  label={' Старый SN Договора '}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
      <Button
        color="teal"
        floated="right"
        onClick={searchByContractNum.bind(this)}
      >
        {messages['search']}
      </Button>
      <br />
      <br />
    </div>
  );
}
