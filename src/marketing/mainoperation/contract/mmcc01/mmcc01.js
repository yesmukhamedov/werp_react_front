import React, { useState, Component } from 'react';
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
} from 'semantic-ui-react';

import { modifyLoader } from '../../../../general/loader/loader_action';
import OutputErrors from '../../../../general/error/outputErrors';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

//
import { f4FetchConTypeList } from '../../../../reference/f4/f4_action';

const Mmcc01 = props => {
  // function Mmcc01() {

  const [contract, setContract] = useState({
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
    dealer: '',
    collector: '',
    fitter: '',
    customerId: '',
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
  });
  const { messages } = props.intl;
  const { companyOptions, branchOptions, language, contractTypeList } = props;
  const fetchCTList = () => props.f4FetchConTypeList();

  function onInputChange(value, stateFieldName) {
    const wa = Object.assign({}, contract);

    wa[stateFieldName] = value;
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
        {messages['transNameFrep7']}
      </Header>

      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={16} computer={16}>
            <button onClick={fetchCTList}>get CT List</button>

            {console.log(contractTypeList, 'contractTypeList.size')}

            {/* .map((wa)=>{
            return <div>wa.name</div>     

          })} */}

            <Table collapsing className="borderLess">
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Icon name="folder" /> {messages['bukrs']}
                  </Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      placeholder={messages['bukrs']}
                      selection
                      options={companyOptions ? companyOptions : []}
                      value={contract.bukrs}
                      onChange={(e, s) => {
                        onInputChange(s.value, 'bukrs');
                        console.log(e, s, 'e.s');
                      }}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Icon name="browser" />
                    {messages['brnch']}
                  </Table.Cell>
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
                  <Table.Cell>
                    <Icon name="browser" />
                    {messages['service']}
                  </Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      placeholder={messages['service']}
                      search
                      selection
                      options={
                        branchOptions
                          ? branchOptions[contract.bukrs]
                            ? branchOptions[contract.bukrs]
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
                  <Table.Cell>
                    <Icon name="browser" />
                    {messages['finance']}
                  </Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      placeholder={messages['finance']}
                      search
                      selection
                      options={
                        branchOptions
                          ? branchOptions[contract.bukrs]
                            ? branchOptions[contract.bukrs]
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
                  <Table.Cell>
                    <Icon name="browser" />
                    {messages['finance']}
                  </Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      placeholder={messages['finance']}
                      search
                      selection
                      options={
                        branchOptions
                          ? branchOptions[contract.bukrs]
                            ? branchOptions[contract.bukrs]
                            : []
                          : []
                      }
                      value={contract.contractTypeId}
                      onChange={(e, { value }) =>
                        onInputChange(value, 'contractTypeId')
                      }
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Icon name="calendar" />
                    {messages['finance']}
                  </Table.Cell>
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
                      locale={'TR'}
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
  console.log(state, 'state');
  return {
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsMarketing,
    language: state.locales.lang,
    contractTypeList: state.f4.contractTypeList,
  };
}

export default connect(
  mapStateToProps,
  {
    modifyLoader,

    //reference
    f4FetchConTypeList,
  },
)(injectIntl(Mmcc01));
