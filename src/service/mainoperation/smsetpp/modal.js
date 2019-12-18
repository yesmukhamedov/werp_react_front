import React, { useState, useEffect } from 'react';
import { Button, Header, Icon, Modal, Input, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import './index.css';
import { Dropdown } from 'semantic-ui-react';
import { f4FetchCountryList } from '../../../reference/f4/f4_action';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { Grid } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import { fetchSmsetppType, fetchSmsetppPost } from './../../serviceAction';
require('moment/locale/ru');

const ModalPrice = props => {
  const [modalOpen, setModalOpen] = useState(false);
  const {
    data,
    fetchSmsetppType,
    fetchSmsetppPost,
    countryList = [],
    companyOptions = [],
    intl: { messages },
  } = props;
  const [typeOfService, setTypeOfService] = useState([]);
  const [countries, setCountries] = useState([]);
  const [startDate, setStartDate] = useState(moment());
  const [companies, setCompanies] = useState([]);
  const [test, setTest] = useState(false);
  const [informations, setInformations] = useState({
    bukrs: '',
    dateStart: `${startDate}`,
    fc: 0,
    mc: 0,
    office: 0,
    master: 0,
    operator: 0,
    discount: 0,
    total: 0,
    countryId: 0,
    waers: 'string',
    serviceTypeId: 0,
    typeOfSum: '',
  });

  useEffect(() => {
    fetchSmsetppType();
    f4FetchCountryList();
  }, []);

  useEffect(() => {
    let service = data.type.map(item => {
      return { key: item.id, text: item.nameEn, value: item.id };
    });
    setTypeOfService(service);
  }, [data.type]);

  useEffect(() => {
    let country = countryList.map(item => {
      return { key: item.countryId, text: item.country, value: item.countryId };
    });

    setCountries(country);
    let company = companyOptions.map(item => {
      return { key: item.key, text: item.text, value: item.text };
    });
    setCompanies(company);
  }, [countryList]);

  const handleChange = (text, value) => {
    if (text === 'companies') {
      setInformations({ ...informations, bukrs: value });
    }
    if (text === 'countries') {
      setInformations({ ...informations, countryId: value });
    }
    if (text === 'typeOfSum') {
      setInformations({ ...informations, typeOfSum: value });
    }
    if (text === 'typeOfService') {
      setInformations({ ...informations, serviceTypeId: value });
    }
  };

  const onChangeDate = d => {
    setStartDate(d);
    setInformations({
      ...informations,
      dateStart: d,
    });
  };

  const onhandleAdd = () => {
    setTest(true);
    const {
      bukrs,
      fc,
      mc,
      office,
      master,
      operator,
      discount,
      total,
      countryId,
      serviceTypeId,
      typeOfSum,
    } = informations;

    fetchSmsetppPost(informations);
    /*if (
      bukrs !== '' &&
      fc !== 0 &&
      mc !== 0 &&
      office !== 0 &&
      master !== 0 &&
      operator !== 0 &&
      discount !== 0 &&
      total !== 0 &&
      countryId !== '' &&
      serviceTypeId !== ''&&
      typeOfSum !== ''
    ) {
      //fetchSmsetppPost(informations)
      console.log(informations,'informations')
    }*/
  };

  const onhandleCancel = () => {
    setModalOpen(false);
    setTest(false);
    setInformations({
      bukrs: '',
      dateStart: startDate,
      fc: 0,
      mc: 0,
      office: 0,
      master: 0,
      operator: 0,
      discount: 0,
      total: 0,
      countryId: '',
      waers: '',
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
              <h3>{messages['bukrs']}</h3>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Dropdown
                error={
                  test === true && informations.bukrs === '' ? true : false
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
                error={test === true && informations.fc === 0 ? true : false}
                placeholder="Search..."
                type="number"
                onChange={e =>
                  setInformations({ ...informations, fc: e.target.value })
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
                error={test === true && informations.mc === 0 ? true : false}
                type="number"
                placeholder="Search..."
                onChange={e =>
                  setInformations({ ...informations, mc: e.target.value })
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
                  test === true && informations.office === 0 ? true : false
                }
                type="number"
                placeholder="Search..."
                onChange={e =>
                  setInformations({
                    ...informations,
                    office: e.target.value,
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
                  test === true && informations.master === 0 ? true : false
                }
                type="number"
                placeholder="Search..."
                onChange={e =>
                  setInformations({
                    ...informations,
                    master: e.target.value,
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
                  test === true && informations.operator === 0 ? true : false
                }
                type="number"
                placeholder="Search..."
                onChange={e =>
                  setInformations({
                    ...informations,
                    operator: e.target.value,
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
                error={
                  test === true && informations.discount === 0 ? true : false
                }
                type="number"
                placeholder="Search..."
                onChange={e =>
                  setInformations({ ...informations, discount: e.target.value })
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
                error={test === true && informations.total === 0 ? true : false}
                type="number"
                placeholder="Search..."
                onChange={e =>
                  setInformations({
                    ...informations,
                    total: e.target.value,
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
                  test === true && informations.countryId === '' ? true : false
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
              <Dropdown
                placeholder="State"
                clearable="true"
                selection
                options={typeOfService}
                onChange={(e, { value }) =>
                  handleChange('typeOfService', value)
                }
                placeholder="Страна"
                search
              />
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
    data: state.serviceReducer.data,
    countryList: state.f4.countryList,
    companyOptions: state.userInfo.companyOptions,
  };
};

export default connect(mapStateToProps, {
  fetchSmsetppType,
  fetchSmsetppPost,
  f4FetchCountryList,
})(injectIntl(ModalPrice));
