import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Header, Container, Icon, Segment, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  blankStaffProblem,
  createStaffProblem,
  updateStaffProblem,
  fetchStaffProblem,
  fetchStaffProblems,
} from '../actions/referenceAction';
import LeaveReasonForm from './formModals/LeaveReasonForm';

class StaffProblemListPage extends Component {
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
    this.props.fetchStaffProblems().then(({ data }) => {
      this.setState({
        ...this.state,
        items: data,
      });
    });
  }

  blankItem() {
    this.props
      .blankStaffProblem()
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
    const { messages, locale } = this.props.intl;

    return (
      <div>
        <ReactTable
          data={this.state.items || []}
          columns={[
            {
              Header: 'Название',
              accessor: 'name',
            },
            {
              Header: 'Название(En)',
              accessor: 'nameEn',
            },
            {
              Header: 'Название(Tr)',
              accessor: 'nameTr',
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
    let errors = Object.assign({}, this.state.errors);
    let hasError = false;
    if (!model['name']) {
      errors['name'] = true;
      hasError = true;
    }

    if (hasError) {
      this.setState({
        ...this.state,
        errors: errors,
      });
    } else {
      let resp = null;
      if (model.new) {
        resp = this.props.createStaffProblem(model);
      } else {
        resp = this.props.updateStaffProblem(model);
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
            console.log(e);
          });
      }
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

    this.setState({
      ...this.state,
      model: model,
    });
  }

  render() {
    const { messages } = this.props.intl;

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
            {'Типы проблем Проблемных сотрудников'}
          </Header>
          <Button
            className="ui icon button primary right floated"
            onClick={this.blankItem}
          >
            <Icon name="plus" />
          </Button>
        </Segment>
        {this.renderTable(this.props.items || [])}
        <LeaveReasonForm
          handleFormSubmit={this.handleFormSubmit}
          handleFormClose={this.handleFormClose}
          open={this.state.modalOpened}
          handleChange={this.handleChange}
          errors={this.state.errors}
          model={this.state.model}
        />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  {
    blankStaffProblem,
    createStaffProblem,
    updateStaffProblem,
    fetchStaffProblem,
    fetchStaffProblems,
  },
)(injectIntl(StaffProblemListPage));
