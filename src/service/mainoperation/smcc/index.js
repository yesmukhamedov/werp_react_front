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
  Checkbox,
} from 'semantic-ui-react';
import {
  f4FetchBranchesByBukrs,
  f4FetchConTypeList,
  f4ClearAnyObject,
  f4FetchBranches,
  f4FetchMonthTerms,
  f4FetchPhone,
  f4FetchPhoneType,
  f4FetchMatnrListView,
  f4CreateServContract,
} from '../../../reference/f4/f4_action';

import OutputErrors from '../../../general/error/outputErrors';
import { errorTableText } from '../../../utils/helpers';
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
  const emptyContract = {
    branchId: '',
    branchName: null,
    bukrsId: '',
    bukrsName: null,
    contactPersonName: null,
    contractDate: moment(new Date()).format('YYYY-MM-DD'),
    contractTypeId: '',
    countryId: null,
    countryName: null,
    customerFIO: null,
    customerId: '',
    dealerFIO: null,
    dealerId: '',
    f1Mt: null,
    f1MtLeft: null,
    f2Mt: null,
    f2MtLeft: null,
    f3Mt: null,
    f3MtLeft: null,
    f4Mt: null,
    f4MtLeft: null,
    f5Mt: null,
    f5MtLeft: null,
    fitterFIO: null,
    fitterId: null,
    fullPhone: null,
    info: '',
    info2: null,
    installmentDate: null,
    manual: null,
    matnrId: null,
    matnrName: null,
    serviceAddressId: '',
    serviceAddressName: null,
    servBranchId: '',
    serviceBranchName: null,
    serviceCrmCategoryId: null,
    serviceCrmCategoryName: null,
    tovarCategoryId: '',
    tovarCategoryName: null,
    tovarSn: '',
    warranty: null,
    warrantyEndDate: null,
    warrantyEndedMonths: null,
    email: '',
    matnrListId: '',
    lastState: 2,
    dealerName: '',
    customerName: '',
    addrService: '',
    selectedBranch: '',
    matnr: '',
    check: false,
    disabled: true,
  };
  const emptyServFilter = {
    active: true,
    bukrsId: '',
    bukrsName: null,
    contractId: null,
    contractNumber: null,
    crmCategoryId: null,
    crmCategoryName: null,
    branchMonthTermsId: 501,
    f1DateNext: null,
    f1DatePrev: null,
    f1Sid: null,
    f1SidPrev: null,
    f1Mt: '',
    f1Date: moment(new Date()).format('YYYY-MM-DD'),
    f2DateNext: null,
    f2DatePrev: null,
    f2Sid: null,
    f2SidPrev: null,
    f2Mt: '',
    f2Date: moment(new Date()).format('YYYY-MM-DD'),
    f3DateNext: null,
    f3DatePrev: null,
    f3Sid: null,
    f3SidPrev: null,
    f3Mt: '',
    f3Date: moment(new Date()).format('YYYY-MM-DD'),
    f4DateNext: null,
    f4DatePrev: null,
    f4Sid: null,
    f4SidPrev: null,
    f4Mt: '',
    f4Date: moment(new Date()).format('YYYY-MM-DD'),
    f5DateNext: null,
    f5DatePrev: null,
    f5Sid: null,
    f5SidPrev: null,
    f5Mt: '',
    f5Date: moment(new Date()).format('YYYY-MM-DD'),
    fno: null,
    id: null,
    manual: true,
    serviceBranchId: '',
    serviceBranchName: null,
    tovarSn: '',
  };

  const [contract, setContract] = useState({ ...emptyContract });
  const [servFilter, setServFilter] = useState({ ...emptyServFilter });
  const [startDate, setStartDate] = useState(moment(new Date()));
  const [customerF4ModalOpen, setCustomerF4ModalOpen] = useState(false);
  const [staffF4ModalOpen, setStaffF4ModalOpen] = useState(false);
  const [addressF4ModalOpen, setAddressF4ModalOpen] = useState(false);
  const [contractTypeOpts, setContractTypeOpts] = useState([]);
  const [matnrListF4ModalOpen, setMatnrListF4ModalOpen] = useState(false);
  const [error, setError] = useState([]);

  const {
    companyOptions = [],
    branchOptions = [],
    phoneList = [],
    phoneListType,
    branchService,
    contractTypeList,
    monthTerms,
    language,
    matnrListView,
    intl: { messages },
  } = props;

  const lang = language.charAt(0).toUpperCase() + language.slice(1);

  useEffect(() => {
    props.f4FetchPhone();
    props.f4FetchPhoneType();
    props.f4FetchConTypeList();
    props.f4FetchBranches();
    return () => {
      props.f4ClearAnyObject('F4_CLEAR_CONTYPE_LIST');
      props.f4ClearAnyObject('F4_CLEAR_BRANCHES');
      props.f4ClearAnyObject('F4_CLEAR_PHONE');
    };
  }, []);

  useEffect(() => {
    const { bukrsId, servBranchId, matnr } = contract;
    if (bukrsId !== '' && servBranchId !== '' && matnr !== '') {
      props.f4FetchMonthTerms({
        branchId: servBranchId,
        bukrs: bukrsId,
        matnr,
      });
    }
  }, [contract.bukrsId, contract.servBranchId, contract.matnr]);

  useEffect(() => {
    const { bukrsId, matnr } = contract;
    if (bukrsId !== '' && matnr !== '') {
      props.f4FetchMatnrListView({
        bukrs: bukrsId,
        matnr,
      });
    }
  }, [contract.bukrsId, contract.matnr]);

  console.log(servFilter);

  useEffect(() => {
    if (monthTerms) {
      setServFilter(
        { ...servFilter },
        monthTerms.map(item => {
          console.log(item);
          {
            servFilter.f1Mt = item.f1;
            servFilter.f2Mt = item.f2;
            servFilter.f3Mt = item.f3;
            servFilter.f4Mt = item.f4;
            servFilter.f5Mt = item.f5;
            servFilter.branchMonthTermsId = item.id;
          }
        }),
      );
    }
  }, [monthTerms]);

  useEffect(() => {
    const { tovarCategoryId } = contract;
    if (tovarCategoryId) {
      setContract(prev => {
        const varContract = { ...prev };
        if (tovarCategoryId === 2) {
          varContract.disabled = false;
        } else if (tovarCategoryId === 1) {
          varContract.check = false;
          varContract.disabled = true;
          varContract.tovarCategoryId = 1;
        }
        return varContract;
      });
    }
  }, [contract.tovarCategoryId]);

  const onInputChange = (o, fieldName) => {
    setContract(prev => {
      const varContract = { ...prev };
      switch (fieldName) {
        case 'bukrsId':
          varContract.bukrsId = o.value;
          break;
        case 'branchId':
          let waSelectedBranch = {};
          branchOptions[contract.bukrsId]
            .filter(item => item.key === o.value)
            .forEach(item => {
              waSelectedBranch = item;
            });

          varContract.selectedBranch = waSelectedBranch;
          varContract.tovarCategoryId = waSelectedBranch.tovarcategory;
          varContract.branchId = o.value;
          varContract.tovarSn = '';

          let wa = { ...emptyContract };
          wa.bukrsId = prev.bukrsId;
          wa.branchId = o;

          let waConOptions = contractTypeList
            .filter(
              item =>
                (item.bukrs == wa.bukrsId &&
                  item.business_area_id === waSelectedBranch.businessareaid) ||
                (item.bukrs === wa.bukrsId &&
                  item.businessareaid === 4 &&
                  waSelectedBranch.branchId === 210),
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
        case 'servBranchId':
          varContract.servBranchId = o.value;
          setServFilter({ ...servFilter, serviceBranchId: o.value });
          break;
        case 'contractTypeId':
          let matnr = 0;
          for (let i = 0; i < o.options.length; i++) {
            if (o.value === o.options[i].value) {
              matnr = o.options[i].matnr;
            }
          }
          varContract.contractTypeId = o.value;
          varContract.matnr = matnr;
          break;
        case 'contractDate':
          varContract.contractDate = o.format('YYYY-MM-DD');
          break;
        case 'dealerId':
          varContract.dealerId = o.staffId;
          varContract.dealerName = o.fio;
          break;
        case 'dealerRemove':
          varContract.dealerId = '';
          varContract.dealerName = '';
          break;
        case 'customer':
          varContract.customerId = o.id;
          varContract.customerName = o.fullFIO;
          if (o.email) {
            varContract.email = o.email;
          }
          break;
        case 'customerRemove':
          varContract.customerId = '';
          varContract.customerName = '';
          varContract.email = '';
          break;
        case 'serviceAddressId':
          varContract.serviceAddressId = o.addr_id;
          varContract.addrService = o.address;
          break;
        case 'serviceAddressIdRemove':
          varContract.serviceAddressId = '';
          varContract.addrService = '';
          break;
        case 'tovarSn':
          if (o.tovarSerial === undefined) {
            varContract.tovarSn = o.value;
            setServFilter({ ...servFilter, tovarSn: o.value });
          } else {
            varContract.tovarSn = o.tovarSerial;
            setServFilter({ ...servFilter, tovarSn: o.tovarSerial });
          }
          varContract.matnrListId = o.matnrListId;
          break;
        case 'removeTovarSerial':
          varContract.tovarSn = '';
          varContract.matnrListId = '';
          break;
        case 'email':
          varContract.email = o.value;
          break;
        case 'info':
          varContract.info = o.value;
          break;
        case 'checkbox':
          varContract.check = o.checked;
          if (o.checked) {
            varContract.lastState = 4;
          } else {
            varContract.lastState = 2;
          }
          break;
        case 'serviceFilterF1':
          setServFilter({ ...servFilter, f1: parseInt(o.value, 10) });
          break;
        case 'serviceFilterF2':
          setServFilter({ ...servFilter, f2: parseInt(o.value, 10) });
          break;
        case 'serviceFilterF3':
          setServFilter({ ...servFilter, f3: parseInt(o.value, 10) });
          break;
        case 'serviceFilterF4':
          setServFilter({ ...servFilter, f4: parseInt(o.value, 10) });
          break;
        case 'serviceFilterF5':
          setServFilter({ ...servFilter, f5: parseInt(o.value, 10) });
          break;

        default:
          varContract[fieldName] = o.value;
      }
      return varContract;
    });
  };

  const handleClick = () => {
    validate();
    const {
      bukrsId,
      branchId,
      servBranchId,
      contractTypeId,
      contractDate,
      customerId,
      dealerId,
      tovarSn,
      serviceAddressId,
      matnrListId,
      info,
      lastState,
      tovarCategoryId,
    } = contract;

    const { branchMonthTermsId } = servFilter;
    if (
      bukrsId !== '' &&
      branchId !== '' &&
      servBranchId !== '' &&
      contractTypeId !== '' &&
      customerId !== '' &&
      tovarSn !== '' &&
      serviceAddressId
    ) {
      props.f4CreateServContract({
        branchMonthTermsId,
        contract: {
          ...contract,
          serviceAddressId,
          branchId,
          bukrsId,
          contractDate,
          contractNumber: contractTypeId,
          customerId,
          dealerId,
          info,
          lastState,
          matnrListId,
          serviceBranchId: servBranchId,
          tovarCategoryId,
          tovarSn,
        },
        serviceFilter: {
          ...servFilter,
          bukrsId,
          contractNumber: contractTypeId,
          serviceBranchId: servBranchId,
        },
      });
      clearContract();
    }
  };

  const clearContract = () => {
    setContract({
      bukrsId: '',
      branchId: '',
      servBranchId: '',
      contractTypeId: '',
      contractDate: moment(new Date()).format('YYYY-MM-DD'),
      customerId: '',
      dealerId: '',
      tovarSn: '',
      serviceAddressId: '',
      email: '',
      info: '',
      matnrListId: '',
      lastState: 2,
      dealerName: '',
      customerName: '',
      addrService: '',
      selectedBranch: '',
      matnr: '',
      check: false,
      disabled: true,
      tovarCategoryId: '',
    });
    setServFilter({
      branchMonthTermsId: '',
      f1Mt: '',
      f1Date: moment(new Date()).format('YYYY-MM-DD'),
      f2Mt: '',
      f2Date: moment(new Date()).format('YYYY-MM-DD'),
      f3Mt: '',
      f3Date: moment(new Date()).format('YYYY-MM-DD'),
      f4Mt: '',
      f4Date: moment(new Date()).format('YYYY-MM-DD'),
      f5Mt: '',
      f5Date: moment(new Date()).format('YYYY-MM-DD'),
      serviceBranchId: '',
      tovarSn: '',
    });
    setContractTypeOpts([]);
  };

  const validate = () => {
    const errors = [];
    if (contract.bukrsId === '') {
      errors.push(errorTableText(5));
    }
    if (contract.branchId === '') {
      errors.push(errorTableText(7));
    }
    if (contract.servBranchId === '') {
      errors.push(errorTableText(168));
    }
    if (contract.contractTypeId === '') {
      errors.push(errorTableText(17));
    }
    if (contract.customerId === '') {
      errors.push(errorTableText(9));
    }
    if (contract.tovarSn === '') {
      errors.push(errorTableText(21));
    }
    if (contract.serviceAddressId === '') {
      errors.push(errorTableText(118));
    }
    setError(() => errors);
  };

  return (
    <Segment>
      <h1>{messages['service_contract']}</h1>
      <CustomerF4Modal
        open={customerF4ModalOpen}
        onCloseCustomerF4={bool => setCustomerF4ModalOpen(bool)}
        onCustomerSelect={item => onInputChange(item, 'customer')}
      />
      <StaffF4Modal
        open={staffF4ModalOpen}
        closeModal={bool => setStaffF4ModalOpen(bool)}
        onStaffSelect={item => onInputChange(item, 'dealerId')}
        trans="mmcc"
        brnch={contract.branchId}
        branchOptions={branchOptions}
        bukrs={contract.bukrsId}
        companyOptions={getCompanyOptions(companyOptions)}
        bukrsDisabledParent
        unemployedDisabledParent
      />

      <AddressF4Modal
        open={addressF4ModalOpen}
        customerId={contract.customerId}
        customerName={contract.customerName}
        selectedBranch={contract.selectedBranch}
        onCloseAddressF4={bool => setAddressF4ModalOpen(bool)}
        onAddressSelect={item => onInputChange(item, 'serviceAddressId')}
      />

      <MatnrListF4Modal
        open={matnrListF4ModalOpen}
        matnrList={contract.matnrList}
        onCloseMatnrF4={bool => setMatnrListF4ModalOpen(bool)}
        onMatnrSelect={item => onInputChange(item, 'tovarSn')}
        matnrList={matnrListView}
      />
      <Segment>
        <Form>
          <Grid>
            <Grid.Row>
              <Grid.Column mobile={16} table={16} computer={8}>
                <h3>{messages['contract']}</h3>
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
                          value={contract.bukrsId}
                          onChange={(e, o) => onInputChange(o, 'bukrsId')}
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
                            contract.bukrsId
                              ? branchOptions[contract.bukrsId]
                              : []
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
                              ? branchService[contract.bukrsId]
                              : []
                          }
                          value={contract.servBranchId}
                          onChange={(e, o) => onInputChange(o, 'servBranchId')}
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
                          value={contract.contractTypeId}
                          onChange={(e, o) =>
                            onInputChange(o, 'contractTypeId')
                          }
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
                          onChange={date => {
                            setStartDate(date);
                            onInputChange(date, 'contractDate');
                          }}
                          showMonthDropdown
                          showYearDropdown
                          maxDate={moment(new Date())}
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
                          staffId={contract.dealerId}
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
                        <Icon name="factory" />
                        {messages['productSerialNumber']}
                      </Table.Cell>
                      <Table.Cell>
                        <Input
                          placeholder={messages['productSerialNumber']}
                          fluid
                          value={contract.tovarSn ? contract.tovarSn : ''}
                          onChange={(e, o) => onInputChange(o, 'tovarSn')}
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
                      <Table.Cell>
                        <Checkbox
                          toggle
                          disabled={contract.disabled}
                          onChange={(e, o) => onInputChange(o, 'checkbox')}
                        />
                      </Table.Cell>
                    </Table.Row>
                    {contract.check ? (
                      <Table.Row>
                        <Table.Cell></Table.Cell>
                        <Table.Cell
                          style={{
                            display: 'flex',
                          }}
                        >
                          <Input
                            className="input__set"
                            label="F1"
                            size="mini"
                            value={servFilter.f1Mt}
                            onChange={(e, o) =>
                              onInputChange(o, 'serviceFilterF1')
                            }
                          />
                          <Input
                            className="input__set"
                            label="F2"
                            size="mini"
                            value={servFilter.f2Mt}
                            onChange={(e, o) =>
                              onInputChange(o, 'serviceFilterF2')
                            }
                          />
                          <Input
                            className="input__set"
                            label="F3"
                            size="mini"
                            value={servFilter.f3Mt}
                            onChange={(e, o) =>
                              onInputChange(o, 'serviceFilterF3')
                            }
                          />
                          <Input
                            className="input__set"
                            label="F4"
                            size="mini"
                            value={servFilter.f4Mt}
                            onChange={(e, o) =>
                              onInputChange(o, 'serviceFilterF4')
                            }
                          />
                          <Input
                            className="input__set"
                            label="F5"
                            size="mini"
                            value={servFilter.f5Mt}
                            onChange={(e, o) =>
                              onInputChange(o, 'serviceFilterF5')
                            }
                          />
                        </Table.Cell>
                      </Table.Row>
                    ) : (
                      <Table.Row></Table.Row>
                    )}
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
                            onInputChange('remove', 'serviceAddressIdRemove');
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
                                            <label>{type[`name${lang}`]}</label>
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
                              <Table.Row>
                                <Table.Cell textAlign="center">
                                  <Label basic color="red">
                                    {messages['choose_client']}
                                  </Label>
                                </Table.Cell>
                              </Table.Row>
                            )}
                          </Table.Body>
                        </Table>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Icon name="mail" />
                        E-Mail
                      </Table.Cell>
                      <Table.Cell>
                        <Input
                          placeholder="E-Mail"
                          fluid
                          value={contract.email}
                          disabled
                        />
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
                        <TextArea
                          placeholder={messages['extraInfo']}
                          onChange={(e, o) => onInputChange(o, 'info')}
                        />
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
    matnrListView: state.f4.matnrListView.data,
  };
}

export default connect(mapStateToProps, {
  f4FetchBranchesByBukrs,
  f4FetchConTypeList,
  f4ClearAnyObject,
  f4FetchBranches,
  f4FetchPhone,
  f4FetchPhoneType,
  f4FetchMonthTerms,
  f4FetchMatnrListView,
  f4CreateServContract,
})(injectIntl(Smcc));
