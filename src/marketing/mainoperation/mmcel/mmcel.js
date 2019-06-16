//Marketing mainoperation contract edit logistic
//mmcel
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  Container,
  Header,
  Table,
  Button,
  Icon,
  Input,
} from 'semantic-ui-react';
import queryString from 'query-string';
import { handleFocus } from '../../../utils/helpers';
import { fetchDynObjMarketing } from '../../marketingAction';

const Mmcel = props => {
  const emptyContract = {
    info: '',
    info2: '',
  };

  const tcode = 'MMCEL';

  const [contract, setContract] = useState({ ...emptyContract });
  const [contractNumberSearch, setContractNumberSearch] = useState('');
  const [isLoadingContract, setIsLoadingContract] = useState(false);

  const {
    mmcel,
    intl: { messages },
    language,
  } = props;

  //componentDidMount
  useEffect(() => {
    const url = props.location.search;
    const params = queryString.parse(url);

    if (params.contractNumber) {
      setContractNumberSearch(params.contractNumber);
      onSearchContract(params.contractNumber);
    }
    //unmount
    return () => {};
  }, []);

  //componentWillRecieveProps
  useEffect(() => {
    if (mmcel && mmcel.contract) setContract({ ...mmcel.contract });
  }, [mmcel]);

  const onSearchContract = contractNumber => {
    props.fetchDynObjMarketing(
      'marketing/contract/mmcel/fetchContract',
      { contractNumber, tcode },
      bool => setIsLoadingContract(bool),
    );
  };

  return (
    <Container
      fluid
      style={{
        marginTop: '2em',
        marginBottom: '2em',
        paddingLeft: '2em',
        paddingRight: '2em',
      }}
    >
      <Header as="h2" block>
        {messages['transNameMmcei']}
      </Header>
    </Container>
  );
};

function mapStateToProps(state) {
  // console.log(state, 'state');
  return {
    language: state.locales.lang,
    mmcel: state.marketing.dynamicObject.mmcel,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchDynObjMarketing,
  },
)(injectIntl(Mmcel));
