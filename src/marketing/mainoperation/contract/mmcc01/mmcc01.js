import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import axios from 'axios';

import {
  Container,
  Header,
  Grid,
  Segment,
  Table,
  Icon,
  Dropdown,
  Input,
  Button,
} from 'semantic-ui-react';
import { modifyLoader } from '../../../../general/loader/loader_action';
import OutputErrors from '../../../../general/error/outputErrors';
import StaffF4Modal from '../../../../reference/f4/staff/staffF4Modal';
import { LinkToStaffCardView } from '../../../../utils/outlink';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

//
import {
  f4FetchConTypeList,
  f4FetchBranches,
  f4ClearAnyObject,
} from '../../../../reference/f4/f4_action';

require('moment/locale/ru');
require('moment/locale/tr');

const Mmcc01 = props => {
  // function Mmcc01() {

  const emptyContract = {
    bukrs: '',
    branchId: '',
    contractNumber: 0,
    contractTypeId: '',
    contractDate: '',
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
  };

  const [contract, setContract] = useState({ ...emptyContract });
  const {
    companyOptions,
    branchOptions,
    contractTypeList,
    branches,
    intl: { messages },
  } = props;
  const [serBranches, setSerBranches] = useState({});
  const [finBranches, setFinBranches] = useState({});
  const [contractTypeOpts, setContractTypeOpts] = useState([]);
  const [staffF4ModalOpen, setStaffF4ModalOpen] = useState(false);
  const [staffF4ModalPosition, setStaffF4ModalPosition] = useState('');

  const language = localStorage.getItem('language');

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

  function onInputChange(value, stateFieldName) {
    let wa = Object.assign({}, contract);
    if (stateFieldName === 'bukrs') {
      wa = { ...emptyContract };
      wa[stateFieldName] = value;
      wa.branchId = '';
      wa.servBranchId = '';
      wa.finBranchId = '';
      wa.contractTypeId = '';
    } else if (stateFieldName === 'branchId') {
      wa = { ...emptyContract };
      wa.bukrs = contract.bukrs;
      wa[stateFieldName] = value;

      //assign the same branch for fin branch
      wa.finBranchId = value;

      //get the selected branch
      let waSelectedBranch = {};
      branches
        .filter(item => item.branch_id === value)
        .forEach(item => {
          waSelectedBranch = item;
        });

      //get service branch from the same city and assign
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
    } else if (stateFieldName === 'demoSc') {
      wa.demoSc = value.staffId;
      wa.demoScName = value.fio;
    } else if (stateFieldName === 'dealer') {
      wa.dealer = value.staffId;
      wa.dealerName = value.fio;
    } else if (stateFieldName === 'collector') {
      wa.collector = value.staffId;
      wa.collectorName = value.fio;
    } else if (stateFieldName === 'demoScRemove') {
      wa.demoSc = '';
      wa.demoScName = '';
    } else if (stateFieldName === 'dealerRemove') {
      wa.dealer = '';
      wa.dealerName = '';
    } else if (stateFieldName === 'collectorRemove') {
      wa.collector = '';
      wa.collectorName = '';
    } else wa[stateFieldName] = value;
    setContract(wa);
  }

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
        {' New Contract '}
      </Header>
      <StaffF4Modal
        open={staffF4ModalOpen}
        closeModal={bool => setStaffF4ModalOpen(bool)}
        onStaffSelect={item => onInputChange(item, staffF4ModalPosition)}
        trans="mmcc01"
        brnch={contract.branchId}
        branchOptions={branchOptions}
        bukrs={contract.bukrs}
        companyOptions={companyOptions}
        bukrsDisabledParent
        unemployedDisabledParent
      />
      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={16} computer={16}>
            {/* <button onClick={fetchCTList}>get CT List</button> */}

            {/* {console.log(finBranches, 'main render')} */}

            {/* .map((wa)=>{
            return <div>wa.name</div>     

          })} */}

            <Table collapsing className="borderLess">
              <Table.Body>
                <Table.Row>
                  <Table.Cell>{messages['bukrs']}</Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      placeholder={messages['bukrs']}
                      selection
                      options={companyOptions ? companyOptions : []}
                      value={contract.bukrs}
                      onChange={(e, { value }) => {
                        onInputChange(value, 'bukrs');
                      }}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{messages['brnch']}</Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      placeholder={messages['brnch']}
                      search
                      selection
                      options={
                        branchOptions
                          ? branchOptions[contract.bukrs]
                            ? branchOptions[contract.bukrs]
                            : []
                          : []
                      }
                      value={contract.branchId}
                      onChange={(e, { value }) =>
                        onInputChange(value, 'branchId')
                      }
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{messages['service']}</Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      placeholder={messages['service']}
                      search
                      selection
                      options={
                        serBranches
                          ? serBranches[contract.bukrs]
                            ? serBranches[contract.bukrs]
                            : []
                          : []
                      }
                      value={contract.servBranchId}
                      onChange={(e, { value }) =>
                        onInputChange(value, 'servBranchId')
                      }
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Finance</Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      placeholder={messages['finance']}
                      search
                      selection
                      options={
                        finBranches
                          ? finBranches[contract.bukrs]
                            ? finBranches[contract.bukrs]
                            : []
                          : []
                      }
                      value={contract.finBranchId}
                      onChange={(e, { value }) =>
                        onInputChange(value, 'finBranchId')
                      }
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Con Types</Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      placeholder={messages['finance']}
                      search
                      selection
                      options={contractTypeOpts ? contractTypeOpts : []}
                      value={contract.contractTypeId}
                      onChange={(e, { value }) =>
                        onInputChange(value, 'contractTypeId')
                      }
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{messages['date']}</Table.Cell>
                  <Table.Cell>
                    <DatePicker
                      className="date-auto-width"
                      autoComplete="off"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select" // timezone="UTC"
                      selected={
                        contract.contractDate
                          ? moment(contract.contractDate, 'DD.MM.YYYY')
                          : ''
                      }
                      locale={language}
                      onChange={value =>
                        onInputChange(
                          value.format('DD.MM.YYYY'),
                          'contractDate',
                        )
                      }
                      dateFormat="DD.MM.YYYY"
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{'Customer'}</Table.Cell>
                  <Table.Cell>
                    <Input value={contract.customerName} readOnly />
                    <Icon
                      name="clone"
                      size="large"
                      className="clickableIcon"
                      // onClick={event => this.editPrice(idx)}
                    />
                    <Icon
                      name="remove"
                      size="large"
                      className="clickableIcon"
                      color="red"
                      // onClick={event => this.removePrice(idx, wa)}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{'Demo secretary'}</Table.Cell>
                  <Table.Cell>
                    <span>
                      <LinkToStaffCardView
                        staffId={contract.demoSc}
                        staffFio={contract.demoScName}
                      />
                    </span>
                    <Icon
                      name="clone"
                      size="large"
                      className="clickableIcon"
                      onClick={() => {
                        setStaffF4ModalOpen(true);
                        setStaffF4ModalPosition('demoSc');
                      }}
                      // onClick={event => this.editPrice(idx)}
                    />
                    <Icon
                      name="remove"
                      size="large"
                      className="clickableIcon"
                      color="red"
                      onClick={event => onInputChange('', 'demoScRemove')}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{'Dealer'}</Table.Cell>
                  <Table.Cell>
                    <span>
                      <LinkToStaffCardView
                        staffId={contract.dealer}
                        staffFio={contract.dealerName}
                      />
                    </span>
                    <Icon
                      name="clone"
                      size="large"
                      className="clickableIcon"
                      onClick={() => {
                        setStaffF4ModalOpen(true);
                        setStaffF4ModalPosition('dealer');
                      }}
                    />
                    <Icon
                      name="remove"
                      size="large"
                      className="clickableIcon"
                      color="red"
                      onClick={event => onInputChange('remove', 'dealerRemove')}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{'Collector'}</Table.Cell>
                  <Table.Cell>
                    <span>
                      <LinkToStaffCardView
                        staffId={contract.collector}
                        staffFio={contract.collectorName}
                      />
                    </span>
                    <Icon
                      name="clone"
                      size="large"
                      className="clickableIcon"
                      onClick={() => {
                        setStaffF4ModalOpen(true);
                        setStaffF4ModalPosition('collector');
                      }}
                    />
                    <Icon
                      name="remove"
                      size="large"
                      className="clickableIcon"
                      color="red"
                      onClick={event =>
                        onInputChange('remove', 'collectorRemove')
                      }
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{'Referencer'}</Table.Cell>
                  <Table.Cell />
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
          {/* <Grid.Column mobile={16} tablet={8} computer={12}>
            <Segment>
               <OutputErrors errors={this.state.errors} /> 
              Detail
            </Segment>
          </Grid.Column> */}
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
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsMarketing,
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
)(injectIntl(Mmcc01));
