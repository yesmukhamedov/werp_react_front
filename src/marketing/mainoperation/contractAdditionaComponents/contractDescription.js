import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Table, List } from 'semantic-ui-react';

const ContractDescription = props => {
  const {
    contractDescriptionList = [],
    intl: { messages },
  } = props;

  return (
    <div>
      {messages['H__COMMENTS']}
      <List verticalAlign="middle" celled size={'large'}>
        {contractDescriptionList.map(item => {
          return (
            <List.Item key={item.id}>
              <List.Content>
                <List.Header as="a">
                  {item.username} {item.descriptionDateDDMMYYYY}
                </List.Header>
                <List.Description>{item.description}</List.Description>
              </List.Content>
            </List.Item>
          );
        })}
      </List>
    </div>
  );
};

function mapStateToProps(state) {
  // console.log(state,'state')
  return {
    language: state.locales.lang,
  };
}

export default connect(mapStateToProps, {})(injectIntl(ContractDescription));
