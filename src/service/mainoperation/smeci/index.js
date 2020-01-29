import React from 'react';
import { connect } from 'react-redux';
import {
  Segment,
  Grid,
  Form,
  Table,
  Icon,
  Input,
  Button,
  TextArea,
  Label,
  Checkbox,
} from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import './smeci.css';

function Smeci(props) {
  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column mobile={16} tablet={16} computer={7}>
          <h1>Редактирование</h1>
          <Segment>
            <h3>Данные клиента</h3>
            <Table compact striped>
              <Table.Body>
                <Table.Row>
                  <Table.Cell width="4">Страна</Table.Cell>
                  <Table.Cell>
                    <Input size="small" fluid />
                  </Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Компания</Table.Cell>
                  <Table.Cell>
                    <Input size="small" fluid />
                  </Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Филиал</Table.Cell>
                  <Table.Cell>
                    <Input size="small" fluid />
                  </Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Сервис Филиал</Table.Cell>
                  <Table.Cell>
                    <Input size="small" fluid />
                  </Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>CN</Table.Cell>
                  <Table.Cell>
                    <Input size="small" fluid />
                  </Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Заводской №</Table.Cell>
                  <Table.Cell>
                    <Input size="small" fluid />
                  </Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>ФИО клиента</Table.Cell>
                  <Table.Cell>
                    <Input size="small" fluid />
                  </Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Контактное лицо</Table.Cell>
                  <Table.Cell>
                    <Input size="small" fluid />
                  </Table.Cell>
                  <Table.Cell>
                    <Button icon basic color="blue">
                      <Icon name="clone" />
                    </Button>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Адрес для сервиса</Table.Cell>
                  <Table.Cell>
                    <Input size="small" fluid />
                  </Table.Cell>
                  <Table.Cell>
                    <Button icon basic color="blue">
                      <Icon name="clone" />
                    </Button>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Kонтакты</Table.Cell>
                  <Table.Cell>
                    <Input size="small" fluid />
                  </Table.Cell>
                  <Table.Cell>
                    <Button icon basic color="blue">
                      <Icon name="clone" />
                    </Button>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Категория</Table.Cell>
                  <Table.Cell>
                    <Input size="small" fluid />
                  </Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Дата покупки</Table.Cell>
                  <Table.Cell>
                    <Input size="small" fluid />
                  </Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Дата установки</Table.Cell>
                  <Table.Cell>
                    <Input size="small" fluid />
                  </Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Диллер</Table.Cell>
                  <Table.Cell>
                    <Input size="small" fluid />
                  </Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Установщик</Table.Cell>
                  <Table.Cell>
                    <Input size="small" fluid />
                  </Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Срок гарантии</Table.Cell>
                  <Table.Cell>
                    <Table>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>
                            <Input size="small" fluid />
                          </Table.Cell>
                          <Table.Cell>
                            <Input size="small" fluid />
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Срок замены </Table.Cell>
                  <Table.Cell>
                    <Table>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>
                            <Checkbox
                              radio
                              label="Автоматом"
                              name="changeTerm"
                              value="auto"
                              // checked={history.radioChange === 'auto'}
                              // onChange={(e, o) => onInputChange(o, 'radioChange')}
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <Checkbox
                              radio
                              label="В ручную"
                              name="changeTerm"
                              value="manual"
                              // checked={history.radioChange === 'manual'}
                              // onChange={(e, o) => onInputChange(o, 'radioChange')}
                            />
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Описание</Table.Cell>
                  <Table.Cell>
                    <Form>
                      <TextArea />
                    </Form>
                  </Table.Cell>
                  <Table.Cell></Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Table>
              <Table.Body>
                <Table.Row>
                  <Table.Cell width={4}>
                    <h3>Срок замены фильтров</h3>
                  </Table.Cell>
                  <Table.Cell>
                    <Input
                      size="mini"
                      label="F1"
                      className="input__filter_terms"
                    />
                    <Input
                      size="mini"
                      label="F2"
                      className="input__filter_terms"
                    />
                    <Input
                      size="mini"
                      label="F3"
                      className="input__filter_terms"
                    />
                    <Input
                      size="mini"
                      label="F4"
                      className="input__filter_terms"
                    />
                    <Input
                      size="mini"
                      label="F5"
                      className="input__filter_terms"
                    />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Button
              color="blue"
              fluid
              onClick={() => props.history.push('smcuspor')}
            >
              Сохранить
            </Button>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(injectIntl(Smeci));
