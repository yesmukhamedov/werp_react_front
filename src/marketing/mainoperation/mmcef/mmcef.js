//Marketing mainoperation contract edit finance
//mmcef
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Container, Header, Grid } from 'semantic-ui-react';
import queryString from 'query-string';
import { moneyInputHanler } from '../../../utils/helpers';
import { fetchDynObjMarketing, onSaveMmcTrans } from '../../marketingAction';

import {
  serviceBA,
  marketingBA,
} from '../contractAdditionaComponents/marketingConstants';

import {
  f4FetchBranches,
  f4ClearAnyObject,
  f4FetchSubCompanies,
  f4FetchConStatusList,
} from '../../../reference/f4/f4_action';

import MmcefBasicInfo from './mmcefBasicInfo';
import MmcefModifyData from './mmcefModifyData';

const Mmcef = props => {
  const emptyContract = {
    contractNumber: '',
    bukrs: '',
    bukrsName: '',
    branchId: '',
    branchName: '',
    contractTypeId: '',
    contractTypeName: '',
    customerId: '',
    customerName: '',
    finBranchId: '',
    servBranchId: '',
    legalEntityId: '',
    dealerSubtract: '',
    priceListId: '',
    price: '',
    waers: '',
    paid: '',
    paymentSchedule: '',
    dealer: '',
    dealerName: '',
    demoSc: '',
    demoScName: '',
    collector: '',
    collectorName: '',
    firstPayment: '',
    awkey: '',
    contractStatusId: '',
    refContractId: '',
    refContractNumber: '',
    refCustomerId: '',
    refCustomerName: '',
  };

  const tcode = 'MMCEF';

  const [contract, setContract] = useState({ ...emptyContract });
  const [newContract, setNewContract] = useState({ ...emptyContract });

  const [ps, setPs] = useState([]);
  const [newPs, setNewPs] = useState([]);
  const [isSavingContract, setIsSavingContract] = useState(false);
  const [serBranches, setSerBranches] = useState({});
  const [finBranches, setFinBranches] = useState({});
  const [subCompaniesOptions, setSubCompaniesOptions] = useState([]);
  const [conStatusOptions, setConStatusOptions] = useState([]);
  const [urlContractNumber, setUrlContractNumber] = useState('');

  const [modifiedField, setModifiedField] = useState('');

  const {
    mmcef,
    branches = [],
    subCompanies = [],
    contractStatusList = [],
    companyOptions = [],
    branchOptions = [],
    intl: { messages },
    language,
  } = props;

  //componentDidMount
  useEffect(() => {
    const url = props.location.search;
    const params = queryString.parse(url);
    props.f4FetchBranches();
    //get Sub companies
    props.f4FetchSubCompanies();
    props.f4FetchConStatusList();

    if (params.contractNumber) {
      setUrlContractNumber(params.contractNumber);
    }
    //unmount
    return () => {
      // props.f4ClearAnyObject('F4_CLEAR_BRANCHES');
    };
  }, []);

  //componentWillRecieveProps
  useEffect(() => {
    if (mmcef && mmcef.contract) {
      setContract({ ...mmcef.contract });
      setNewContract({ ...mmcef.contract });

      if (mmcef.ps) {
        setPs([...mmcef.ps]);
        setNewPs([...mmcef.ps]);
      }
    }
  }, [mmcef]);

  //componentWillRecieveProps
  useEffect(() => {
    if (mmcef && mmcef.contract) {
      //make Sub companies options
      if (
        mmcef.contract.bukrs &&
        mmcef.contract.bukrs.length === 4 &&
        subCompanies &&
        subCompanies.length > 0 &&
        mmcef.contract.branchId &&
        mmcef.contract.branchId > 0
      ) {
        let waSubCompaniesOptions = subCompanies
          .filter(item => item.bukrs === mmcef.contract.bukrs)
          .sort((a, b) => (a.nameRu > b.nameRu ? 1 : -1))
          .map(item => {
            return {
              key: item.id,
              value: item.id,
              text: item.nameRu,
            };
          });

        setSubCompaniesOptions(waSubCompaniesOptions);
      }
    }
  }, [mmcef, subCompanies]);

  //componentWillRecieveProps
  useEffect(() => {
    //make Contract status options
    if (contractStatusList && contractStatusList.length > 0) {
      let waConStatusOptions = contractStatusList
        .sort((a, b) => (a[language] > b[language] ? 1 : -1))
        .map(item => {
          return {
            key: item.contract_status_id,
            value: item.contract_status_id,
            text: item[language],
          };
        });

      setConStatusOptions(waConStatusOptions);
    }
  }, [contractStatusList]);

  //componentWillRecieveProps
  useEffect(() => {
    let waSerBranches = {};
    let waFinBranches = {};

    //getting all branches and making fin branch options and service branch options
    function optFunction(item) {
      let option = {
        key: item.branch_id,
        value: item.branch_id,
        text: item.text45,
      };
      if (serviceBA.includes(item.business_area_id)) {
        if (!waSerBranches[item.bukrs]) {
          waSerBranches[item.bukrs] = [];
        }
        waSerBranches[item.bukrs].push(option);
      }
      if (marketingBA.includes(item.business_area_id)) {
        if (!waFinBranches[item.bukrs]) {
          waFinBranches[item.bukrs] = [];
        }
        waFinBranches[item.bukrs].push(option);
      }
    }

    branches.forEach(optFunction);
    setSerBranches(waSerBranches);
    setFinBranches(waFinBranches);
  }, [branches]);

  const onInputChange = (value, fieldName, posId) => {
    let compareField = fieldName;
    if (fieldName === 'demoScRemove') compareField = 'demoSc';
    if (fieldName === 'dealerRemove') compareField = 'dealer';
    if (fieldName === 'collectorRemove') compareField = 'collector';
    if (fieldName === 'refContractIdRemove') compareField = 'refContractId';
    if (fieldName === 'price') compareField = 'priceListId';

    if (modifiedField === '' || modifiedField === compareField) {
      setNewContract(prev => {
        let waNewContract = {};

        if (fieldName === 'demoSc') {
          waNewContract = {
            ...prev,
            demoSc: value.staffId,
            demoScName: value.fio,
          };
        } else if (fieldName === 'dealer') {
          waNewContract = {
            ...prev,
            dealer: value.staffId,
            dealerName: value.fio,
          };
        } else if (fieldName === 'collector') {
          waNewContract = {
            ...prev,
            collector: value.staffId,
            collectorName: value.fio,
          };
        } else if (fieldName === 'demoScRemove') {
          waNewContract = { ...prev, demoSc: '', demoScName: '' };
        } else if (fieldName === 'dealerRemove') {
          waNewContract = { ...prev, dealer: '', dealerName: '' };
        } else if (fieldName === 'collectorRemove') {
          waNewContract = { ...prev, collector: '', collectorName: '' };
        } else if (fieldName === 'dealerSubtract') {
          waNewContract = {
            ...prev,
            dealerSubtract: Number(moneyInputHanler(value, 0))
              ? Number(moneyInputHanler(value, 0))
              : 0,
          };
        } else if (fieldName === 'refContractId') {
          waNewContract = {
            ...prev,
            refContractId: value.contractId,
            refContractNumber: value.contractNumber,
            refCustomerId: value.customerId,
            refCustomerName: value.customerName,
          };
        } else if (fieldName === 'refContractIdRemove') {
          waNewContract = {
            ...prev,
            refContractId: '',
            refContractNumber: '',
            refCustomerId: '',
            refCustomerName: '',
          };
        } else if (fieldName === 'price') {
          waNewContract = {
            ...prev,
            priceListId: value.priceListId,
            price: value.price,
          };
        } else {
          waNewContract = { ...prev, [fieldName]: value };
        }

        if (
          contract &&
          contract.contractNumber &&
          contract[compareField] !== waNewContract[compareField]
        ) {
          setModifiedField(compareField);
        } else setModifiedField('');

        // console.log(contract,waNewContract)
        return waNewContract;
      });
    }
  };

  const onSave = () => {
    props.onSaveMmcTrans(
      'marketing/contract/mmcef/saveContract',
      { contract, newContract },
      { tcode },
      setIsSavingContract,
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
        {messages['transNameMmcef']}
      </Header>
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={5} computer={5}>
            <MmcefBasicInfo
              contract={contract}
              urlContractNumber={urlContractNumber}
            />
          </Grid.Column>
          <Grid.Column mobile={16} tablet={11} computer={11}>
            <MmcefModifyData
              contract={contract}
              newContract={newContract}
              newPs={newPs}
              isSavingContract={isSavingContract}
              serBranches={serBranches}
              finBranches={finBranches}
              subCompaniesOptions={subCompaniesOptions}
              conStatusOptions={conStatusOptions}
              modifiedField={modifiedField}
              companyOptions={companyOptions}
              branchOptions={branchOptions}
              onInputChange={onInputChange}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

function mapStateToProps(state) {
  // console.log(state, 'state');
  return {
    language: state.locales.lang,
    mmcef: state.marketing.dynamicObject.mmcef,
    branches: state.f4.branches,
    subCompanies: state.f4.subCompanies,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsMarketing,
    contractStatusList: state.f4.contractStatusList,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchDynObjMarketing,
    onSaveMmcTrans,
    f4FetchBranches,
    f4ClearAnyObject,
    f4FetchSubCompanies,
    f4FetchConStatusList,
  },
)(injectIntl(Mmcef));
