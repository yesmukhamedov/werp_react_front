import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Segment,
  Form,
  Grid,
  Table,
  Label,
  Input,
  Checkbox,
  Button,
} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { injectIntl } from 'react-intl';
import HistoryReactTable from './historyReactTable';

import 'react-datepicker/dist/react-datepicker.css';
import './smcuspor.css';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';

function Smcuspor(props) {
  const emptyHistory = {
    activeButton: true,
    reactColumns: 'all',
  };
  const [history, setHistory] = useState({ ...emptyHistory });
  const {
    intl: { messages },
  } = props;

  const handleClick = (data, fieldname) => {
    setHistory(prev => {
      const varHistory = { ...prev };
      switch (fieldname) {
        case 'all':
          varHistory.reactColumns = fieldname;
          break;
        case 'services':
          varHistory.reactColumns = fieldname;
          varHistory.activeButton = false;
          break;
        case 'calls':
          varHistory.reactColumns = fieldname;
          varHistory.activeButton = false;
          break;
        case 'requests':
          varHistory.reactColumns = fieldname;
          varHistory.activeButton = false;
          break;
      }
      return varHistory;
    });
  };

  return (
    <Segment>
      <Form>
        <Grid>
          <Table>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <h1>История клиента</h1>
                </Table.Cell>
                <Table.Cell width="3">
                  <Button floated="right" fluid color="blue">
                    Зарегистрировать звонок
                  </Button>
                </Table.Cell>
                <Table.Cell width="3">
                  <Button floated="right" fluid color="blue">
                    Создать заявку
                  </Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>

          <Grid.Row>
            <Grid.Column mobile={16} table={16} computer={6}>
              <Segment>
                <h3>Данные клиента</h3>
              </Segment>
              <Table compact striped>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        Страна
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input size="small" fluid />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        Компания
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input size="small" fluid />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        Филиал
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input size="small" fluid />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        Сервис Филиал
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input size="small" fluid />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        CN
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input size="small" fluid />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        Заводской №
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input size="small" fluid />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        ФИО клиента
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input size="small" fluid />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        Контактное лицо
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input size="small" fluid />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        Адрес для сервиса
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input size="small" fluid />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell collapsing>
                      <Label size="large" basic>
                        Основные контакты
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input size="small" fluid />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        Категория
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input size="small" fluid />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        Дата покупки
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input size="small" fluid />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        Дата установки
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input size="small" fluid />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        Диллер
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input size="small" fluid />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        Установщик
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Input size="small" fluid />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        Срок гарантии
                      </Label>
                    </Table.Cell>
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
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Label size="large" basic>
                        Срок замены{' '}
                      </Label>
                    </Table.Cell>
                    <Table.Cell>
                      <Table>
                        <Table.Body>
                          <Table.Row>
                            <Table.Cell>
                              <Checkbox
                                radio
                                label="Автоматом"
                                name="changeTerm"
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <Checkbox
                                radio
                                label="В ручную"
                                name="changeTerm"
                              />
                            </Table.Cell>
                          </Table.Row>
                        </Table.Body>
                      </Table>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
              <Segment>
                <h3>Срок замены фильтров</h3>
                <Input size="mini" label="F1" className="input__filter_terms" />
                <Input size="mini" label="F2" className="input__filter_terms" />
                <Input size="mini" label="F3" className="input__filter_terms" />
                <Input size="mini" label="F4" className="input__filter_terms" />
                <Input size="mini" label="F5" className="input__filter_terms" />
              </Segment>
              <Button color="blue" fluid>
                Редактировать
              </Button>
            </Grid.Column>
            <Grid.Column mobile={16} table={16} computer={10}>
              <Table>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell width="3">
                      <Button
                        fluid
                        color="teal"
                        size="tiny"
                        active={history.activeButton}
                        onClick={(e, o) => handleClick(o, 'all')}
                      >
                        Все
                      </Button>
                    </Table.Cell>
                    <Table.Cell width="3">
                      <Button
                        fluid
                        color="teal"
                        size="tiny"
                        onClick={(e, o) => handleClick(o, 'services')}
                      >
                        Сервисы
                      </Button>
                    </Table.Cell>
                    <Table.Cell width="3">
                      <Button
                        fluid
                        color="teal"
                        size="tiny"
                        onClick={(e, o) => handleClick(o, 'calls')}
                      >
                        Звонки
                      </Button>
                    </Table.Cell>
                    <Table.Cell width="3">
                      <Button
                        fluid
                        color="teal"
                        size="tiny"
                        onClick={(e, o) => handleClick(o, 'requests')}
                      >
                        Заявки
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
              <Table>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell width="2" verticalAlign="bottom">
                      Дата заявки с
                      <DatePicker
                        autoComplete="off"
                        deteFormat="DD/MM/YYYY"
                        selected={moment(new Date())}
                        dropdownMode="select"
                        showMonthDropDown
                        showYearDropDown
                      />
                    </Table.Cell>
                    <Table.Cell width="2" verticalAlign="bottom">
                      Дата заявки по
                      <DatePicker
                        autoComplete="off"
                        deteFormat="DD/MM/YYYY"
                        selected={moment(new Date())}
                        dropdownMode="select"
                        showMonthDropDown
                        showYearDropDown
                      />
                    </Table.Cell>
                    <Table.Cell width="2" verticalAlign="bottom">
                      <Button fluid color="teal">
                        Применить
                      </Button>
                    </Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
              <HistoryReactTable columns={history.reactColumns} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <h2>История редактирований договора</h2>
                <ReactTableWrapper
                  columns={[
                    {
                      Header: () => (
                        <div style={{ textAlign: 'center' }}>Дата</div>
                      ),
                      accessor: 'date',
                      Cell: row => (
                        <div style={{ textAlign: 'center' }}>{row.value}</div>
                      ),
                    },
                    {
                      Header: () => (
                        <div style={{ textAlign: 'center' }}>Изменения</div>
                      ),
                      accessor: 'date',
                      Cell: row => (
                        <div style={{ textAlign: 'center' }}>{row.value}</div>
                      ),
                    },
                    {
                      Header: () => (
                        <div style={{ textAlign: 'center' }}>Операция</div>
                      ),
                      accessor: 'date',
                      Cell: row => (
                        <div style={{ textAlign: 'center' }}>{row.value}</div>
                      ),
                    },
                    {
                      Header: () => (
                        <div style={{ textAlign: 'center' }}>Старый</div>
                      ),
                      accessor: 'date',
                      Cell: row => (
                        <div style={{ textAlign: 'center' }}>{row.value}</div>
                      ),
                    },
                    {
                      Header: () => (
                        <div style={{ textAlign: 'center' }}>Новый</div>
                      ),
                      accessor: 'date',
                      Cell: row => (
                        <div style={{ textAlign: 'center' }}>{row.value}</div>
                      ),
                    },
                    {
                      Header: () => (
                        <div style={{ textAlign: 'center' }}>Примечание</div>
                      ),
                      accessor: 'date',
                      Cell: row => (
                        <div style={{ textAlign: 'center' }}>{row.value}</div>
                      ),
                    },
                    {
                      Header: () => (
                        <div style={{ textAlign: 'center' }}>
                          Изменен сотрудником
                        </div>
                      ),
                      accessor: 'date',
                      Cell: row => (
                        <div style={{ textAlign: 'center' }}>{row.value}</div>
                      ),
                    },
                  ]}
                  defaultPageSize={15}
                  pages={2}
                  previousText={messages['Table.Previous']}
                  nextText={messages['Table.Next']}
                  showPagination={true}
                  className="-striped -highlight"
                  pageSizeOptions={[20, 30, 40]}
                  loadingText={messages['Table.Next']}
                  noDataText={messages['Table.NoData']}
                  rowsText={messages['Table.Rows']}
                  pageText={messages['Table.Page']}
                  ofText={messages['Table.Of']}
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </Segment>
  );
}
function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(injectIntl(Smcuspor));
