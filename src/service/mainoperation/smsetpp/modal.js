import React, { useState, useEffect } from 'react';
import { Button, Header, Icon, Modal, Input, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import './index.css';
import { Dropdown } from 'semantic-ui-react';
import { f4FetchCountryList } from '../../../reference/f4/f4_action';
import { docs } from '../../serviceAction';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { Grid } from 'semantic-ui-react';
require('moment/locale/ru');

const ModalPrice = props => {
  const [modalOpen, setModalOpen] = useState(false);
  const { countryList = [], companyOptions = [] } = props;
  const [countries, setCountries] = useState([]);
  const [startDate, setStartDate] = useState(moment());
  const [companies, setCompanies] = useState([]);
  const [test, setTest] = useState(false);
  const [test2, setTest2] = useState(false);
  const [test3, setTest3] = useState(false);
  const [informations, setInformations] = useState({
    company: '',
    startDate: startDate,
    FC: 0,
    MC: 0,
    Office: 0,
    Master: 0,
    Operator: 0,
    Sale: 0,
    TotalNum: 0,
    country: '',
    Currency: '',
    typeOfService: '',
    typeOfSum: '',
  });

  useEffect(() => {
    f4FetchCountryList();
  }, []);

  useEffect(() => {
    let country = countryList.map(item => {
      return { key: item.countryId, text: item.country, value: item.country };
    });
    setCountries(country);
    let company = companyOptions.map(item => {
      return { key: item.key, text: item.text, value: item.text };
    });
    setCompanies(company);
  }, [countryList]);

  const handleChange = (text, value) => {
    if (text === 'companies') {
      setInformations({ ...informations, company: value });
    }
    if (text === 'countries') {
      setInformations({ ...informations, country: value });
    }
    if (text === 'typeOfSum') {
      setInformations({ ...informations, typeOfSum: value });
    }
  };

  const onChangeDate = d => {
    setStartDate(d);
    setInformations({
      ...informations,
      startDate: d,
    });
  };

  const onhandleAdd = () => {
    setTest(true);
    const {
      company,
      FC,
      MC,
      Office,
      Master,
      Operator,
      Sale,
      TotalNum,
      country,
      typeOfSum,
    } = informations;

    if (
      company !== '' &&
      FC !== 0 &&
      MC !== 0 &&
      Office !== 0 &&
      Master !== 0 &&
      Operator !== 0 &&
      Sale !== 0 &&
      TotalNum !== 0 &&
      country !== '' &&
      typeOfSum !== ''
    ) {
      docs(informations);
    }
  };

  const onhandleCancel = () => {
    setModalOpen(false);
    setTest(false);
    setInformations({
      company: '',
      startDate: startDate,
      FC: 0,
      MC: 0,
      Office: 0,
      Master: 0,
      Operator: 0,
      Sale: 0,
      TotalNum: 0,
      country: '',
      Currency: '',
      typeOfService: '',
      typeOfSum: '',
    });
  };

  return (
    <Modal
      trigger={
        <button
          className="ui blue inverted button"
          id="addPrice"
          onClick={() => setModalOpen(true)}
        >
          <i aria-hidden="true" className="add square icon"></i>Добавить новую
          цену
        </button>
      }
      size="small"
      open={modalOpen}
      onClose={() => setModalOpen(false)}
    >
      <Header content="Добавить новую цену" id="modalHeader" />
      <Modal.Content>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <h3>Компания</h3>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Dropdown
                error={
                  test === true && informations.company === '' ? true : false
                }
                clearable="true"
                search
                selection
                options={companies}
                onChange={(e, { value }) => handleChange('companies', value)}
                placeholder="Компания"
              />
            </Grid.Column>
          </Grid.Row>

          <Divider />
          <Grid.Row>
            <Grid.Column>
              <h3>Дата начало</h3>
            </Grid.Column>
            <Grid.Column floated="right" width={5} id="inputDate">
              <div className="ui input">
                <DatePicker
                  className="date-auto-width"
                  autoComplete="off"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select" //timezone="UTC"
                  selected={startDate}
                  onChange={date => onChangeDate(date)}
                  dateFormat="DD.MM.YYYY"
                />
                <i
                  aria-hidden="true"
                  className="calendar alternate outline big icon"
                  id="calendarIcon"
                ></i>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column>
              <h3 id="fcCount">FC(кол-во)</h3>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Input
                error={test === true && informations.FC === 0 ? true : false}
                placeholder="Search..."
                type="number"
                placeholder="Search..."
                onChange={e =>
                  setInformations({ ...informations, FC: e.target.value })
                }
              />
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column>
              <h3>MC(кол-во)</h3>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Input
                error={test === true && informations.MC === 0 ? true : false}
                type="number"
                placeholder="Search..."
                onChange={e =>
                  setInformations({ ...informations, MC: e.target.value })
                }
              />
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column>
              <h3>Офис (в сумме)</h3>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Input
                error={
                  test === true && informations.Office === 0 ? true : false
                }
                type="number"
                placeholder="Search..."
                onChange={e =>
                  setInformations({
                    ...informations,
                    Office: e.target.value,
                  })
                }
              />
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column>
              <h3>Мастер (в сумме)</h3>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Input
                error={
                  test === true && informations.Master === 0 ? true : false
                }
                type="number"
                placeholder="Search..."
                onChange={e =>
                  setInformations({
                    ...informations,
                    Master: e.target.value,
                  })
                }
              />
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column>
              <h3>Оператор (в сумме)</h3>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Input
                error={
                  test === true && informations.Operator === 0 ? true : false
                }
                type="number"
                placeholder="Search..."
                onChange={e =>
                  setInformations({
                    ...informations,
                    Operator: e.target.value,
                  })
                }
              />
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column>
              <h3>Скидка (в сумме)</h3>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Input
                error={test === true && informations.Sale === 0 ? true : false}
                type="number"
                placeholder="Search..."
                onChange={e =>
                  setInformations({ ...informations, Sale: e.target.value })
                }
              />
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column>
              <h3>Общая сумма</h3>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Input
                error={
                  test === true && informations.TotalNum === 0 ? true : false
                }
                type="number"
                placeholder="Search..."
                onChange={e =>
                  setInformations({
                    ...informations,
                    TotalNum: e.target.value,
                  })
                }
              />
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column>
              <h3>Страна</h3>
            </Grid.Column>

            <Grid.Column floated="right" width={5}>
              <Dropdown
                error={
                  test === true && informations.country === '' ? true : false
                }
                clearable="true"
                search
                selection
                options={countries}
                onChange={(e, { value }) => handleChange('countries', value)}
                placeholder="Страна"
              />
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column>
              <h3>Валюта</h3>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Dropdown placeholder="State" search />
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column>
              <h3>Вид сервиса</h3>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Dropdown placeholder="State" search />
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column>
              <h3>Вид суммы</h3>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Dropdown
                error={
                  test === true && informations.typeOfSum === '' ? true : false
                }
                placeholder="State"
                search
                selection
                onChange={(e, { value }) => handleChange('typeOfSum', value)}
                options={[
                  { key: 1, text: '%', value: '%' },
                  { key: 2, text: 'n', value: 'n' },
                ]}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Modal.Content>
      <Modal.Actions>
        <Button inverted color="red" onClick={onhandleCancel}>
          <Icon name="remove" /> Отмена
        </Button>
        <Button inverted color="blue" onClick={onhandleAdd}>
          <Icon name="checkmark" /> Добавить
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    countryList: state.f4.countryList,
    companyOptions: state.userInfo.companyOptions,
  };
};

// const mapDispatchToProps = () => {
//   return {
//     props: docs
//   }
// }

const mapDispatchToProps = dispatch => {
  return {
    props: () => {
      dispatch(docs);
    },
  };
};

export default connect(mapStateToProps, {
  mapDispatchToProps,
  f4FetchCountryList,
})(ModalPrice);
