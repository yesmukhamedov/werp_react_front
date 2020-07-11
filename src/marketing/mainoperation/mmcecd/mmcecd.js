//Marketing mainoperation contract edit contact details
//mmcecd
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  Container,
  Header,
  Table,
  Button,
  Icon,
  Input,
  TextArea,
  Grid,
} from 'semantic-ui-react';
import queryString from 'query-string';
import { handleFocus } from '../../../utils/helpers';
import { fetchDynObjMarketing, onSaveMmcTrans } from '../../marketingAction';
import { LinkToCustomerHrc03, LinkToMmcvNewTab } from '../../../utils/outlink';
import AddressF4Modal from '../../../reference/f4/address/addressF4WithCreationPage';

import {
  f4FetchPhoneType,
  f4FetchBranchesByBukrs,
  f4FetchPhone,
} from '../../../reference/f4/f4_action';

const Mmcecd = props => {
  const emptyContract = {
    contractNumber: '',
    bukrs: '',
    bukrsName: '',
    branchId: '',
    branchName: '',
    contractTypeId: '',
    contractTypeName: '',
    customerId: '',
    customerName: '',
    addrHomeId: 0,
    addrWorkId: 0,
    addrServiceId: 0,
  };

  const tcode = 'MMCECD';

  const [contract, setContract] = useState({ ...emptyContract });
  const [newContract, setNewContract] = useState({ ...emptyContract });
  const [contractNumberSearch, setContractNumberSearch] = useState('');
  const [isLoadingContract, setIsLoadingContract] = useState(false);
  const [isSavingContract, setIsSavingContract] = useState(false);
  const [isDisabledSaveButton, setIsDisabledSaveButton] = useState(true);
  const [oldAddrHome, setOldAddrHome] = useState({});
  const [oldAddrWork, setOldAddrWork] = useState({});
  const [oldAddrService, setOldAddrService] = useState({});
  const [newAddrHome, setNewAddrHome] = useState({});
  const [newAddrWork, setNewAddrWork] = useState({});
  const [newAddrService, setNewAddrService] = useState({});

  const [countryId, setCountryId] = useState({});

  const [addressF4ModalOpen, setAddressF4ModalOpen] = useState(false);
  const [addressF4ModalType, setAddressF4ModalType] = useState('');

  const {
    mmcecd,
    intl: { messages },
    phoneTypeList = [],
    bukrsBranches = [],
    phoneList = [],
    language,
  } = props;

  //componentDidMount
  useEffect(() => {
    const url = props.location.search;
    const params = queryString.parse(url);

    props.f4FetchPhoneType();

    if (params.contractNumber) {
      setContractNumberSearch(params.contractNumber);
      onSearchContract(params.contractNumber);
    }

    //unmount
    return () => {};
  }, []);

  const findPhoneType = id => {
    return phoneTypeList.find(element => element.id === id);
  };

  //componentWillRecieveProps
  useEffect(() => {
    if (mmcecd && mmcecd.contract) {
      setContract({ ...mmcecd.contract });
      setNewContract({ ...mmcecd.contract });
      setIsDisabledSaveButton(true);
    }

    if (mmcecd && mmcecd.oldAddrHome) setOldAddrHome({ ...mmcecd.oldAddrHome });
    if (mmcecd && mmcecd.oldAddrService)
      setOldAddrService({ ...mmcecd.oldAddrService });
    if (mmcecd && mmcecd.oldAddrWork) setOldAddrWork({ ...mmcecd.oldAddrWork });

    if (mmcecd && mmcecd.oldAddrHome) setNewAddrHome({ ...mmcecd.oldAddrHome });
    if (mmcecd && mmcecd.oldAddrService)
      setNewAddrService({ ...mmcecd.oldAddrService });
    if (mmcecd && mmcecd.oldAddrWork) setNewAddrWork({ ...mmcecd.oldAddrWork });

    if (mmcecd && mmcecd.contract && mmcecd.contract.bukrs) {
      props.f4FetchBranchesByBukrs(mmcecd.contract.bukrs);
    }

    if (mmcecd && mmcecd.contract && mmcecd.contract.customerId) {
      props.f4FetchPhone({
        search: `customerId==${mmcecd.contract.customerId}`,
      });
    }
  }, [mmcecd]);

  useEffect(() => {
    if (bukrsBranches && bukrsBranches.length > 0) {
      const branch = bukrsBranches.find(
        item => item.branch_id === contract.branchId,
      );
      setCountryId(branch.country_id);
    }
  }, [bukrsBranches]);

  const onSearchContract = contractNumber => {
    props.fetchDynObjMarketing(
      'marketing/contract/mmcecd/fetchContract',
      { contractNumber, tcode },
      bool => setIsLoadingContract(bool),
    );
  };

  const onInputChange = (value, fieldName) => {
    setNewContract(prev => {
      let waNewContract = {};

      if (fieldName === 'addrHomeId') {
        waNewContract = { ...prev, addrHomeId: value.addr_id };
        setNewAddrHome(value);
      } else if (fieldName === 'addrHomeIdRemove') {
        waNewContract = { ...prev, addrHomeId: 0 };
        setNewAddrHome({});
      } else if (fieldName === 'addrWorkId') {
        waNewContract = { ...prev, addrWorkId: value.addr_id };
        setNewAddrWork(value);
      } else if (fieldName === 'addrWorkIdRemove') {
        waNewContract = { ...prev, addrWorkId: 0 };
        setNewAddrWork({});
      } else if (fieldName === 'addrServiceId') {
        waNewContract = { ...prev, addrServiceId: value.addr_id };
        setNewAddrService(value);
      } else if (fieldName === 'addrServiceIdRemove') {
        waNewContract = { ...prev, addrServiceId: 0 };
        setNewAddrService({});
      }

      if (
        contract &&
        contract.contractNumber &&
        contract.addrHomeId === waNewContract.addrHomeId &&
        contract.addrWorkId === waNewContract.addrWorkId &&
        contract.addrServiceId === waNewContract.addrServiceId
      )
        setIsDisabledSaveButton(true);
      else setIsDisabledSaveButton(false);

      return waNewContract;
    });
  };

  const onSave = () => {
    props.onSaveMmcTrans(
      'marketing/contract/mmcecd/saveContract',
      {
        contract,
        newContract,
        oldAddrHome,
        oldAddrWork,
        oldAddrService,
        newAddrHome,
        newAddrWork,
        newAddrService,
      },
      { tcode },
      setIsSavingContract,
    );
  };

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
        {messages['transNameMmcecd']}
      </Header>
      {/* {console.log(newContract,'newContract')} */}

      <AddressF4Modal
        open={addressF4ModalOpen}
        customerId={contract.customerId}
        customerName={contract.customerName}
        onCloseAddressF4={bool => {
          setAddressF4ModalOpen(bool);
          if (!bool && contract.customerId && contract.customerId > 0) {
            props.f4FetchPhone({
              search: `customerId==${contract.customerId}`,
            });
          }
        }}
        onAddressSelect={item => onInputChange(item, addressF4ModalType)}
        countryId={countryId}
      />

      <Grid>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={5} computer={5}>
            <Table collapsing className="borderLess">
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Input
                      value={contractNumberSearch}
                      maxLength="12"
                      placeholder={messages['snNum']}
                      onFocus={handleFocus}
                      onChange={(e, { value }) =>
                        setContractNumberSearch(value)
                      }
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      icon
                      labelPosition="left"
                      primary
                      size="small"
                      loading={isLoadingContract}
                      onClick={() => onSearchContract(contractNumberSearch)}
                    >
                      <Icon name="search" size="large" /> {messages['search']}
                    </Button>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{messages['snNum']}</Table.Cell>
                  <Table.Cell>
                    <span>
                      <LinkToMmcvNewTab
                        contractNumber={contract.contractNumber}
                      />
                    </span>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{messages['bukrs']}</Table.Cell>
                  <Table.Cell>
                    <Input value={contract.bukrsName} />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{messages['brnch']}</Table.Cell>
                  <Table.Cell>
                    <Input value={contract.branchName} />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{messages['contractType']}</Table.Cell>
                  <Table.Cell>
                    <Input value={contract.contractTypeName} />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{messages['client']}</Table.Cell>
                  <Table.Cell>
                    <span>
                      <LinkToCustomerHrc03
                        customerId={contract.customerId}
                        customerName={contract.customerName}
                      />
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={11} computer={11}>
            <div>
              <Table collapsing className="borderLess">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>{messages['addrType']}</Table.HeaderCell>
                    <Table.HeaderCell>{messages['address']}</Table.HeaderCell>
                    <Table.HeaderCell>{messages['telDom']}</Table.HeaderCell>
                    <Table.HeaderCell>{messages['telMob1']}</Table.HeaderCell>
                    <Table.HeaderCell>{messages['telMob2']}</Table.HeaderCell>
                    <Table.HeaderCell />
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>{messages['addressHome']}</Table.Cell>
                    <Table.Cell>
                      <span>{newAddrHome.address}</span>
                    </Table.Cell>
                    <Table.Cell>
                      <span>{newAddrHome.telDom}</span>
                    </Table.Cell>
                    <Table.Cell>
                      <span>{newAddrHome.telMob1}</span>
                    </Table.Cell>
                    <Table.Cell>
                      <span>{newAddrHome.telMob2}</span>
                    </Table.Cell>
                    <Table.Cell>
                      <span>
                        <Icon
                          name="clone"
                          size="large"
                          className="clickableIcon"
                          onClick={() => {
                            setAddressF4ModalOpen(true);
                            setAddressF4ModalType('addrHomeId');
                          }}
                        />
                        <Icon
                          name="remove"
                          size="large"
                          className="clickableIcon"
                          color="red"
                          onClick={event =>
                            onInputChange('remove', 'addrHomeIdRemove')
                          }
                        />
                      </span>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>{messages['addressWork']}</Table.Cell>
                    <Table.Cell>
                      <span>{newAddrWork.address}</span>
                    </Table.Cell>
                    <Table.Cell>
                      <span>{newAddrWork.telDom}</span>
                    </Table.Cell>
                    <Table.Cell>
                      <span>{newAddrWork.telMob1}</span>
                    </Table.Cell>
                    <Table.Cell>
                      <span>{newAddrWork.telMob2}</span>
                    </Table.Cell>
                    <Table.Cell>
                      <span>
                        <Icon
                          name="clone"
                          size="large"
                          className="clickableIcon"
                          onClick={() => {
                            setAddressF4ModalOpen(true);
                            setAddressF4ModalType('addrWorkId');
                          }}
                        />
                        <Icon
                          name="remove"
                          size="large"
                          className="clickableIcon"
                          color="red"
                          onClick={event =>
                            onInputChange('remove', 'addrWorkIdRemove')
                          }
                        />
                      </span>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>{messages['addressService']}</Table.Cell>
                    <Table.Cell>
                      <span>{newAddrService.address}</span>
                    </Table.Cell>
                    <Table.Cell>
                      <span>{newAddrService.telDom}</span>
                    </Table.Cell>
                    <Table.Cell>
                      <span>{newAddrService.telMob1}</span>
                    </Table.Cell>
                    <Table.Cell>
                      <span>{newAddrService.telMob2}</span>
                    </Table.Cell>
                    <Table.Cell>
                      <span>
                        <Icon
                          name="clone"
                          size="large"
                          className="clickableIcon"
                          onClick={() => {
                            setAddressF4ModalOpen(true);
                            setAddressF4ModalType('addrServiceId');
                          }}
                        />
                        <Icon
                          name="remove"
                          size="large"
                          className="clickableIcon"
                          color="red"
                          onClick={event =>
                            onInputChange('remove', 'addrServiceIdRemove')
                          }
                        />
                      </span>
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Button
                        icon
                        labelPosition="left"
                        primary
                        size="small"
                        disabled={isDisabledSaveButton}
                        loading={isSavingContract}
                        onClick={() => onSave()}
                      >
                        <Icon name="save" size="large" />
                        {messages['save']}
                      </Button>
                    </Table.Cell>
                    <Table.Cell />
                    <Table.Cell />
                  </Table.Row>
                </Table.Body>
              </Table>

              <Table striped selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>
                      {messages['phone_type']}
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      {messages['Table.PhoneNumber']}
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {phoneList.map((phone, key) => {
                    const phontType = findPhoneType(phone.typeId);
                    return (
                      <Table.Row key={key}>
                        <Table.Cell>
                          <label>
                            {
                              phontType[
                                `name${language.charAt(0).toUpperCase() +
                                  language.slice(1)}`
                              ]
                            }
                          </label>
                        </Table.Cell>
                        <Table.Cell>
                          <label>{phone.phone}</label>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            </div>
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
    mmcecd: state.marketing.dynamicObject.mmcecd,
    phoneTypeList: state.f4.phoneType.data,
    bukrsBranches: state.f4.bukrsBranches,
    phoneList: state.f4.phoneList.data,
  };
}

export default connect(mapStateToProps, {
  fetchDynObjMarketing,
  onSaveMmcTrans,
  f4FetchPhoneType,
  f4FetchBranchesByBukrs,
  f4FetchPhone,
})(injectIntl(Mmcecd));
