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
      closeIcon
    >
      <Header content="Добавить новую цену" />
      <Modal.Content>
        <div>
          <div className="inputs">
            Компания
            <div id="smsetppInput">
              <Dropdown
                clearable="true"
                fluid
                search
                selection
                options={companies}
                onChange={(e, { value }) => handleChange('companies', value)}
                placeholder="Компания"
              />
            </div>
          </div>

          <div className="inputs">
            <form>
              <label>
                Дата начало
                <div id="smsetppInput">
                  <DatePicker
                    className="date-auto-width"
                    autoComplete="off"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select" //timezone="UTC"
                    selected={startDate}
                    fluid
                    onChange={date => onChangeDate(date)}
                    dateFormat="DD.MM.YYYY"
                  />
                </div>
              </label>
            </form>
          </div>

          <div className="inputs">
            <form>
              <label>
                FC(кол-во)
                <div className="ui fluid input">
                  <input
                    type="text"
                    placeholder="Search..."
                    id="smsetppInput"
                    onChange={e =>
                      setInformations({ ...informations, FC: e.target.value })
                    }
                  />
                </div>
              </label>
            </form>
          </div>

          <div className="inputs">
            <form>
              <label>
                MC(кол-во)
                <div className="ui fluid input">
                  <input
                    type="text"
                    placeholder="Search..."
                    id="smsetppInput"
                    onChange={e =>
                      setInformations({ ...informations, MC: e.target.value })
                    }
                  />
                </div>
              </label>
            </form>
          </div>

          <div className="inputs">
            <form>
              <label>
                Офис (в сумме)
                <div className="ui fluid input">
                  <input
                    type="text"
                    placeholder="Search..."
                    id="smsetppInput"
                    onChange={e =>
                      setInformations({
                        ...informations,
                        Office: e.target.value,
                      })
                    }
                  />
                </div>
              </label>
            </form>
          </div>

          <div className="inputs">
            <form>
              <label>
                Мастер (в сумме)
                <div className="ui fluid input">
                  <input
                    type="text"
                    id="smsetppInput"
                    placeholder="Search..."
                    onChange={e =>
                      setInformations({
                        ...informations,
                        Master: e.target.value,
                      })
                    }
                  />
                </div>
              </label>
            </form>
          </div>

          <div className="inputs">
            <form>
              <label>
                Оператор (в сумме)
                <div className="ui fluid input">
                  <input
                    type="text"
                    id="smsetppInput"
                    placeholder="Search..."
                    onChange={e =>
                      setInformations({
                        ...informations,
                        Operator: e.target.value,
                      })
                    }
                  />
                </div>
              </label>
            </form>
          </div>

          <div className="inputs">
            <form>
              <label>
                Скидка (в сумме)
                <div className="ui fluid input">
                  <input
                    type="text"
                    id="smsetppInput"
                    placeholder="Search..."
                    onChange={e =>
                      setInformations({ ...informations, Sale: e.target.value })
                    }
                  />
                </div>
              </label>
            </form>
          </div>

          <div className="inputs">
            <form>
              <label>
                Общая сумма
                <div className="ui fluid input">
                  <input
                    type="text"
                    name="smsetppInput"
                    id="smsetppInput"
                    placeholder="Search..."
                    onChange={e =>
                      setInformations({
                        ...informations,
                        TotalNum: e.target.value,
                      })
                    }
                  />
                </div>
              </label>
            </form>
          </div>

          <div className="inputs">
            Страна
            <div id="smsetppInput">
              <Dropdown
                clearable="true"
                fluid
                search
                selection
                options={countries}
                onChange={(e, { value }) => handleChange('countries', value)}
                placeholder="Страна"
              />
            </div>
          </div>
          <div className="inputs">
            <form>
              <label>Валюта</label>
            </form>
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
