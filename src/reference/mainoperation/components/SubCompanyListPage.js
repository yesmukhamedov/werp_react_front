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
import {
  f4FetchSubCompanies,
  f4FetchSubCompanyTypes,
} from '../../f4/f4_action';
import StaffListModal from '../../../hr/mainoperation/staff/components/StaffListModal';
import {
  blankSubCompany,
  createSubCompany,
  updateSubCompany,
  fetchSubCompany,
} from '../actions/referenceAction';
import { fetchAllCurrentStaffs } from '../../../hr/mainoperation/staff/actions/hrStaffAction';

class SubCompanyListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: {},
      modalOpened: false,
      staffModalOpened: false,
      errors: {},
    };

    this.blankItem = this.blankItem.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderFormModal = this.renderFormModal.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDirectorSelect = this.handleDirectorSelect.bind(this);
  }

  componentWillMount() {
    this.props.f4FetchSubCompanies();
    this.props.f4FetchSubCompanyTypes();
    this.props.fetchAllCurrentStaffs();
  }

  blankItem() {
    this.props
      .blankSubCompany()
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
          data={items}
          columns={[
            {
              Header: 'Название',
              accessor: 'nameRu',
            },
            {
              Header: 'Тип',
              accessor: 'typeNameRu',
            },
            {
              Header: 'Type(En)',
              accessor: 'typeNameEn',
            },
            {
              Header: 'Type(Tr)',
              accessor: 'typeNameTr',
            },
            {
              Header: 'Директор',
              accessor: 'director.lf',
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
    if (!model['nameRu']) {
      errors['nameRu'] = true;
      hasError = true;
    }

    if (!model['type']) {
      errors['type'] = true;
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
        resp = this.props.createSubCompany(model);
      } else {
        resp = this.props.updateSubCompany(model);
      }

      if (resp) {
        resp
          .then(res => {
            this.setState({
              ...this.state,
              modalOpened: false,
              model: {},
            });
            this.props.f4FetchSubCompanies();
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  }

  handleDirectorSelect(staff) {
    let model = Object.assign({}, this.state.model);
    if (staff) {
      model['directorId'] = staff['staffId'];
      model['director'] = {
        staff_id: staff['staffId'],
        lf: staff['lastname'] + ' ' + staff['firstname'],
      };
    } else {
      model['directorId'] = null;
      model['director'] = null;
    }

    this.setState({
      ...this.state,
      model: model,
      staffModalOpened: false,
    });
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
          error={errors['nameRu']}
          value={model.nameRu || ''}
          control={Input}
          label="Название фирмы"
          placeholder="Название фирмы"
          name="nameRu"
          onChange={e => this.handleChange('nameRu', e.target.value)}
        />

        <Form.Field
          value={model.nameEn || ''}
          control={Input}
          label="Название фирмы (EN)"
          placeholder="Название фирмы (EN)"
          name="nameEn"
          onChange={e => this.handleChange('nameEn', e.target.value)}
        />

        <Form.Field
          value={model.nameTr || ''}
          control={Input}
          label="Название фирмы (TR)"
          placeholder="Название фирмы (TR)"
          name="nameTr"
          onChange={e => this.handleChange('nameTr', e.target.value)}
        />

        <Form.Select
          error={errors['type']}
          required
          name="type"
          fluid
          label="Тип"
          value={model['type']}
          options={this.props.types}
          onChange={(e, v) => this.handleChange('type', v.value)}
        />

        <div className="ui action input">
          <button
            className="ui icon button"
            onClick={() => this.handleDirectorSelect(null)}
          >
            <i className="trash icon" />
          </button>

          <input
            readOnly
            value={model['director'] ? model['director']['lf'] : ''}
            type="text"
            placeholder="Директор..."
          />
          <button
            onClick={() =>
              this.setState({ ...this.state, staffModalOpened: true })
            }
            className="ui icon button"
          >
            <i className="search icon" />
          </button>
        </div>
      </Form>
    );
  }

  renderFormModal() {
    return (
      <Modal
        open={this.state.modalOpened}
        closeOnEscape={false}
        closeOnRootNodeClick={false}
        dimmer="blurring"
        closeIcon
        size="tiny"
      >
        <Header
          content={
            this.state.model.new ? 'Добавление фирмы' : 'Редактирование фирмы'
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
        <StaffListModal
          onSelect={this.handleDirectorSelect}
          staffs={this.props.currentStaffs}
          close={() =>
            this.setState({ ...this.state, staffModalOpened: false })
          }
          opened={this.state.staffModalOpened}
        />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.f4.subCompanies,
    types: state.f4.subCompanyTypes,
    branchOptionsAll: state.userInfo.branchOptionsAll,
    companyOptions: state.userInfo.companyOptions,
    currentStaffs: state.hrStaff.allCurrentStaffs,
  };
}

export default connect(
  mapStateToProps,
  {
    f4FetchSubCompanies,
    blankSubCompany,
    f4FetchSubCompanyTypes,
    createSubCompany,
    updateSubCompany,
    fetchSubCompany,
    fetchAllCurrentStaffs,
  },
)(injectIntl(SubCompanyListPage));
