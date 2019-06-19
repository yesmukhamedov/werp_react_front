//Marketing mainoperation contract edit finance
//mmcef
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Table, Button, Icon, Input } from 'semantic-ui-react';
import { handleFocus, moneyFormat } from '../../../utils/helpers';
import { fetchDynObjMarketing } from '../../marketingAction';
import {
  LinkToCustomerHrc03,
  LinkToMmcvNewTab,
  LinkToFa03AwkeyBukrs,
} from '../../../utils/outlink';

const MmcefBasicInfo = props => {
  const tcode = 'MMCEF';

  const [contractNumberSearch, setContractNumberSearch] = useState('');
  const [isLoadingContract, setIsLoadingContract] = useState(false);

  const {
    contract,
    urlContractNumber,
    intl: { messages },
    language,
  } = props;

  //componentWillRecieveProps
  useEffect(() => {
    if (urlContractNumber && urlContractNumber.length > 0) {
      setContractNumberSearch(urlContractNumber);
      onSearchContract(urlContractNumber);
    }
  }, [urlContractNumber]);

  const onSearchContract = contractNumber => {
    props.fetchDynObjMarketing(
      'marketing/contract/mmcef/fetchContract',
      { contractNumber, tcode },
      bool => setIsLoadingContract(bool),
    );
  };

  return (
    <div>
      <Table collapsing className="borderLess">
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Input
                value={contractNumberSearch}
                maxLength="12"
                placeholder={messages['snNum']}
                onFocus={handleFocus}
                onChange={(e, { value }) => setContractNumberSearch(value)}
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
                <LinkToMmcvNewTab contractNumber={contract.contractNumber} />
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
            <Table.Cell>{messages['termInMonth']}</Table.Cell>
            <Table.Cell>
              <Input value={contract.paymentSchedule} />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['price']}</Table.Cell>
            <Table.Cell>
              <Input
                value={moneyFormat(contract.price)}
                label={contract.waers}
                labelPosition="left"
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['paid']}</Table.Cell>
            <Table.Cell>
              <Input
                value={moneyFormat(contract.paid)}
                label={contract.waers}
                labelPosition="left"
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['remainder']}</Table.Cell>
            <Table.Cell>
              <Input
                value={moneyFormat(contract.price - contract.paid)}
                label={contract.waers}
                labelPosition="left"
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['prepayment']}</Table.Cell>
            <Table.Cell>
              <Input
                value={moneyFormat(contract.firstPayment)}
                label={contract.waers}
                labelPosition="left"
              />
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>{messages['awkey']}</Table.Cell>
            <Table.Cell>
              <span>
                <LinkToFa03AwkeyBukrs
                  awkey={contract.awkey}
                  bukrs={contract.bukrs}
                />
              </span>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

function mapStateToProps(state) {
  // console.log(state, 'state');
  return {
    language: state.locales.lang,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchDynObjMarketing,
  },
)(injectIntl(MmcefBasicInfo));
