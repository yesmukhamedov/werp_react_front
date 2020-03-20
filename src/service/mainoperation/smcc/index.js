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
    servBranchId: '',
    contractTypeId: '',
    contractDate: moment(new Date()).format('YYYY-MM-DD'),
    customerId: '',
    dealer: '',
    tovarSerial: '',
    addrServiceId: '',
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
    tovarCategory: '',

    servFilter: {
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
      servBranch: '',
      tovarSn: '',
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
    matnrListView,
    intl: { messages },
    contract: { contractTypeId } = {},
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
    const { bukrs, branchId, matnr } = contract;
    if (bukrs !== '' && branchId !== '' && matnr !== '') {
      props.f4FetchMonthTerms({
        branchId,
        bukrs,
        matnr,
      });
    }
  }, [contract.bukrs, contract.branchId, contract.matnr]);

  useEffect(() => {
    const { bukrs, matnr } = contract;
    if (bukrs !== '' && matnr !== '') {
      props.f4FetchMatnrListView({
        bukrs,
        matnr,
      });
    }
  }, [contract.bukrs, contract.matnr]);

  useEffect(() => {
    if (monthTerms) {
      setContract(
        { ...contract },
        monthTerms.map(item => {
          {
            contract.servFilter.f1Mt = item.f1;
            contract.servFilter.f2Mt = item.f2;
            contract.servFilter.f3Mt = item.f3;
            contract.servFilter.f4Mt = item.f4;
            contract.servFilter.f5Mt = item.f5;
            contract.servFilter.branchMonthTermsId = item.id;
          }
        }),
      );
    }
  }, [monthTerms]);

  useEffect(() => {
    const { tovarCategory } = contract;
    if (tovarCategory) {
      setContract(prev => {
        const varContract = { ...prev };
        if (tovarCategory === 2) {
          varContract.disabled = false;
        } else if (tovarCategory === 1) {
          varContract.check = false;
          varContract.disabled = true;
          varContract.tovarCategory = 1;
        }
        return varContract;
      });
    }
  }, [contract.tovarCategory]);

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
          varContract.tovarCategory = waSelectedBranch.tovarcategory;
          varContract.branchId = o.value;
          varContract.tovarSerial = '';

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
        case 'servBranchId':
          varContract.servBranchId = o.value;
          varContract.servFilter.servBranch = o.value;
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
          if (o.email) {
            varContract.email = o.email;
          }
          break;
        case 'customerRemove':
          varContract.customerId = '';
          varContract.customerName = '';
          varContract.email = '';
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
          if (o.tovarSerial === undefined) {
            varContract.tovarSerial = o.value;
            varContract.servFilter.tovarSn = o.value;
          } else {
            varContract.tovarSerial = o.tovarSerial;
            varContract.servFilter.tovarSn = o.tovarSerial;
          }
          varContract.matnrListId = o.matnrListId;
          break;
        case 'removeTovarSerial':
          varContract.tovarSerial = '';
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
        case 'servFilterF1':
          varContract.servFilter.f1 = parseInt(o.value, 10);
          break;
        case 'servFilterF2':
          varContract.servFilter.f2 = parseInt(o.value, 10);
          break;
        case 'servFilterF3':
          varContract.servFilter.f3 = parseInt(o.value, 10);
          break;
        case 'servFilterF4':
          varContract.servFilter.f4 = parseInt(o.value, 10);
          break;
        case 'servFilterF5':
          varContract.servFilter.f5 = parseInt(o.value, 10);
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
      bukrs,
      branchId,
      servBranchId,
      contractTypeId,
      contractDate,
      customerId,
      dealer,
      tovarSerial,
      addrServiceId,
      matnrListId,
      info,
      lastState,
      tovarCategory,
      servFilter,
    } = contract;

    const { branchMonthTermsId } = contract.servFilter;
    if (
      bukrs !== '' &&
      branchId !== '' &&
      servBranchId !== '' &&
      contractTypeId !== '' &&
      customerId !== '' &&
      tovarSerial !== '' &&
      addrServiceId
    ) {
      props.f4CreateServContract({
        branchMonthTermsId,
        contract: {
          addrServiceId,
          branchId,
          bukrs,
          contractDate,
          contractTypeId,
          customerId,
          dealer,
          info,
          lastState,
          matnrListId,
          servBranchId,
          tovarCategory,
          tovarSerial,
        },
        servFilter,
      });
      clearContract();
    }
  };

  const clearContract = () => {
    setContract({
      bukrs: '',
      branchId: '',
      servBranchId: '',
      contractTypeId: '',
      contractDate: moment(new Date()).format('YYYY-MM-DD'),
      customerId: '',
      dealer: '',
      tovarSerial: '',
      addrServiceId: '',
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
      tovarCategory: '',

      servFilter: {
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
        servBranch: '',
        tovarSn: '',
      },
    });
    setContractTypeOpts([]);
  };

  const validate = () => {
    const errors = [];
    if (contract.bukrs === '') {
      errors.push(errorTable[`5${language}`]);
    }
    if (contract.branchId === '') {
      errors.push(errorTable[`7${language}`]);
    }
    if (contract.servBranchId === '') {
      errors.push(errorTable[`7${language}`]);
    }
    if (contract.contractTypeId === '') {
      errors.push(errorTable[`17${language}`]);
    }
    if (contract.customerId === '') {
      errors.push(errorTable[`9${language}`]);
    }
    if (contract.tovarSerial === '') {
      errors.push(errorTable[`21${language}`]);
    }
    if (contract.addrServiceId === '') {
      errors.push(errorTable[`118${language}`]);
    }
    setError(() => errors);
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
        matnrList={matnrListView}
      />

      <PhoneF4Modal
        open={phoneF4ModalOpen}
        customerId={contract.customerId}
        selectedBranch={contract.selectedBranch}
        onClosePhoneF4={bool => setPhoneF4ModalOpen(bool)}
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
                          value={contractTypeId}
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
                        <Icon name="factory" />
                        {messages['productSerialNumber']}
                      </Table.Cell>
                      <Table.Cell>
                        <Input
                          placeholder={messages['productSerialNumber']}
                          fluid
                          value={contract.tovarSerial}
                          onChange={(e, o) => onInputChange(o, 'tovarSerial')}
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
                            value={contract.servFilter.f1Mt}
                            onChange={(e, o) =>
                              onInputChange(o, 'servFilterF1')
                            }
                          />
                          <Input
                            className="input__set"
                            label="F2"
                            size="mini"
                            value={contract.servFilter.f2Mt}
                            onChange={(e, o) =>
                              onInputChange(o, 'servFilterF2')
                            }
                          />
                          <Input
                            className="input__set"
                            label="F3"
                            size="mini"
                            value={contract.servFilter.f3Mt}
                            onChange={(e, o) =>
                              onInputChange(o, 'servFilterF3')
                            }
                          />
                          <Input
                            className="input__set"
                            label="F4"
                            size="mini"
                            value={contract.servFilter.f4Mt}
                            onChange={(e, o) =>
                              onInputChange(o, 'servFilterF4')
                            }
                          />
                          <Input
                            className="input__set"
                            label="F5"
                            size="mini"
                            value={contract.servFilter.f5Mt}
                            onChange={(e, o) =>
                              onInputChange(o, 'servFilterF5')
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
                      <Table.Cell>
                        <Button
                          basic
                          color="blue"
                          icon
                          onClick={() => {
                            if (contract.customerId) {
                              setPhoneF4ModalOpen(true);
                            }
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
                        <Input
                          placeholder="E-Mail"
                          fluid
                          value={contract.email}
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
