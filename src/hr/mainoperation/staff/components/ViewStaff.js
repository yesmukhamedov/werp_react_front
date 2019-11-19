import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import {
  Container,
  Divider,
  Tab,
  Table,
  Grid,
  Header,
} from 'semantic-ui-react';
import { ROOT_URL } from '../../../../utils/constants';

class ViewStaff extends Component {
  constructor(props) {
    super(props);
    this.loadedSuccess = true;
    this.state = {
      staff: {},
      salaries: [],
      salariesLoaded: false,
      expenses: [],
      offData: [],
      expensesLoaded: false,
      offDataLoaded: false,
    };

    this.renderMainData = this.renderMainData.bind(this);
    this.renderPassportData = this.renderPassportData.bind(this);
    this.renderSalaryData = this.renderSalaryData.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.renderContactData = this.renderContactData.bind(this);
    this.renderExpensesData = this.renderExpensesData.bind(this);
    this.renderOfficialData = this.renderOfficialData.bind(this);
  }

  componentWillMount() {
    const _this = this;
    doGet(`hr/staff/${this.props.params.id}`)
      .then(response => {
        this.setState({
          ...this.state,
          staff: response.data,
        });
      })
      .catch(e => {
        if (e.response && e.response.status && e.response.status === 404) {
          _this.loadedSuccess = false;
        }
        console.log('TEST');
      });
  }

