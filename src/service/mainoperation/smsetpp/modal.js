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
import { serviceAdd } from './../../serviceAction';
require('moment/locale/ru');
require('moment/locale/tr');

const ModalPrice = props => {
  const [modalOpen, setModalOpen] = useState(false);
  const {
    countryList = [],
    companyOptions = [],
    intl: { messages },
    serviceAdd,
    language,
  } = props;
  const [countries, setCountries] = useState([]);
  const [startDate, setStartDate] = useState(moment());
  const [companies, setCompanies] = useState([]);
  const [test, setTest] = useState(false);
  const [informations, setInformations] = useState({
    bukrs: '',
    dateStart: startDate,
    fc: 0,
    mc: 0,
    office: 0,
    master: 0,
    operator: 0,
    discount: 0,
    total: 0,
    country: '',
    waers: '',
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
      setInformations({ ...informations, bukrs: value });
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
      country,
      waers,
      typeOfSum,
    } = informations;

    if (
      bukrs !== '' &&
      fc !== 0 &&
      mc !== 0 &&
      office !== 0 &&
      master !== 0 &&
      operator !== 0 &&
      discount !== 0 &&
      total !== 0 &&
      country !== '' &&
      waers !== '' &&
      typeOfSum !== ''
    ) {
      serviceAdd(informations);
    }
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
      country: '',
      discount: '',
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
          <i aria-hidden="true" className="add square icon"></i>{' '}
          {messages['toAdd']}
        </button>
      }
      size="small"
      open={modalOpen}
      onClose={() => setModalOpen(false)}
    >
      <Header content={messages['toAdd']} id="modalHeader" />
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
                placeholder={messages['bukrs']}
              />
            </Grid.Column>
          </Grid.Row>

          <Divider />
          <Grid.Row>
            <Grid.Column>
              <h3>{messages['Task.StartDate']}</h3>
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
                  locale={language}
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
              <h3 id="fcCount">FC({messages['Table.Amount']})</h3>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Input
                error={test === true && informations.fc === 0 ? true : false}
                placeholder="Number..."
                type="number"
                placeholder="Number..."
                onChange={e =>
                  setInformations({ ...informations, fc: e.target.value })
                }
              />
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column>
              <h3>MC({messages['Table.Amount']})</h3>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Input
                error={test === true && informations.mc === 0 ? true : false}
                type="number"
                placeholder="Number..."
                onChange={e =>
                  setInformations({ ...informations, mc: e.target.value })
                }
              />
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column>
              <h3>
                {messages['office']} ({messages['inTotal']})
              </h3>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Input
                error={
                  test === true && informations.office === 0 ? true : false
                }
                type="number"
                placeholder="Number..."
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
              <h3>
                {messages['master']} ({messages['inTotal']})
              </h3>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Input
                error={
                  test === true && informations.master === 0 ? true : false
                }
                type="number"
                placeholder="Number..."
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
              <h3>
                {messages['Operator']} ({messages['inTotal']})
              </h3>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Input
                error={
                  test === true && informations.operator === 0 ? true : false
                }
                type="number"
                placeholder="Number..."
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
              <h3>
                {messages['discount']} ({messages['inTotal']})
              </h3>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Input
                error={
                  test === true && informations.discount === 0 ? true : false
                }
                type="number"
                placeholder="Number..."
                onChange={e =>
                  setInformations({ ...informations, discount: e.target.value })
                }
              />
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column>
              <h3>{messages['totalAmount']}</h3>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Input
                error={test === true && informations.total === 0 ? true : false}
                type="number"
                placeholder="Number..."
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
              <h3>{messages['country']}</h3>
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
                placeholder={messages['country']}
              />
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column>
              <h3>{messages['waers']}</h3>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Dropdown placeholder={messages['waers']} search />
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column>
              <h3>{messages['typeOfService']}</h3>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Dropdown placeholder={messages['typeOfService']} search />
            </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column>
              <h3>{messages['typeOfAmount']}</h3>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Dropdown
                error={
                  test === true && informations.typeOfSum === '' ? true : false
                }
                placeholder={messages['typeOfAmount']}
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
          <Icon name="remove" /> {messages['Button.No']}
        </Button>
        <Button inverted color="blue" onClick={onhandleAdd}>
          <Icon name="checkmark" /> {messages['BTN__ADD']}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const mapStateToProps = state => {
  //console.log(state)
  return {
    language: state.locales.lang,
    countryList: state.f4.countryList,
    companyOptions: state.userInfo.companyOptions,
  };
};

export default connect(mapStateToProps, {
  serviceAdd,
  f4FetchCountryList,
})(injectIntl(ModalPrice));
