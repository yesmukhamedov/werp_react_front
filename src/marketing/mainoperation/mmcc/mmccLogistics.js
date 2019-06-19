import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { fetchDynObjMarketing } from '../../marketingAction';
import MatnrListF4Modal from '../contractAdditionaComponents/matnrListF4';
import TradeInMatnrListF4Modal from '../contractAdditionaComponents/tradeInMatnrListF4';
import PromoListF4Modal from '../contractAdditionaComponents/promoListF4';
import { Segment, Table, Icon, Input, Label, List } from 'semantic-ui-react';

import {
  stringYYYYMMDDToMoment,
  momentToStringYYYYMMDD,
} from '../../../utils/helpers';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
require('moment/locale/ru');
require('moment/locale/tr');

const MmccLogistics = props => {
  const {
    contract: {
      bukrs = '',
      branchId = '',
      tradeIn = 0,
      matnrReleaseDate = '',
      contractTypeId = '',
      tovarSerial = '',
      tradeInTovarSerial = '',
    } = {},
    tcode = '',
    contractPromoList = [],
    matnrList = [],
    promoList = [],
    tradeInMatnrList = [],
    language,
    intl: { messages },
  } = props;

  const [isLoadingMatnrList, setIsLoadingMatnrList] = useState(false);
  const [isLoadingTradeInMatnrList, setIsLoadingTradeInMatnrList] = useState(
    false,
  );
  const [isLoadingPromoList, setIsLoadingPromoList] = useState(false);
  const [matnrListF4ModalOpen, setMatnrListF4ModalOpen] = useState(false);
  const [promoListF4ModalOpen, setPromoListF4ModalOpen] = useState(false);
  const [
    tradeInMatnrListF4ModalOpen,
    setTradeInMatnrListF4ModalOpen,
  ] = useState(false);

  //componentWillRecieveProps
  useEffect(() => {
    //get Price List
    if (branchId && branchId > 0 && contractTypeId && contractTypeId > 0) {
      props.fetchDynObjMarketing(
        'marketing/contract/matnrF4/fetch_matnr_list',
        { bukrs, tcode, branchId, contractTypeId },
        bool => setIsLoadingMatnrList(bool),
      );
      props.fetchDynObjMarketing(
        'marketing/contract/tradeInMatnrF4/fetch_tradeInMatnr_list',
        { bukrs, tcode, branchId, contractTypeId },
        bool => setIsLoadingTradeInMatnrList(bool),
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
      <TradeInMatnrListF4Modal
        open={tradeInMatnrListF4ModalOpen}
        tradeInMatnrList={tradeInMatnrList}
        onCloseTradeInMatnrF4={bool => setTradeInMatnrListF4ModalOpen(bool)}
        onTradeInMatnrSelect={item =>
          props.onLogisticsInputChange(item, 'tradeInTovarSerial')
        }
        isLoadingTradeInMatnrList={isLoadingTradeInMatnrList}
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
                  onClick={() => setTradeInMatnrListF4ModalOpen(true)}
                />
                <Icon
                  name="remove"
                  size="large"
                  className="clickableIcon"
                  color="red"
                  onClick={event =>
                    props.onLogisticsInputChange(
                      'remove',
                      'removeTradeInTovarSerial',
                    )
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
    tradeInMatnrList: state.marketing.dynamicObject.tradeInMatnrList,
    promoList: state.marketing.dynamicObject.promoList,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchDynObjMarketing,
  },
)(injectIntl(MmccLogistics));
