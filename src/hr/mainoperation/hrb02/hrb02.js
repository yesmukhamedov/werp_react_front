import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Button,
  Dropdown,
  Icon,
  Container,
  Header,
  Grid,
} from 'semantic-ui-react';
import moment from 'moment';
import Hrb02OutputTable from './hrb02OutputTable';
import { fetchBonusData, clearRedStateHrb02 } from './hrb02_action';
import {
  f4FetchBonusTypeList,
  f4FetchCurrencyList,
  f4ClearBonusTypeList,
  f4ClearCurrencyList,
} from '../../../reference/f4/f4_action';
import './hrb02.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { saveBonusData, updateF4All } from './hrb02_action';

import Hrb02EditBonus from './hrb02EditBonus';

require('moment/locale/ru');

const categoryOptions = [
  { key: 1, text: 'Уборочная система', value: 1 },
  { key: 2, text: 'Система очистки воды', value: 2 },
  { key: 5, text: 'Сервис', value: 5 },
];

class Hrb02 extends Component {
  constructor(props) {
    super(props);
    this.bonusEditModalOpenHandler = this.bonusEditModalOpenHandler.bind(this);

    this.state = {
      searchTerm: {
        bukrs: '',
        selectedCategory: 1,
        date: moment(),
        selectedBranchKey: null,
      },
      companyOptions: [],
      branchOptions: [],
      bonusEditModalOpen: false,
      selectedBonus: null,
      selectedBonusIndex: null,
    };
  }

  componentWillMount() {
    this.props.f4FetchBonusTypeList('hrb02');
    this.props.f4FetchCurrencyList('hrb02');
  }

  componentWillUnmount() {
    this.props.f4ClearBonusTypeList();
    this.props.f4ClearCurrencyList();
    this.props.clearRedStateHrb02();
  }

  onInputChange(value, stateFieldName) {
    this.props.clearRedStateHrb02();
    const waSearchTerm = Object.assign({}, this.state.searchTerm);
    if (stateFieldName === 'bukrs') {
      waSearchTerm.bukrs = value;
      waSearchTerm.selectedBranchKey = null;
      const branchOptions = this.props.branchOptions[value]
        .filter(
          item =>
            item.tovarcategory === this.state.searchTerm.selectedCategory ||
            item.businessareaid === this.state.searchTerm.selectedCategory,
        )
        .map(item => ({
          key: item.key,
          text: item.text,
          value: item.value,
        }));
      this.setState({
        searchTerm: waSearchTerm,
        branchOptions: branchOptions || [],
      });
    } else if (stateFieldName === 'branch') {
      waSearchTerm.selectedBranchKey = value;
      this.setState({ searchTerm: waSearchTerm });
      this.props.fetchBonusData(
        this.state.searchTerm.bukrs,
        value,
        this.state.searchTerm.date,
      );
    } else if (stateFieldName === 'category') {
      const branchOptions = this.props.branchOptions[
        this.state.searchTerm.bukrs
      ]
        .filter(
          item => item.tovarcategory === value || item.businessareaid === value,
        )
        .map(item => ({
          key: item.key,
          text: item.text,
          value: item.value,
        }));
      waSearchTerm.selectedCategory = value;
      waSearchTerm.selectedBranchKey = null;
      this.setState({
        searchTerm: waSearchTerm,
        branchOptions: branchOptions || [],
      });
    } else if (stateFieldName === 'date') {
      waSearchTerm.date = value;
      waSearchTerm.selectedBranchKey = null;
      this.setState({ searchTerm: waSearchTerm });
    }

    // console.log(this.state);
  }

  bonusEditModalOpenHandler(index, row) {
    this.setState({
      bonusEditModalOpen: true,
      selectedBonus: row,
      selectedBonusIndex: index,
    });
  }

  render() {
    const username = localStorage.getItem('username');

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
          Редактировать бонус
        </Header>

        <Grid textAlign="justified">
          <Grid.Row columns={2}>
            <Grid.Column mobile={16} tablet={16} computer={3}>
              <Button
                icon
                labelPosition="left"
                primary
                size="small"
                disabled={
                  this.state.searchTerm.selectedBranchKey === null ||
                  !this.props.current
                }
                onClick={() =>
                  this.props.saveBonusData(
                    this.state.searchTerm.bukrs,
                    this.state.searchTerm.selectedBranchKey,
                    this.state.searchTerm.date,
                    this.props.table,
                  )
                }
              >
                <Icon name="save" size="large" />
                Сохранить
              </Button>
            </Grid.Column>
            {username === 'azamat' && (
              <Grid.Column mobile={16} tablet={16} computer={3}>
                <Button
                  icon
                  labelPosition="left"
                  primary
                  size="small"
                  onClick={() => this.props.updateF4All()}
                >
                  <Icon name="check" size="large" />
                  Обновит F4
                </Button>
              </Grid.Column>
            )}
          </Grid.Row>
        </Grid>

        <Table collapsing>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Icon name="folder" />
                Компания
              </Table.Cell>
              <Table.Cell>
                <Dropdown
                  placeholder="Компания"
                  selection
                  options={this.props.companyOptions}
                  value={this.state.searchTerm.bukrs}
                  onChange={(e, { value }) =>
                    this.onInputChange(value, 'bukrs')
                  }
                />
              </Table.Cell>
              <Table.Cell>
                <Icon name="browser" />
                Категория
              </Table.Cell>
              <Table.Cell>
                <Dropdown
                  selection
                  options={categoryOptions}
                  value={this.state.searchTerm.selectedCategory}
                  onChange={(e, { value }) =>
                    this.onInputChange(value, 'category')
                  }
                />
              </Table.Cell>
              <Table.Cell>
                <Icon name="calendar" />
                Дата
              </Table.Cell>
              <Table.Cell>
                <DatePicker
                  autoComplete="off"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select" // timezone="UTC"
                  selected={this.state.searchTerm.date}
                  locale="ru"
                  onChange={event => this.onInputChange(event, 'date')}
                  dateFormat="MM.YYYY"
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <Grid textAlign="justified">
          <Grid.Row columns={2}>
            <Grid.Column mobile={16} tablet={2} computer={2}>
              <Table selectable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Филиал</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.state.branchOptions.map((item, key) => (
                    <Table.Row
                      key={item.key}
                      negative={
                        item.key === this.state.searchTerm.selectedBranchKey
                      }
                      onClick={() => this.onInputChange(item.key, 'branch')}
                      className="clickableItem"
                    >
                      <Table.Cell>{item.text}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={14} computer={14}>
              <Hrb02OutputTable
                tovarCategory={this.state.searchTerm.selectedCategory}
                bonusEditModalOpenHandler={(index, row) =>
                  this.bonusEditModalOpenHandler(index, row)
                }
                table={this.props.table}
                current={this.props.current}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Hrb02EditBonus
          open={this.state.bonusEditModalOpen}
          bonus={this.state.selectedBonus}
          index={this.state.selectedBonusIndex}
          closeModal={() => this.setState({ bonusEditModalOpen: false })}
        />

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </Container>
    );
  }

  // handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex })
}

function mapStateToProps(state) {
  // console.log(state);
  return {
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsAll,
    currencyList: state.f4.currencyList,
    table: state.hrb02.table,
    current: state.hrb02.current,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchBonusData,
    f4FetchBonusTypeList,
    f4FetchCurrencyList,
    saveBonusData,
    clearRedStateHrb02,
    f4ClearBonusTypeList,
    f4ClearCurrencyList,
    updateF4All,
  },
)(Hrb02);
