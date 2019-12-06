import React from 'react';
import { Segment, Dropdown } from 'semantic-ui-react';

const Smsetpp = () => {
  return (
    <Segment>
      <div className="settingPrice">
        <div className="ui container">
          <div className="flex-container">
            <h1>Настройка цен и премии сервис услуг</h1>
            <button className="ui blue button" id="addPrice">
              <i aria-hidden="true" class="add square icon"></i>Добавить новую
              цену
            </button>
          </div>
          <Dropdown
            selection
            options={options}
            placeholder="Компания"
            onChange={handleClick}
          />
          <Dropdown
            selection
            options={options}
            placeholder="Страна"
            id="secondDropdown"
          />
          <button className="ui blue tiny button" id="addPrice2">
            Поиск
          </button>
        </div>
      </div>
    </Segment>
  );
};
export default Smsetpp;
