import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Segment,
  Grid,
  Form,
  Dropdown,
  Table,
  Icon,
  Input,
  Button,
  Checkbox,
  TextArea,
} from 'semantic-ui-react';
import {
  f4FetchBranchesByBukrs,
  f4FetchConTypeList,
  f4ClearAnyObject,
  f4FetchBranches,
} from '../../../reference/f4/f4_action';
import DatePicker from 'react-datepicker';
import { injectIntl } from 'react-intl';
import moment from 'moment';
import CustomerF4Modal from '../../../reference/f4/Customer/customerF4WithCreationPage';
import StaffF4Modal from '../../../reference/f4/staff/staffF4Modal';
import AddressF4Modal from '../../../reference/f4/address/addressF4WithCreationPage';
import MatnrListF4Modal from '../../../marketing/mainoperation/contractAdditionaComponents/matnrListF4';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-table/react-table.css';
import './smcc.css';
import {
  LinkToStaffCardView,
  LinkToCustomerHrc03,
} from '../../../utils/outlink';

function Smcc(props) {
  const emptyTs = {
    bukrs: '',
    branchId: '',
    branchServ: '',
    contractType: '',
    dealer: '',
    dealerName: '',
    customerId: '',
    customerName: '',
    tovarSerial: '',
    matnrListId: '',
    addrServiceId: '',
  };

  const [ts, setTs] = useState({ ...emptyTs });
  const [startDate, setStartDate] = useState(moment(new Date()));
  const [customerF4ModalOpen, setCustomerF4ModalOpen] = useState(false);
  const [staffF4ModalOpen, setStaffF4ModalOpen] = useState(false);
  const [staffF4ModalPosition, setStaffF4ModalPosition] = useState('');
  const [addressF4ModalOpen, setAddressF4ModalOpen] = useState(false);
  const [addressF4ModalType, setAddressF4ModalType] = useState('');
  const [contractTypeOpts, setContractTypeOpts] = useState([]);
  const [matnrListF4ModalOpen, setMatnrListF4ModalOpen] = useState(false);
  const [isLoadingMatnrList, setIsLoadingMatnrList] = useState(false);

  useEffect(() => {
    props.f4FetchConTypeList();
    props.f4FetchBranches();
    return () => {
      props.f4ClearAnyObject('F4_CLEAR_CONTYPE_LIST');
      props.f4ClearAnyObject('F4_CLEAR_BRANCHES');
    };
  }, []);

  const {
    companyOptions = [],
    branchOptions,
    branchService,
    contractTypeList,
    branches,
    language,
    intl: { messages },
    matnrList = [],
    contract: {
      contractTypeId,
      branchId,
      bukrs,
      customerId,
      customerName,
    } = {},
  } = props;

  const onInputChange = (o, fieldName) => {
    let waSelectedBranch = {};
    branches
      .filter(item => item.branch_id === o.value)
      .forEach(item => {
        waSelectedBranch = item;
      });

    setTs(prev => {
      const varTs = { ...prev };
      switch (fieldName) {
        case 'bukrs':
          varTs.bukrs = o.value;
          break;
        case 'branchId':
          varTs.branchId = o.value;
          let wa = { ...emptyTs };
          wa.bukrs = prev.bukrs;
          wa.branchId = o;

          let waConOptions = contractTypeList
            .filter(
              item =>
                (item.bukrs == wa.bukrs &&
                  item.business_area_id == waSelectedBranch.business_area_id) ||
                (item.bukrs == wa.bukrs &&
                  item.business_area_id == 4 &&
                  waSelectedBranch.branchId == 210),
            )
            .map(item => {
              return {
                key: item.contract_type_id,
                value: item.contract_type_id,
                text: item.name,
              };
            });

          setContractTypeOpts(waConOptions);
          break;
        case 'branchServ':
          varTs.branchServ = o.value;
          break;
        case 'contractType':
          varTs.contractType = o.value;
          break;
        case 'dealer':
          varTs.dealer = o.staffId;
          varTs.dealerName = o.fio;
          break;
        case 'dealerRemove':
          varTs.dealer = '';
          varTs.dealerName = '';
          break;
        case 'customer':
          varTs.customerId = o.id;
          varTs.customerName = o.fullFIO;
          break;
        case 'customerRemove':
          varTs.customerId = '';
          varTs.customerName = '';
          break;
        case 'addrServiceId':
          varTs.addrServiceId = o.addr_id;
          break;
        case 'addrServiceIdRemove':
          varTs.addrServiceId = '';
          break;
        case 'tovarSerial':
          varTs.tovarSerial = o.tovarSerial;
          varTs.matnrListId = o.matnrListId;
          break;
        case 'removeTovarSerial':
          varTs.tovarSerial = '';
          varTs.matnrListId = '';
          break;
        default:
          varTs[fieldName] = o.value;
      }
      return varTs;
    });
  };

  const handleSubmit = () => {
    console.log('HandleSubmit');
  };

  return (
    <Segment>
      <h1>Сервис договор</h1>
      <CustomerF4Modal
        open={customerF4ModalOpen}
        onCloseCustomerF4={bool => setCustomerF4ModalOpen(bool)}
        onCustomerSelect={item => onInputChange(item, 'customer')}
      />
      <StaffF4Modal
        open={staffF4ModalOpen}
        closeModal={bool => setStaffF4ModalOpen(bool)}
        onStaffSelect={item => onInputChange(item, 'dealer')}
        trans="mmcc"
        brnch={ts.branchId}
        branchOptions={branchOptions}
        bukrs={ts.bukrs}
        companyOptions={getCompanyOptions(companyOptions)}
        bukrsDisabledParent
        unemployedDisabledParent
      />

      <AddressF4Modal
        open={addressF4ModalOpen}
        customerId={customerId}
        customerName={customerName}
        onCloseAddressF4={bool => setAddressF4ModalOpen(bool)}
        onAddressSelect={item => onInputChange(item, 'addrServiceId')}
      />

      <MatnrListF4Modal
        open={matnrListF4ModalOpen}
        matnrList={matnrList}
        onCloseMatnrF4={bool => setMatnrListF4ModalOpen(bool)}
        onMatnrSelect={item => onInputChange(item, 'tovarSerial')}
        isLoadingMatnrList={isLoadingMatnrList}
      />
      <Segment>
        <Form onSubmit={handleSubmit}>
          <Grid>
            <Grid.Row>
              <Grid.Column mobile={16} table={16} computer={8}>
                <h3>Договор</h3>
                <Table compact>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>
                        <Icon name="folder" />
                        {messages['bukrs']}
                      </Table.Cell>
                      <Table.Cell>
                        <Dropdown
                          placeholder={messages['bukrs']}
                          fluid
                          selection
                          search
                          options={getCompanyOptions(companyOptions)}
                          value={ts.bukrs}
                          onChange={(e, o) => onInputChange(o, 'bukrs')}
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
                          fluid
                          selection
                          search
                          options={ts.bukrs ? branchOptions[ts.bukrs] : []}
                          value={ts.branchId}
                          onChange={(e, o) => onInputChange(o, 'branchId')}
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Icon name="archive" />
                        {messages['service']}
                      </Table.Cell>
                      <Table.Cell>
                        <Dropdown
                          placeholder={messages['service']}
                          fluid
                          selection
                          search
                          options={ts.branchId ? branchService[ts.bukrs] : []}
                          value={ts.branchServ}
                          onChange={(e, o) => onInputChange(o, 'branchServ')}
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Icon name="clipboard" />
                        {messages['contractType']}
                      </Table.Cell>
                      <Table.Cell>
                        <Dropdown
                          placeholder={messages['contractType']}
                          fluid
                          search
                          selection
                          options={contractTypeOpts ? contractTypeOpts : []}
                          value={contractTypeId}
                          onChange={(e, o) => onInputChange(o, 'contractType')}
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Icon name="calendar" />
                        {messages['contractDate']}
                      </Table.Cell>
                      <Table.Cell>
                        <DatePicker
                          autoComplete="off"
                          dateFormat="DD/MM/YYYY"
                          selected={startDate}
                          dropdownMode="select"
                          locale={language}
                          onChange={date => setStartDate(date)}
                          showMonthDropdown
                          showYearDropdown
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Icon name="user" />
                        {messages['client']}
                      </Table.Cell>
                      <Table.Cell>
                        <LinkToCustomerHrc03
                          customerId={ts.customerId}
                          customerName={ts.customerName}
                        />
                      </Table.Cell>
                      <Table.Cell collapsing>
                        <Button
                          basic
                          color="blue"
                          icon
                          onClick={event => setCustomerF4ModalOpen(true)}
                        >
                          <Icon name="clone" />
                        </Button>
                        <Button
                          basic
                          color="red"
                          icon
                          onClick={event => onInputChange('', 'customerRemove')}
                        >
                          <Icon name="delete" />
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Icon name="clipboard" />
                        {messages['dealer']}
                      </Table.Cell>
                      <Table.Cell>
                        <LinkToStaffCardView
                          staffId={ts.dealer}
                          staffFio={ts.dealerName}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <Button
                          basic
                          color="blue"
                          icon
                          onClick={event => {
                            setStaffF4ModalOpen(true);
                          }}
                        >
                          <Icon name="clone" />
                        </Button>
                        <Button
                          basic
                          color="red"
                          icon
                          onClick={event => {
                            onInputChange('remove', 'dealerRemove');
                          }}
                        >
                          <Icon name="delete" />
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Icon name="calendar" />
                        {messages['dateOfIssue']}
                      </Table.Cell>
                      <Table.Cell>
                        <DatePicker
                          autoComplete="off"
                          dateFormat="DD/MM/YYYY"
                          selected={startDate}
                          locale={language}
                          dropdownMode="select"
                          onChange={date => setStartDate(date)}
                          showMonthDropdown
                          showYearDropdown
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell collapsing>
                        <Icon name="factory" />
                        {messages['productSerialNumber']}
                      </Table.Cell>
                      <Table.Cell>
                        <Input
                          placeholder={messages['productSerialNumber']}
                          fluid
                          onClick={() => setMatnrListF4ModalOpen(true)}
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell collapsing>
                        <Icon name="bookmark" />
                        {messages['lastStateInstalled']}
                      </Table.Cell>
                      <Table.Cell
                        style={{
                          display: 'flex',
                        }}
                      >
                        <Input className="input__set" label="F1" size="mini" />
                        <Input className="input__set" label="F2" size="mini" />
                        <Input className="input__set" label="F3" size="mini" />
                        <Input className="input__set" label="F4" size="mini" />
                        <Input className="input__set" label="F5" size="mini" />
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Grid.Column>

              <Grid.Column mobile={16} table={16} computer={8}>
                <h3>{messages['contactDetails']}</h3>
                <Table>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell collapsing>
                        <Icon name="address card" />
                        {messages['addressService']}
                      </Table.Cell>
                      <Table.Cell>
                        <Input placeholder={messages['addressService']} fluid />
                      </Table.Cell>
                      <Table.Cell collapsing>
                        <Button
                          basic
                          color="blue"
                          icon
                          onClick={() => {
                            setAddressF4ModalOpen(true);
                          }}
                        >
                          <Icon name="clone" />
                        </Button>
                        <Button
                          basic
                          color="red"
                          icon
                          onClick={event => {
                            onInputChange('remove', 'addrServiceIdRemove');
                          }}
                        >
                          <Icon name="delete" />
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Icon name="phone square" />
                        {messages['telMob1']}
                      </Table.Cell>
                      <Table.Cell>
                        <Input placeholder={messages['telMob1']} fluid />
                      </Table.Cell>
                      <Table.Cell>
                        <Button basic color="blue" icon>
                          <Icon name="clone" />
                        </Button>
                        <Button
                          basic
                          color="red"
                          icon
                          onClick={event =>
                            onInputChange('remove', 'removeTovarSerial')
                          }
                        >
                          <Icon name="delete" />
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Icon name="mail" />
                        E-Mail
                      </Table.Cell>
                      <Table.Cell>
                        <Input placeholder="E-Mail" fluid />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Icon
                          name="info circle"
                          style={{
                            backgroundColor: 'transparent',
                            color: 'black',
                            cursor: 'auto',
                          }}
                        />
                        {messages['extraInfo']}
                      </Table.Cell>
                      <Table.Cell>
                        <TextArea placeholder={messages['extraInfo']} />
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column mobile={16} table={16} computer={8}>
                <Button floated="right" color="teal">
                  {messages['save']}
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    </Segment>
  );
}

const getCompanyOptions = compOptions => {
  const companyOptions = compOptions;
  if (!companyOptions) {
    return [];
  }
  let out = compOptions.map(c => {
    return {
      key: parseInt(c.key, 10),
      text: `${c.text}`,
      value: parseInt(c.value, 10),
    };
  });
  return out;
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsMarketing,
    branchService: state.userInfo.branchOptionsService,
    contractTypeList: state.f4.contractTypeList,
    branches: state.f4.branches,
  };
}

export default connect(mapStateToProps, {
  f4FetchBranchesByBukrs,
  f4FetchConTypeList,
  f4ClearAnyObject,
  f4FetchBranches,
})(injectIntl(Smcc));
