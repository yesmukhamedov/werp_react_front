import React from 'react';
import {
  Segment,
  Grid,
  Form,
  Button,
  Table,
  Input,
  Icon,
  Divider,
  Dropdown,
} from 'semantic-ui-react';

const TabSmcsWithoutContract = props => {
  const options = [
    { key: 'angular', text: 'Angular', value: 'angular' },
    { key: 'css', text: 'CSS', value: 'css' },
  ];
  return (
    <Form>
      <Grid>
        <Grid.Row>
          {/*BASIC INFO*/}
          <Grid.Column width={5}>
            <Table collapsing className="borderLess">
              <Table.Body>
                <Table.Row>
                  <Table.Cell>№ Заявки</Table.Cell>
                  <Table.Cell>
                    <Input fluid disabled />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Компания</Table.Cell>
                  <Table.Cell>
                    <Dropdown fluid placeholder="Компания" />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Филиал</Table.Cell>
                  <Table.Cell>
                    <Dropdown fluid placeholder="Филиал" />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Клиент</Table.Cell>
                  <Table.Cell>
                    <Input fluid disabled />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell width={4}>Заводской номер</Table.Cell>
                  <Table.Cell width={12}>
                    <Input fluid disabled />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Категория</Table.Cell>
                  <Table.Cell>
                    <Dropdown fluid options={options} />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Продукт</Table.Cell>
                  <Table.Cell>
                    <Dropdown fluid options={options} />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>CN</Table.Cell>
                  <Table.Cell>
                    <Input fluid disabled />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Адрес</Table.Cell>
                  <Table.Cell>
                    <Input fluid disabled />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Дата покупки</Table.Cell>
                  <Table.Cell>
                    <Input fluid disabled />
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Мастер</Table.Cell>
                  <Table.Cell>
                    <Dropdown fluid options={options} />
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Оператор</Table.Cell>
                  <Table.Cell>
                    <Dropdown fluid options={options} />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Дата сервиса</Table.Cell>
                  <Table.Cell>
                    <Input fluid disabled />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Срок гарантии</Table.Cell>
                  <Table.Cell>
                    <Input disabled />
                    <Input disabled />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
          {/*RIGHT*/}
          <Grid.Column width={11}>
            <Segment>
              <Segment>
                <h3>Услуга</h3>
                <Divider />
                <Button icon labelPosition="left" color="green" size="small">
                  <Icon name="plus" size="small" /> Добавить услугу
                </Button>
              </Segment>

              <Segment>
                <h3>Продажа запчастей</h3>
                <Divider />
                <Button icon labelPosition="left" color="green" size="small">
                  <Icon name="plus" size="small" /> Добавить запчасти
                </Button>
              </Segment>

              <Segment>
                <h3>Продажа картриджи</h3>
                <Divider />
                <Button icon labelPosition="left" color="green" size="small">
                  <Icon name="plus" size="small" /> Добавить картриджи
                </Button>
              </Segment>

              <Segment>
                <h3>Сервис пакет</h3>
                <Divider />
                <Button icon labelPosition="left" color="green" size="small">
                  <Icon name="plus" size="small" /> Добавить сервис
                </Button>
              </Segment>

              <Segment>
                <h3>Услуга</h3>
                <Divider />
                <Button icon labelPosition="left" color="green" size="small">
                  <Icon name="plus" size="small" /> Добавить услугу
                </Button>
              </Segment>

              <Table celled>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>Общая Сумма</Table.Cell>
                    <Table.Cell>0</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Скидка</Table.Cell>
                    <Table.Cell>0</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Сумма к оплате</Table.Cell>
                    <Table.Cell>0</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Оплачено</Table.Cell>
                    <Table.Cell>0</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Премия мастера</Table.Cell>
                    <Table.Cell>0</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell width={6}>Премия оператора</Table.Cell>
                    <Table.Cell width={10}>0</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
              <Button type="submit" primary>
                <Icon name="save" size="large" />
                Сохранить
              </Button>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  );
};

export default TabSmcsWithoutContract;