  handleTabChange(e, data) {
    if (!this.state.staff || !this.state.staff.hasOwnProperty('staff_id')) {
      this.setState({
        ...this.state,
        salaries: [],
        salariesLoaded: false,
        expenses: [],
        expensesLoaded: false,
      });

      return;
    }

    // Salaries
    if (data.activeIndex === 2) {
      if (this.state.salariesLoaded) {
        return;
      }
      if (!this.state.staff || !this.state.staff.hasOwnProperty('staff_id')) {
        this.setState({
          ...this.state,
          salaries: [],
        });
      } else {
        doGet(`hr/staff/${this.state.staff.staff_id}/salaries`)
          .then(response => {
            this.setState({
              ...this.state,
              salaries: response.data,
              salariesLoaded: true,
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    } else if (data.activeIndex === 4) {
      if (this.state.expensesLoaded) {
        return;
      }

      doGet(`hr/staff/${this.state.staff.staff_id}/expenses`)
        .then(response => {
          this.setState({
            ...this.state,
            expenses: response.data,
            expensesLoaded: true,
          });
        })
        .catch(error => {
          console.log(error);
        });
    } else if (data.activeIndex === 5) {
      if (this.state.offDataLoaded) {
        return;
      }

      doGet(`hr/staff/${this.state.staff.staff_id}/official-data`)
        .then(response => {
          this.setState({
            ...this.state,
            offData: response.data,
            offDataLoaded: true,
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  renderNotFound() {
    return <h2>Сотрудник не найден</h2>;
  }

  formatTimestamptToDate(v) {
    if (!v || v.length === 0) {
      return '';
    }
    return moment.utc(v).format('DD.MM.YYYY');
  }

  renderMainData() {
    const stf = this.state.staff;
    return (
      <Table celled striped>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Фамилия</Table.Cell>
            <Table.Cell>{stf.lastname}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Имя</Table.Cell>
            <Table.Cell>{stf.firstname}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Отчество</Table.Cell>
            <Table.Cell>{stf.middlename}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>ИИН</Table.Cell>
            <Table.Cell>{stf.iin}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>Дата рождения</Table.Cell>
            <Table.Cell>{this.formatTimestamptToDate(stf.birthday)}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>Пол</Table.Cell>
            <Table.Cell>
              {stf.gender === 'male' ? 'Мужской' : 'Женский'}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }

  renderPassportData() {
    const stf = this.state.staff;
    return (
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column width={8}>
            <Grid celled>
              <Grid.Row>
                <Grid.Column width={5} textAlign="right">
                  Номер уд. личности
                </Grid.Column>
                <Grid.Column width={7}>{stf.passport_id}</Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column width={5} textAlign="right">
                  Кем выдан
                </Grid.Column>
                <Grid.Column width={7}>{stf.passport_given_by}</Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={5} textAlign="right">
                  Дата выдачи
                </Grid.Column>
                <Grid.Column width={7}>
                  {this.formatTimestamptToDate(stf.passport_given_date)}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={5} textAlign="right">
                  Срок действия уд.
                </Grid.Column>
                <Grid.Column width={7}>
                  {this.formatTimestamptToDate(stf.passport_validity)}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>

          <Grid.Column width={8}>
            <Grid celled>
              <Grid.Row>
                <Grid.Column width={5} textAlign="right">
                  Номер паспорта
                </Grid.Column>
                <Grid.Column width={7}>{stf.passport_id}</Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column width={5} textAlign="right">
                  Кем выдан (паспорт)
                </Grid.Column>
                <Grid.Column width={7}>{stf.passport_given_by}</Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={5} textAlign="right">
                  Дата выдачи (паспорт)
                </Grid.Column>
                <Grid.Column width={7}>
                  {this.formatTimestamptToDate(stf.passport_given_date)}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={5} textAlign="right">
                  Срок действия (паспорт)
                </Grid.Column>
                <Grid.Column width={7}>
                  {this.formatTimestamptToDate(stf.passport_validity)}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  renderContactData() {
    return <h2>Contact</h2>;
  }

  renderSalaryData() {
    const tempContent = this.state.salaries.map(salary => (
      <Table.Row
        key={salary.salaryId}
        className={
          salary.prev === true ? 'error' : salary.next === true ? 'success' : ''
        }
      >
        <Table.Cell>{salary.salaryId}</Table.Cell>
        <Table.Cell>{salary.statusName}</Table.Cell>
        <Table.Cell>{salary.companyName}</Table.Cell>
        <Table.Cell>{salary.branchName}</Table.Cell>
        <Table.Cell>{salary.departmentName}</Table.Cell>
        <Table.Cell>{salary.beginDate}</Table.Cell>
        <Table.Cell>{salary.endDate}</Table.Cell>
        <Table.Cell>{salary.positionName}</Table.Cell>
        <Table.Cell>{salary.amount}</Table.Cell>
        <Table.Cell>{salary.waers}</Table.Cell>
        <Table.Cell>{salary.note}</Table.Cell>
        <Table.Cell>{salary.payrollDate}</Table.Cell>
        <Table.Cell />
      </Table.Row>
    ));
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>SalaryId</Table.HeaderCell>
            <Table.HeaderCell>Статус</Table.HeaderCell>
            <Table.HeaderCell>Компания</Table.HeaderCell>
            <Table.HeaderCell>Филиал</Table.HeaderCell>
            <Table.HeaderCell>Департамент</Table.HeaderCell>
            <Table.HeaderCell>Дата начало</Table.HeaderCell>
            <Table.HeaderCell>Дата окончания</Table.HeaderCell>
            <Table.HeaderCell>Должность</Table.HeaderCell>
            <Table.HeaderCell>Оклад</Table.HeaderCell>
            <Table.HeaderCell>Валюта</Table.HeaderCell>
            <Table.HeaderCell>Примечание</Table.HeaderCell>
            <Table.HeaderCell>Дата выдачи</Table.HeaderCell>
            <Table.HeaderCell>Действия</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{tempContent}</Table.Body>
      </Table>
    );
  }

  renderExpensesData() {
    const tempContent = this.state.expenses.map(exp => (
      <Table.Row key={exp.id}>
        <Table.Cell>{exp.id}</Table.Cell>
        <Table.Cell>{exp.typeName}</Table.Cell>
        <Table.Cell>{exp.amount}</Table.Cell>
        <Table.Cell>{exp.currency}</Table.Cell>
        <Table.Cell>{exp.description}</Table.Cell>
        <Table.Cell>{exp.expenseDate}</Table.Cell>
        <Table.Cell />
      </Table.Row>
    ));
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Тип расхода</Table.HeaderCell>
            <Table.HeaderCell>Сумма</Table.HeaderCell>
            <Table.HeaderCell>Валюта</Table.HeaderCell>
            <Table.HeaderCell>Примечание</Table.HeaderCell>
            <Table.HeaderCell>Дата</Table.HeaderCell>
            <Table.HeaderCell>Действия</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{tempContent}</Table.Body>
      </Table>
    );
  }

  renderOfficialData() {
    const tempContent = this.state.offData.map(d => (
      <Table.Row key={d.id}>
        <Table.Cell>{d.subCompanyName}</Table.Cell>
        <Table.Cell>{d.positionName}</Table.Cell>
        <Table.Cell>{d.salary}</Table.Cell>
        <Table.Cell>{d.pension}</Table.Cell>
        <Table.Cell>{d.ipn}</Table.Cell>
        <Table.Cell>{d.note}</Table.Cell>
        <Table.Cell />
      </Table.Row>
    ));
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Фирма</Table.HeaderCell>
            <Table.HeaderCell>Должность</Table.HeaderCell>
            <Table.HeaderCell>Оклад</Table.HeaderCell>
            <Table.HeaderCell>ОПВ</Table.HeaderCell>
            <Table.HeaderCell>ИПН</Table.HeaderCell>
            <Table.HeaderCell>Примечание</Table.HeaderCell>
            <Table.HeaderCell>Действия</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{tempContent}</Table.Body>
      </Table>
    );
  }

  renderProfile() {
    const panes = [
      { menuItem: 'Основные данные', render: this.renderMainData },
      { menuItem: 'Паспортные данные', render: this.renderPassportData },
      { menuItem: 'Должности', render: this.renderSalaryData },
      { menuItem: 'Контакты', render: this.renderContactData },
      { menuItem: 'Расходы', render: this.renderExpensesData },
      { menuItem: 'Оф. данные', render: this.renderOfficialData },
      { menuItem: 'Файлы', render: this.renderMainData },
      { menuItem: 'Доп. данные', render: this.renderMainData },
      { menuItem: 'Баланс', render: this.renderMainData },
      { menuItem: 'Склад', render: this.renderMainData },
    ];
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
        <Header as="h2" block>
          Карточка сотрудника / {this.state.staff.lastname}{' '}
          {this.state.staff.firstname}
        </Header>
        <Divider />
        <Tab
          panes={panes}
          menu={{ secondary: true, pointing: true }}
          onTabChange={this.handleTabChange}
        />
      </Container>
    );
  }

  render() {
    if (this.loadedSuccess) {
      return this.renderProfile();
    }
    return this.renderNotFound();
  }
}

export default ViewStaff;
