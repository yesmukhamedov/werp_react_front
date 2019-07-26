import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Header,
  Segment,
  List,
  Input,
  Icon,
  Button,
  Label,
  Table,
  Grid,
} from 'semantic-ui-react';
import OutputErrors from '../../../general/error/outputErrors';
import {
  amcddSave,
  amcddFetch,
  amcddChange,
  amcddClear,
} from '../../../accounting/accounting_action';
import { LEGACY_URL } from '../../../utils/constants';

import {
  handleFocus,
  isEmpty,
  moneyFormat,
  moneyInputHanler,
} from '../../../utils/helpers';
import { LinkToMmcvNewTab } from '../../../utils/outlink';
import { Link } from 'react-router-dom';

import PaymentSchedule from '../../../finance/mainoperation/fa03/paymentSchedule';

class Fmcp extends Component {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.save = this.save.bind(this);
    this.fetch = this.fetch.bind(this);
    this.validate = this.validate.bind(this);
    this.renderMainInfo = this.renderMainInfo.bind(this);
    this.renderSave = this.renderSave.bind(this);

    this.state = {
      searchTerm: { zregOrConNum: '' },
      errors: [],
    };
  }

  componentWillMount() {
    this.props.amcddChange({
      zregOrConNum: '',
      lifnr: null,
      lifnrName: '',
      psRows: [],
      price: 0,
      paid: 0,
      waers: '',
      dealerName: '',
      collectorName: '',
      summa: 0,
    });
  }

  componentWillUnmount() {
    this.props.amcddClear();
  }

  onInputChange(value, stateFieldName) {
    if (stateFieldName === 'zregOrConNum') {
      const searchTerm = Object.assign({}, this.state.searchTerm);
      searchTerm.zregOrConNum = value;
      this.setState({ searchTerm });
    } else if (stateFieldName === 'summa') {
      const newVal = moneyInputHanler(value, 2);
      if (newVal !== undefined) {
        this.props.amcddChange({
          ...this.props.contract,
          summa: newVal,
        });
      }
    }
  }

  save() {
    let errors = [];
    errors = this.validate();
    if (errors === null || errors === undefined || errors.length === 0) {
      const contract = { ...this.props.contract };
      this.props.amcddSave(contract);
    }

    this.setState({ errors });
  }

  fetch(a_zregOrConNum) {
    this.props.amcddFetch(a_zregOrConNum);
    this.setState({ errors: [] });
  }

  validate() {
    const errors = [];
    const { price, paid, zregOrConNum, psRows, summa } = this.props.contract;

    if (zregOrConNum === null || zregOrConNum === undefined || !zregOrConNum) {
      errors.push('Выберите договор');
    }
    if (summa === null || summa === undefined || !summa || summa <= 0) {
      errors.push('Сумма 0 или отрицательная');
    }
    if (price - paid < summa) {
      errors.push('Сумма скидки больше чем остаток.');
    }

    let psPaid = 0;

    if (psRows !== null && psRows.length > 0) {
      for (let i = 0; i < psRows.length; i++) {
        const waPsRows = psRows[i];
        if (waPsRows.is_firstpayment === 1) {
          if (waPsRows.sum2 !== waPsRows.paid) {
            errors.push('Первоначальный взнос не оплачен.');
          }
        }
        psPaid += waPsRows.paid;
      }
      if (paid !== psPaid) {
        errors.push(
          'Сумма взноса и оплаченная сумма не равны. Обратитесь к администратору.',
        );
      }
    }
    return errors;
  }

  render() {
    const { contract } = this.props;

    if (isEmpty(contract)) {
      return '';
    }
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
          Скидка клиенту по договору
        </Header>

        <Segment padded size="small">
          <Label color="red" ribbon>
            Параметры поиска
          </Label>
          <br />
          <br />
          <List horizontal>
            <List.Item>
              <List.Content>
                <Input
                  value={this.state.searchTerm.zregOrConNum}
                  maxLength="10"
                  placeholder="Номер дог. или Рег. номер"
                  onFocus={handleFocus}
                  onChange={(e, { value }) =>
                    this.onInputChange(value, 'zregOrConNum')
                  }
                />
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Content>
                <Button
                  icon
                  labelPosition="left"
                  primary
                  size="small"
                  onClick={() => this.fetch(this.state.searchTerm.zregOrConNum)}
                >
                  <Icon name="search" size="large" />
                  Поиск
                </Button>
              </List.Content>
            </List.Item>
          </List>
        </Segment>

        <Grid>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={16} computer={7}>
              {this.renderMainInfo()}
              {this.renderSave()}
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={9}>
              <PaymentSchedule ps={this.props.contract.psRows} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }

  renderMainInfo() {
    const { contract } = this.props;

    return (
      <Segment padded size="small">
        <Label color="green" ribbon>
          Основные инфо
        </Label>
        <br />
        <br />
        <Table collapsing className="borderLess">
          <Table.Body>
            <Table.Row>
              <Table.Cell>Номер договора или рег. номер</Table.Cell>
              <Table.Cell>
                {contract.iscontractnumber && (
                  <LinkToMmcvNewTab contractNumber={contract.zregOrConNum} />
                  // <a
                  //   target="_blank"
                  //   href={`${LEGACY_URL}/dms/contract/dmsc03.xhtml?contract_number=${
                  //     contract.zregOrConNum
                  //   }`}
                  // >
                  //   <Button>{contract.zregOrConNum}</Button>
                  // </a>
                )}
                {contract.belnr && (
                  <Link
                    target="_blank"
                    className="ui icon button primary"
                    to={`/finance/mainoperation/fa03?belnr=${
                      contract.belnr
                    }&bukrs=${contract.bukrs}&gjahr=${contract.gjahr}`}
                  >
                    Фин. док
                  </Link>
                )}
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>ФИО клиента</Table.Cell>
              <Table.Cell>
                <Input fluid value={contract.lifnrName} readOnly />
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>Дилер</Table.Cell>
              <Table.Cell width="10">
                <Input fluid value={contract.dealerName} readOnly />
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>Фин. агент</Table.Cell>
              <Table.Cell>
                <Input fluid value={contract.collectorName} readOnly />
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>Валюта</Table.Cell>
              <Table.Cell>
                <Input fluid value={contract.waers} readOnly />
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>Цена</Table.Cell>
              <Table.Cell>
                <Input fluid value={moneyFormat(contract.price)} readOnly />
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>Оплачено</Table.Cell>
              <Table.Cell>
                <Input fluid value={moneyFormat(contract.paid)} readOnly />
              </Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell>Остаток</Table.Cell>
              <Table.Cell>
                <Input
                  fluid
                  value={moneyFormat(contract.price - contract.paid)}
                  readOnly
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Segment>
    );
  }

  renderSave() {
    const { summa } = this.props.contract;
    return (
      <Table collapsing className="borderLess">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="3">
              {<OutputErrors errors={this.state.errors} />}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Сумма скидки</Table.Cell>

            <Table.Cell>
              <Input
                value={moneyFormat(summa)}
                onFocus={handleFocus}
                maxLength="18"
                onChange={(e, { value }) => this.onInputChange(value, 'summa')}
              />
            </Table.Cell>

            <Table.Cell>
              <Button
                icon
                labelPosition="left"
                primary
                size="small"
                onClick={() => this.save()}
              >
                <Icon name="save" size="large" />
                Сохранить
              </Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}

function mapStateToProps(state) {
  return {
    contract: state.accounting.dynamicObject,
  };
}

export default connect(
  mapStateToProps,
  {
    amcddSave,
    amcddFetch,
    amcddChange,
    amcddClear,
  },
)(Fmcp);
