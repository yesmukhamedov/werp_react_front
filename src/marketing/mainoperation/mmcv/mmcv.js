import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { Container, Header, Grid, Tab } from 'semantic-ui-react';
import MmcvFin from './mmcvFin';
import MmcvLogistics from './mmcvLogistics';
import MmcvContactDetails from './mmcvContactDetails';
import MmcvBasicInfo from './mmcvBasicInfo';
import MmcvExtraInfo from './mmcvExtraInfo';
import MmcvContractHistory from './mmcvContractHistory';
import MmcvContractCRMHistory from './mmcvContractCRMHistory';
import MmcvSourceDocs from './mmcvSourceDocs';
import queryString from 'query-string';

const Mmcv = props => {
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
    info2: '',
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
  const [contractCRMHistory, setContractCRMHistory] = useState([]);
  const [urlContractNumber, setUrlContractNumber] = useState('');
  const [phoneList, setPhoneList] = useState([]);
  const [contractDescriptionList, setContractDescriptionList] = useState([]);

  const {
    mmcv,
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

  //componentWillRecieveProps
  useEffect(() => {
    if (mmcv && mmcv.contract) setContract({ ...mmcv.contract });
    if (mmcv && mmcv.ps) setPs([...mmcv.ps]);
    if (mmcv && mmcv.contractPromoList)
      setContractPromoList([...mmcv.contractPromoList]);
    if (mmcv && mmcv.addrHome) setAddrHome({ ...mmcv.addrHome });
    if (mmcv && mmcv.addrService) setAddrService({ ...mmcv.addrService });
    if (mmcv && mmcv.addrWork) setAddrWork({ ...mmcv.addrWork });
    if (mmcv && mmcv.contractHistory)
      setContractHistory([...mmcv.contractHistory]);
    if (mmcv && mmcv.contractCRMHistory)
      setContractCRMHistory([...mmcv.contractCRMHistory]);

    if (mmcv && mmcv.sourceDocs) {
      setSourceDocs([...mmcv.sourceDocs]);
      setTotalSourceDoscPayment(mmcv.totalSourceDoscPayment);
    }
    if (mmcv && mmcv.phoneList) setPhoneList([...mmcv.phoneList]);

    if (mmcv && mmcv.contractDescriptionList)
      setContractDescriptionList([...mmcv.contractDescriptionList]);
  }, [mmcv]);

  const panes = [
    {
      menuItem: {
        key: 'MmcvContactDetails',
        icon: 'address card',
        content: messages['contactDetails'],
      },
      pane: (
        <Tab.Pane key={1}>
          <MmcvContactDetails
            addrHome={addrHome}
            addrWork={addrWork}
            addrService={addrService}
            phoneList={phoneList}
            contract={contract}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: 'MmcvFin', icon: 'money', content: messages['price'] },
      pane: (
        <Tab.Pane key={2}>
          <MmcvFin tcode={'MMCV'} contract={contract} ps={ps} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: 'MmcvLogistics',
        icon: 'shopping cart',
        content: messages['goods'],
      },
      pane: (
        <Tab.Pane key={3}>
          <MmcvLogistics
            tcode={'MMCV'}
            contract={contract}
            contractPromoList={contractPromoList}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: 'MmcvSourceDocs',
        icon: 'file',
        content: messages['sourceDoucments-Mid'],
      },
      pane: (
        <Tab.Pane key={4}>
          <MmcvSourceDocs
            tcode={'MMCV'}
            sourceDocs={sourceDocs}
            totalSourceDoscPayment={totalSourceDoscPayment}
            waers={contract.waers}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: 'MmcvContractHistory',
        icon: 'history',
        content: messages['actionHistory'],
      },
      pane: (
        <Tab.Pane key={5}>
          <MmcvContractHistory
            tcode={'MMCV'}
            contractHistory={contractHistory}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: 'MmcvContractCRMHistory',
        icon: 'history',
        content: messages['serviceHistory'],
      },
      pane: (
        <Tab.Pane key={6}>
          <MmcvContractCRMHistory
            tcode={'MMCV'}
            contractCRMHistory={contractCRMHistory}
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
        {messages['transNameMmcv']}
      </Header>

      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={5} computer={5}>
            <MmcvBasicInfo
              contract={contract}
              urlContractNumber={urlContractNumber}
              tcode="MMCV"
            />
            <MmcvExtraInfo
              contract={contract}
              tcode="MMCV"
              contractDescriptionList={contractDescriptionList}
            />
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
    mmcv: state.marketing.dynamicObject.mmcv,
  };
}

export default connect(mapStateToProps, {
  //reference
})(injectIntl(Mmcv));
