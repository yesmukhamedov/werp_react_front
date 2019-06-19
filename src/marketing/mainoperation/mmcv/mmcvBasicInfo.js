//Contract basic info
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { Segment, Table, Icon, Label, Input, Button } from 'semantic-ui-react';

import {
  LinkToStaffCardView,
  LinkToCustomerHrc03,
  LinkToMmcvNewTab,
} from '../../../utils/outlink';

import { handleFocus } from '../../../utils/helpers';
import { fetchDynObjMarketing } from '../../marketingAction';
import { getTradeIn } from '../contractAdditionaComponents/marketingConstants';

const MmcvBasicInfo = props => {
  const [contractNumberSearch, setContractNumberSearch] = useState('');
  const [isLoadingContract, setIsLoadingContract] = useState(false);

  const {
    contract = {},
    tcode = '',
    urlContractNumber = '',
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
      'marketing/contract/mmcv/fetchContract',
      { contractNumber, tcode },
      bool => setIsLoadingContract(bool),
    );
  };

  const getLastStateName = id => {
    if (!id) return '';
    else if (id === 1) return messages['lastStateSigned'];
    else if (id === 2) return messages['lastStateGivenToCustomer'];
    else if (id === 3) return messages['lastStateReturned'];
    else if (id === 4) return messages['lastStateInstalled'];
  };

  return (
    <Segment padded size="small">
      <Label color="orange" ribbon>
        {messages['basicInfo']}
      </Label>

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
            <Table.Cell>{messages['service']}</Table.Cell>
            <Table.Cell>
              <Input value={contract.servBranchName} />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['finance']}</Table.Cell>
            <Table.Cell>
              <Input value={contract.finBranchName} />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['contractType']}</Table.Cell>
            <Table.Cell>
              <Input value={contract.contractTypeName} />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Trade-in</Table.Cell>
            <Table.Cell>
              <Input value={getTradeIn(contract.tradeIn)} />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['status']}</Table.Cell>
            <Table.Cell>
              <Input value={contract.contractStatusName} />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['goods']}</Table.Cell>
            <Table.Cell>
              <Input value={getLastStateName(contract.lastState)} />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['contractDate']}</Table.Cell>
            <Table.Cell>
              <Input value={contract.contractDate} />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['reissueDate']}</Table.Cell>
            <Table.Cell>
              <Input value={contract.newContractDate} />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['cancelDate']}</Table.Cell>
            <Table.Cell>
              <Input value={contract.cancelDate} />
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
          <Table.Row>
            <Table.Cell>{messages['demoSecretary']}</Table.Cell>
            <Table.Cell>
              <span>
                <LinkToStaffCardView
                  staffId={contract.demoSc}
                  staffFio={contract.demoScName}
                />
              </span>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['collector']}</Table.Cell>
            <Table.Cell>
              <span>
                <LinkToStaffCardView
                  staffId={contract.collector}
                  staffFio={contract.collectorName}
                />
              </span>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['goodsInstaller']}</Table.Cell>
            <Table.Cell>
              <span>
                <LinkToStaffCardView
                  staffId={contract.fitter}
                  staffFio={contract.fitterName}
                />
              </span>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['recommender']}</Table.Cell>
            <Table.Cell>
              <span>
                <LinkToMmcvNewTab
                  contractNumber={contract.refContractNumber}
                  customerFio={contract.refCustomerName}
                />
              </span>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Segment>
  );
};

function mapStateToProps(state) {
  // console.log(state,'state')
  return {
    language: state.locales.lang,
  };
}

export default connect(
  mapStateToProps,
  { fetchDynObjMarketing },
)(injectIntl(MmcvBasicInfo));
