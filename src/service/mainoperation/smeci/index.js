import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Segment,
  Grid,
  Form,
  Table,
  Icon,
  Input,
  Button,
  TextArea,
  Label,
  Checkbox,
  Dropdown,
} from 'semantic-ui-react';
import {
  fetchSmeciContractInfo,
  postSmeciContractInfo,
} from '../../serviceAction';
import {
  f4FetchCrmCategory,
  f4FetchBranches,
} from '../../../reference/f4/f4_action';

import AddressF4Modal from '../../../reference/f4/address/addressF4WithCreationPage';

import { injectIntl } from 'react-intl';
import './smeci.css';
import moment from 'moment';

function Smeci(props) {
  const url = window.location.search;
  const contractNumber = url.slice(url.indexOf('=') + 1);

  const emptyContract = {
    f1Mt: '',
    f2Mt: '',
    f3Mt: '',
    f4Mt: '',
    f5Mt: '',
    serviceBranchId: '',
    serviceAddressId: '',
    serviceAddressName: '',
    contactPersonName: '',
    countryId: '',
    servCrmCategory: '',
    info: '',
    info2: '',
  };

  const [contract, setContract] = useState({ ...emptyContract });
  const [addressF4ModalOpen, setAddressF4ModalOpen] = useState(false);

  const {
    contractInfo = [],
    branchOptionsService = [],
    intl: { messages },
    crmCategory = [],
    branches = [],
  } = props;

  const {
    countryName,
    countryId,
    bukrsName,
    bukrsId,
    branchName,
    branchId,
    serviceBranchName,
    serviceBranchId,
    tovarSn,
    customerFIO,
    contactPersonName,
    serviceAddressName,
    fullPhone,
    serviceCrmCategoryName,
    serviceCrmCategoryId,
    contractDate,
    installmentDate,
    dealerFIO,
    dealerId,
    fitterFIO,
    fitterId,
    warrantyEndDate,
    warranty,
    warrantyEndedMonths,
    f1Mt,
    f2Mt,
    f3Mt,
    f4Mt,
    f5Mt,
    f1MtLeft,
    f2MtLeft,
    f3MtLeft,
    f4MtLeft,
    f5MtLeft,
    customerId,
    serviceAddressId,
    info,
    lastStateName,
  } = contractInfo;

  useEffect(() => {
    if (contractNumber) {
      props.f4FetchBranches();
      props.fetchSmeciContractInfo({ contractNumber });
      props.f4FetchCrmCategory();
    }
  }, [contractNumber]);

  useEffect(() => {
    if (!addressF4ModalOpen) {
      props.fetchSmeciContractInfo({ contractNumber });
    }
  }, [!addressF4ModalOpen]);

  useEffect(() => {
    if (Object.entries(branchOptionsService).length !== 0 && bukrsId) {
      let branch = {};
      branchOptionsService[bukrsId]
        .filter(item => item.key === serviceBranchId)
        .forEach(item => {
          branch = item;
        });

      setContract({
        ...contract,
        serviceBranchId: serviceBranchId,
        serviceAddressId: serviceAddressId,
        serviceAddressName: serviceAddressName,
        contactPersonName: contactPersonName,
        countryId: branch.countryid,
        servCrmCategory: serviceCrmCategoryId,
        info: info,
      });
    }
  }, [branchId, branchOptionsService]);

  const onInputChange = (e, fieldName) => {
    setContract(prev => {
      const newContract = { ...prev };
      switch (fieldName) {
        case 'f1Mt':
          newContract.f1Mt = e.value;
          break;
        case 'f2Mt':
          newContract.f2Mt = e.value;
          break;
        case 'f3Mt':
          newContract.f3Mt = e.value;
          break;
        case 'f4Mt':
          newContract.f4Mt = e.value;
          break;
        case 'f5Mt':
          newContract.f5Mt = e.value;
          break;
        case 'serviceAddressId':
          newContract.serviceAddressId = e.addr_id;
          newContract.serviceAddressName = e.address;
          break;
        case 'serviceBranchId':
          newContract.serviceBranchId = e.value;
          break;
        case 'contactPersonName':
          newContract.contactPersonName = e.value;
          break;
        case 'servCrmCategory':
          newContract.servCrmCategory = e.value;
          break;
        case 'info':
          newContract.info = e.value;
          break;
        case 'info2':
          newContract.info2 = e.value;
          break;
        default:
          newContract.fieldName = e.value;
      }
      return newContract;
    });
  };

  const handleSubmit = () => {
    const {
      serviceAddressName,
      serviceAddressId,
      contactPersonName,
      serviceBranchId,
      info,
      info2,
      servCrmCategory,
    } = contract;
    props.postSmeciContractInfo(
      {
        serviceAddressName,
        serviceAddressId,
        branchId,
        branchName,
        bukrsId,
        bukrsName,
        contactPersonName,
        contractDate,
        contractNumber,
        countryName,
        countryId,
        customerId,
        customerFIO,
        dealerFIO,
        dealerId,
        f1Mt,
        f2Mt,
        f3Mt,
        f4Mt,
        f5Mt,
        f1MtLeft,
        f2MtLeft,
        f3MtLeft,
        f4MtLeft,
        f5MtLeft,
        fitterFIO,
        fitterId,
        fullPhone,
        info,
        info2,
        installmentDate,
        serviceBranchId,
        serviceBranchName,
        serviceCrmCategoryId: servCrmCategory,
        serviceCrmCategoryName,
        tovarSn,
        warranty,
        warrantyEndDate,
        warrantyEndedMonths,
      },
      () => {
        props.history.push(`smcuspor?contractNumber=${contractNumber}`);
      },
    );
    clearContract();
  };

  const clearContract = () => {
    setContract({
      f1Mt: '',
      f2Mt: '',
      f3Mt: '',
      f4Mt: '',
      f5Mt: '',
      serviceBranchId: '',
      serviceAddressId: '',
      serviceAddressName: '',
      contactPersonName: '',
      countryId: '',
      servCrmCategory: '',
      info: '',
      info2: '',
    });
  };

  return (
    <div>
      <AddressF4Modal
        open={addressF4ModalOpen}
        customerId={customerId}
        onCloseAddressF4={bool => setAddressF4ModalOpen(bool)}
        onAddressSelect={item => onInputChange(item, 'serviceAddressId')}
        countryId={contract.countryId}
      />
      <Grid centered>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={16} computer={7}>
            <h1>{messages['editing']}</h1>
            <Segment>
              <Form>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={10} verticalAlign="middle">
                      <h3>{messages['L__CLIENT_INFO']}</h3>
                    </Grid.Column>
                    <Grid.Column width={6}>
                      <Button
                        fluid
                        color="violet"
                        onClick={() =>
                          props.history.push(
                            `smecim?contractNumber=${contractNumber}`,
                          )
                        }
                      >
                        {messages['admin']}
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Table compact striped>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell width="4">{messages['country']}</Table.Cell>
                      <Table.Cell>
                        <Input
                          size="small"
                          fluid
                          value={countryName ? countryName : ''}
                          disabled
                        />
                      </Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{messages['bukrs']}</Table.Cell>
                      <Table.Cell>
                        <Input
                          size="small"
                          fluid
                          value={bukrsName ? bukrsName : ''}
                          disabled
                        />
                      </Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{messages['brnch']}</Table.Cell>
                      <Table.Cell>
                        <Input
                          size="small"
                          fluid
                          value={branchName ? branchName : ''}
                          disabled
                        />
                      </Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Form.Field>
                          <label>{messages['service_branch']}</label>
                        </Form.Field>
                      </Table.Cell>
                      <Table.Cell>
                        <Dropdown
                          placeholder={messages['service_branch']}
                          fluid
                          selection
                          options={getBranchList(branches)}
                          value={contract.serviceBranchId}
                          onChange={(e, o) =>
                            onInputChange(o, 'serviceBranchId')
                          }
                        />
                      </Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{messages['phys_status']}</Table.Cell>
                      <Table.Cell>
                        <Input
                          size="small"
                          fluid
                          value={lastStateName ? lastStateName : ''}
                          disabled
                        />
                      </Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>CN</Table.Cell>
                      <Table.Cell>
                        <Input
                          size="small"
                          fluid
                          value={contractNumber ? contractNumber : ''}
                          disabled
                        />
                      </Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{messages['factory_number']}</Table.Cell>
                      <Table.Cell>
                        <Input
                          size="small"
                          fluid
                          value={tovarSn ? tovarSn : ''}
                          disabled
                        />
                      </Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{messages['fio']}</Table.Cell>
                      <Table.Cell>
                        <Input
                          size="small"
                          fluid
                          value={customerFIO ? customerFIO : ''}
                          disabled
                        />
                      </Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Form.Field>
                          <label>{messages['contactDetails']}</label>
                        </Form.Field>
                      </Table.Cell>
                      <Table.Cell>
                        <Input
                          size="small"
                          fluid
                          placeholder={messages['contactDetails']}
                          value={
                            contract.contactPersonName
                              ? contract.contactPersonName
                              : ''
                          }
                          onChange={(e, o) =>
                            onInputChange(o, 'contactPersonName')
                          }
                        />
                      </Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Form.Field>
                          <label>{messages['addressService']}</label>
                        </Form.Field>
                      </Table.Cell>
                      <Table.Cell>
                        <Input
                          size="small"
                          fluid
                          value={
                            contract.serviceAddressName
                              ? contract.serviceAddressName
                              : ''
                          }
                          disabled
                        />
                      </Table.Cell>
                      <Table.Cell collapsing>
                        <Button
                          icon
                          basic
                          color="blue"
                          onClick={() => setAddressF4ModalOpen(true)}
                        >
                          <Icon name="clone" />
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{messages['contacts']}</Table.Cell>
                      <Table.Cell>
                        <Input
                          size="small"
                          fluid
                          value={fullPhone ? fullPhone : ''}
                          disabled
                        />
                      </Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Label
                          ribbon
                          color={labelColor(contract.servCrmCategory)}
                        >
                          {messages['category']}
                        </Label>
                      </Table.Cell>
                      <Table.Cell>
                        <Dropdown
                          placeholder={messages['category']}
                          fluid
                          selection
                          options={getCrmCategory(crmCategory)}
                          value={contract.servCrmCategory}
                          onChange={(e, o) =>
                            onInputChange(o, 'servCrmCategory')
                          }
                        />
                      </Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{messages['buying_date']}</Table.Cell>
                      <Table.Cell>
                        <Input
                          size="small"
                          fluid
                          value={
                            contractDate
                              ? moment(contractDate).format('DD-MM-YYYY')
                              : ''
                          }
                          disabled
                        />
                      </Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{messages['installation_date']}</Table.Cell>
                      <Table.Cell>
                        <Input
                          size="small"
                          fluid
                          value={
                            installmentDate
                              ? moment(installmentDate).format('DD-MM-YYYY')
                              : ''
                          }
                          disabled
                        />
                      </Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{messages['dealer']}</Table.Cell>
                      <Table.Cell>
                        <Input
                          size="small"
                          fluid
                          value={dealerFIO ? dealerFIO : ''}
                          disabled
                        />
                      </Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{messages['goodsInstaller']}</Table.Cell>
                      <Table.Cell>
                        <Input
                          size="small"
                          fluid
                          value={fitterFIO ? fitterFIO : ''}
                          disabled
                        />
                      </Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{messages['guarantee_period']}</Table.Cell>
                      <Table.Cell>
                        <Table>
                          <Table.Body>
                            <Table.Row>
                              <Table.Cell>
                                <Input
                                  size="small"
                                  fluid
                                  value={
                                    warrantyEndDate
                                      ? moment(warrantyEndDate).format(
                                          'DD-MM-YYYY',
                                        )
                                      : ''
                                  }
                                  disabled
                                />
                              </Table.Cell>
                              <Table.Cell>
                                <Input
                                  size="small"
                                  fluid
                                  value={`${
                                    warrantyEndedMonths
                                      ? warrantyEndedMonths
                                      : ''
                                  } / ${warranty ? warranty : ''}`}
                                  disabled
                                />
                              </Table.Cell>
                            </Table.Row>
                          </Table.Body>
                        </Table>
                      </Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{messages['replacement_period']} </Table.Cell>
                      <Table.Cell>
                        <Table>
                          <Table.Body>
                            <Table.Row>
                              <Table.Cell>
                                <Checkbox
                                  radio
                                  label={messages['automate']}
                                  name="changeTerm"
                                  value="0"
                                  checked={contractInfo.manual === 0}
                                />
                              </Table.Cell>
                              <Table.Cell>
                                <Checkbox
                                  radio
                                  label={messages['manual']}
                                  name="changeTerm"
                                  value="1"
                                  checked={contractInfo.manual === 1}
                                />
                              </Table.Cell>
                            </Table.Row>
                          </Table.Body>
                        </Table>
                      </Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                    {contractInfo.manual === 1 ? (
                      <Table.Row>
                        <Table.Cell>{messages['filter_term']}</Table.Cell>
                        <Table.Cell>
                          <Input
                            size="mini"
                            label="F1"
                            className="input__filter_terms"
                            value={f1Mt ? f1Mt : 0}
                            disabled
                          />
                          <Input
                            size="mini"
                            label="F2"
                            className="input__filter_terms"
                            value={f2Mt ? f2Mt : 0}
                            disabled
                          />
                          <Input
                            size="mini"
                            label="F3"
                            className="input__filter_terms"
                            value={f3Mt ? f3Mt : 0}
                            disabled
                          />
                          <Input
                            size="mini"
                            label="F4"
                            className="input__filter_terms"
                            value={f4Mt ? f4Mt : 0}
                            disabled
                          />
                          <Input
                            size="mini"
                            label="F5"
                            className="input__filter_terms"
                            value={f5Mt ? f5Mt : 0}
                            disabled
                          />
                        </Table.Cell>
                        <Table.Cell></Table.Cell>
                      </Table.Row>
                    ) : (
                      <Table.Row></Table.Row>
                    )}
                    <Table.Row>
                      <Table.Cell>
                        <Form.Field>
                          <label>{messages['description']}</label>
                        </Form.Field>
                      </Table.Cell>
                      <Table.Cell>
                        <Form.Field>
                          <TextArea
                            placeholder={messages['description']}
                            onChange={(e, o) => onInputChange(o, 'info')}
                            value={contract.info ? contract.info : ''}
                          />
                        </Form.Field>
                      </Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Form.Field>
                          <label>{messages['description']} 1</label>
                        </Form.Field>
                      </Table.Cell>
                      <Table.Cell>
                        <Form.Field>
                          <TextArea
                            placeholder={messages['description']}
                            onChange={(e, o) => onInputChange(o, 'info2')}
                          />
                        </Form.Field>
                      </Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
                <Table>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell width={4}>
                        <h3>{messages['filter_replacement_period']}</h3>
                      </Table.Cell>
                      <Table.Cell>
                        <Input
                          size="mini"
                          label="F1"
                          className="input__filter_terms"
                          value={f1MtLeft ? f1MtLeft : '0'}
                          disabled
                        />
                        <Input
                          size="mini"
                          label="F2"
                          className="input__filter_terms"
                          value={f2MtLeft ? f2MtLeft : '0'}
                          disabled
                        />
                        <Input
                          size="mini"
                          label="F3"
                          className="input__filter_terms"
                          value={f3MtLeft ? f3MtLeft : '0'}
                          disabled
                        />
                        <Input
                          size="mini"
                          label="F4"
                          className="input__filter_terms"
                          value={f4MtLeft ? f4MtLeft : '0'}
                          disabled
                        />
                        <Input
                          size="mini"
                          label="F5"
                          className="input__filter_terms"
                          value={f5MtLeft ? f5MtLeft : '0'}
                          disabled
                        />
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
                <Form.Field>
                  <Button color="blue" fluid onClick={() => handleSubmit()}>
                    {messages['save']}
                  </Button>
                </Form.Field>
                <Form.Field>
                  <Button
                    color="red"
                    fluid
                    onClick={() => window.history.back()}
                  >
                    {messages['cancel']}
                  </Button>
                </Form.Field>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

const getCrmCategory = crmCategory => {
  const crmCat = crmCategory;
  if (!crmCat) {
    return [];
  }
  let out = crmCategory.map(item => {
    return {
      key: item.id,
      text: item.name,
      value: item.id,
    };
  });
  return out;
};

const getBranchList = branches => {
  const list = branches;
  if (!list) {
    return [];
  }
  let out = branches
    .filter(
      item =>
        item.business_area_id == 5 ||
        item.business_area_id == 6 ||
        item.business_area_id == 9,
    )
    .map(item => {
      return {
        key: item.branch_id,
        text: item.text45,
        value: item.branch_id,
      };
    });

  return out;
};

const labelColor = crmCategoryId => {
  if (crmCategoryId === 1) {
    return 'green';
  } else if (crmCategoryId === 2) {
    return 'yellow';
  } else if (crmCategoryId === 3) {
    return 'red';
  } else if (crmCategoryId === 4) {
    return 'black';
  }
};

function mapStateToProps(state) {
  return {
    branchOptionsService: state.userInfo.branchOptionsService,
    contractInfo: state.serviceReducer.smeciContractInfo,
    crmCategory: state.f4.crmCategory,
    branches: state.f4.branches,
  };
}

export default connect(mapStateToProps, {
  fetchSmeciContractInfo,
  postSmeciContractInfo,
  f4FetchCrmCategory,
  f4FetchBranches,
})(injectIntl(Smeci));
