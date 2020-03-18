import React, { useState } from 'react';
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
} from 'semantic-ui-react';

import './../../service.css';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Smes = props => {
  const [service, setService] = useState([]);

  const emptyTovar = {
    param: 555,
    name: 'Jaks',
  };

  //Поиск по номеру сервиса
  const handleSearchNumberService = () => {
    console.log('handleSearchNumberService');
  };

  const BasicInfo = () => {
    return (
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
    );
  };

  const SettingService = () => {
    return (
      <div>
        {/*Услуга */}
        <Segment>
          <h3>Услуга</h3>
          <Divider />
        </Segment>

        {/*Продажа запчастей */}
        <Segment>
          <h3>Продажа запчастей</h3>
          <Divider />
        </Segment>

        {/*Продажа картриджи  */}
        <Segment>
          <h3>Продажа картриджи</h3>
          <Divider />
        </Segment>

        {/*Сервис пакет  */}
        <Segment>
          <h3>Сервис пакет</h3>
          <Divider />
        </Segment>
      </div>
    );
  };

  const ReportService = () => {
    return (
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
    );
  };

  return (
    <Form>
      <Segment
        style={{
          marginRight: '1rem',
          marginLeft: '1rem',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <h3>Просмотр сервис карты</h3>
        <Button color="green">
          <Icon name="pencil" />
          Редактировать
        </Button>
      </Segment>
      <Grid>
        <Grid.Row>
          {/*BASIC INFO*/}
          <Grid.Column width={5}>
            <BasicInfo />
          </Grid.Column>

          {/*SETTING*/}
          <Grid.Column width={11}>
            <SettingService />
            <ReportService />
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
