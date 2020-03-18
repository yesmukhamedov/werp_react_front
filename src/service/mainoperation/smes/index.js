import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
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
  Modal,
  Header,
  Checkbox,
} from 'semantic-ui-react';

import './../../service.css';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Smes = props => {
  const optionsService = [
    { key: '1', text: 'Устранил', value: 1 },
    { key: '2', text: 'Снятие', value: 2 },
    { key: '3', text: 'Установка', value: 3 },
    { key: '4', text: 'Выбрать услуги', value: 4 },
  ];

  const [service, setService] = useState([]);

  const emptyTovar = {
    param: 555,
    name: 'Jaks',
  };

  //Дoбавить сервис
  const handleAddService = e => {
    e.preventDefault();
    let serviceLength = service.length;
    setService(prevService => [
      ...prevService,
      { id: serviceLength + 1, serviceName: 4, summ: 0 },
    ]);
  };

  //Удалить сервис
  const handleRemoveService = id => {
    setService(service.filter(item => item.id !== id));
  };

  //Поиск по номеру сервиса
  const handleSearchNumberService = () => {
    console.log('handleSearchNumberService');
  };

  //Модальное окно добавить запчасти
  const ModalAddSparePart = () => (
    <Modal
      trigger={
        <Button icon labelPosition="left" color="green" size="small">
          <Icon name="plus" size="small" /> Добавить запчасти
        </Button>
      }
      closeIcon
    >
      <Header content="Добавление запчастей" />
      <Modal.Content>
        <Table selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>Код</Table.HeaderCell>
              <Table.HeaderCell>Название</Table.HeaderCell>
              <Table.HeaderCell>Цена</Table.HeaderCell>
              <Table.HeaderCell>Валюта</Table.HeaderCell>
              <Table.HeaderCell>В подочете</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.HeaderCell verticalAlign="middle" textAlign="center">
                <Checkbox />
              </Table.HeaderCell>
              <Table.Cell>343002</Table.Cell>
              <Table.Cell>Хромированный Соединитель</Table.Cell>
              <Table.Cell>14000</Table.Cell>
              <Table.Cell>KZT</Table.Cell>
              <Table.Cell>2</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell verticalAlign="middle" textAlign="center">
                <Checkbox />
              </Table.HeaderCell>
              <Table.Cell>343002</Table.Cell>
              <Table.Cell>Хромированный Соединитель</Table.Cell>
              <Table.Cell>14000</Table.Cell>
              <Table.Cell>KZT</Table.Cell>
              <Table.Cell>2</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green">
          <Icon name="checkmark" /> Применить
        </Button>
      </Modal.Actions>
    </Modal>
  );

  //Модальное окно добавить картридж
  const ModalAddCartridge = () => (
    <Modal
      trigger={
        <Button icon labelPosition="left" color="green" size="small">
          <Icon name="plus" size="small" /> Добавить картриджи
        </Button>
      }
      closeIcon
    >
      <Header content="Добавление картриджей" />
      <Modal.Content>
        <Table selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>Код</Table.HeaderCell>
              <Table.HeaderCell>Название</Table.HeaderCell>
              <Table.HeaderCell>Цена</Table.HeaderCell>
              <Table.HeaderCell>Валюта</Table.HeaderCell>
              <Table.HeaderCell>В подочете</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.HeaderCell verticalAlign="middle" textAlign="center">
                <Checkbox />
              </Table.HeaderCell>
              <Table.Cell>343002</Table.Cell>
              <Table.Cell>Седимент</Table.Cell>
              <Table.Cell>6000</Table.Cell>
              <Table.Cell>KZT</Table.Cell>
              <Table.Cell>2</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell verticalAlign="middle" textAlign="center">
                <Checkbox />
              </Table.HeaderCell>
              <Table.Cell>343002</Table.Cell>
              <Table.Cell>Седимент</Table.Cell>
              <Table.Cell>6000</Table.Cell>
              <Table.Cell>KZT</Table.Cell>
              <Table.Cell>2</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green">
          <Icon name="checkmark" /> Применить
        </Button>
      </Modal.Actions>
    </Modal>
  );

  //Модальное окно добавить сервис пакет
  const ModalAddServicePacket = () => (
    <Modal
      trigger={
        <Button icon labelPosition="left" color="green" size="small">
          <Icon name="plus" size="small" /> Добавить сервис пакет
        </Button>
      }
      closeIcon
    >
      <Header content="Сервис пакет" />
      <Modal.Content>
        <Table selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>Код</Table.HeaderCell>
              <Table.HeaderCell>Название</Table.HeaderCell>
              <Table.HeaderCell>Цена</Table.HeaderCell>
              <Table.HeaderCell>Валюта</Table.HeaderCell>
              <Table.HeaderCell>Количество</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.HeaderCell verticalAlign="middle" textAlign="center">
                <Checkbox />
              </Table.HeaderCell>
              <Table.Cell>343002</Table.Cell>
              <Table.Cell>Хромированный Соединитель</Table.Cell>
              <Table.Cell>14000</Table.Cell>
              <Table.Cell>KZT</Table.Cell>
              <Table.Cell>2</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell verticalAlign="middle" textAlign="center">
                <Checkbox />
              </Table.HeaderCell>
              <Table.Cell>343002</Table.Cell>
              <Table.Cell>Хромированный Соединитель</Table.Cell>
              <Table.Cell>14000</Table.Cell>
              <Table.Cell>KZT</Table.Cell>
              <Table.Cell>2</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green">
          <Icon name="checkmark" /> Применить
        </Button>
      </Modal.Actions>
    </Modal>
  );

  return (
    <Form>
      <Segment style={{ marginRight: '1rem', marginLeft: '1rem' }}>
        <h3>Редактирование карты</h3>
      </Segment>
      <Grid>
        <Grid.Row>
          {/*BASIC INFO*/}
          <Grid.Column width={5}>
            <Segment>
              <Table collapsing className="borderLess">
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>№ Сервиса</Table.Cell>
                    <Table.Cell>
                      <Input
                        fluid
                        type="number"
                        action={
                          <Button
                            icon="search"
                            content="Поиск"
                            primary
                            onClick={handleSearchNumberService}
                          />
                        }
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Статус сервиса</Table.Cell>
                    <Table.Cell>
                      <Input fluid disabled />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>№ Заявки</Table.Cell>
                    <Table.Cell>
                      <Input fluid disabled />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Компания</Table.Cell>
                    <Table.Cell>
                      <Input fluid disabled />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Филиал</Table.Cell>
                    <Table.Cell>
                      <Input fluid disabled />
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
                    <Table.Cell>Категория товара</Table.Cell>
                    <Table.Cell>
                      <Input fluid disabled />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Продукт</Table.Cell>
                    <Table.Cell>
                      <Input fluid disabled />
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
                      <Input fluid disabled />
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>Оператор</Table.Cell>
                    <Table.Cell>
                      <Input fluid disabled />
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
                    <Table.Cell className="tableRow">
                      <DatePicker />
                      <Input />
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Segment>
          </Grid.Column>

          {/*RIGHT*/}
          <Grid.Column width={11}>
            {/*Услуга */}
            <Segment>
              <h3>Услуга</h3>
              <Divider />
              {service.length === 0 ||
              service.length === null ||
              service.length === undefined ? (
                ''
              ) : (
                <Table>
                  <Table.Body>
                    {service.map((serv, index) => (
                      <Table.Row key={serv.id}>
                        <Table.Cell width={1}>
                          <Input disabled value={index + 1} />
                        </Table.Cell>
                        <Table.Cell width={7}>
                          <Dropdown
                            fluid
                            placeholder="Выбрать услуги"
                            selection
                            options={optionsService}
                            value={serv.serviceName}
                          />
                        </Table.Cell>
                        <Table.Cell width={3}>
                          <Input placeholder="Сумма" value={serv.summ} />
                        </Table.Cell>
                        <Table.Cell width={3}>
                          <Button
                            color="red"
                            onClick={() => handleRemoveService(serv.id)}
                          >
                            Удалить
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              )}

              <Button
                icon
                labelPosition="left"
                color="green"
                size="small"
                onClick={handleAddService}
              >
                <Icon name="plus" size="small" /> Добавить услугу
              </Button>
            </Segment>

            {/*Продажа запчастей */}
            <Segment>
              <h3>Продажа запчастей</h3>
              <Divider />

              <ModalAddSparePart />
            </Segment>

            {/*Продажа картриджи  */}
            <Segment>
              <h3>Продажа картриджи</h3>
              <Divider />

              <ModalAddCartridge />
            </Segment>

            {/*Сервис пакет  */}
            <Segment>
              <h3>Сервис пакет</h3>
              <Divider />
              <ModalAddServicePacket />
            </Segment>

            {/*Отчеты  */}
            <Table>
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

            <Button negative>Отменить</Button>
            <Button type="submit" primary>
              Сохранить
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  );
};

function mapStateToProps(state) {
  return {
    language: state.locales.lang,
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsAll,
  };
}

export default connect(mapStateToProps, {})(injectIntl(Smes));
