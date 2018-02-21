import { connect } from 'react-redux';
import faker from 'faker';
import FinancialInfoPanelDisplay from './FinancialInfoPanelDisplay';

const mapStateToProps = () => ({
  initialPayment: faker.finance.amount(),
  remainingPayment: faker.finance.amount(),
  dealerDiscount: faker.finance.amount(),
  referalDiscount: faker.finance.amount(),
  bankPartnerName: faker.name.findName(),
  financialAgent: faker.name.findName(),
  referrer: faker.name.findName(),
  serialNumber: faker.random.alphaNumeric(10),
  promotionName: faker.commerce.productName(),
});

const FinancialInfoPanelContainer = connect(
  mapStateToProps,
  null,
)(FinancialInfoPanelDisplay);

export default FinancialInfoPanelContainer;
