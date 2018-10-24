import React, { Component } from 'react';
import { Table, Label, Input, Form, Grid, Header, Segment, Container } from 'semantic-ui-react';
import axios from 'axios';
import moment from 'moment';
import { ROOT_URL } from '../../../../utils/constants';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servicePacketData: {},
    };
  }

  componentWillMount() {
    const id = parseInt(this.props.match.params.id, 10);
    axios.get(`${ROOT_URL}/api/service/packets/${id}`, {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    })
      .then(({ data }) => {
        this.setState({ servicePacketData: data });
      }, () => {
        console.log('SPVIEW state:', this.state);
      })
      .catch(err => console.log(err));
  }

  render() {
    const {
      servicePacket = {},
      spareParts = [],
      sparePartsWithWarranty = [],
    } = this.state.servicePacketData;

    const {
      country = {},
      company = {},
      name = '',
      description = '',
      product = {},
      productCategory = {},
      startDate = '',
      totalPrice = 0,
      masterBonus = 0,
      operatorBonus = 0,
    } = servicePacket;

    return (
      <Container fluid style={{
 marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'
 }}>
        <Form>
          <Segment padded size="small">
            <Label attached="top">
              <Header as="h3">Сформировать Новый Сервис Пакет</Header>
            </Label>
            <Grid columns="five" divided>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Form.Field>
                    <label>Компания</label>
                    <Input
                      type="text"
                      placeholder="Название компании"
                      value={company.name}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Страна</label>
                    <Input
                      type="text"
                      placeholder="Название страны"
                      value={country.country}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Категория</label>
                    <Input
                      type="text"
                      placeholder="Название категории"
                      value={productCategory.label}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Товар</label>
                    <Input
                      type="text"
                      placeholder="Название товара"
                      value={product.name}
                    />
                  </Form.Field>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Form.Field>
                    <label>Название</label>
                    <Input
                      type="text"
                      placeholder="Название сервис пакета"
                      value={name}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Примечание</label>
                    <Input
                      type="text"
                      placeholder="Описание сервис пакета"
                      value={description}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Дата начала действия</label>
                    <Input
                      type="text"
                      placeholder="Примечание"
                      value={moment(startDate).format('DD.MM.YYYY')}
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Form>

        <Table celled color="black" striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell collapsing>#</Table.HeaderCell>
              <Table.HeaderCell>Операция</Table.HeaderCell>
              <Table.HeaderCell>Код</Table.HeaderCell>
              <Table.HeaderCell>Описание</Table.HeaderCell>
              <Table.HeaderCell>Цена</Table.HeaderCell>
              <Table.HeaderCell>Количество (шт.)</Table.HeaderCell>
              <Table.HeaderCell>Сумма</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {spareParts.map((item, idx) => {
              const {
                operType,
                code = '',
                price = '',
                description = '',
                quantity = '',
                totalPrice = '',
              } = item;
              const { operName = '' } = operType;
              return (
                <Table.Row key={idx}>
                  <Table.Cell>{idx + 1}</Table.Cell>
                  <Table.Cell>{operName}</Table.Cell>
                  <Table.Cell>{code}</Table.Cell>
                  <Table.Cell>{description}</Table.Cell>
                  <Table.Cell>{price}</Table.Cell>
                  <Table.Cell>{quantity}</Table.Cell>
                  <Table.Cell>{totalPrice}</Table.Cell>
                </Table.Row>
              );
            },)}
          </Table.Body>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell
                colSpan="6"
                style={{textAlign: 'right' }}
              >Total
              </Table.HeaderCell>
              <Table.HeaderCell>{totalPrice}</Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>

        <Table celled color="black" striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell collapsing>#</Table.HeaderCell>
              <Table.HeaderCell>Код</Table.HeaderCell>
              <Table.HeaderCell>Описание</Table.HeaderCell>
              <Table.HeaderCell>Гарантия (в мес.)</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {sparePartsWithWarranty.map((item, idx) => {
              const {
                code = '',
                description = '',
                warrantyMonths = '',
              } = item;
              return (
                <Table.Row key={idx}>
                  <Table.Cell>{idx + 1}</Table.Cell>
                  <Table.Cell>{code}</Table.Cell>
                  <Table.Cell>{description}</Table.Cell>
                  <Table.Cell>{warrantyMonths}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>

        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column>
              <Segment padded>
                <Form>
                  <Form.Input
label="Сумма к оплате"
                    placeholder="Сумма к оплате"
                    value={totalPrice}
                  />
                  <Form.Input
                    label="Премия Мастера"
                    placeholder="Премия Мастера"
                    value={masterBonus}
                  />
                  <Form.Input
                    label="Премия оператора"
                    placeholder="Премия оператора"
                    value={operatorBonus}
                  />
                </Form>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
