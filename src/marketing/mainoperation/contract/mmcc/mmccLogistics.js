import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { fetchDynObjMarketing } from '../../../marketingAction';
import MatnrListF4Modal from '../matnrListF4';
import PromoListF4Modal from '../promoListF4';
import {
  Segment,
  Table,
  Icon,
  Dropdown,
  Input,
  Label,
  List,
  Button,
  Image,
} from 'semantic-ui-react';

import {
  stringYYYYMMDDToMoment,
  momentToStringYYYYMMDD,
} from '../../../../utils/helpers';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
require('moment/locale/ru');
require('moment/locale/tr');

const MmccLogistics = props => {
  const {
    bukrs = '',
    branchId = '',
    tcode = '',
    dealer = '',
    contractTypeId = '',
    tovarSerial = '',
    matnrReleaseDate = '',
    tradeIn = 0,
    tradeInMatnrListId = 0,
    tradeInTovarSerial = '',
    contractPromoList = [],
    matnrList = [],
    promoList = [],
    language,
    intl: { messages },
  } = props;

  const [isLoadingMatnrList, setIsLoadingMatnrList] = useState(false);
  const [isLoadingPromoList, setIsLoadingPromoList] = useState(false);
  const [matnrListF4ModalOpen, setMatnrListF4ModalOpen] = useState(false);
  const [promoListF4ModalOpen, setPromoListF4ModalOpen] = useState(false);

  //componentWillRecieveProps
  useEffect(() => {
    //get Price List
    if (branchId && branchId > 0 && contractTypeId && contractTypeId > 0) {
      props.fetchDynObjMarketing(
        'marketing/contract/matnrF4/fetch_matnr_list',
        { bukrs, tcode, branchId, contractTypeId },
        bool => setIsLoadingMatnrList(bool),
      );
    }
  }, [branchId, contractTypeId]);

  //componentWillRecieveProps
  useEffect(() => {
    //get Price List
    if (branchId && branchId > 0) {
      props.fetchDynObjMarketing(
        'marketing/contract/promoF4/fetch_promo_list',
        { bukrs, tcode, branchId },
        bool => setIsLoadingPromoList(bool),
      );
    }
  }, [branchId]);

  const tradeInOptions = [
    { key: 0, text: '', value: 0 },
    { key: 1, text: 'Trade-in 1', value: 1 },
    { key: 2, text: 'Trade-in 2', value: 2 },
    { key: 3, text: 'Trade-in 3', value: 3 },
  ];

  return (
    <div>
      {/* <Segment padded size="small">
        <Label color="orange" ribbon>
          {messages['logistics']}
        </Label> */}

      <MatnrListF4Modal
        open={matnrListF4ModalOpen}
        matnrList={matnrList}
        onCloseMatnrF4={bool => setMatnrListF4ModalOpen(bool)}
        onMatnrSelect={item =>
          props.onLogisticsInputChange(item, 'tovarSerial')
        }
        isLoadingMatnrList={isLoadingMatnrList}
      />
      <PromoListF4Modal
        open={promoListF4ModalOpen}
        promoList={promoList}
        onClosePromoF4={bool => setPromoListF4ModalOpen(bool)}
        onPromoSelect={item => props.onLogisticsInputChange(item, 'promo')}
        isLoadingPromoList={isLoadingPromoList}
      />

      <Table collapsing>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Trade-in</Table.Cell>
            <Table.Cell>
              <Dropdown
                noResultsMessage={messages['noResultsMessage']}
                selection
                options={tradeInOptions}
                value={tradeIn}
                onChange={(e, { value }) => {
                  props.onLogisticsInputChange(value, 'tradeIn');
                }}
              />
            </Table.Cell>
          </Table.Row>
          {tradeIn !== undefined && tradeIn !== null && tradeIn > 0 && (
            <Table.Row>
              <Table.Cell>
                Trade-in {messages['productSerialNumber']}
              </Table.Cell>
              <Table.Cell>
                <Input color="teal" value={tradeInTovarSerial} maxLength="18" />
                <Icon
                  name="clone"
                  size="large"
                  className="clickableIcon"
                  onClick={() => setMatnrListF4ModalOpen(true)}
                />
                <Icon
                  name="remove"
                  size="large"
                  className="clickableIcon"
                  color="red"
                  onClick={event =>
                    props.onLogisticsInputChange('remove', 'removeTovarSerial')
                  }
                />
              </Table.Cell>
            </Table.Row>
          )}
          <Table.Row>
            <Table.Cell>{messages['dateOfIssue']}</Table.Cell>
            <Table.Cell>
              <DatePicker
                className="date-auto-width"
                autoComplete="off"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select" // timezone="UTC"
                selected={stringYYYYMMDDToMoment(matnrReleaseDate)}
                onChange={(e, { value }) =>
                  props.onLogisticsInputChange(
                    momentToStringYYYYMMDD(e),
                    'matnrReleaseDate',
                  )
                }
                locale={language}
                dateFormat="DD.MM.YYYY"
              />
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>{messages['productSerialNumber']}</Table.Cell>
            <Table.Cell>
              <Input color="teal" value={tovarSerial} maxLength="18" />
              <Icon
                name="clone"
                size="large"
                className="clickableIcon"
                onClick={() => setMatnrListF4ModalOpen(true)}
              />
              <Icon
                name="remove"
                size="large"
                className="clickableIcon"
                color="red"
                onClick={event =>
                  props.onLogisticsInputChange('remove', 'removeTovarSerial')
                }
              />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{messages['promotion']}</Table.Cell>
            <Table.Cell>
              <Icon
                name="clone"
                size="large"
                className="clickableIcon"
                onClick={() => setPromoListF4ModalOpen(true)}
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <Segment>
        <Label color="blue" ribbon>
          {messages['promotion']}
        </Label>

        <List verticalAlign="middle" celled size={'small'}>
          {contractPromoList.map(item => {
            return (
              <List.Item key={item.id}>
                <List.Content floated="right">
                  <Icon
                    name="remove"
                    size="large"
                    className="clickableIcon"
                    color="red"
                    onClick={event =>
                      props.onLogisticsInputChange(item.id, 'removePromo')
                    }
                  />
                </List.Content>
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

      {/* </Segment> */}
    </div>
  );
};

function mapStateToProps(state) {
  // console.log(state,'state')
  return {
    language: state.locales.lang,
    matnrList: state.marketing.dynamicObject.matnrList,
    promoList: state.marketing.dynamicObject.promoList,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchDynObjMarketing,
  },
)(injectIntl(MmccLogistics));
