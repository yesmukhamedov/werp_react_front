import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import {
  Container,
  Header,
  Grid,
  Segment,
  List,
  Icon,
  Button,
  Tab,
} from 'semantic-ui-react';
import { modifyLoader } from '../../../general/loader/loader_action';
import MmccFin from './mmccFin';
import MmccLogistics from './mmccLogistics';
import MmccContactDetails from './mmccContactDetails';
import MmccBasicInfo from './mmccBasicInfo';
import {
  onSaveContractMmcc,
  changeDynObjMarketing,
} from '../../marketingAction';
import { validateOnSaveMmcc } from '../contractAdditionaComponents/contractValidation';
import browserHistory from '../../../utils/history';
import queryString from 'query-string';

//
import {
  f4FetchConTypeList,
  f4FetchBranches,
  f4ClearAnyObject,
} from '../../../reference/f4/f4_action';

import { moneyInputHanler } from '../../../utils/helpers';

import {
  serviceBA,
  marketingBA,
} from '../contractAdditionaComponents/marketingConstants';

import moment from 'moment';
require('moment/locale/ru');
require('moment/locale/tr');

const Mmcc = props => {
  // function Mmcc01() {

  const emptyContract = {
    bukrs: '',
    branchId: '',
    contractNumber: 0,
    contractTypeId: '',
    contractDate: moment().format('YYYY-MM-DD'),
    contractStatusId: 0,
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
    finBranchId: '',
    legalEntityId: '',
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

  const [contract, setContract] = useState({ ...emptyContract });
  const {
    contractTypeList,
    branches,
    intl: { messages },
  } = props;

  const [serBranches, setSerBranches] = useState({});
  const [finBranches, setFinBranches] = useState({});
  const [contractTypeOpts, setContractTypeOpts] = useState([]);

  const [addrHome, setAddrHome] = useState({});
  const [addrWork, setAddrWork] = useState({});
  const [addrService, setAddrService] = useState({});
  const [ps, setPs] = useState([]);
  const [contractPromoList, setContractPromoList] = useState([]);
  const [isSavingContract, setIsSavingContract] = useState(false);
  const [demoId, setDemoId] = useState('');
  const tcode = 'MMCC';

  // const serviceBA = [5, 6, 9];
  // const marketingBA = [1, 2, 3, 4, 7, 8];

  //componentDidMount
  useEffect(() => {
    props.f4FetchConTypeList();
    props.f4FetchBranches();

    const url = props.location.search;
    const params = queryString.parse(url);

    if (params.demoId) {
      setDemoId(params.demoId);
    }

    //unmount
    return () => {
      props.f4ClearAnyObject('F4_CLEAR_CONTYPE_LIST');
      props.f4ClearAnyObject('F4_CLEAR_BRANCHES');
    };
  }, []);

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

  const onBasicInfoInputChange = (value, fieldName) => {
    // let wa = Object.assign({}, contract);
    if (fieldName === 'bukrs') {
      setContract(prev => {
        return { ...emptyContract, [fieldName]: value };
      });
      setPs([]);
      setContractTypeOpts([]);
      props.changeDynObjMarketing({ priceList: [] });
      props.changeDynObjMarketing({ matnrList: [] });
      props.changeDynObjMarketing({ promoList: [] });
    } else if (fieldName === 'branchId') {
      //get the selected branch
      let waSelectedBranch = {};
      branches
        .filter(item => item.branch_id === value)
        .forEach(item => {
          waSelectedBranch = item;
        });

      //get service branch from the same city
      let serBranchInSameCity = {};
      branches
        .filter(
          item =>
            serviceBA.includes(item.business_area_id) &&
            item.parent_branch_id === waSelectedBranch.parent_branch_id,
        )
        .forEach(item => {
          serBranchInSameCity = item;
        });

      setContract(prev => {
        let wa = { ...emptyContract };
        wa.bukrs = prev.bukrs;
        wa.branchId = value;

        //assign the same branch for fin branch
        wa.finBranchId = value;

        //assign service branch from the same city
        wa.servBranchId = serBranchInSameCity.branch_id;

        //get and assign contract type options
        let waConOptions = contractTypeList
          .filter(
            item =>
              (item.bukrs == wa.bukrs &&
                item.business_area_id == waSelectedBranch.business_area_id) ||
              (item.bukrs == wa.bukrs &&
                item.business_area_id == 4 &&
                waSelectedBranch.branch_id == 210),
          )
          .map(item => {
            return {
              key: item.contract_type_id,
              value: item.contract_type_id,
              text: item.name,
            };
          });

        setPs([]);
        setContractTypeOpts(waConOptions);
        props.changeDynObjMarketing({ priceList: [] });
        props.changeDynObjMarketing({ matnrList: [] });
        props.changeDynObjMarketing({ promoList: [] });
        return wa;
      });
    } else if (fieldName === 'contractTypeId') {
      setContract(prev => {
        return {
          ...prev,
          contractTypeId: value,
          price: '',
          firstPayment: '',
          waers: '',
          priceListId: '',
        };
      });
      setPs([]);
      props.changeDynObjMarketing({ priceList: [] });
      props.changeDynObjMarketing({ matnrList: [] });
      props.changeDynObjMarketing({ promoList: [] });
    } else if (fieldName === 'tradeIn') {
      setContract(prev => {
        return {
          ...prev,
          [fieldName]: value,
          tradeInMatnrListId: '',
          tradeInTovarSerial: '',
          price: '',
          firstPayment: '',
          waers: '',
          priceListId: '',
          tovarSerial: '',
          matnrListId: '',
          refContractId: value.contractId,
          refContractNumber: value.contractNumber,
          refCustomerId: value.customerId,
          refCustomerName: value.customerName,
          paymentSchedule: '',
        };
      });

      setPs([]);
    } else if (fieldName === 'contractDate') {
      setContract(prev => {
        return { ...prev, contractDate: value };
      });
      addMonthToAndAfterPsRows(value, 0);
    } else if (fieldName === 'demoSc') {
      setContract(prev => {
        return { ...prev, demoSc: value.staffId, demoScName: value.fio };
      });
    } else if (fieldName === 'dealer') {
      setContract(prev => {
        return { ...prev, dealer: value.staffId, dealerName: value.fio };
      });
    } else if (fieldName === 'collector') {
      setContract(prev => {
        return { ...prev, collector: value.staffId, collectorName: value.fio };
      });
    } else if (fieldName === 'demoScRemove') {
      setContract(prev => {
        return { ...prev, demoSc: '', demoScName: '' };
      });
    } else if (fieldName === 'dealerRemove') {
      setContract(prev => {
        props.changeDynObjMarketing({ matnrList: [] });
        return {
          ...prev,
          dealer: '',
          dealerName: '',
          tovarSerial: '',
          matnrListId: '',
        };
      });
    } else if (fieldName === 'collectorRemove') {
      setContract(prev => {
        return { ...prev, collector: '', collectorName: '' };
      });
    } else if (fieldName === 'customer') {
      setContract(prev => {
        return { ...prev, customerId: value.id, customerName: value.fullFIO };
      });
    } else if (fieldName === 'customerRemove') {
      setContract(prev => {
        return {
          ...prev,
          customerId: '',
          customerName: '',
          addrHomeId: '',
          addrWorkId: '',
          addrServiceId: '',
        };
      });

      //removing customer addresses
      setAddrHome({});
      setAddrWork({});
      setAddrService({});
    } else if (fieldName === 'refContractId') {
      setContract(prev => {
        if (prev.tradeIn === 1) return { ...prev };
        else
          return {
            ...prev,
            refContractId: value.contractId,
            refContractNumber: value.contractNumber,
            refCustomerId: value.customerId,
            refCustomerName: value.customerName,
          };
      });
    } else if (fieldName === 'refContractIdRemove') {
      setContract(prev => {
        return {
          ...prev,
          refContractId: '',
          refContractNumber: '',
          refCustomerId: '',
          refCustomerName: '',
        };
      });
    } else
      setContract(prev => {
        return { ...prev, [fieldName]: value };
      });

    // console.log(wa,'wa');
  };

  const onConDetInputChange = (value, fieldName) => {
    if (fieldName === 'addrHomeId') {
      setContract(prev => {
        return { ...prev, addrHomeId: value.addr_id };
      });
      setAddrHome(value);
    } else if (fieldName === 'addrHomeIdRemove') {
      setContract(prev => {
        return { ...prev, addrHomeId: '' };
      });
      setAddrHome({});
    } else if (fieldName === 'addrWorkId') {
      setContract(prev => {
        return { ...prev, addrWorkId: value.addr_id };
      });
      setAddrWork(value);
    } else if (fieldName === 'addrWorkIdRemove') {
      setContract(prev => {
        return { ...prev, addrWorkId: '' };
      });
      setAddrWork({});
    } else if (fieldName === 'addrServiceId') {
      setContract(prev => {
        return { ...prev, addrServiceId: value.addr_id };
      });
      setAddrService(value);
    } else if (fieldName === 'addrServiceIdRemove') {
      setContract(prev => {
        return { ...prev, addrServiceId: '' };
      });
      setAddrService({});
    }
  };

  const onFinInputChange = (value, fieldName, id) => {
    // console.log(value, fieldName, id)
    // let wa = Object.assign({}, contract);
    if (fieldName === 'price') {
      setContract(prev => {
        let ps = [
          {
            paymentScheduleId: 0,
            sum2: value.firstPayment,
            isFirstPayment: 1,
            paymentDate: prev.contractDate,
          },
        ];
        let month = value.month;

        let lastPsId = 1;
        let lastPaymentDate = prev.contractDate;

        // console.log(month,'month')
        for (let i = 1; i <= month; i++) {
          // console.log(i,'i')

          let date = moment(lastPaymentDate, 'YYYY-MM-DD')
            .add(1, 'M')
            .format('YYYY-MM-DD');

          let psRow = {
            paymentScheduleId: lastPsId,
            sum2: value.remain / value.month,
            isFirstPayment: 0,
            paymentDate: date,
          };

          // console.log(wa,'wa')
          // console.log(lastPsId,lastPaymentDate,'lastPsId,lastPaymentDate')
          ps.push(psRow);

          lastPsId += 1;
          lastPaymentDate = date;
        }
        setPs(ps);

        return {
          ...prev,
          price: value.price,
          firstPayment: value.firstPayment,
          waers: value.waers,
          priceListId: value.priceListId,
          paymentSchedule: month,
          bankPartnerId: value.bankPartnerId,
        };
      });
    } else if (fieldName === 'dealerSubtract') {
      setContract(prev => {
        return { ...prev, dealerSubtract: moneyInputHanler(value, 0) };
      });
      // console.log(newVal,'newVal');
    } else if (fieldName === 'sum2') {
      setPs(prev => {
        const newVal = moneyInputHanler(value, 0);
        const idx = prev.findIndex(item => item.paymentScheduleId === id);
        const oldItem = prev[idx];
        const newItem = { ...oldItem, sum2: newVal };
        const newArray = [
          ...prev.slice(0, idx),
          newItem,
          ...prev.slice(idx + 1),
        ];

        return newArray;
      });
      if (id === 0) {
        setContract(prev => {
          const newVal = moneyInputHanler(value, 0);
          return { ...prev, firstPayment: newVal };
        });
      }
    } else if (fieldName === 'paymentDate') {
      const idx = ps.findIndex(item => item.paymentScheduleId === id);
      addMonthToAndAfterPsRows(value, idx);
    } else if (fieldName === 'legalEntityId') {
      setContract(prev => {
        return { ...prev, legalEntityId: value };
      });
      // console.log(newVal,'newVal');
    } else
      setContract(prev => {
        return { ...prev, [fieldName]: value };
      });
  };

  const addMonthToAndAfterPsRows = (paymentDate, idx) => {
    if (ps && ps.length > 0) {
      setPs(prev => {
        const newArray = JSON.parse(JSON.stringify(prev));
        let lastPaymentDate = paymentDate;
        newArray[idx].paymentDate = lastPaymentDate;
        let addMonth = 0;

        for (let nextIdx = idx + 1; nextIdx < ps.length; nextIdx++) {
          addMonth += 1;
          newArray[nextIdx].paymentDate = moment(lastPaymentDate, 'YYYY-MM-DD')
            .add(addMonth, 'M')
            .format('YYYY-MM-DD');
        }

        // console.log(newArray,'ps')
        return newArray;
      });
    }
  };

  const onLogisticsInputChange = (value, fieldName) => {
    // console.log(value, fieldName)
    // let wa = Object.assign({}, contract);

    if (fieldName === 'tovarSerial') {
      setContract(prev => {
        return {
          ...prev,
          tovarSerial: value.tovarSerial,
          matnrListId: value.matnrListId,
        };
      });
    } else if (fieldName === 'removeTovarSerial') {
      setContract(prev => {
        return { ...prev, tovarSerial: '', matnrListId: '' };
      });
    } else if (fieldName === 'promo') {
      setContractPromoList(prev => {
        return [...value];
      });
    } else if (fieldName === 'removePromo') {
      setContractPromoList(prev => {
        const idx = prev.findIndex(item => item.id === value);
        const newArray = [...prev.slice(0, idx), ...prev.slice(idx + 1)];
        return newArray;
      });
    } else if (fieldName === 'tradeInTovarSerial') {
      setContract(prev => {
        return {
          ...prev,
          tradeInTovarSerial: value.tovarSerial,
          tradeInMatnrListId: value.matnrListId,
        };
      });
    } else if (fieldName === 'removeTradeInTovarSerial') {
      setContract(prev => {
        return { ...prev, tradeInTovarSerial: '', tradeInTovarSerial: '' };
      });
    } else
      setContract(prev => {
        return { ...prev, [fieldName]: value };
      });
  };

  const redirectToMmcv = contractNumber => {
    browserHistory.push(
      `/marketing/mainoperation/mmcv?contractNumber=${contractNumber}`,
    );
  };
  const onSave = event => {
    event.preventDefault();
    props.modifyLoader(true);
    let errors = [];
    errors = validateOnSaveMmcc();
    if (errors === null || errors === undefined || errors.length === 0) {
      props.onSaveContractMmcc(
        'marketing/contract/mmcc/saveContract',
        {
          contract,
          ps,
          contractPromoList,
        },
        { tcode, demoId },
        setIsSavingContract,
        redirectToMmcv,
      );
    } else props.modifyLoader(false);
  };

  const panes = [
    {
      menuItem: {
        key: 'MmccContactDetails',
        icon: 'address card',
        content: messages['contactDetails'],
      },
      pane: (
        <Tab.Pane key={1}>
          <MmccContactDetails
            addrHome={addrHome}
            addrWork={addrWork}
            addrService={addrService}
            contract={contract}
            onConDetInputChange={onConDetInputChange}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: { key: 'MmccFin', icon: 'money', content: messages['price'] },
      pane: (
        <Tab.Pane key={2}>
          <MmccFin
            contract={contract}
            onFinInputChange={onFinInputChange}
            tcode={tcode}
            ps={ps}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: 'MmccLogistics',
        icon: 'shopping cart',
        content: messages['goods'],
      },
      pane: (
        <Tab.Pane key={3}>
          <MmccLogistics
            onLogisticsInputChange={onLogisticsInputChange}
            contractPromoList={contractPromoList}
            tcode={tcode}
            contract={contract}
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
        {messages['transNameMmcc']}
      </Header>

      <Segment padded size="small">
        <List horizontal>
          <List.Item>
            <List.Content>
              <Button
                icon
                labelPosition="left"
                primary
                size="small"
                onClick={onSave}
              >
                <Icon name="save" size="large" /> {messages['save']}
              </Button>
            </List.Content>
          </List.Item>
        </List>
      </Segment>

      {/* <Rfadd01 customerId={contract.customerId} customerName={contract.customerName}/> */}
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={16} computer={5}>
            <MmccBasicInfo
              contract={contract}
              serBranches={serBranches}
              finBranches={finBranches}
              contractTypeOpts={contractTypeOpts}
              onBasicInfoInputChange={onBasicInfoInputChange}
            />
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

// function onInputChange(value, fieldName) {
//   const wa = Object.assign({}, contract);
//   wa[fieldName] = value;
//   setContract(wa);
// }

function mapStateToProps(state) {
  // console.log(state, 'state');
  return {
    language: state.locales.lang,
    contractTypeList: state.f4.contractTypeList,
    branches: state.f4.branches,
  };
}

export default connect(mapStateToProps, {
  modifyLoader,
  onSaveContractMmcc,
  changeDynObjMarketing,
  //reference
  f4FetchConTypeList,
  f4FetchBranches,
  f4ClearAnyObject,
})(injectIntl(Mmcc));
