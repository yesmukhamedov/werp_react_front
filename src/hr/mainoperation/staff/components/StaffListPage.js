import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Divider,
  Header,
  Button,
  Segment,
  Form,
  Grid,
  Input,
} from 'semantic-ui-react';
import BukrsF4 from '../../../../reference/f4/bukrs/BukrsF4';
import BranchF4 from '../../../../reference/f4/branch/BranchF4';
import PositionF4 from '../../../../reference/f4/position/PositionF4';
import { connect } from 'react-redux';
import { fetchCurrentStaffs } from '../actions/hrStaffAction';
import StaffListTable from './StaffListTable';

class StaffListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      queryParams: {
        bukrs: '',
        branchIds: [],
        iinBin: '',
        firstName: '',
        lastName: '',
        departmentId: 0,
        positionId: 0,
        page: 0,
      },
    };

    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.loadItems = this.loadItems.bind(this);
    this.inputChanged = this.inputChanged.bind(this);
  }

  componentWillMount() {
    // this.loadItems(0);
  }

  loadItems(page) {
    const { queryParams } = this.state;
    const params = {};
    for (const k in queryParams) {
      if (k === 'branchIds') {
        if (
          typeof queryParams[k] !== 'undefined' &&
          queryParams[k].length > 0
        ) {
          params[k] = queryParams[k].join();
        }
      } else {
        params[k] = queryParams[k];
      }
    }

    params.page = page;
    this.props.fetchCurrentStaffs(params);
  }

  inputChanged(e, data) {
    const { name, value } = data;
    const { queryParams } = this.state;
    queryParams[name] = value;
    this.setState({
      ...this.state,
      queryParams,
    });
  }

  getBukrsBranches = bukrs => {
    const { branchOptionsAll } = this.props;
    if (!bukrs || !branchOptionsAll || !branchOptionsAll[bukrs]) {
      return [];
    }

    return branchOptionsAll[bukrs];
  };

  renderSearchPanel() {
    const genders = [
      { key: '', text: 'Не выбрано', value: '' },
      { key: 'non_select', text: 'Без значение', value: 'non_select' },
      { key: 'male', text: 'Муж', value: 'male' },
      { key: 'female', text: 'Жен', value: 'female' },
    ];
    const companyOptions = this.props.companyOptions || [];
    return (
      <div>
        <Header as="h4" attached="top">
          Расширенный поиск
        </Header>
        <Segment attached>
          <Form>
            <Form.Select
              name="bukrs"
              label="Компания"
              options={companyOptions}
              placeholder="Компания"
              onChange={this.handleDropdownChange}
            />
            <Form.Select
              name="branch"
              multiple
              search
              selection
              label="Филиал"
              options={this.getBukrsBranches(this.state.queryParams.bukrs)}
              placeholder="Филиал"
              onChange={this.handleDropdownChange}
            />
            <PositionF4 handleChange={this.handleDropdownChange} />
            <Form.Field>
              <label>Фамилия</label>
              <Input
                name="lastName"
                placeholder="Фамилия"
                onChange={this.inputChanged}
              />
            </Form.Field>

            <Form.Field>
              <label>Имя</label>
              <Input
                name="firstName"
                placeholder="Имя"
                onChange={this.inputChanged}
              />
            </Form.Field>
            <Form.Select
              name="gender"
              label="Пол"
              options={genders}
              placeholder="Пол"
              onChange={this.handleDropdownChange}
            />
            <Button
              loading={this.state.btnLoading}
              onClick={() => this.loadItems(0)}
              type="submit"
            >
              Сформировать
            </Button>
          </Form>
        </Segment>
      </div>
    );
  }

  handleDropdownChange(e, o) {
    const { name, value } = o;
    let queryParams = Object.assign({}, this.state.queryParams);
    switch (name) {
      case 'bukrs':
        queryParams[name] = value;
        queryParams['branchIds'] = [];
        break;

      case 'branch':
        queryParams['branchIds'] = value;
        break;

      case 'position':
        queryParams.positionId = value;
        break;

      case 'resultIds':
        queryParams[name] = value;
        break;

      default:
        queryParams[name] = value;
        break;
    }

    this.setState({
      ...this.state,
      queryParams: queryParams,
    });
  }

  render() {
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
          <Header as="h3" block floated="left">
            Список сотрудников
          </Header>
          <Link
            className="ui button primary right floated "
            to="/hr/staff/update"
          >
            Добавить
          </Link>
        </Segment>
        <Divider />
        <Grid>
          <Grid.Column floated="left" width={4}>
            {this.renderSearchPanel()}
          </Grid.Column>

          <Grid.Column floated="left" width={12}>
            <StaffListTable
              staffs={this.props.currentStaffs}
              meta={this.props.meta}
              loadItems={this.loadItems}
            />
          </Grid.Column>
        </Grid>
        <Divider />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentStaffs: state.hrStaff.currentStaffs,
    meta: state.hrStaff.meta,
    companyOptions: state.userInfo.companyOptions,
    branchOptionsAll: state.userInfo.branchOptionsAll,
  };
}

export default connect(
  mapStateToProps,
  { fetchCurrentStaffs },
)(StaffListPage);
