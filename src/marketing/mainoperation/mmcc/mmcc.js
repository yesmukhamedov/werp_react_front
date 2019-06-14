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
import MmccFin from './mmccFin';
import MmccLogistics from './mmccLogistics';
import MmccContactDetails from './mmccContactDetails';
import MmccBasicInfo from './mmccBasicInfo';

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

  const serviceBA = [5, 6, 9];
  const marketingBA = [1, 2, 3, 4, 7, 8];

  //componentDidMount
  useEffect(() => {
    props.f4FetchConTypeList();
    props.f4FetchBranches();
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

  const onBasicInfoInputChange = (value, stateFieldName) => {
    // let wa = Object.assign({}, contract);
    if (stateFieldName === 'bukrs') {
      setContract(prev => {
        return { ...emptyContract, [stateFieldName]: value };
      });
    } else if (stateFieldName === 'branchId') {
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
              item.bukrs == wa.bukrs &&
              item.business_area_id == waSelectedBranch.business_area_id,
          )
          .map(item => {
            return {
              key: item.contract_type_id,
              value: item.contract_type_id,
              text: item.name,
            };
          });

        setContractTypeOpts(waConOptions);
        return wa;
      });
    } else if (stateFieldName === 'contractDate') {
      setContract(prev => {
        return { ...prev, contractDate: value };
      });
      addMonthToAndAfterPsRows(value, 0);
    } else if (stateFieldName === 'demoSc') {
      setContract(prev => {
        return { ...prev, demoSc: value.staffId, demoScName: value.fio };
      });
    } else if (stateFieldName === 'dealer') {
      setContract(prev => {
        return { ...prev, dealer: value.staffId, dealerName: value.fio };
      });
    } else if (stateFieldName === 'collector') {
      setContract(prev => {
        return { ...prev, collector: value.staffId, collectorName: value.fio };
      });
    } else if (stateFieldName === 'demoScRemove') {
      setContract(prev => {
        return { ...prev, demoSc: '', demoScName: '' };
      });
    } else if (stateFieldName === 'dealerRemove') {
      setContract(prev => {
        return { ...prev, dealer: '', dealerName: '' };
      });
    } else if (stateFieldName === 'collectorRemove') {
      setContract(prev => {
        return { ...prev, collector: '', collectorName: '' };
      });
    } else if (stateFieldName === 'customer') {
      setContract(prev => {
        return { ...prev, customerId: value.id, customerName: value.fullFIO };
      });
    } else if (stateFieldName === 'customerRemove') {
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
    } else if (stateFieldName === 'contractTypeId') {
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
    } else
      setContract(prev => {
        return { ...prev, [stateFieldName]: value };
      });

    // console.log(wa,'wa');
  };

  const onConDetInputChange = (value, stateFieldName) => {
    if (stateFieldName === 'addrHomeId') {
      setContract(prev => {
        return { ...prev, addrHomeId: value.addr_id };
      });
      setAddrHome(value);
    } else if (stateFieldName === 'addrHomeIdRemove') {
      setContract(prev => {
        return { ...prev, addrHomeId: '' };
      });
      setAddrHome({});
    } else if (stateFieldName === 'addrWorkId') {
      setContract(prev => {
        return { ...prev, addrWorkId: value.addr_id };
      });
      setAddrWork(value);
    } else if (stateFieldName === 'addrWorkIdRemove') {
      setContract(prev => {
        return { ...prev, addrWorkId: '' };
      });
      setAddrWork({});
    } else if (stateFieldName === 'addrServiceId') {
      setContract(prev => {
        return { ...prev, addrServiceId: value.addr_id };
      });
      setAddrService(value);
    } else if (stateFieldName === 'addrServiceIdRemove') {
      setContract(prev => {
        return { ...prev, addrServiceId: '' };
      });
      setAddrService({});
    }
  };

  const onFinInputChange = (value, stateFieldName, id) => {
    // console.log(value, stateFieldName, id)
    // let wa = Object.assign({}, contract);
    if (stateFieldName === 'price') {
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
        };
      });
    } else if (stateFieldName === 'dealerSubtract') {
      setContract(prev => {
        return { ...prev, dealerSubtract: moneyInputHanler(value, 0) };
      });
      // console.log(newVal,'newVal');
    } else if (stateFieldName === 'sum2') {
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
    } else if (stateFieldName === 'paymentDate') {
      const idx = ps.findIndex(item => item.paymentScheduleId === id);
      addMonthToAndAfterPsRows(value, idx);
    } else if (stateFieldName === 'legalEntityId') {
      setContract(prev => {
        return { ...prev, legalEntityId: value };
      });
      // console.log(newVal,'newVal');
    } else
      setContract(prev => {
        return { ...prev, [stateFieldName]: value };
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

  const onLogisticsInputChange = (value, stateFieldName) => {
    // console.log(value, stateFieldName)
    // let wa = Object.assign({}, contract);

    if (stateFieldName === 'tovarSerial') {
      setContract(prev => {
        return {
          ...prev,
          tovarSerial: value.tovarSerial,
          matnrListId: value.matnrListId,
        };
      });
    } else if (stateFieldName === 'removeTovarSerial') {
      setContract(prev => {
        return { ...prev, tovarSerial: '', matnrListId: '' };
      });
    } else if (stateFieldName === 'promo') {
      setContractPromoList(prev => {
        return [...value];
      });
    } else if (stateFieldName === 'removePromo') {
      setContractPromoList(prev => {
        const idx = prev.findIndex(item => item.id === value);
        const newArray = [...prev.slice(0, idx), ...prev.slice(idx + 1)];
        return newArray;
      });
    } else
      setContract(prev => {
        return { ...prev, [stateFieldName]: value };
      });
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
            bukrs={contract.bukrs}
            onFinInputChange={onFinInputChange}
            branchId={contract.branchId}
            contractTypeId={contract.contractTypeId}
            tcode={'MMCC'}
            price={contract.price}
            firstPayment={contract.firstPayment}
            waers={contract.waers}
            dealerSubtract={contract.dealerSubtract}
            legalEntityId={contract.legalEntityId}
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
            tradeIn={contract.tradeIn}
            matnrReleaseDate={contract.matnrReleaseDate}
            bukrs={contract.bukrs}
            branchId={contract.branchId}
            contractTypeId={contract.contractTypeId}
            tcode={'MMCC'}
            tovarSerial={contract.tovarSerial}
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
        {messages['transNameMmcc']}
      </Header>

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
)(injectIntl(Mmcc));
