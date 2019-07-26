//Marketing mainoperation contract edit logistic
//mmceg
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
  Segment,
  Label,
  List,
  Grid,
} from 'semantic-ui-react';
import queryString from 'query-string';
import { handleFocus } from '../../../utils/helpers';
import { fetchDynObjMarketing, onSaveMmcTrans } from '../../marketingAction';
import {
  LinkToCustomerHrc03,
  LinkToMmcvNewTab,
  LinkToStaffCardView,
} from '../../../utils/outlink';
import { getTradeIn } from '../contractAdditionaComponents/marketingConstants';
import MatnrListF4Modal from '../contractAdditionaComponents/matnrListF4';
import PromoListF4Modal from '../contractAdditionaComponents/promoListF4';

const Mmceg = props => {
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
    tradeIn: 0,
    tradeInTovarSerial: '',
    tradeInMatnrListId: '',
    tovarSerial: '',
    matnrListId: 0,
    matnrReleaseDate: '',
    dealer: '',
  };

  const tcode = 'MMCEG';

  const [contract, setContract] = useState({ ...emptyContract });
  const [newContract, setNewContract] = useState({ ...emptyContract });
  const [contractNumberSearch, setContractNumberSearch] = useState('');
  const [isLoadingContract, setIsLoadingContract] = useState(false);
  const [contractPromoList, setContractPromoList] = useState([]);
  const [newContractPromoList, setNewContractPromoList] = useState([]);

  const [isLoadingMatnrList, setIsLoadingMatnrList] = useState(false);
  const [isLoadingPromoList, setIsLoadingPromoList] = useState(false);
  const [matnrListF4ModalOpen, setMatnrListF4ModalOpen] = useState(false);
  const [promoListF4ModalOpen, setPromoListF4ModalOpen] = useState(false);

  const [isSavingContract, setIsSavingContract] = useState(false);

  const {
    mmceg,
    matnrList = [],
    promoList = [],
    intl: { messages },
    language,
  } = props;

  //componentDidMount
  useEffect(() => {
    const url = props.location.search;
    const params = queryString.parse(url);

    if (params.contractNumber) {
      setContractNumberSearch(params.contractNumber);
      onSearchContract(params.contractNumber);
    }
    //unmount
    return () => {};
  }, []);

  //componentWillRecieveProps
  useEffect(() => {
    if (mmceg && mmceg.contract) {
      setContract({ ...mmceg.contract });
      setNewContract({ ...mmceg.contract });
      setContractPromoList([...mmceg.contractPromoList]);
      setNewContractPromoList([...mmceg.contractPromoList]);
      // console.log(mmceg.contract, 'mmceg.contract');

      const { bukrs, branchId, contractTypeId, dealer } = mmceg.contract;
      //get Price List
      if (branchId && branchId > 0) {
        props.fetchDynObjMarketing(
          'marketing/contract/promoF4/fetch_promo_list',
          { bukrs, tcode, branchId },
          bool => setIsLoadingPromoList(bool),
        );
      }

      //get Price List
      if (
        branchId &&
        branchId > 0 &&
        contractTypeId &&
        contractTypeId > 0 &&
        dealer &&
        dealer > 0
      ) {
        props.fetchDynObjMarketing(
          'marketing/contract/matnrF4/fetch_matnr_list',
          { bukrs, tcode, branchId, contractTypeId, dealer },
          bool => setIsLoadingMatnrList(bool),
        );
      }
    }
  }, [mmceg]);

  const onSearchContract = contractNumber => {
    props.fetchDynObjMarketing(
      'marketing/contract/mmceg/fetchContract',
      { contractNumber, tcode },
      bool => setIsLoadingContract(bool),
    );
  };

  const onInputChange = (value, fieldName) => {
    if (fieldName === 'tovarSerial') {
      setNewContract(prev => {
        return {
          ...prev,
          tovarSerial: value.tovarSerial,
          matnrListId: value.matnrListId,
        };
      });
    } else if (fieldName === 'promo') {
      setNewContractPromoList(prev => {
        return [...value];
      });
    }
  };

  const renderMatnrButtons = () => {
    if (contract.matnrListId === 0 && newContract.matnrListId === 0) {
      return (
        <Icon
          name="clone"
          size="large"
          className="clickableIcon"
          onClick={() => setMatnrListF4ModalOpen(true)}
        />
      );
    }

    if (contract.matnrListId === 0 && newContract.matnrListId > 0) {
      return (
        <span>
          <Icon
            name="clone"
            size="large"
            className="clickableIcon"
            onClick={() => setMatnrListF4ModalOpen(true)}
          />
          <Button
            primary
            size="small"
            loading={isSavingContract}
            onClick={() => onWriteOffMatnr()}
          >
            {messages['save']}
          </Button>
        </span>
      );
    }
  };

  const renderContractPromoButtons = () => {
    if (contractPromoList.length === 0 && newContractPromoList.length === 0) {
      return (
        <Icon
          name="clone"
          size="large"
          className="clickableIcon"
          onClick={() => setPromoListF4ModalOpen(true)}
        />
      );
    }

    if (contractPromoList.length === 0 && newContractPromoList.length > 0) {
      return (
        <span>
          <Icon
            name="clone"
            size="large"
            className="clickableIcon"
            onClick={() => setPromoListF4ModalOpen(true)}
          />
          <Button
            primary
            size="small"
            loading={isSavingContract}
            onClick={() => onWriteOffContractPromo()}
          >
            {messages['toWriteOff']}
          </Button>
        </span>
      );
    }
  };

  const onWriteOffMatnr = () => {
    props.onSaveMmcTrans(
      'marketing/contract/mmceg/writeOff',
      { contract, newContract, typeOfWriteOff: 2 },
      { tcode },
      setIsSavingContract,
    );
  };

  const onWriteOffContractPromo = () => {
    props.onSaveMmcTrans(
      'marketing/contract/mmceg/writeOff',
      {
        contract,
        newContract,
        contractPromoList,
        newContractPromoList,
        typeOfWriteOff: 3,
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
        {messages['transNameMmceg']}
      </Header>
      <MatnrListF4Modal
        open={matnrListF4ModalOpen}
        matnrList={matnrList}
        onCloseMatnrF4={bool => setMatnrListF4ModalOpen(bool)}
        onMatnrSelect={item => onInputChange(item, 'tovarSerial')}
        isLoadingMatnrList={isLoadingMatnrList}
      />
      <PromoListF4Modal
        open={promoListF4ModalOpen}
        promoList={promoList}
        onClosePromoF4={bool => setPromoListF4ModalOpen(bool)}
        onPromoSelect={item => onInputChange(item, 'promo')}
        isLoadingPromoList={isLoadingPromoList}
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
                <Table.Row>
                  <Table.Cell>{messages['dealer']}</Table.Cell>
                  <Table.Cell>
                    <span>
                      <LinkToStaffCardView
                        staffId={contract.dealer}
                        staffFio={contract.dealerName}
                      />
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={11} computer={11}>
            <Table collapsing>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>{messages['dateOfIssue']}</Table.Cell>
                  <Table.Cell>
                    <Input value={newContract.matnrReleaseDate} />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{messages['productSerialNumber']}</Table.Cell>
                  <Table.Cell>
                    <Input value={newContract.tovarSerial} />
                    {renderMatnrButtons()}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Trade-in</Table.Cell>
                  <Table.Cell>
                    <Input value={getTradeIn(newContract.tradeIn)} />
                  </Table.Cell>
                </Table.Row>
                {newContract.tradeIn !== undefined &&
                  newContract.tradeIn !== null &&
                  newContract.tradeIn > 0 && (
                    <Table.Row>
                      <Table.Cell>
                        Trade-in {messages['productSerialNumber']}
                      </Table.Cell>
                      <Table.Cell>
                        <Input
                          value={newContract.tradeInTovarSerial}
                          maxLength="18"
                        />
                      </Table.Cell>
                    </Table.Row>
                  )}

                <Table.Row>
                  <Table.Cell>{messages['promotion']}</Table.Cell>
                  <Table.Cell>{renderContractPromoButtons()}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>

            <Segment>
              <Label color="blue" ribbon>
                {messages['promotion']}
              </Label>

              <List verticalAlign="middle" celled size={'small'}>
                {newContractPromoList.map(item => {
                  return (
                    <List.Item key={item.id}>
                      <List.Content>
                        <List.Header as="a">{item.name}</List.Header>
                        <List.Description>
                          {item.fromDealer} {item.fdCurrency}
                        </List.Description>
                      </List.Content>
                    </List.Item>
                  );
                })}
              </List>
            </Segment>
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
    mmceg: state.marketing.dynamicObject.mmceg,
    matnrList: state.marketing.dynamicObject.matnrList,
    promoList: state.marketing.dynamicObject.promoList,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchDynObjMarketing,
    onSaveMmcTrans,
  },
)(injectIntl(Mmceg));
