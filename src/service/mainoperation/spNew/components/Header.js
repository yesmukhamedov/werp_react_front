import React, { Component } from 'react';
import { Input, Form, Dropdown } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';

const companyOptions = [
  { key: 'AURA', value: 'AURA', text: 'AURA' },
  { key: 'GREENLIGHT', value: 'GREENLIGHT', text: 'GREENLIGHT' },
];
const countryOptions = [
  {
    key: 'kz',
    value: 'kz',
    flag: 'kz',
    text: 'Kazakhstan',
  },
];
const productOptions = [{ key: 'ROBO', value: 'ROBO', text: 'ROBOCLEAN' }];

class Header extends Component {
  render() {
    return (
      <div>
        <form className="ui form">
          <h4 className="ui top attached block header">Новый сервис пакет</h4>
          <div className="ui bottom attached segment">
            <div className="ui four column doubling grid">
              <div className="column">
                <div className="field">
                  <label>Название</label>
                  <input
                    name="name"
                    placeholder="Введите название сервис пакета"
                    type="text"
                  />
                </div>
                <div className="field">
                  <label>Примечание</label>
                  <input
                    name="description"
                    placeholder="Введите описание сервис пакета"
                    type="text"
                  />
                </div>
                <div className="field">
                  <label>Компания</label>
                  <Dropdown
                    placeholder="Select Company"
                    fluid
                    selection
                    options={companyOptions}
                  />
                </div>
                <div className="field">
                  <label>Страна</label>
                  <Dropdown
                    placeholder="Select Country"
                    fluid
                    selection
                    options={countryOptions}
                  />
                </div>
              </div>
              <div className="column">
                <div className="field">
                  <label>Дата начала действия</label>
                  <DatePicker autoComplete="off" />
                </div>
                <div className="field">
                  <label>Категория</label>
                  <div className="ui fluid search selection dropdown">
                    <input name="category" type="hidden" />
                    <i className="dropdown icon" />
                    <div className="default text">Выберите категорию</div>
                    <div className="menu">
                      <div className="item" data-value="cleaning">
                        Уборочная система
                      </div>
                      <div className="item" data-value="waterCleaning">
                        Система очистки воды
                      </div>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <label>Товар</label>
                  <Dropdown
                    placeholder="Select Product"
                    fluid
                    selection
                    options={productOptions}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Header;
