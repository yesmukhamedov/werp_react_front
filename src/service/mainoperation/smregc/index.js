import React from 'react';
import { connect } from 'react-redux';
import {
  Segment,
  Grid,
  Form,
  Dropdown,
  Table,
  Icon,
  Input,
  Button,
  TextArea,
  Checkbox,
} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { injectIntl } from 'react-intl';

import 'react-datepicker/dist/react-datepicker.css';
import './smregc.css';

function Smregc(props) {
  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column width={7}>
          <Segment>
            <h1>Зарегистрировать входящий звонок</h1>
            <Table striped>
              <Table.Body>
                <Table.Row>
                  <Table.Cell width={5}>Оператор</Table.Cell>
                  <Table.Cell>
                    <Input size="small" fluid />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Дата</Table.Cell>
                  <Table.Cell>
                    <Input>
                      <DatePicker
                        autoComplete="off"
                        deteFormat="DD/MM/YYYY"
                        selected={moment(new Date())}
                        dropdownMode="select"
                        showMonthDropDown
                        showYearDropDown
                      />
                    </Input>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Статус звонка</Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      placeholder="Статус звонка"
                      fluid
                      selection
                      search
                    />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Примечание</Table.Cell>
                  <Table.Cell>
                    <Form>
                      <TextArea />
                    </Form>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Table striped>
              <Table.Body>
                <Table.Row>
                  <Table.Cell width={5}>Назначить звонок</Table.Cell>
                  <Table.Cell>
                    <Table>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell collapsing>
                            <Checkbox />
                          </Table.Cell>
                          <Table.Cell>
                            <Input>
                              <DatePicker
                                autoComplete="off"
                                deteFormat="DD/MM/YYYY"
                                selected={moment(new Date())}
                                dropdownMode="select"
                                showMonthDropDown
                                showYearDropDown
                              />
                            </Input>
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Примечание</Table.Cell>
                  <Table.Cell>
                    <Form>
                      <TextArea />
                    </Form>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Button
              fluid
              color="blue"
              size="small"
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

export default connect(mapStateToProps, {})(injectIntl(Smregc));
