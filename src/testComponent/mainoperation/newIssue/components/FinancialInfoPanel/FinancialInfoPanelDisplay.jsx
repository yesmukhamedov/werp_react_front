import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Label, List, Loader, Segment } from 'semantic-ui-react';
import PortalComponentDisplay from '../../../../../general/portal/PortalComponent';
import { LEGACY_URL } from '../../../../../utils/constants';
import { extractLFP } from '../../../../../utils/helpers';
import { PaymentBreakdownTableDisplay } from '../PaymentBreakdownTable';

const FinancialInfoPanelDisplay = (props) => {
  const { financialDetails = {} } = props;
  const {
    initialPayment,
    installmentPlanDuration,
    residualAmount,
    dealerDiscount,
    recommenderDiscount,
    financialAgent,
    recommender,
    additionalInfo,
    productSerialNumber,
    promotions,
    monthlyPayments,
    otherPurchases,
    bankPartner,
  } = financialDetails;
  return (
    <Segment raised>
      <Label color="blue" ribbon>
        Финансовые данные клиента
      </Label>
      {financialDetails ? (
        <Grid columns={3} divided stackable>
          <Grid.Row>
            <Grid.Column>
              <List>
                <List.Item>
                  <List.Header className="list-header">
                    Первоначальная сумма:
                  </List.Header>
                  {initialPayment || <span>&mdash;</span>}
                </List.Item>
                <List.Item>
                  <List.Header className="list-header">
                    Срок рассрочки:
                  </List.Header>
                  {installmentPlanDuration || <span>&mdash;</span>}
                </List.Item>
                <List.Item>
                  <List.Header className="list-header">
                    Остаток суммы:
                  </List.Header>
                  {residualAmount || <span>&mdash;</span>}
                </List.Item>
              </List>

              <PortalComponentDisplay
                openLabel="Ежемесячный взнос"
                closeLabel="Скрыть ежемесячный взнос"
                title="График ежемесячного взноса"
              >
                <PaymentBreakdownTableDisplay
                  monthlyPayments={monthlyPayments}
                />
              </PortalComponentDisplay>
            </Grid.Column>
            <Grid.Column>
              <List>
                <List.Item>
                  <List.Header className="list-header">
                    Скидка от дилера:
                  </List.Header>
                  {dealerDiscount || <span>&mdash;</span>}
                </List.Item>
                <List.Item>
                  <List.Header className="list-header">
                    Скидка от рекомендателя:
                  </List.Header>
                  {recommenderDiscount || <span>&mdash;</span>}
                </List.Item>
                <List.Item>
                  <List.Header className="list-header">
                    Оплата через:
                  </List.Header>
                  {(bankPartner && `${bankPartner.shortName}`) || <span>&mdash;</span>}
                </List.Item>
                <List.Item>
                  <List.Header className="list-header">
                    Финансовый агент:
                  </List.Header>
                  {
                    financialAgent &&
                    extractLFP(financialAgent)
                  }
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column>
              <List>
                <List.Item>
                  <List.Header className="list-header">
                    Рекомендатель:
                  </List.Header>
                  {
                    (recommender &&
                    <Link target='_blank' to={`${LEGACY_URL}/dms/contract/dmsc03.xhtml?contract_id=` + recommender.contractNumber}>
                      {
                        extractLFP(recommender.recommenderName)
                      }
                    </Link>) || <span>&mdash;</span>
                  }
                </List.Item>
                <List.Item>
                  <List.Header className="list-header">
                    Дополнительная информация:
                  </List.Header>
                  {additionalInfo || <span>&mdash;</span>}
                </List.Item>
                <List.Item>
                  <List.Header className="list-header">
                    Заводской номер аппарата:
                  </List.Header>
                  {
                    productSerialNumber || <span>&mdash;</span>
                  }
                </List.Item>
                <List.Item>
                  <List.Header className="list-header">
                    Подарки:
                  </List.Header>
                  {
                    (promotions && promotions.join(', ')) || <span>&mdash;</span>
                  }
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ) : (
        <Loader active />
      )}
    </Segment>
  );
};

FinancialInfoPanelDisplay.propTypes = {
  initialPayment: PropTypes.string.isRequired,
  remainingPayment: PropTypes.string.isRequired,
  dealerDiscount: PropTypes.string.isRequired,
  referalDiscount: PropTypes.string.isRequired,
  bankPartnerName: PropTypes.string.isRequired,
  financialAgent: PropTypes.string.isRequired,
  referrer: PropTypes.string.isRequired,
  serialNumber: PropTypes.string.isRequired,
  promotionName: PropTypes.string.isRequired,
};

export default FinancialInfoPanelDisplay;
