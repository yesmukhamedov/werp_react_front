import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Header, Container, Icon, Segment, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  fetchDemoPrices,
  createDemoPrice,
  updateDemoPrice,
  blankDemoPrice,
  fetchDemoPrice,
} from '../actions/referenceAction';
import DemoPriceForm from './formModals/DemoPriceForm';
import { notify } from '../../../general/notification/notification_action';

class DemoPriceListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: {},
      modalOpened: false,
      errors: {},
      items: [],
    };

    this.blankItem = this.blankItem.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loadItems = this.loadItems.bind(this);
  }

  componentDidMount() {
    this.loadItems();
  }

  loadItems() {
    this.props.fetchDemoPrices().then(({ data }) => {
      this.setState({
        ...this.state,
        items: data,
      });
    });
  }

  blankItem() {
    this.props
      .blankDemoPrice()
      .then(res => {
        this.setState({
          ...this.state,
          model: res.data,
          modalOpened: true,
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateItem(m) {
    this.setState({
      ...this.state,
      model: m,
      modalOpened: true,
    });
  }

  renderTable(items) {
    const {
      messages,
      // locale
    } = this.props.intl;

    return (
      <div>
        <ReactTable
          data={this.state.items || []}
          columns={[
            {
              Header: 'Компания',
              accessor: 'company.name',
            },
            {
              Header: 'Филиал',
              accessor: 'branch.text45',
            },
            {
              Header: 'Район',
              accessor: 'districtName',
            },
            {
              Header: 'Сумма',
              accessor: 'price',
            },
            {
              Header: '',
              accessor: 'id',
              filterable: false,
              Cell: row => (
                <Button icon onClick={() => this.updateItem(row.original)}>
                  <Icon name={'pencil'} />
                </Button>
              ),
            },
          ]}
          previousText={messages.previousText}
          nextText={messages.nextText}
          defaultPageSize={50}
          filterable
          className="-striped -highlight"
        />
      </div>
    );
  }

  handleFormSubmit() {
    const { model } = this.state;

    let resp = null;
    if (model.new) {
      resp = this.props.createDemoPrice(model);
    } else {
      resp = this.props.updateDemoPrice(model);
    }

    if (resp) {
      resp
        .then(res => {
          this.setState({
            ...this.state,
            modalOpened: false,
            model: {},
          });
          this.loadItems();
        })
        .catch(e => {
          if (e.response && e.response.status === 400) {
            this.props.notify('error', e.response.data.message);
          }
        });
    }
  }

  handleFormClose() {
    this.setState({
      ...this.state,
      modalOpened: false,
    });
  }

  handleChange(name, value) {
    let model = Object.assign({}, this.state.model);

    model[name] = value;
    if (name === 'bukrs') {
      model['branchId'] = null;
    }

    this.setState({
      ...this.state,
      model: model,
    });
  }

  render() {
    //const { messages } = this.props.intl;
    const { model, modalOpened, errors } = this.state;

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
            {'Ценники демо по районам'}
          </Header>
          <Button
            className="ui icon button primary right floated"
            onClick={this.blankItem}
          >
            <Icon name="plus" />
          </Button>
        </Segment>
        {this.renderTable(this.props.items || [])}
        <DemoPriceForm
          companyOptions={this.props.companyOptions}
          branchOptions={this.props.branchOptions[model['bukrs']] || []}
          handleFormSubmit={this.handleFormSubmit}
          handleFormClose={this.handleFormClose}
          open={modalOpened}
          handleChange={this.handleChange}
          errors={errors}
          model={model}
        />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsMarketing,
  };
}

export default connect(mapStateToProps, {
  blankDemoPrice,
  createDemoPrice,
  updateDemoPrice,
  fetchDemoPrice,
  fetchDemoPrices,
  notify,
})(injectIntl(DemoPriceListPage));
