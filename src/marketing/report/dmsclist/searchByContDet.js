import React, { useState } from 'react';
import { Grid, Segment, Button, Header, Input, Form } from 'semantic-ui-react';

export default function SearchByContDet(props) {
  const [searchPms, setSearchPms] = useState([]);
  const searchByContractNum = () => {
    props.searContrSecOpts(searchPms);
  };

  const inputChange = (fieldName, o) => {
    switch (fieldName) {
      case 'phone':
        searchPms['phone'] = o.value;
        break;
      case 'address':
        searchPms['address'] = o.value;
        break;
      default:
        searchPms[fieldName] = o.value;
    }
    setSearchPms({ ...searchPms });
  };
  const { messages } = props;
  console.log('searchPms ', searchPms);
  return (
    <div>
      <Segment>
        <Form>
          <Grid>
            <Grid.Row>
              <Grid.Column width={5}>
                <Form.Field
                  onChange={(e, o) => inputChange('address', o)}
                  control={Input}
                  label={messages['Form.Address']}
                />
              </Grid.Column>
              <Grid.Column width={5}>
                <Form.Field
                  onChange={(e, o) => inputChange('phone', o)}
                  control={Input}
                  label={messages['Form.PhoneNumber']}
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
