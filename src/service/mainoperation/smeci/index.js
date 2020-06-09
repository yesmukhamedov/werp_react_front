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
} from 'semantic-ui-react';
import {
  fetchSmeciContractInfo,
  postSmeciContractInfo,
} from '../../serviceAction';

import AddressF4Modal from '../../../reference/f4/address/addressF4WithCreationPage';

import { injectIntl } from 'react-intl';
import './smeci.css';

function Smeci(props) {
  const url = window.location.search;
  const contractNumber = url.slice(url.indexOf('=') + 1);

  const emptyContract = {
    manual: 0,
    f1Mt: '',
    f2Mt: '',
    f3Mt: '',
    f4Mt: '',
    f5Mt: '',
    serviceAddressId: '',
    serviceAddressName: '',
    contactPersonName: '',
    selectedBranch: {},
    info: '',
    info2: '',
  };

  const [contract, setContract] = useState({ ...emptyContract });
  const [addressF4ModalOpen, setAddressF4ModalOpen] = useState(false);

  const {
    contractInfo = [],
    branchOptions = [],
    intl: { messages },
    fetchSmeciContractInfo,
  } = props;

  const {
    countryName,
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
    contractDate,
    manual,
    installmentDate,
    dealerFIO,
    fitterFIO,
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
  } = contractInfo;

  console.log(contractInfo);

  useEffect(() => {
    if (contractNumber) {
      props.fetchSmeciContractInfo({ contractNumber });
    }
  }, [contractNumber]);
  useEffect(() => {
    if (!addressF4ModalOpen) {
      props.fetchSmeciContractInfo({ contractNumber });
    }
  }, [!addressF4ModalOpen]);

  useEffect(() => {
    if (Object.entries(branchOptions).length !== 0 && bukrsId) {
      let branch = {};
      branchOptions[bukrsId]
        .filter(item => item.key === branchId)
        .forEach(item => {
          branch = item;
        });

      setContract({
        ...contract,
        manual: manual,
        f1Mt: f1Mt,
        f2Mt: f2Mt,
        f3Mt: f3Mt,
        f4Mt: f4Mt,
        f5Mt: f5Mt,
        serviceAddressId: serviceAddressId,
        serviceAddressName: serviceAddressName,
        contactPersonName: contactPersonName,
        selectedBranch: branch,
        info: info,
      });
    }
  }, [branchId, branchOptions]);

  const onInputChange = (e, fieldName) => {
    setContract(prev => {
      const newContract = { ...prev };
      switch (fieldName) {
        case 'manual':
          newContract.manual = Number.parseInt(e.value, 10);
          break;
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
        case 'contactPersonName':
          newContract.contactPersonName = e.value;
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
      f1Mt,
      f2Mt,
      f3Mt,
      f4Mt,
      f5Mt,
      info,
      info2,
      manual,
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
        customerId,
        customerFIO,
        dealerFIO,
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
        fullPhone,
        info,
        info2,
        installmentDate,
        manual,
        serviceBranchId,
        serviceBranchName,
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
      manual: 0,
      f1Mt: '',
      f2Mt: '',
      f3Mt: '',
      f4Mt: '',
      f5Mt: '',
      serviceAddressId: '',
      serviceAddressName: '',
      contactPersonName: '',
      selectedBranch: {},
      info: '',
      info2: '',
    });
  };

  const labelColor = () => {
    if (
      serviceCrmCategoryName === 'ЗЕЛЕНЫЙ' ||
      serviceCrmCategoryName === 'GREEN' ||
      serviceCrmCategoryName === 'YEŞİL'
    ) {
      return 'green';
    } else if (
      serviceCrmCategoryName === 'ЖЕЛТЫЙ' ||
      serviceCrmCategoryName === 'YELLOW' ||
      serviceCrmCategoryName === 'SARI'
    ) {
      return 'yellow';
    } else if (
      serviceCrmCategoryName === 'КРАСНЫЙ' ||
      serviceCrmCategoryName === 'RED' ||
      serviceCrmCategoryName === 'KIRMIZI'
    ) {
      return 'red';
    } else if (
      serviceCrmCategoryName === 'ЧЕРНЫЙ' ||
      serviceCrmCategoryName === 'BLACK' ||
      serviceCrmCategoryName === 'SİYAH'
    ) {
      return 'black';
    }
  };

  return (
    <div>
      <AddressF4Modal
        open={addressF4ModalOpen}
        customerId={customerId}
        onCloseAddressF4={bool => setAddressF4ModalOpen(bool)}
        onAddressSelect={item => onInputChange(item, 'serviceAddressId')}
        selectedBranch={contract.selectedBranch}
      />
      <Grid centered>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={16} computer={7}>
            <h1>{messages['editing']}</h1>
            <Segment>
              <h3>{messages['L__CLIENT_INFO']} </h3>
              <Button>Admin</Button>
              <Table compact striped>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell width="4">{messages['country']}</Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        value={countryName ? countryName : ''}
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
                      />
                    </Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>{messages['service_branch']}</Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        value={serviceBranchName ? serviceBranchName : ''}
                      />
                    </Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>{messages['Contract.Number']}</Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        value={contractNumber ? contractNumber : ''}
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
                      />
                    </Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>{messages['contactDetails']}</Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
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
                    <Table.Cell>{messages['addressService']}</Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        value={
                          contract.serviceAddressName
                            ? contract.serviceAddressName
                            : ''
                        }
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
                      />
                    </Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label ribbon color={labelColor()}>
                        {messages['category']}
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        value={
                          serviceCrmCategoryName ? serviceCrmCategoryName : ''
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
                        value={contractDate ? contractDate : ''}
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
                        value={installmentDate ? installmentDate : ''}
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
                                value={warrantyEndDate ? warrantyEndDate : ''}
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <Input
                                size="small"
                                fluid
                                value={`${
                                  warrantyEndedMonths ? warrantyEndedMonths : ''
                                } / ${warranty ? warranty : ''}`}
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
                                checked={contract.manual === 0}
                                onChange={(e, o) => onInputChange(o, 'manual')}
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <Checkbox
                                radio
                                label={messages['manual']}
                                name="changeTerm"
                                value="1"
                                checked={contract.manual === 1}
                                onChange={(e, o) => onInputChange(o, 'manual')}
                              />
                            </Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                    </Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                  {contract.manual === 1 ? (
                    <Table.Row>
                      <Table.Cell>{messages['filter_term']}</Table.Cell>
                      <Table.Cell>
                        <Input
                          size="mini"
                          label="F1"
                          className="input__filter_terms"
                          value={contract.f1Mt}
                          onChange={(e, o) => onInputChange(o, 'f1Mt')}
                        />
                        <Input
                          size="mini"
                          label="F2"
                          className="input__filter_terms"
                          value={contract.f2Mt}
                          onChange={(e, o) => onInputChange(o, 'f2Mt')}
                        />
                        <Input
                          size="mini"
                          label="F3"
                          className="input__filter_terms"
                          value={contract.f3Mt}
                          onChange={(e, o) => onInputChange(o, 'f3Mt')}
                        />
                        <Input
                          size="mini"
                          label="F4"
                          className="input__filter_terms"
                          value={contract.f4Mt}
                          onChange={(e, o) => onInputChange(o, 'f4Mt')}
                        />
                        <Input
                          size="mini"
                          label="F5"
                          className="input__filter_terms"
                          value={contract.f5Mt}
                          onChange={(e, o) => onInputChange(o, 'f5Mt')}
                        />
                      </Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                  ) : (
                    <Table.Row></Table.Row>
                  )}
                  <Table.Row>
                    <Table.Cell>{messages['description']}</Table.Cell>
                    <Table.Cell>
                      <Form>
                        <TextArea
                          placeholder={messages['description']}
                          onChange={(e, o) => onInputChange(o, 'info')}
                          value={contract.info ? contract.info : ''}
                        />
                      </Form>
                    </Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>{messages['description']} 1</Table.Cell>
                    <Table.Cell>
                      <Form>
                        <TextArea
                          placeholder={messages['description']}
                          onChange={(e, o) => onInputChange(o, 'info2')}
                        />
                      </Form>
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
                      />
                      <Input
                        size="mini"
                        label="F2"
                        className="input__filter_terms"
                        value={f2MtLeft ? f2MtLeft : '0'}
                      />
                      <Input
                        size="mini"
                        label="F3"
                        className="input__filter_terms"
                        value={f3MtLeft ? f3MtLeft : '0'}
                      />
                      <Input
                        size="mini"
                        label="F4"
                        className="input__filter_terms"
                        value={f4MtLeft ? f4MtLeft : '0'}
                      />
                      <Input
                        size="mini"
                        label="F5"
                        className="input__filter_terms"
                        value={f5MtLeft ? f5MtLeft : '0'}
                      />
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
              <Button color="blue" fluid onClick={() => handleSubmit()}>
                {messages['save']}
              </Button>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    branchOptions: state.userInfo.branchOptionsMarketing,
    contractInfo: state.serviceReducer.smeciContractInfo,
  };
}

export default connect(mapStateToProps, {
  fetchSmeciContractInfo,
  postSmeciContractInfo,
})(injectIntl(Smeci));
