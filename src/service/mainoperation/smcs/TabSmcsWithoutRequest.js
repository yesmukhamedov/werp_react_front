import React, { useState } from 'react';
import {
  Segment,
  Grid,
  Form,
  Button,
  Table,
  Input,
  Icon,
  Divider,
  Label,
  Select,
  Menu,
  Dropdown,
  Modal,
  Header,
  Checkbox,
} from 'semantic-ui-react';

import './../../service.css';
import moment from 'moment';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { stringYYYYMMDDToMoment } from '../../../utils/helpers';

const TabSmcsWithoutRequest = props => {
  const options = [
    { key: '1', text: 'Устранил' },
    { key: '2', text: 'Снятие' },
    { key: '3', text: 'Установка' },
  ];

  const [serviceSelected, setServiceSelected] = useState('');
  const [addSparePartModalOpened, setAddSparePartModalOpened] = useState(false);
  const initialService = {
    number: 1,
    serviceName: 'Снятие',
    summ: 5000,
  };

  const [service, setService] = useState({ ...initialService });
  const [sparePart, setSparePart] = useState([]);
  const [cartridge, setCartridge] = useState([]);
  const [servicePackage, setServicePackage] = useState([]);

  //Дoбавить сервис
  const handleAddService = () => {};

  //Дoбавить запчасти
  const handleAddSparePart = () => {
    console.log('AddSparepart');
    setAddSparePartModalOpened(true);
  };

  // Добавить картриджи
  const handleAddCartridge = () => {
    console.log('handleAddCartridge');
  };

  //Добавить сервис пакет
  const handleAddServicePackage = () => {
    console.log('handleAddServicePackage');
  };

  const closeModal = () => {
    setAddSparePartModalOpened(false);
  };

  const handleSubmit = () => {
    setAddSparePartModalOpened(false);
  };

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
                    <Input
                      fluid
                      type="number"
                      action={<Button icon="search" content="Поиск" primary />}
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Категория</Table.Cell>
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
                    <Dropdown fluid />
                  </Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Оператор</Table.Cell>
                  <Table.Cell>
                    <Dropdown fluid />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Дата покупки</Table.Cell>
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
          </Grid.Column>

          {/*RIGHT*/}
          <Grid.Column width={11}>
            <Segment>
              <Segment>
                <h3>Услуга</h3>
                <Divider />

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

              <Segment>
                <h3>Продажа запчастей</h3>
                <Divider />
                <Button
                  icon
                  labelPosition="left"
                  color="green"
                  size="small"
                  onClick={handleAddSparePart}
                >
                  <Icon name="plus" size="small" /> Добавить запчасти
                </Button>
              </Segment>
              {/* <AddSparePartModal
                opened={addSparePartModalOpened}
                closed={closeModal}
              /> */}

              <Modal open={addSparePartModalOpened}>
                <Header content="Добавить услуги" />
                <Modal.Content></Modal.Content>
                <Modal.Actions>
                  <Button color="green" onClick={handleSubmit}>
                    Применить
                  </Button>
                </Modal.Actions>
              </Modal>

              <Segment>
                <h3>Продажа картриджи</h3>
                <Divider />
                <Button
                  icon
                  labelPosition="left"
                  color="green"
                  size="small"
                  onClick={handleAddCartridge}
                >
                  <Icon name="plus" size="small" /> Добавить картриджи
                </Button>
              </Segment>

              <Segment>
                <h3>Сервис пакет</h3>
                <Divider />
                <Button
                  icon
                  labelPosition="left"
                  color="green"
                  size="small"
                  onClick={handleAddServicePackage}
                >
                  <Icon name="plus" size="small" /> Добавить сервис пакет
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

export default TabSmcsWithoutRequest;
