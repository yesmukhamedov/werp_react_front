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
import PositionF4 from '../../../../reference/f4/position/PositionF4';
import { connect } from 'react-redux';
import { fetchExitInterviews } from '../actions/hrStaffAction';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

class ExitInterviewListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      queryParams: {
        bukrs: '',
        branchIds: [],
        firstName: '',
        lastName: '',
        positionId: null,
      },
    };

    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.inputChanged = this.inputChanged.bind(this);
    this.renderItems = this.renderItems.bind(this);
  }

  componentDidMount() {
    this.props.fetchExitInterviews({});
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
    // const genders = [
    //   { key: '', text: 'Не выбрано', value: '' },
    //   { key: 'non_select', text: 'Без значение', value: 'non_select' },
    //   { key: 'male', text: 'Муж', value: 'male' },
    //   { key: 'female', text: 'Жен', value: 'female' },
    // ];
    const companyOptions = this.props.companyOptions || [];
    return (
      <div>
        <Header as="h4" attached="top">
          Расширенный поиск
        </Header>
        <Segment attached>
          <Form>
            <Form.Group widths="equal">
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
            </Form.Group>

            <Form.Group widths="equal">
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
              <Button
                loading={this.state.btnLoading}
                onClick={this.loadItems}
                type="submit"
              >
                Сформировать
              </Button>
            </Form.Group>
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

  renderDocDate(row) {
    if (row.callDate) {
      return row.callDate;
    }
    return '';
  }

  renderItems(items) {
    return (
      <div>
        <ReactTable
          defaultFilterMethod={(filter, row) => {
            const colName =
              filter.id === 'phoneNumbers' ? 'phonesAsStr' : filter.id;

            if (
              filter.value &&
              filter.value.length > 0 &&
              row[colName] &&
              row[colName]
            ) {
              return row[colName]
                .toLowerCase()
                .includes(filter.value.toLowerCase());
            }
          }}
          data={items}
          columns={[
            {
              Header: 'ФИО',
              accessor: 'staffPosition.staff.lf',
            },
            {
              Header: 'Филиал',
              accessor: 'staffPosition.branch.text45',
            },
            {
              Header: 'Должность',
              accessor: 'staffPosition.position.text',
            },
            {
              Header: 'Дата увольнения',
              accessor: 'staffPosition.endDate',
            },
            {
              Header: 'Указанная причина увольнения',
              accessor: 'reason.name',
            },
            {
              Header: 'Дата обзвона',
              accessor: 'callDate',
            },
            {
              Header: 'Конт. номер',
              accessor: 'phoneNumber',
            },

            {
              Header: 'Примечание',
              accessor: 'note',
            },
            {
              Header: 'Предложение',
              accessor: 'suggestion',
            },
          ]}
          previousText={'Пред.'}
          nextText={'След.'}
          defaultPageSize={50}
          filterable
          className="-striped -highlight"
        />
      </div>
    );
  }

  render() {
    const { items } = this.props;
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
            Опросник при увольнении
          </Header>
          <Link
            className="ui button primary right floated "
            to="/hr/exitinterviews/create"
          >
            Добавить
          </Link>
        </Segment>
        <Divider />
        <Grid>
          <Grid.Column width={16}>
            <br />
            {this.renderItems(items)}
          </Grid.Column>
        </Grid>
        <Divider />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.hrStaff.exitInterviews,
    companyOptions: state.userInfo.companyOptions,
    branchOptionsAll: state.userInfo.branchOptionsAll,
  };
}

export default connect(mapStateToProps, { fetchExitInterviews })(
  ExitInterviewListPage,
);
