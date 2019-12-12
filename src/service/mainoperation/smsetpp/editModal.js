import React, { useState } from 'react';
import { f4FetchCountryList } from '../../../reference/f4/f4_action';
import { connect } from 'http2';
const editModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
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
                options={companies}
                onChange={(e, { value }) => handleChange('companies', value)}
                placeholder="Компания"
              />
            </div>
          </div>
          <br></br>
          <div className="inputs">
            <h3>Дата начало</h3>
            <DatePicker
              className="date-100-width"
              autoComplete="off"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select" //timezone="UTC"
              selected={startDate}
              onChange={date => onChangeDate(date)}
              dateFormat="DD.MM.YYYY"
            />
          </div>
          <br></br>
          <div className="inputs">
            <h3>FC(кол-во)</h3>
            <div className="ui input">
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
            <div className="ui input">
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
            <div className="ui input">
              <input
                type="text"
                placeholder="Search..."
                onChange={e =>
                  setInformations({ ...informations, Office: e.target.value })
                }
              />
            </div>
          </div>
          <br></br>
          <div className="inputs">
            <h3>Мастер (в сумме)</h3>
            <div className="ui input">
              <input
                type="text"
                placeholder="Search..."
                onChange={e =>
                  setInformations({ ...informations, Master: e.target.value })
                }
              />
            </div>
          </div>
          <div className="inputs">
            <h3>Оператор (в сумме)</h3>
            <div className="ui input">
              <input
                type="text"
                placeholder="Search..."
                onChange={e =>
                  setInformations({ ...informations, Operator: e.target.value })
                }
              />
            </div>
          </div>
          <div className="inputs">
            <h3>Скидка (в сумме)</h3>
            <div className="ui input">
              <input
                type="text"
                placeholder="Search..."
                onChange={e =>
                  setInformations({ ...informations, Sale: e.target.value })
                }
              />
            </div>
          </div>
          <div className="inputs">
            <h3>Общая сумма</h3>
            <div className="ui input">
              <input
                type="text"
                placeholder="Search..."
                onChange={e =>
                  setInformations({ ...informations, TotalNum: e.target.value })
                }
              />
            </div>
          </div>
          <div className="inputs">
            <h3>Страна</h3>

            <Dropdown
              clearable="true"
              search
              selection
              options={countries}
              onChange={(e, { value }) => handleChange('countries', value)}
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

export default connect(mapStateToProps)(editModal);
