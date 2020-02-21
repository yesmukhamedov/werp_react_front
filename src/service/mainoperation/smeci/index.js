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
import PhoneF4Modal from '../../../reference/f4/phone/phoneF4Modal';

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
    addrServiceId: '',
    addrServ: '',
    contactPersonName: '',
    selectedBranch: {},
    info: '',
    info2: '',
  };

  const [contract, setContract] = useState({ ...emptyContract });
  const [addressF4ModalOpen, setAddressF4ModalOpen] = useState(false);
  const [phoneF4ModalOpen, setPhoneF4ModalOpen] = useState(false);

  const { contractInfo = [], branchOptions = [] } = props;

  const {
    countryName,
    bukrsName,
    bukrs,
    branchName,
    branchId,
    servBranchName,
    servBranchId,
    tovarSerial,
    customerName,
    contactPersonName,
    addrServ,
    fullPhone,
    servCrmCategory,
    contractDate,
    installmentDate,
    dealerName,
    fitterName,
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
    addrServiceId,
    info,
  } = contractInfo;

  useEffect(() => {
    if (contractNumber) {
      props.fetchSmeciContractInfo({ contractNumber });
    }
  }, [contractNumber]);

  useEffect(() => {
    if (Object.entries(branchOptions).length !== 0 && bukrs) {
      let branch = {};
      branchOptions[bukrs]
        .filter(item => item.key === branchId)
        .forEach(item => {
          branch = item;
        });

      setContract({
        ...contract,
        f1Mt: f1Mt,
        f2Mt: f2Mt,
        f3Mt: f3Mt,
        f4Mt: f4Mt,
        f5Mt: f5Mt,
        addrServiceId: addrServiceId,
        addrServ: addrServ,
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
          newContract.f1Mt = e.value;
          break;
        case 'f3Mt':
          newContract.f1Mt = e.value;
          break;
        case 'f4Mt':
          newContract.f1Mt = e.value;
          break;
        case 'f5Mt':
          newContract.f1Mt = e.value;
          break;
        case 'addrServiceId':
          newContract.addrServiceId = e.addr_id;
          newContract.addrServ = e.address;
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
      addrServ,
      addrServiceId,
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
        addrServ,
        addrServiceId,
        branchId,
        branchName,
        bukrs,
        bukrsName,
        contactPersonName,
        contractDate,
        contractNumber,
        countryName,
        customerId,
        customerName,
        dealerName,
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
        fitterName,
        fullPhone,
        info,
        info2,
        installmentDate,
        manual,
        servBranchId,
        servBranchName,
        servCrmCategory,
        tovarSerial,
        warranty,
        warrantyEndDate,
        warrantyEndedMonths,
      },
      () => {
        props.history.push(`smcuspor?contractNumber=${contractNumber}`);
      },
    );
  };

  const labelColor = () => {
    if (
      servCrmCategory === 'ЗЕЛЕНЫЙ' ||
      servCrmCategory === 'GREEN' ||
      servCrmCategory === 'YEŞİL'
    ) {
      return 'green';
    } else if (
      servCrmCategory === 'ЖЕЛТЫЙ' ||
      servCrmCategory === 'YELLOW' ||
      servCrmCategory === 'SARI'
    ) {
      return 'yellow';
    } else if (
      servCrmCategory === 'КРАСНЫЙ' ||
      servCrmCategory === 'RED' ||
      servCrmCategory === 'KIRMIZI'
    ) {
      return 'red';
    } else if (
      servCrmCategory === 'ЧЕРНЫЙ' ||
      servCrmCategory === 'BLACK' ||
      servCrmCategory === 'SİYAH'
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
        onAddressSelect={item => onInputChange(item, 'addrServiceId')}
      />

      <PhoneF4Modal
        open={phoneF4ModalOpen}
        customerId={customerId}
        selectedBranch={contract.selectedBranch}
        onClosePhoneF4={bool => setPhoneF4ModalOpen(bool)}
      />
      <Grid centered>
        <Grid.Row>
          <Grid.Column mobile={16} tablet={16} computer={7}>
            <h1>Редактирование</h1>
            <Segment>
              <h3>Данные клиента</h3>
              <Table compact striped>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell width="4">Страна</Table.Cell>
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
                    <Table.Cell>Компания</Table.Cell>
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
                    <Table.Cell>Филиал</Table.Cell>
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
                    <Table.Cell>Сервис Филиал</Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        value={servBranchName ? servBranchName : ''}
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
                      />
                    </Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Заводской №</Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        value={tovarSerial ? tovarSerial : ''}
                      />
                    </Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>ФИО клиента</Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        value={customerName ? customerName : ''}
                      />
                    </Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Контактное лицо</Table.Cell>
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
                    <Table.Cell>Адрес для сервиса</Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        value={contract.addrServ ? contract.addrServ : ''}
                      />
                    </Table.Cell>
                    <Table.Cell>
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
                    <Table.Cell>Kонтакты</Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        value={fullPhone ? fullPhone : ''}
                      />
                    </Table.Cell>
                    <Table.Cell collapsing>
                      <Button
                        icon
                        basic
                        color="blue"
                        onClick={() => setPhoneF4ModalOpen(true)}
                      >
                        <Icon name="clone" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label ribbon color={labelColor()}>
                        Категория
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        value={servCrmCategory ? servCrmCategory : ''}
                      />
                    </Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Дата покупки</Table.Cell>
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
                    <Table.Cell>Дата установки</Table.Cell>
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
                    <Table.Cell>Диллер</Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        value={dealerName ? dealerName : ''}
                      />
                    </Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Установщик</Table.Cell>
                    <Table.Cell>
                      <Input
                        size="small"
                        fluid
                        value={fitterName ? fitterName : ''}
                      />
                    </Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Срок гарантии</Table.Cell>
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
                                value={`${warranty ? warranty : ''} / ${
                                  warrantyEndedMonths ? warrantyEndedMonths : ''
                                }`}
                              />
                            </Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                    </Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Срок замены </Table.Cell>
                    <Table.Cell>
                      <Table>
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell>
                              <Checkbox
                                radio
                                label="Автоматом"
                                name="changeTerm"
                                value="0"
                                checked={contract.manual === 0}
                                onChange={(e, o) => onInputChange(o, 'manual')}
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <Checkbox
                                radio
                                label="В ручную"
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
                      <Table.Cell>Срок фильтров</Table.Cell>
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
                          onChange={(e, o) => onInputChange(o, 'f1Mt')}
                        />
                      </Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                  ) : (
                    <Table.Row></Table.Row>
                  )}
                  <Table.Row>
                    <Table.Cell>Описание</Table.Cell>
                    <Table.Cell>
                      <Form>
                        <TextArea
                          placeholder={'Info'}
                          onChange={(e, o) => onInputChange(o, 'info')}
                          value={contract.info}
                        />
                      </Form>
                    </Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Описание 1</Table.Cell>
                    <Table.Cell>
                      <Form>
                        <TextArea
                          placeholder={'info2'}
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
                      <h3>Срок замены фильтров</h3>
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
                Сохранить
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
