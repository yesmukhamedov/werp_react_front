import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {
  Header,
  Container,
  Icon,
  Segment,
  Button,
  Modal,
  Form,
  Input,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { f4FetchNationalities } from '../../f4/f4_action';
import { saveNationality } from '../actions/referenceAction';

class NationalityListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: {},
      modalOpened: false,
      staffListModalOpened: false,
      errors: {},
    };

    this.blankItem = this.blankItem.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderFormModal = this.renderFormModal.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.props.f4FetchNationalities();
  }

  blankItem() {
    this.setState({
      ...this.state,
      model: {
        name: '',
        nameEn: '',
        nameTr: '',
        new: true,
      },
      modalOpened: true,
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
          data={items}
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
      this.props
        .saveNationality(model)
        .then(res => {
          this.setState({
            ...this.state,
            modalOpened: false,
            model: {},
          });
          this.props.f4FetchNationalities();
        })
        .catch(e => {
          console.log(e);
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

    this.setState({
      ...this.state,
      model: model,
    });
  }

  renderForm() {
    const { model, errors } = this.state;
    return (
      <Form>
        <Form.Field
          error={errors['name']}
          value={model.name || ''}
          control={Input}
          label="Название национальности"
          name="name"
          onChange={e => this.handleChange('name', e.target.value)}
        />

        <Form.Field
          value={model.nameEn || ''}
          control={Input}
          label="Название национальности(EN)"
          name="nameEn"
          onChange={e => this.handleChange('nameEn', e.target.value)}
        />

        <Form.Field
          value={model.nameTr || ''}
          control={Input}
          label="Название национальности(TR)"
          name="nameTr"
          onChange={e => this.handleChange('nameTr', e.target.value)}
        />
      </Form>
    );
  }

  renderFormModal() {
    return (
      <Modal
        open={this.state.modalOpened}
        closeOnEscape={false}
        closeOnRootNodeClick={false}
        dimmer="inverted"
        closeIcon
        size="tiny"
      >
        <Header
          content={
            this.state.model.new
              ? 'Добавление национальности'
              : 'Редактирование национальности'
          }
        />
        <Modal.Content>
          <Modal.Description>{this.renderForm()}</Modal.Description>
        </Modal.Content>

        <Modal.Actions>
          <Button
            color="blue"
            onClick={this.handleFormSubmit}
            floated="right"
            type="submit"
            inverted
          >
            <Icon name="checkmark" /> Сохранить
          </Button>
          <Button
            color="red"
            floated="right"
            onClick={this.handleFormClose}
            inverted
          >
            <Icon name="remove" /> Отмена
          </Button>
          <br />
          <br />
        </Modal.Actions>
      </Modal>
    );
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
            {'Официальные фирмы'}
          </Header>
          <Button
            className="ui icon button primary right floated"
            onClick={this.blankItem}
          >
            <Icon name="plus" />
          </Button>
        </Segment>
        {this.renderTable(this.props.items || [])}
        {this.renderFormModal()}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.f4.nationalities,
  };
}

export default connect(
  mapStateToProps,
  {
    f4FetchNationalities,
    saveNationality,
  },
)(injectIntl(NationalityListPage));
