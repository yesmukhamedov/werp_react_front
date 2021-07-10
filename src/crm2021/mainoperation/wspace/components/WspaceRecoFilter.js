import React from 'react';
import { Segment, Form } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';
import { MENU_BY_RECO } from '../wspaceUtil';
import {
  //RECO_CATEGORIES,
  //DEMO_RESULT_OPTIONS,
  getRecoCategoriesOptionsByLanguage,
} from '../../../crmUtil';

export default function WspaceRecoFilter(props) {
  const { filters, menu, messages, locale, demoResults } = props;
  const cats = [
    {
      key: null,
      text: messages['Form.Category'],
      value: null,
    },
  ].concat(getRecoCategoriesOptionsByLanguage(locale));

  const tempDemoResults = [];
  for (const k in demoResults) {
    tempDemoResults.push({
      key: parseInt(k, 10),
      text: demoResults[k],
      value: k,
    });
  }
  const resultOptions = [
    {
      key: null,
      text: messages['Form.Result'],
      value: null,
    },
  ].concat(tempDemoResults);
  return (
    <Segment padded>
      <Form>
        <Form.Group widths="equal">
          <Form.Input
            width={3}
            onChange={(e, d) => props.handleFilter('clientName', menu, d.value)}
            value={filters.clientName || ''}
            fluid
            placeholder={messages['Form.Client']}
          />

          <Form.Select
            width={3}
            options={cats}
            onChange={(e, d) => props.handleFilter('category', menu, d.value)}
            placeholder={messages['Form.Category']}
          />

          {menu === MENU_BY_RECO ? (
            <Form.Select
              width={3}
              options={resultOptions}
              onChange={(e, d) => props.handleFilter('resultId', menu, d.value)}
              placeholder={messages['Form.Result']}
            />
          ) : (
            ''
          )}

          {menu !== MENU_BY_RECO ? (
            <Form.Input
              width={3}
              onChange={(e, d) =>
                props.handleFilter('phoneNumber', menu, d.value)
              }
              value={filters.phoneNumber || ''}
              fluid
              placeholder={messages['Form.MobNumber']}
            />
          ) : (
            ''
          )}
          <Form.Input
            width={3}
            onChange={(e, d) => props.handleFilter('docDate', menu, d.value)}
            value={filters.docDate || ''}
            fluid
            placeholder={messages['Form.Date']}
          />
        </Form.Group>
      </Form>
    </Segment>
  );
}
