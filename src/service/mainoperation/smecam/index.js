import React from 'react';
import {
  Container,
  Segment,
  Header,
  Form,
  Label,
  Grid,
  Input,
  Table,
  Dropdown,
  TextArea,
  Button,
} from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import ListHistory from './list';

const Smecam = props => {
  return (
    <div>
      <Container
        fluid
        style={{
          marginTop: '2em',
          marginBottom: '2em',
          paddingLeft: '2em',
          paddingRight: '2em',
        }}
      >
        <Segment clearing tertiary>
          {' '}
          <Header as="h2">Заявка клиента </Header>{' '}
        </Segment>
        <Segment secondary>
          <Grid centered>
            <Grid.Row>
              <Grid.Column mobile={16} tablet={16} computer={10}>
                <Table compact>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell width={2}>
                        <label> № Номер заявки </label>
                      </Table.Cell>

                      <Table.Cell width={5}>
                        <Input fluid readOnly />
                      </Table.Cell>

                      <Table.Cell width={2}>
                        <label> ФИО Клиента </label>
                      </Table.Cell>

                      <Table.Cell width={5}>
                        <Input fluid readOnly />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <label> Компания </label>
                      </Table.Cell>

                      <Table.Cell>
                        <Input fluid readOnly />
                      </Table.Cell>

                      <Table.Cell>Адрес</Table.Cell>

                      <Table.Cell>
                        <Input fluid readOnly />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <label> Филиал </label>
                      </Table.Cell>

                      <Table.Cell>
                        <Input fluid readOnly />
                      </Table.Cell>

                      <Table.Cell>Контакты</Table.Cell>

                      <Table.Cell>
                        <Input fluid readOnly />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <label> Товар </label>
                      </Table.Cell>

                      <Table.Cell>
                        <Input fluid readOnly />
                      </Table.Cell>

                      <Table.Cell>
                        <label> Заводской номер </label>
                      </Table.Cell>

                      <Table.Cell>
                        <Input fluid readOnly />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <label> Вид заявки </label>
                      </Table.Cell>

                      <Table.Cell>
                        <Input fluid readOnly />
                      </Table.Cell>

                      <Table.Cell>
                        <label> Дата установки </label>
                      </Table.Cell>

                      <Table.Cell>
                        <Input fluid readOnly />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        <label> Оператор </label>
                      </Table.Cell>

                      <Table.Cell>
                        <Input fluid readOnly />
                      </Table.Cell>

                      <Table.Cell>
                        <label> CN </label>
                      </Table.Cell>

                      <Table.Cell>
                        <Input fluid readOnly />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell></Table.Cell>

                      <Table.Cell>
                        <Label color="green">
                          {' '}
                          F1 |<Label.Detail>1</Label.Detail>{' '}
                        </Label>
                        <Label color="blue">
                          {' '}
                          F2 |<Label.Detail>1</Label.Detail>{' '}
                        </Label>
                        <Label color="red">
                          {' '}
                          F3 |<Label.Detail>1</Label.Detail>{' '}
                        </Label>
                        <Label color="orange">
                          {' '}
                          F4 |<Label.Detail>1</Label.Detail>{' '}
                        </Label>
                        <Label color="pink">
                          {' '}
                          F5 |<Label.Detail>1</Label.Detail>{' '}
                        </Label>
                      </Table.Cell>

                      <Table.Cell>
                        <label> Установщик </label>
                      </Table.Cell>
                      <Table.Cell>
                        <Input fluid readOnly />
                      </Table.Cell>
                    </Table.Row>

                    <Table.Row>
                      <Table.Cell>
                        {' '}
                        <label>Дата приема в сервисе </label>{' '}
                      </Table.Cell>
                      <Table.Cell>
                        {' '}
                        <Input fluid readOnly />{' '}
                      </Table.Cell>
                      <Table.Cell>
                        {' '}
                        <label> Время сервиса </label>{' '}
                      </Table.Cell>
                      <Table.Cell>
                        {' '}
                        <Input fluid readOnly />{' '}
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        {' '}
                        <label>Дата переноса </label>{' '}
                      </Table.Cell>
                      <Table.Cell>
                        {' '}
                        <Input fluid readOnly />{' '}
                      </Table.Cell>
                      <Table.Cell>
                        {' '}
                        <label>Статус заявки</label>{' '}
                      </Table.Cell>
                      <Table.Cell>
                        {' '}
                        <Input fluid readOnly />{' '}
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
                <Form>
                  {' '}
                  <Form.Field>
                    {' '}
                    <label> Примечание </label>{' '}
                    <TextArea rows={1} placeholder="Примечание" />{' '}
                  </Form.Field>
                  <Form.Field>
                    {' '}
                    <div align="center">
                      {' '}
                      <Button primary> Сохранить </Button>{' '}
                      <Button primary> Создать сервия карточку </Button>{' '}
                    </div>{' '}
                  </Form.Field>{' '}
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
      <ListHistory />
    </div>
  );
};
export default Smecam;
