//Contract basic info
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { Segment, Table, Icon, Dropdown, Label } from 'semantic-ui-react';

import {
  LinkToStaffCardView,
  LinkToCustomerHrc03,
  LinkToMmcvNewTab,
} from '../../../utils/outlink';

import {
  stringYYYYMMDDToMoment,
  momentToStringYYYYMMDD,
} from '../../../utils/helpers';

import StaffF4Modal from '../../../reference/f4/staff/staffF4Modal';
import CustomerF4Modal from '../../../reference/f4/Customer/customerF4WithCreationPage';
import RecommenderF4Modal from '../contractAdditionaComponents/recommenderF4';
import { tradeInOptions } from '../contractAdditionaComponents/marketingConstants';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MmccBasicInfo = props => {
  const [staffF4ModalOpen, setStaffF4ModalOpen] = useState(false);
  const [staffF4ModalPosition, setStaffF4ModalPosition] = useState('');
  const [customerF4ModalOpen, setCustomerF4ModalOpen] = useState(false);
  const [recommenderF4ModalOpen, setRecommenderF4ModalOpen] = useState(false);

  const {
    contract: {
      branchId,
      bukrs,
      servBranchId,
      finBranchId,
      contractTypeId,
      contractDate,
      customerId,
      customerName,
      dealer,
      dealerName,
      demoSc,
      demoScName,
      collector,
      collectorName,
      refContractNumber,
      refCustomerName,
      tradeIn,
    } = {},
    companyOptions = [],
    branchOptions = [],
    serBranches = [],
    finBranches = [],
    contractTypeOpts = [],
    intl: { messages },
    language,
  } = props;

  return (
    <Segment padded size="small">
      <Label color="orange" ribbon>
        {messages['basicInfo']}
      </Label>

      <StaffF4Modal
        open={staffF4ModalOpen}
        closeModal={bool => setStaffF4ModalOpen(bool)}
        onStaffSelect={item =>
          props.onBasicInfoInputChange(item, staffF4ModalPosition)
        }
        trans="mmcc"
        brnch={branchId}
        branchOptions={branchOptions}
        bukrs={bukrs}
        companyOptions={companyOptions}
        bukrsDisabledParent
        unemployedDisabledParent
      />

      <CustomerF4Modal
        open={customerF4ModalOpen}
        onCloseCustomerF4={bool => setCustomerF4ModalOpen(bool)}
        onCustomerSelect={item =>
          props.onBasicInfoInputChange(item, 'customer')
        }
      />

      <RecommenderF4Modal
        open={recommenderF4ModalOpen}
        onCloseRecommenderListF4={bool => setRecommenderF4ModalOpen(bool)}
        onRecommenderSelect={item =>
          props.onBasicInfoInputChange(item, 'refContractId')
        }
        trans="MMCC"
        bukrs={bukrs}
      />

      <Table collapsing className="borderLess">
        <Table.Body>
          <Table.Row>
            <Table.Cell>{messages['bukrs']}</Table.Cell>
            <Table.Cell>
              <Dropdown
                placeholder={messages['bukrs']}
                selection
                noResultsMessage={messages['noResultsMessage']}
                options={companyOptions ? companyOptions : []}
                value={bukrs}
                onChange={(e, { value }) => {
                  props.onBasicInfoInputChange(value, 'bukrs');
                }}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['brnch']}</Table.Cell>
            <Table.Cell>
              <Dropdown
                placeholder={messages['brnch']}
                search
                selection
                noResultsMessage={messages['noResultsMessage']}
                options={
                  branchOptions
                    ? branchOptions[bukrs]
                      ? branchOptions[bukrs]
                      : []
                    : []
                }
                value={branchId}
                onChange={(e, { value }) =>
                  props.onBasicInfoInputChange(value, 'branchId')
                }
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['service']}</Table.Cell>
            <Table.Cell>
              <Dropdown
                placeholder={messages['service']}
                search
                selection
                noResultsMessage={messages['noResultsMessage']}
                options={
                  serBranches
                    ? serBranches[bukrs]
                      ? serBranches[bukrs]
                      : []
                    : []
                }
                value={servBranchId}
                onChange={(e, { value }) =>
                  props.onBasicInfoInputChange(value, 'servBranchId')
                }
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['finance']}</Table.Cell>
            <Table.Cell>
              <Dropdown
                placeholder={messages['finance']}
                search
                selection
                noResultsMessage={messages['noResultsMessage']}
                options={
                  finBranches
                    ? finBranches[bukrs]
                      ? finBranches[bukrs]
                      : []
                    : []
                }
                value={finBranchId}
                onChange={(e, { value }) =>
                  props.onBasicInfoInputChange(value, 'finBranchId')
                }
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['contractType']}</Table.Cell>
            <Table.Cell>
              <Dropdown
                placeholder={messages['contractType']}
                search
                selection
                noResultsMessage={messages['noResultsMessage']}
                options={contractTypeOpts ? contractTypeOpts : []}
                value={contractTypeId}
                onChange={(e, { value }) =>
                  props.onBasicInfoInputChange(value, 'contractTypeId')
                }
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Trade-in</Table.Cell>
            <Table.Cell>
              <Dropdown
                noResultsMessage={messages['noResultsMessage']}
                selection
                options={tradeInOptions}
                value={tradeIn}
                onChange={(e, { value }) => {
                  props.onBasicInfoInputChange(value, 'tradeIn');
                }}
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['contractDate']}</Table.Cell>
            <Table.Cell>
              <DatePicker
                className="date-auto-width"
                autoComplete="off"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select" // timezone="UTC"
                selected={stringYYYYMMDDToMoment(contractDate)}
                locale={language}
                onChange={event =>
                  props.onBasicInfoInputChange(
                    momentToStringYYYYMMDD(event),
                    'contractDate',
                  )
                }
                dateFormat="DD.MM.YYYY"
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['client']}</Table.Cell>
            <Table.Cell>
              <span>
                <LinkToCustomerHrc03
                  customerId={customerId}
                  customerName={customerName}
                />
              </span>
              <Icon
                name="clone"
                size="large"
                className="clickableIcon"
                onClick={() => setCustomerF4ModalOpen(true)}
              />
              <Icon
                name="remove"
                size="large"
                className="clickableIcon"
                color="red"
                onClick={event =>
                  props.onBasicInfoInputChange('', 'customerRemove')
                }
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['dealer']}</Table.Cell>
            <Table.Cell>
              <span>
                <LinkToStaffCardView staffId={dealer} staffFio={dealerName} />
              </span>
              <Icon
                name="clone"
                size="large"
                className="clickableIcon"
                onClick={() => {
                  setStaffF4ModalOpen(true);
                  setStaffF4ModalPosition('dealer');
                }}
              />
              <Icon
                name="remove"
                size="large"
                className="clickableIcon"
                color="red"
                onClick={event =>
                  props.onBasicInfoInputChange('remove', 'dealerRemove')
                }
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['demoSecretary']}</Table.Cell>
            <Table.Cell>
              <span>
                <LinkToStaffCardView staffId={demoSc} staffFio={demoScName} />
              </span>
              <Icon
                name="clone"
                size="large"
                className="clickableIcon"
                onClick={() => {
                  setStaffF4ModalOpen(true);
                  setStaffF4ModalPosition('demoSc');
                }}
              />
              <Icon
                name="remove"
                size="large"
                className="clickableIcon"
                color="red"
                onClick={event =>
                  props.onBasicInfoInputChange('', 'demoScRemove')
                }
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['collector']}</Table.Cell>
            <Table.Cell>
              <span>
                <LinkToStaffCardView
                  staffId={collector}
                  staffFio={collectorName}
                />
              </span>
              <Icon
                name="clone"
                size="large"
                className="clickableIcon"
                onClick={() => {
                  setStaffF4ModalOpen(true);
                  setStaffF4ModalPosition('collector');
                }}
              />
              <Icon
                name="remove"
                size="large"
                className="clickableIcon"
                color="red"
                onClick={event =>
                  props.onBasicInfoInputChange('remove', 'collectorRemove')
                }
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['recommender']}</Table.Cell>
            <Table.Cell>
              <span>
                <LinkToMmcvNewTab
                  contractNumber={refContractNumber}
                  customerFio={refCustomerName}
                />
              </span>
              <Icon
                name="clone"
                size="large"
                className="clickableIcon"
                onClick={() => setRecommenderF4ModalOpen(true)}
              />
              <Icon
                name="remove"
                size="large"
                className="clickableIcon"
                color="red"
                onClick={event =>
                  props.onBasicInfoInputChange('remove', 'refContractIdRemove')
                }
              />
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
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsMarketing,
  };
}

export default connect(
  mapStateToProps,
  {},
)(injectIntl(MmccBasicInfo));
