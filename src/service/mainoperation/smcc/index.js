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
  TextArea,
  Label,
} from 'semantic-ui-react';
import {
  f4FetchBranchesByBukrs,
  f4FetchConTypeList,
  f4ClearAnyObject,
  f4FetchBranches,
  f4fetchMonthTerms,
  f4FetchPhone,
  f4fetchPhoneType,
} from '../../../reference/f4/f4_action';

import OutputErrors from '../../../general/error/outputErrors';
import DatePicker from 'react-datepicker';
import { injectIntl } from 'react-intl';
import moment from 'moment';
import CustomerF4Modal from '../../../reference/f4/Customer/customerF4WithCreationPage';
import StaffF4Modal from '../../../reference/f4/staff/staffF4Modal';
import AddressF4Modal from '../../../reference/f4/address/addressF4WithCreationPage';
import MatnrListF4Modal from '../../../marketing/mainoperation/contractAdditionaComponents/matnrListF4';
import PhoneF4Modal from '../../../reference/f4/phone/phoneF4Modal';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-table/react-table.css';
import './smcc.css';
import {
  LinkToStaffCardView,
  LinkToCustomerHrc03,
} from '../../../utils/outlink';

function Smcc(props) {
  const emptyContract = {
    bukrs: '',
    branchId: '',
    branchServ: '',
    selectedBranch: '',
    contractType: '',
    contractMatnr: '',
    dealer: '',
    dealerName: '',
    customerId: '',
    customerName: '',
    tovarSerial: '',
    matnrListId: '',
    addrServiceId: '',
    addrService: '',
    phone: '',
    month: {
      f1: '',
      f2: '',
      f3: '',
      f4: '',
      f5: '',
    },
  };

  const [contract, setContract] = useState({ ...emptyContract });
  const [startDate, setStartDate] = useState(moment(new Date()));
  const [customerF4ModalOpen, setCustomerF4ModalOpen] = useState(false);
  const [staffF4ModalOpen, setStaffF4ModalOpen] = useState(false);
  const [addressF4ModalOpen, setAddressF4ModalOpen] = useState(false);
  const [contractTypeOpts, setContractTypeOpts] = useState([]);
  const [matnrListF4ModalOpen, setMatnrListF4ModalOpen] = useState(false);
  const [phoneF4ModalOpen, setPhoneF4ModalOpen] = useState(false);
  const [isLoadingMatnrList, setIsLoadingMatnrList] = useState(false);
  const [error, setError] = useState([]);
  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));

  const {
    companyOptions = [],
    branchOptions = [],
    phoneList = [],
    phoneListType,
    branchService,
    contractTypeList,
    monthTerms,
    language,
    intl: { messages },
    contract: { contractTypeId } = {},
  } = props;

  useEffect(() => {
    props.f4FetchPhone();
    props.f4fetchPhoneType();
    props.f4FetchConTypeList();
    props.f4FetchBranches();
    return () => {
      props.f4ClearAnyObject('F4_CLEAR_CONTYPE_LIST');
      props.f4ClearAnyObject('F4_CLEAR_BRANCHES');
      props.f4ClearAnyObject('F4_CLEAR_PHONE');
    };
  }, []);
  useEffect(() => {
    if (
      contract.bukrs !== '' &&
      contract.branchId !== '' &&
      contract.contractMatnr !== ''
    ) {
      fetchMonthTerms(
        contract.bukrs,
        contract.branchId,
        contract.contractMatnr,
      );
    }
  }, [contract.bukrs, contract.branchId, contract.contractMatnr]);

  useEffect(() => {
    if (monthTerms) {
      setContract(
        { ...contract },
        monthTerms.map(item => {
          {
            contract.month.f1 = item.f1;
            contract.month.f2 = item.f2;
            contract.month.f3 = item.f3;
            contract.month.f4 = item.f4;
            contract.month.f5 = item.f5;
          }
        }),
      );
    }
  }, [monthTerms]);

  const onInputChange = (o, fieldName) => {
    setContract(prev => {
      const varContract = { ...prev };
      switch (fieldName) {
        case 'bukrs':
          varContract.bukrs = o.value;
          break;
        case 'branchId':
          let waSelectedBranch = {};
          branchOptions[contract.bukrs]
            .filter(item => item.key === o.value)
            .forEach(item => {
              waSelectedBranch = item;
            });

          varContract.selectedBranch = waSelectedBranch;
          varContract.branchId = o.value;
          let wa = { ...emptyContract };
          wa.bukrs = prev.bukrs;
          wa.branchId = o;

          let waConOptions = contractTypeList
            .filter(
              item =>
                (item.bukrs == wa.bukrs &&
                  item.business_area_id == waSelectedBranch.businessareaid) ||
                (item.bukrs == wa.bukrs &&
                  item.businessareaid == 4 &&
                  waSelectedBranch.branchId == 210),
            )
            .map(item => {
              return {
                key: item.contract_type_id,
                value: item.contract_type_id,
                text: item.name,
                matnr: item.matnr,
              };
            });

          setContractTypeOpts(waConOptions);
          break;
        case 'branchServ':
          varContract.branchServ = o.value;
          break;
        case 'contractType':
          let matnr = 0;
          for (let i = 0; i < o.options.length; i++) {
            if (o.value === o.options[i].value) {
              matnr = o.options[i].matnr;
            }
          }
          varContract.contractType = o.value;
          varContract.contractMatnr = matnr;
          break;
        case 'dealer':
          varContract.dealer = o.staffId;
          varContract.dealerName = o.fio;
          break;
        case 'dealerRemove':
          varContract.dealer = '';
          varContract.dealerName = '';
          break;
        case 'customer':
          varContract.customerId = o.id;
          varContract.customerName = o.fullFIO;
          break;
        case 'customerRemove':
          varContract.customerId = '';
          varContract.customerName = '';
          break;
        case 'addrServiceId':
          varContract.addrServiceId = o.addr_id;
          varContract.addrService = o.address;
          break;
        case 'addrServiceIdRemove':
          varContract.addrServiceId = '';
          varContract.addrService = '';
          break;
        case 'tovarSerial':
          varContract.tovarSerial = o.tovarSerial;
          varContract.matnrListId = o.matnrListId;
          break;
        case 'removeTovarSerial':
          varContract.tovarSerial = '';
          varContract.matnrListId = '';
          break;
        case 'choosePhone':
          varContract.phone = o.phone;
          break;
        case 'monthF1':
          varContract.month.f1 = parseInt(o.value, 10);
          break;
        case 'monthF2':
          varContract.month.f2 = parseInt(o.value, 10);
          break;
        case 'monthF3':
          varContract.month.f3 = parseInt(o.value, 10);
          break;
        case 'monthF4':
          varContract.month.f4 = parseInt(o.value, 10);
          break;
        case 'monthF5':
          varContract.month.f5 = parseInt(o.value, 10);
          break;

        default:
          varContract[fieldName] = o.value;
      }
      return varContract;
    });
  };

  const fetchMonthTerms = (bukrs, branchId, matnr) => {
    props.f4fetchMonthTerms({
      branchId,
      bukrs,
      matnr,
    });
  };

  const handleClick = () => {
    validate();
  };

  const validate = () => {
    const errors = [];
    if (contract.bukrs === '') {
      errors.push(errorTable[`5${language}`]);
    }
    if (contract.branchId === '') {
      errors.push(errorTable[`7${language}`]);
    }
    if (contract.branchServ === '') {
      errors.push(errorTable[`7${language}`]);
    }
    if (contract.contractType === '') {
      errors.push(errorTable[`17${language}`]);
    }
    if (contract.dealer === '') {
      errors.push(errorTable[`115${language}`]);
    }
    if (contract.customerId === '') {
      errors.push(errorTable[`9${language}`]);
    }
    if (contract.tovarSerial === '') {
      errors.push(errorTable[`9${language}`]);
    }
    if (contract.addrService === '') {
      errors.push(errorTable[`118${language}`]);
    }
    if (contract.phone === '') {
      errors.push(errorTable[`126${language}`]);
    }
    setError(() => errors);
  };

  console.log(phoneList);
  console.log(phoneListType);
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
        brnch={contract.branchId}
        branchOptions={branchOptions}
        bukrs={contract.bukrs}
        companyOptions={getCompanyOptions(companyOptions)}
        bukrsDisabledParent
        unemployedDisabledParent
      />

      <AddressF4Modal
        open={addressF4ModalOpen}
        customerId={contract.customerId}
        customerName={contract.customerName}
        onCloseAddressF4={bool => setAddressF4ModalOpen(bool)}
        onAddressSelect={item => onInputChange(item, 'addrServiceId')}
      />

      <MatnrListF4Modal
        open={matnrListF4ModalOpen}
        matnrList={contract.matnrList}
        onCloseMatnrF4={bool => setMatnrListF4ModalOpen(bool)}
        onMatnrSelect={item => onInputChange(item, 'tovarSerial')}
        isLoadingMatnrList={isLoadingMatnrList}
      />

      <PhoneF4Modal
        open={phoneF4ModalOpen}
        phoneList={phoneList}
        phoneListType={phoneListType}
        customerId={contract.customerId}
        selectedBranch={contract.selectedBranch}
        onClosePhoneF4={bool => setPhoneF4ModalOpen(bool)}
        onPhoneSelect={item => onInputChange(item, 'choosePhone')}
      />
      <Segment>
        <Form>
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
                          value={contract.bukrs}
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
                          options={
                            contract.bukrs ? branchOptions[contract.bukrs] : []
                          }
                          value={contract.branchId}
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
                          options={
                            contract.branchId
                              ? branchService[contract.bukrs]
                              : []
                          }
                          value={contract.branchServ}
                          onChange={(e, o) => onInputChange(o, 'branchServ')}
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell collapsing>
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
                          customerId={contract.customerId}
                          customerName={contract.customerName}
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
                          staffId={contract.dealer}
                          staffFio={contract.dealerName}
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
                      <Table.Cell>
                        <Icon name="factory" />
                        {messages['productSerialNumber']}
                      </Table.Cell>
                      <Table.Cell>
                        <Input
                          placeholder={messages['productSerialNumber']}
                          fluid
                          value={contract.tovarSerial}
                        />
                      </Table.Cell>
                      <Table.Cell collapsing>
                        <Button
                          basic
                          color="blue"
                          icon
                          onClick={() => setMatnrListF4ModalOpen(true)}
                        >
                          <Icon name="clone" />
                        </Button>
                        <Button
                          basic
                          color="red"
                          icon
                          onClick={event =>
                            onInputChange('', 'removeTovarSerial')
                          }
                        >
                          <Icon name="delete" />
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Icon name="bookmark" />
                        {messages['lastStateInstalled']}
                      </Table.Cell>
                      <Table.Cell
                        style={{
                          display: 'flex',
                        }}
                      >
                        <Input
                          className="input__set"
                          label="F1"
                          size="mini"
                          value={contract.month.f1}
                          onChange={(e, o) => onInputChange(o, 'monthF1')}
                        />
                        <Input
                          className="input__set"
                          label="F2"
                          size="mini"
                          value={contract.month.f2}
                          onChange={(e, o) => onInputChange(o, 'monthF2')}
                        />
                        <Input
                          className="input__set"
                          label="F3"
                          size="mini"
                          value={contract.month.f3}
                          onChange={(e, o) => onInputChange(o, 'monthF3')}
                        />
                        <Input
                          className="input__set"
                          label="F4"
                          size="mini"
                          value={contract.month.f4}
                          onChange={(e, o) => onInputChange(o, 'monthF4')}
                        />
                        <Input
                          className="input__set"
                          label="F5"
                          size="mini"
                          value={contract.month.f5}
                          onChange={(e, o) => onInputChange(o, 'monthF5')}
                        />
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
                        <Input
                          placeholder={messages['addressService']}
                          fluid
                          value={contract.addrService}
                        />
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
                        <Table striped selectable>
                          <Table.Body>
                            {contract.customerId ? (
                              phoneList.map((phone, key) => {
                                if (phone.customerId === contract.customerId) {
                                  const pl = phoneListType.map(type => {
                                    if (phone.typeId === type.id) {
                                      return (
                                        <Table.Row key={key}>
                                          <Table.Cell>
                                            <label>{type.nameRu}</label>
                                          </Table.Cell>
                                          <Table.Cell>
                                            <label>{phone.phone}</label>
                                          </Table.Cell>
                                        </Table.Row>
                                      );
                                    }
                                  });
                                  return pl;
                                }
                              })
                            ) : (
                              <Table.Cell textAlign="center">
                                <Label basic color="red">
                                  {messages['choose_client']}
                                </Label>
                              </Table.Cell>
                            )}
                          </Table.Body>
                        </Table>
                      </Table.Cell>
                      <Table.Cell>
                        <Button
                          basic
                          color="blue"
                          icon
                          onClick={() => {
                            setPhoneF4ModalOpen(true);
                          }}
                        >
                          <Icon name="clone" />
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
                <OutputErrors errors={error} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column mobile={16} table={16} computer={8}>
                <Button floated="right" color="teal" onClick={handleClick}>
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
    phoneList: state.f4.phoneList.data,
    phoneListType: state.f4.phoneType.data,
    monthTerms: state.f4.monthTerms.data,
  };
}

export default connect(mapStateToProps, {
  f4FetchBranchesByBukrs,
  f4FetchConTypeList,
  f4ClearAnyObject,
  f4FetchBranches,
  f4FetchPhone,
  f4fetchPhoneType,
  f4fetchMonthTerms,
})(injectIntl(Smcc));
