import { connect } from 'react-redux';
import faker from 'faker';
import PersonalInfoPanelDisplay from './PersonalInfoPanelDisplay';


const mapStateToProps = () => ({
  contractId: faker.finance.account(15),
  branchName: faker.address.city(),
  fullName: faker.name.findName(),
  customerIIN: faker.finance.account(15),
  dealerName: faker.name.findName(),
  customerStatus: faker.hacker.adjective(),
  filedBy: faker.company.companyName(),
});


const PersonalInfoPanelContainer = connect(
  mapStateToProps,
  null,
)(PersonalInfoPanelDisplay);

export default PersonalInfoPanelContainer;
