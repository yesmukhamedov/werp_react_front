import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Header,
  Segment,
  Button,
  Container,
  Grid,
  Dropdown,
  Icon,
} from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import {
  fetchAll,
  getAllMatnr,
  updateRow,
  fetchBrchesByBukrs,
  savePrice,
} from './../../marketingAction';
import { f4FetchCountryList } from '../../../reference/f4/f4_action';
import RenderPrListTable from './renderPrListTable';
import NewPrice from './newPrice';

class PriceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bukrs: '',
      showAddModal: false,
    };
    this.showAddModal = this.showAddModal.bind(this);
    this.updateRow = this.updateRow.bind(this);
  }

  inputChange(fieldName, o) {
    let bukrs = this.state.bukrs;
    if (o) {
      bukrs = o.value;
    } else {
      bukrs = null;
    }

    this.setState({
      ...this.state,
      bukrs: bukrs,
    });
  }
  // ***********************************  SEARCH BY BUKRS */
  loadItems(bukrs) {
    let temp = [];
    temp.push('bukrs=' + bukrs);
    let q = temp.join('&');
    this.props.fetchAll(q);
  }

  submitButton() {
    let bukrs = this.state.bukrs;
    this.loadItems(bukrs);
  }
  //*********************************** END SEARCH BY BUKRS */

  //*********************************** NEW PRICE  */
  addNPrice(price) {
    this.props.savePrice(price);
    this.setState({ showAddModal: false });
  }
  //*********************************** END NEW PRICE  */
  updateRow(updRow) {
    this.props.updateRow(updRow);
  }

  showAddModal = () => {
    this.props.f4FetchCountryList();
    this.setState({ showAddModal: true });
  };

  close = () => this.setState({ showAddModal: false });

  getAllMatnr() {
    this.props.getAllMatnr();
  }

  render() {
    const { messages } = this.props.intl;
    const isEnabled = this.state.bukrs.length === 0;
    return (
      <Container
        fluid
        style={{
          marginTop: '2em',
          marginBottom: '2em',
          paddingLeft: '2em',
          paddingRight: '2em',
        }}
      >
        <Segment clearing>
          <Header as="h2" floated="left">
            Цены реализации товаров
          </Header>
          <Button
            floated="right"
            color="teal"
            onClick={() => {
              this.showAddModal();
            }}
          >
            <Icon name="plus" /> {messages['BTN__ADD']}
          </Button>
        </Segment>
        <Grid>
          <Grid.Column floated="right" width={3}>
            <Segment tertiary>
              <Header as="h4">{messages['bukrs']}</Header>
              <Dropdown
                fluid
                selection
                search
                options={this.getCompanyOptions()}
                onChange={(e, o) => this.inputChange('bukrs', o)}
              />
              <br />
              <Button
                color="teal"
                floated="right"
                onClick={() => this.submitButton()}
                disabled={isEnabled}
              >
                {messages['Button.Search']}
              </Button>
              <br /> <br />
            </Segment>
          </Grid.Column>
          <Grid.Column floated="left" width={13}>
            <Segment tertiary>
              <RenderPrListTable
                messages={messages}
                items={this.props.items}
                updateRow={this.updateRow}
              />
            </Segment>
            <i>
              <strong>Total Rows: {this.props.totalRows}</strong>
            </i>
          </Grid.Column>
        </Grid>

        <NewPrice
          {...this.state}
          fetchBrchesByBukrs={this.props.fetchBrchesByBukrs}
          countryOpts={this.getCountryOptions()}
          messages={messages}
          close={this.close.bind(this)}
          getCompanyOptions={this.getCompanyOptions()}
          branchOptions={this.getBranchOptions()}
          allMatnr={this.getAllMatnr.bind(this)}
          matrn={this.props.matrn}
          addNPrice={this.addNPrice.bind(this)}
          errors={this.state.errors}
        />
      </Container>
    );
  }

  getCountryOptions() {
    if (!this.props.countryList) {
      return [];
    }
    const { countryList } = this.props;
    let out = countryList.map(c => {
      return {
        key: parseInt(c.countryId, 10),
        text: c.country,
        waers: c.currency,
        value: parseInt(c.countryId, 10),
      };
    });
    return out;
  }

  getCompanyOptions() {
    const { companyOptions } = this.props;
    if (!companyOptions) {
      return [];
    }
    let out = companyOptions.map(c => {
      return {
        key: parseInt(c.key, 10),
        text: `${c.text}`,
        value: parseInt(c.value, 10),
      };
    });
    return out;
  }

  getBranchOptions() {
    const { branchOptions } = this.props;
    if (!branchOptions) {
      return [];
    }
    let out = branchOptions.map(c => {
      return {
        key: parseInt(c.branch_id, 10),
        text: `${c.text45}`,
        value: parseInt(c.branch_id, 10),
      };
    });
    return out;
  }
}

function mapStateToProps(state) {
  return {
    countryList: state.f4.countryList,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.markprList.bukrsBranches,
    items: state.markprList.items,
    totalRows: state.markprList.totalRows,
    matrn: state.markprList.matrn,
  };
}

export default connect(
  mapStateToProps,
  {
    f4FetchCountryList,
    fetchAll,
    getAllMatnr,
    updateRow,
    fetchBrchesByBukrs,
    savePrice,
  },
)(injectIntl(PriceList));
