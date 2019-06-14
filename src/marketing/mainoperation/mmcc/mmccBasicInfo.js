//Contract basic info
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { Segment, Table, Icon, Dropdown, Label } from 'semantic-ui-react';

import {
  LinkToStaffCardView,
  LinkToCustomerHrc03,
} from '../../../utils/outlink';

import {
  handleFocus,
  moneyFormat,
  moneyInputHanler,
  stringYYYYMMDDToMoment,
  momentToStringYYYYMMDD,
} from '../../../utils/helpers';

import StaffF4Modal from '../../../reference/f4/staff/staffF4Modal';
import CustomerF4Modal from '../../../reference/f4/Customer/customerF4WithCreationPage';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MmccBasicInfo = props => {
  const [staffF4ModalOpen, setStaffF4ModalOpen] = useState(false);
  const [staffF4ModalPosition, setStaffF4ModalPosition] = useState('');
  const [customerF4ModalOpen, setCustomerF4ModalOpen] = useState(false);

  const {
    contract = {},
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
        trans="mmcc01"
        brnch={contract.branchId}
        branchOptions={branchOptions}
        bukrs={contract.bukrs}
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
                value={contract.bukrs}
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
                    ? branchOptions[contract.bukrs]
                      ? branchOptions[contract.bukrs]
                      : []
                    : []
                }
                value={contract.branchId}
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
                    ? serBranches[contract.bukrs]
                      ? serBranches[contract.bukrs]
                      : []
                    : []
                }
                value={contract.servBranchId}
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
                    ? finBranches[contract.bukrs]
                      ? finBranches[contract.bukrs]
                      : []
                    : []
                }
                value={contract.finBranchId}
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
                value={contract.contractTypeId}
                onChange={(e, { value }) =>
                  props.onBasicInfoInputChange(value, 'contractTypeId')
                }
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
                selected={stringYYYYMMDDToMoment(contract.contractDate)}
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
                  customerId={contract.customerId}
                  customerName={contract.customerName}
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
            <Table.Cell>{messages['demoSecretary']}</Table.Cell>
            <Table.Cell>
              <span>
                <LinkToStaffCardView
                  staffId={contract.demoSc}
                  staffFio={contract.demoScName}
                />
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
            <Table.Cell>{messages['dealer']}</Table.Cell>
            <Table.Cell>
              <span>
                <LinkToStaffCardView
                  staffId={contract.dealer}
                  staffFio={contract.dealerName}
                />
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
            <Table.Cell>{messages['collector']}</Table.Cell>
            <Table.Cell>
              <span>
                <LinkToStaffCardView
                  staffId={contract.collector}
                  staffFio={contract.collectorName}
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
            <Table.Cell />
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
