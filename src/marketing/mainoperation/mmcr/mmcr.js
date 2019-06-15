import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { Container, Header, Grid, Tab } from 'semantic-ui-react';
import MmcrFin from './mmcrFin';
import MmcrLogistics from './mmcrLogistics';
import MmcrContactDetails from './mmcrContactDetails';
import MmcrBasicInfo from './mmcrBasicInfo';
import McrExtraInfo from './mmcrExtraInfo';
import MmcrContractHistory from './mmcrContractHistory';
import MmcrSourceDocs from './mmcrSourceDocs';
import queryString from 'query-string';

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
  const [totalSourceDoscPayment, setTotalSourceDoscPayment] = useState(0);
  const [sourceDocs, setSourceDocs] = useState([]);
  const [contractHistory, setContractHistory] = useState([]);
  const [urlContractNumber, setUrlContractNumber] = useState('');

  const {
    mmcr,
    intl: { messages },
  } = props;

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
    if (mmcr && mmcr.contractHistory)
      setContractHistory([...mmcr.contractHistory]);
    if (mmcr && mmcr.sourceDocs) {
      setSourceDocs([...mmcr.sourceDocs]);
      setTotalSourceDoscPayment(mmcr.totalSourceDoscPayment);
    }
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
    {
      menuItem: {
        key: 'MmcrSourceDocs',
        icon: 'file',
        content: messages['sourceDoucments-Mid'],
      },
      pane: (
        <Tab.Pane key={4}>
          <MmcrSourceDocs
            tcode={'MMCR'}
            sourceDocs={sourceDocs}
            totalSourceDoscPayment={totalSourceDoscPayment}
            waers={contract.waers}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: 'MmcrContractHistory',
        icon: 'history',
        content: messages['actionHistry'],
      },
      pane: (
        <Tab.Pane key={5}>
          <MmcrContractHistory
            tcode={'MMCR'}
            contractHistory={contractHistory}
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

      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={5} computer={5}>
            <MmcrBasicInfo
              contract={contract}
              urlContractNumber={urlContractNumber}
              tcode="MMCR"
            />
            <McrExtraInfo contract={contract} tcode="MMCR" />
          </Grid.Column>
          <Grid.Column mobile={16} tablet={11} computer={11}>
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

function mapStateToProps(state) {
  // console.log(state, 'state');
  return {
    language: state.locales.lang,
    mmcr: state.marketing.dynamicObject.mmcr,
  };
}

export default connect(
  mapStateToProps,
  {
    //reference
  },
)(injectIntl(Mmcr));
