import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import {
  Container,
  Header,
  Grid,
  Segment,
  Table,
  Icon,
  Dropdown,
  Input,
  Tab,
  Label,
} from 'semantic-ui-react';
import { modifyLoader } from '../../../general/loader/loader_action';
import OutputErrors from '../../../general/error/outputErrors';
import MmcrFin from './mmcrFin';
import MmcrLogistics from './mmcrLogistics';
import MmcrContactDetails from './mmcrContactDetails';
import MmcrBasicInfo from './mmcrBasicInfo';
import McrExtraInfo from './mmcrExtraInfo';
import queryString from 'query-string';

//
import {
  f4FetchConTypeList,
  f4FetchBranches,
  f4ClearAnyObject,
} from '../../../reference/f4/f4_action';

import {
  handleFocus,
  moneyFormat,
  moneyInputHanler,
  stringYYYYMMDDToMoment,
  momentYYYYMMDDToString,
} from '../../../utils/helpers';

import moment from 'moment';
require('moment/locale/ru');
require('moment/locale/tr');

const Mmcr = props => {
  const emptyContract = {
    bukrs: '',
    bukrsName: '',
    branchId: '',
    branchName: '',
    contractNumber: 0,
    contractTypeId: '',
    contractTypeName: '',
    contractDate: '',
    contractStatusId: 0,
    contractStatusName: '',
    paymentSchedule: '',
    priceListId: '',
    tovarSerial: '',
    demoSc: '',
    demoScName: '',
    dealer: '',
    dealerName: '',
    collector: '',
    collectorName: '',
    fitter: '',
    customerId: '',
    customerName: '',
    paid: '',
    price: '',
    firstPayment: '',
    matnrListId: '',
    matnrReleaseDate: '',
    createdBy: '',
    createdDate: '',
    updatedBy: '',
    updatedDate: '',
    cancelDate: '',
    newContractDate: '',
    refContractId: '',
    servBranchId: '',
    servBranchName: '',
    finBranchId: '',
    finBranchName: '',
    legalEntityId: '',
    legalEntityName: '',
    leInfo: '',
    mtConfirmed: '',
    mtConfirmedby: '',
    markedType: '',
    dealerSubtract: '',
    discountFromRef: '',
    info: '',
    bankPartnerId: '',
    awkey: '',
    warStart: '',
    contractBarcode: '',
    closeDate: '',
    lastState: '',
    warranty: '',
    waers: '',
    oldId: '',
    oldSn: '',
    rate: '',
    skidkaVol: '',
    tovarCategory: '',
    addrHomeId: '',
    addrWorkId: '',
    addrServiceId: '',
    tradeIn: 0,
    tradeInMatnrListId: '',
    tradeInTovarSerial: '',
  };

  const [addrHome, setAddrHome] = useState({});
  const [addrWork, setAddrWork] = useState({});
  const [addrService, setAddrService] = useState({});
  const [ps, setPs] = useState([]);
  const [contractPromoList, setContractPromoList] = useState([]);
  const [contract, setContract] = useState({ ...emptyContract });
  const [urlContractNumber, setUrlContractNumber] = useState('');

  const {
    mmcr,
    intl: { messages },
  } = props;

  // const [ps, setPs] = useState([]);
  // const [contractPromoList, setContractPromoList] = useState([]);

  //componentDidMount
  useEffect(() => {
    const url = props.location.search;
    const params = queryString.parse(url);

    if (params.contractNumber) {
      setUrlContractNumber(params.contractNumber);
    }
    //unmount
    return () => {};
  }, []);

  //componentDidMount
  useEffect(() => {
    if (mmcr && mmcr.contract) setContract({ ...mmcr.contract });
    if (mmcr && mmcr.ps) setPs([...mmcr.ps]);
    if (mmcr && mmcr.contractPromoList)
      setContractPromoList([...mmcr.contractPromoList]);
    if (mmcr && mmcr.addrHome) setAddrHome({ ...mmcr.addrHome });
    if (mmcr && mmcr.addrService) setAddrService({ ...mmcr.addrService });
    if (mmcr && mmcr.addrWork) setAddrWork({ ...mmcr.addrWork });
  }, [mmcr]);

  const panes = [
    {
      menuItem: {
        key: 'MmcrContactDetails',
        icon: 'address card',
        content: messages['contactDetails'],
      },
      pane: (
        <Tab.Pane key={1}>
          <MmcrContactDetails
            addrHome={addrHome}
            addrWork={addrWork}
            addrService={addrService}
            contract={contract}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: 'MmcrFin', icon: 'money', content: messages['price'] },
      pane: (
        <Tab.Pane key={2}>
          <MmcrFin tcode={'MMCR'} contract={contract} ps={ps} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: 'MmcrLogistics',
        icon: 'shopping cart',
        content: messages['goods'],
      },
      pane: (
        <Tab.Pane key={3}>
          <MmcrLogistics
            tcode={'MMCR'}
            contract={contract}
            contractPromoList={contractPromoList}
          />
        </Tab.Pane>
      ),
    },
  ];

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
        {messages['transNameMmcr']}
      </Header>

      {/* <Rfadd01 customerId={contract.customerId} customerName={contract.customerName}/> */}
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={16} computer={5}>
            <MmcrBasicInfo
              contract={contract}
              urlContractNumber={urlContractNumber}
              tcode="MMCR"
            />
            <McrExtraInfo contract={contract} tcode="MMCR" />
          </Grid.Column>
          <Grid.Column mobile={16} tablet={8} computer={8}>
            <Tab
              menu={{ attached: true, tabular: false, pointing: true }}
              panes={panes}
              renderActiveOnly={false}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

// function onInputChange(value, stateFieldName) {
//   const wa = Object.assign({}, contract);
//   wa[stateFieldName] = value;
//   setContract(wa);
// }

function mapStateToProps(state) {
  // console.log(state, 'state');
  return {
    language: state.locales.lang,
    contractTypeList: state.f4.contractTypeList,
    branches: state.f4.branches,
    mmcr: state.marketing.dynamicObject.mmcr,
    // contract: state.marketing.dynamicObject.mmcr
    //          ?state.marketing.dynamicObject.mmcr.contract
    //          ?state.marketing.dynamicObject.mmcr.contract:'':'',
    // ps: state.marketing.dynamicObject.mmcr
    //          ?state.marketing.dynamicObject.mmcr.ps
    //          ?state.marketing.dynamicObject.mmcr.ps:'':'',
    // addrHome: state.marketing.dynamicObject.mmcr
    //          ?state.marketing.dynamicObject.mmcr.addrHome
    //          ?state.marketing.dynamicObject.mmcr.addrHome:'':'',
    // addrService: state.marketing.dynamicObject.mmcr
    //          ?state.marketing.dynamicObject.mmcr.addrService
    //          ?state.marketing.dynamicObject.mmcr.addrService:'':'',
    // addrWork: state.marketing.dynamicObject.mmcr
    //          ?state.marketing.dynamicObject.mmcr.addrWork
    //          ?state.marketing.dynamicObject.mmcr.addrWork:'':'',
    // ps: state.marketing.dynamicObject.mmcr.ps,
    // addrHome: state.marketing.dynamicObject.mmcr.addrHome,
    // addrService: state.marketing.dynamicObject.mmcr.addrService,
    // addrWork: state.marketing.dynamicObject.mmcr.addrWork,
  };
}

export default connect(
  mapStateToProps,
  {
    modifyLoader,

    //reference
    f4FetchConTypeList,
    f4FetchBranches,
    f4ClearAnyObject,
  },
)(injectIntl(Mmcr));
