import React, { useState, useEffect } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './index.css';
import { Dropdown } from 'semantic-ui-react';
import { f4FetchCountryList } from '../../../reference/f4/f4_action';

const ModalPrice = props => {
  const [modalOpen, setModalOpen] = useState(false);
  const { countryList = [], companyOptions = [], f4FetchCountryList } = props;
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    f4FetchCountryList();
  }, []);

  useEffect(() => {
    let country = countryList.map(item => {
      return { key: item.countryId, text: item.country, value: item.country };
    });
    setCountries(country);
  }, [countryList]);

  return (
    <Modal
      trigger={
        <button
          className="ui blue button"
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
            <h3>Компания</h3>
            <div className="ui input">
              <Dropdown
                clearable="true"
                search
                selection
                options={companyOptions}
                placeholder="Компания"
              />
            </div>
          </div>
          <br></br>
          <div className="inputs">
            <h3>Дата начало</h3>
            <div className="ui input"></div>
          </div>
          <br></br>
          <div className="inputs">
            <h3>FC(кол-во)</h3>
            <div className="ui input">
              <input type="text" placeholder="Search..." />
            </div>
          </div>
          <br></br>
          <div className="inputs">
            <h3>MC(кол-во)</h3>
            <div className="ui input">
              <input type="text" placeholder="Search..." />
            </div>
          </div>
          <br></br>
          <div className="inputs">
            <h3>Офис (в сумме)</h3>
            <div className="ui input">
              <input type="text" placeholder="Search..." />
            </div>
          </div>
          <br></br>
          <div className="inputs">
            <h3>Мастер (в сумме)</h3>
            <div className="ui input">
              <input type="text" placeholder="Search..." />
            </div>
          </div>
          <div className="inputs">
            <h3>Оператор (в сумме)</h3>
            <div className="ui input">
              <input type="text" placeholder="Search..." />
            </div>
          </div>
          <div className="inputs">
            <h3>Скидка (в сумме)</h3>
            <div className="ui input">
              <input type="text" placeholder="Search..." />
            </div>
          </div>
          <div className="inputs">
            <h3>Общая сумма</h3>
            <div className="ui input">
              <input type="text" placeholder="Search..." />
            </div>
          </div>
          <div className="inputs">
            <h3>Страна</h3>

            <Dropdown
              clearable="true"
              search
              selection
              options={countries}
              placeholder="Компания"
            />
          </div>
          <div className="inputs">
            <h3>Валюта</h3>
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red">Добавить</Button>
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

export default connect(mapStateToProps, { f4FetchCountryList })(ModalPrice);
