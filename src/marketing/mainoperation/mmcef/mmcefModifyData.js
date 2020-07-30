//Marketing mainoperation contract edit finance
//mmcef
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  Table,
  Button,
  Icon,
  Input,
  Dropdown,
  Segment,
  Label,
} from 'semantic-ui-react';
import {
  handleFocus,
  moneyFormat,
  stringYYYYMMDDToMoment,
  momentToStringYYYYMMDD,
} from '../../../utils/helpers';
import { LinkToStaffCardView, LinkToMmcvNewTab } from '../../../utils/outlink';

import StaffF4Modal from '../../../reference/f4/staff/staffF4Modal';
import RecommenderF4Modal from '../contractAdditionaComponents/recommenderF4';
import PriceListF4Modal from '../contractAdditionaComponents/priceListF4';

import { fetchDynObjMarketing } from '../../marketingAction';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
//import moment from 'moment';
require('moment/locale/ru');
require('moment/locale/tr');

const MmcefModifyData = props => {
  const [staffF4ModalOpen, setStaffF4ModalOpen] = useState(false);
  const [recommenderF4ModalOpen, setRecommenderF4ModalOpen] = useState(false);
  const [staffF4ModalPosition, setStaffF4ModalPosition] = useState('');
  const [priceListF4ModalOpen, setPriceListF4ModalOpen] = useState(false);
  const [isLoadingPriceList, setIsLoadingPriceList] = useState(false);

  const {
    contract,
    newContract,
    isSavingContract,
    serBranches,
    finBranches,
    subCompaniesOptions,
    conStatusOptions,
    modifiedField,
    companyOptions = [],
    branchOptions = [],
    priceList = [],
    newPs = [],
    intl: { messages },
    language,
  } = props;

  //componentWillRecieveProps
  useEffect(() => {
    if (contract) {
      //get Price List
      if (
        contract.branchId &&
        contract.branchId > 0 &&
        contract.contractTypeId &&
        contract.contractTypeId > 0
      ) {
        props.fetchDynObjMarketing(
          'marketing/contract/priceListF4/fetch_price_list',
          {
            bukrs: contract.bukrs,
            tcode: 'MMCEF',
            branchId: contract.branchId,
            contractTypeId: contract.contractTypeId,
          },
          bool => setIsLoadingPriceList(bool),
        );
      }
    }
  }, [contract]);

  const renderSaveButton = fieldName => {
    if (modifiedField === '') return '';
    else if (fieldName === modifiedField) {
      return (
        <Button
          className={'hidden'}
          icon
          labelPosition="left"
          primary
          size="small"
          loading={isSavingContract}
          onClick={() => props.onSave()}
        >
          <Icon name="save" size="large" />
          {messages['save']}
        </Button>
      );
    }
  };

  const paymentScheduleOutput = () => {
    let count = 0;
    // console.log('paymentSchedule',ps)
    return (
      <Segment padded size="small">
        <Label color="blue" ribbon>
          {messages['paymentSchedule']}
        </Label>
        <Table collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>{messages['date']}</Table.HeaderCell>
              <Table.HeaderCell>{messages['amount']}</Table.HeaderCell>
              <Table.HeaderCell>{messages['paid']}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {newPs.map(item => {
              const {
                isFirstPayment,
                paymentDate,
                sum2,
                paymentScheduleId,
                paid,
              } = item;
              count += 1;
              return (
                <Table.Row key={paymentScheduleId}>
                  <Table.Cell>
                    {isFirstPayment == '1'
                      ? messages['firstPayment']
                      : count - 1}
                  </Table.Cell>
                  <Table.Cell>
                    <DatePicker
                      className="date-auto-width"
                      autoComplete="off"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select" // timezone="UTC"
                      selected={stringYYYYMMDDToMoment(paymentDate)}
                      onChange={(e, { value }) =>
                        props.onInputChange(
                          momentToStringYYYYMMDD(e),
                          'paymentDate',
                          paymentScheduleId,
                        )
                      }
                      locale={language}
                      disabled={paymentScheduleId !== 1}
                      dateFormat="DD.MM.YYYY"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Input
                      color="teal"
                      label={newContract.waers}
                      labelPosition="left"
                      value={moneyFormat(sum2)}
                      maxLength="18"
                      onFocus={handleFocus}
                      onChange={(e, { value }) =>
                        props.onInputChange(value, 'sum2', paymentScheduleId)
                      }
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Input
                      color="teal"
                      label={newContract.waers}
                      labelPosition="left"
                      value={moneyFormat(paid)}
                      maxLength="18"
                      onFocus={handleFocus}
                      onChange={(e, { value }) =>
                        props.onInputChange(value, 'paid', paymentScheduleId)
                      }
                    />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Segment>
    );
  };
  return (
    <div>
      <PriceListF4Modal
        open={priceListF4ModalOpen}
        priceList={priceList}
        onClosePriceListF4={bool => setPriceListF4ModalOpen(bool)}
        onPriceSelect={item => props.onInputChange(item, 'price', '')}
        isLoadingPriceList={isLoadingPriceList}
      />
      <StaffF4Modal
        open={staffF4ModalOpen}
        closeModal={bool => setStaffF4ModalOpen(bool)}
        onStaffSelect={item => props.onInputChange(item, staffF4ModalPosition)}
        trans="mmcef"
        brnch={contract.branchId}
        branchOptions={branchOptions}
        bukrs={contract.bukrs}
        companyOptions={companyOptions}
        bukrsDisabledParent
        unemployedDisabledParent
      />

      <RecommenderF4Modal
        open={recommenderF4ModalOpen}
        onCloseRecommenderListF4={bool => setRecommenderF4ModalOpen(bool)}
        onRecommenderSelect={item => props.onInputChange(item, 'refContractId')}
        trans="mmcef"
        bukrs={contract.bukrs}
      />

      <Table collapsing className="borderLess">
        <Table.Body>
          <Table.Row>
            <Table.Cell>{messages['status']}</Table.Cell>
            <Table.Cell>
              <Dropdown
                placeholder={messages['status']}
                search
                selection
                noResultsMessage={messages['noResultsMessage']}
                options={conStatusOptions}
                value={newContract.contractStatusId}
                onChange={(e, { value }) =>
                  props.onInputChange(value, 'contractStatusId')
                }
              />
            </Table.Cell>
            <Table.Cell>{renderSaveButton('contractStatusId')}</Table.Cell>
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
                    ? serBranches[newContract.bukrs]
                      ? serBranches[newContract.bukrs]
                      : []
                    : []
                }
                value={newContract.servBranchId}
                onChange={(e, { value }) =>
                  props.onInputChange(value, 'servBranchId')
                }
              />
            </Table.Cell>
            <Table.Cell>{renderSaveButton('servBranchId')}</Table.Cell>
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
                    ? finBranches[newContract.bukrs]
                      ? finBranches[newContract.bukrs]
                      : []
                    : []
                }
                value={newContract.finBranchId}
                onChange={(e, { value }) =>
                  props.onInputChange(value, 'finBranchId')
                }
              />
            </Table.Cell>
            <Table.Cell>{renderSaveButton('finBranchId')}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['dealer']}</Table.Cell>
            <Table.Cell>
              <span>
                <LinkToStaffCardView
                  staffId={newContract.dealer}
                  staffFio={newContract.dealerName}
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
                onClick={event => props.onInputChange('remove', 'dealerRemove')}
              />
            </Table.Cell>
            <Table.Cell>{renderSaveButton('dealer')}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['demoSecretary']}</Table.Cell>
            <Table.Cell>
              <span>
                <LinkToStaffCardView
                  staffId={newContract.demoSc}
                  staffFio={newContract.demoScName}
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
                onClick={event => props.onInputChange('', 'demoScRemove')}
              />
            </Table.Cell>
            <Table.Cell>{renderSaveButton('demoSc')}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['collector']}</Table.Cell>
            <Table.Cell>
              <span>
                <LinkToStaffCardView
                  staffId={newContract.collector}
                  staffFio={newContract.collectorName}
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
                  props.onInputChange('remove', 'collectorRemove')
                }
              />
            </Table.Cell>
            <Table.Cell>{renderSaveButton('collector')}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['recommender']}</Table.Cell>
            <Table.Cell>
              <span>
                <LinkToMmcvNewTab
                  contractNumber={newContract.refContractNumber}
                  customerFio={newContract.refCustomerName}
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
                  props.onInputChange('remove', 'refContractIdRemove')
                }
              />
            </Table.Cell>
            <Table.Cell>{renderSaveButton('refContractId')}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['registeredTo']}</Table.Cell>
            <Table.Cell>
              <Dropdown
                search
                noResultsMessage={messages['noResultsMessage']}
                selection
                options={subCompaniesOptions}
                value={newContract.legalEntityId}
                onChange={(e, { value }) => {
                  props.onInputChange(value, 'legalEntityId', '');
                }}
              />
            </Table.Cell>
            <Table.Cell>{renderSaveButton('legalEntityId')}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>{messages['dealerDiscount']}</Table.Cell>
            <Table.Cell>
              <Input
                color="teal"
                label={newContract.waers}
                labelPosition="left"
                value={moneyFormat(newContract.dealerSubtract)}
                maxLength="18"
                onFocus={handleFocus}
                onChange={(e, { value }) =>
                  props.onInputChange(value, 'dealerSubtract', '')
                }
              />
            </Table.Cell>
            <Table.Cell>{renderSaveButton('dealerSubtract')}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>{messages['price']}</Table.Cell>
            <Table.Cell>
              <Input
                color="teal"
                label={newContract.waers}
                labelPosition="left"
                value={moneyFormat(newContract.price)}
                maxLength="18"
              />
              <Icon
                name="clone"
                size="large"
                className="clickableIcon"
                onClick={() => setPriceListF4ModalOpen(true)}
              />
            </Table.Cell>
            <Table.Cell>{renderSaveButton('priceListId')}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      {paymentScheduleOutput()}
    </div>
  );
};

function mapStateToProps(state) {
  // console.log(state, 'state');
  return {
    language: state.locales.lang,
    priceList: state.marketing.dynamicObject.priceList,
  };
}

export default connect(mapStateToProps, {
  fetchDynObjMarketing,
})(injectIntl(MmcefModifyData));
