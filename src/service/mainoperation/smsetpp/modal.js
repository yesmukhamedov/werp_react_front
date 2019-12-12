import React, { useState, useEffect } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import './index.css';
import { Dropdown } from 'semantic-ui-react';
import { f4FetchCountryList } from '../../../reference/f4/f4_action';
import { docs } from '../../serviceAction';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
require('moment/locale/ru');

const ModalPrice = props => {
  const [modalOpen, setModalOpen] = useState(false);
  const { countryList = [], companyOptions = [] } = props;
  const [countries, setCountries] = useState([]);
  const [startDate, setStartDate] = useState(moment(firstDay));
  const date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  const firstDay = new Date(y, m, 1);
  const [companies, setCompanies] = useState([]);
  const [informations, setInformations] = useState({
    company: '',
    startDate: `${startDate.date()}.${startDate.month() +
      1}.${startDate.year()}`,
    FC: 0,
    MC: 0,
    Office: 0,
    Master: 0,
    Operator: 0,
    Sale: 0,
    TotalNum: 0,
    Country: '',
    Currency: '',
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
  };

  const onChangeDate = d => {
    setStartDate(d);
    setInformations({
      ...informations,
      startDate: `${d.date()}.${d.month() + 1}.${d.year()}`,
    });
  };

  const onhandleAdd = () => {
    docs(informations);
  };

  const onhandleCancel = () => {
    setModalOpen(false);
    setInformations({
      company: '',
      startDate: '',
      FC: 0,
      MC: 0,
      Office: 0,
      Master: 0,
      Operator: 0,
      Sale: 0,
      TotalNum: 0,
      Country: '',
      Currency: '',
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
      open={modalOpen}
      onClose={() => setModalOpen(false)}
    >
      <Header content="Добавить новую цену" id="modalHeader" />
      <Modal.Content>
        <div className="modalPage">
          <div className="inputs">
            <h3>Компания</h3>
            <div id="smsetppInput">
              <Dropdown
                clearable="true"
                search
                selection
                id="smsetppInput"
                options={companies}
                onChange={(e, { value }) => handleChange('companies', value)}
                placeholder="Компания"
              />
            </div>
          </div>
          <br></br>
          <div className="inputs">
            <h3>Дата начало</h3>
            <div id="smsetppInput" id="inputDate">
              <DatePicker
                className="date-auto-width"
                autoComplete="off"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select" //timezone="UTC"
                selected={startDate}
                id="smsetppInput"
                onChange={date => onChangeDate(date)}
                dateFormat="DD.MM.YYYY"
              />{' '}
              <i
                aria-hidden="true"
                class="calendar alternate outline big icon"
                id="calendarIcon"
              ></i>
            </div>
          </div>
          <br></br>
          <div className="inputs">
            <h3 id="fcCount">FC(кол-во)</h3>
            <div className="ui input" id="smsetppInput">
              <input
                type="text"
                placeholder="Search..."
                onChange={e =>
                  setInformations({ ...informations, FC: e.target.value })
                }
              />
            </div>
          </div>
          <br></br>
          <div className="inputs">
            <h3>MC(кол-во)</h3>
            <div className="ui input" id="smsetppInput">
              <input
                type="text"
                placeholder="Search..."
                onChange={e =>
                  setInformations({ ...informations, MC: e.target.value })
                }
              />
            </div>
          </div>
          <br></br>
          <div className="inputs">
            <h3>Офис (в сумме)</h3>
            <div className="ui input" id="smsetppInput">
              <input
                type="text"
                placeholder="Search..."
                onChange={e =>
                  setInformations({
                    ...informations,
                    Office: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <br></br>
          <div className="inputs">
            <h3>Мастер (в сумме)</h3>
            <div className="ui input" id="smsetppInput">
              <input
                type="text"
                placeholder="Search..."
                onChange={e =>
                  setInformations({
                    ...informations,
                    Master: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <br></br>
          <div className="inputs">
            <h3>Оператор (в сумме)</h3>
            <div className="ui input" id="smsetppInput">
              <input
                type="text"
                placeholder="Search..."
                onChange={e =>
                  setInformations({
                    ...informations,
                    Operator: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <br></br>
          <div className="inputs">
            <h3>Скидка (в сумме)</h3>
            <div className="ui input" id="smsetppInput">
              <input
                type="text"
                placeholder="Search..."
                onChange={e =>
                  setInformations({ ...informations, Sale: e.target.value })
                }
              />
            </div>
          </div>
          <br></br>
          <div className="inputs">
            <h3>Общая сумма</h3>
            <div className="ui input" id="smsetppInput">
              <input
                type="text"
                placeholder="Search..."
                onChange={e =>
                  setInformations({
                    ...informations,
                    TotalNum: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <br></br>
          <div className="inputs">
            <h3>Страна</h3>
            <div id="smsetppInput" id="smsetppInput">
              <Dropdown
                clearable="true"
                search
                selection
                options={countries}
                onChange={(e, { value }) => handleChange('countries', value)}
                placeholder="Страна"
              />
            </div>
          </div>
          <br></br>
          <div className="inputs">
            <h3>Валюта</h3>
          </div>
        </div>
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
