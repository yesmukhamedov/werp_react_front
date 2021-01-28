//Marketing mainoperation contract edit info
//mmcei
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
import ContractDescription from './../contractAdditionaComponents/contractDescription';

const Mmcei = props => {
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
    info: '',
    info2: '',
  };

  const emptyContractDescription = {
    description: '',
    descriptionDate: '',
    userId: '',
    username: '',
    contractNumber: '',
    id: '',
  };

  const tcode = 'MMCEI';

  const [contract, setContract] = useState({ ...emptyContract });
  const [newContract, setNewContract] = useState({ ...emptyContract });
  const [contractNumberSearch, setContractNumberSearch] = useState('');
  const [isLoadingContract, setIsLoadingContract] = useState(false);
  const [isSavingContract, setIsSavingContract] = useState(false);
  const [isDisabledSaveButton, setIsDisabledSaveButton] = useState(true);
  const [contractDescriptionList, setContractDescriptionList] = useState([]);

  const [
    isDisabledSaveContractDescriptionButton,
    setIsDisabledSaveContractDescriptionButton,
  ] = useState(true);
  const [
    isSavingContractDescription,
    setIsSavingContractDescription,
  ] = useState(false);
  const [newContractDescription, setNewContractDescription] = useState({
    ...emptyContractDescription,
  });

  const {
    mmcei,
    intl: { messages },
    //language,
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
    if (mmcei && mmcei.contract) {
      setContract({ ...mmcei.contract });
      setNewContract({ ...mmcei.contract });
      setIsDisabledSaveButton(true);
    }
    if (mmcei && mmcei.contractDescriptionList)
      setContractDescriptionList([...mmcei.contractDescriptionList]);
  }, [mmcei]);

  const onSearchContract = contractNumber => {
    props.fetchDynObjMarketing(
      'marketing/contract/mmcei/fetchContract',
      { contractNumber, tcode },
      bool => setIsLoadingContract(bool),
    );
  };

  const onInputChange = (value, fieldName) => {
    setNewContract(prev => {
      const waNewContract = { ...prev, [fieldName]: value };
      if (
        contract &&
        contract.contractNumber &&
        contract.info === waNewContract.info &&
        contract.info2 === waNewContract.info2
      )
        setIsDisabledSaveButton(true);
      else setIsDisabledSaveButton(false);

      return waNewContract;
    });
  };

  const onInputChangeContractDescription = (value, fieldName) => {
    setNewContractDescription(prev => {
      const waNewContractDescription = { ...prev };
      waNewContractDescription[fieldName] = value;

      if (value.length > 0) setIsDisabledSaveContractDescriptionButton(false);
      else setIsDisabledSaveContractDescriptionButton(true);

      return waNewContractDescription;
    });
  };

  const onSave = () => {
    props.onSaveMmcTrans(
      'marketing/contract/mmcei/saveContract',
      {
        contract,
        newContract,
        contractDescriptionList,
        newContractDescription: { ...emptyContractDescription },
      },
      { tcode },
      setIsSavingContract,
    );
  };

  const onSaveContractDescription = () => {
    props.onSaveMmcTrans(
      'marketing/contract/mmcei/addContractDescription',
      {
        contract,
        contractDescriptionList,
        newContractDescription: {
          description: newContractDescription.description,
          descriptionDate: '',
          userId: '',
          username: '',
          contractNumber: contract.contractNumber,
          id: '',
        },
      },
      { tcode },
      setIsSavingContractDescription,
      () => {
        setNewContractDescription({ ...emptyContractDescription });
        setIsDisabledSaveContractDescriptionButton(true);
      },
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
        {messages['transNameMmcei']}
      </Header>
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
            <Table collapsing className="borderLess">
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <TextArea
                      style={{
                        maxHeight: 160,
                        minHeight: 160,
                        minWidth: 280,
                        maxWidth: 280,
                      }}
                      value={newContractDescription.description}
                      maxLength="255"
                      onChange={(e, { value }) =>
                        onInputChangeContractDescription(value, 'description')
                      }
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Button
                      icon
                      labelPosition="left"
                      primary
                      size="small"
                      disabled={isDisabledSaveContractDescriptionButton}
                      loading={isSavingContractDescription}
                      onClick={() => onSaveContractDescription()}
                    >
                      <Icon name="save" size="large" />
                      {messages['toAdd']} {messages['H__COMMENT']}
                    </Button>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>

            <ContractDescription
              contractDescriptionList={contractDescriptionList}
              tcode="MMCV"
            />
          </Grid.Column>
          <Grid.Column mobile={16} tablet={11} computer={11}>
            <Table collapsing className="borderLess">
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Info</Table.Cell>
                  <Table.Cell>
                    <TextArea
                      style={{
                        maxHeight: 160,
                        minHeight: 160,
                        minWidth: 280,
                        maxWidth: 280,
                      }}
                      value={newContract.info}
                      maxLength="255"
                      onChange={(e, { value }) => onInputChange(value, 'info')}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Info 2</Table.Cell>
                  <Table.Cell>
                    <TextArea
                      style={{
                        maxHeight: 160,
                        minHeight: 160,
                        minWidth: 280,
                        maxWidth: 280,
                      }}
                      value={newContract.info2}
                      maxLength="255"
                      onChange={(e, { value }) => onInputChange(value, 'info2')}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell />
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
                </Table.Row>
              </Table.Body>
            </Table>
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
    mmcei: state.marketing.dynamicObject.mmcei,
  };
}

export default connect(mapStateToProps, {
  fetchDynObjMarketing,
  onSaveMmcTrans,
})(injectIntl(Mmcei));
