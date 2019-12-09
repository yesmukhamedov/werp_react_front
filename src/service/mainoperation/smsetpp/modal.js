import React, { useState, useEffect } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from './smsetppAction';
import axios from 'axios';
import './index.css';
const ModalPrice = ({ state, person, infos }) => {
  const [informations, setInformations] = useState({
    name: '',
    username: '',
    website: '',
    phone: '',
    address: {
      city: '',
    },
    company: {
      name: '',
    },
  });
  const [modalOpen, setModalOpen] = useState(false);

  const onSave = () => {
    setModalOpen(false);
    axios
      .post('https://jsonplaceholder.typicode.com/users', informations)
      .then(res => {
        console.log(res.data, 'res');
        person(res.data);
      });

    setInformations({
      name: '',
      username: '',
      website: '',
      phone: '',
      address: {
        city: '',
      },
      company: {
        name: '',
      },
    });
  };

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
            <h3>Name</h3>
            <div className="ui input">
              <input
                type="text"
                placeholder="Search..."
                value={informations.name}
                onChange={e =>
                  setInformations({ ...informations, name: e.target.value })
                }
              />
            </div>
          </div>
          <br></br>
          <div className="inputs">
            <h3>Username</h3>
            <div className="ui input">
              <input
                type="text"
                placeholder="Search..."
                value={informations.username}
                onChange={e =>
                  setInformations({ ...informations, username: e.target.value })
                }
              />
            </div>
          </div>
          <br></br>
          <div className="inputs">
            <h3>Website</h3>
            <div className="ui input">
              <input
                type="text"
                placeholder="Search..."
                value={informations.website}
                onChange={e =>
                  setInformations({ ...informations, website: e.target.value })
                }
              />
            </div>
          </div>
          <br></br>
          <div className="inputs">
            <h3>Phone</h3>
            <div className="ui input">
              <input
                type="text"
                placeholder="Search..."
                value={informations.phone}
                onChange={e =>
                  setInformations({ ...informations, phone: e.target.value })
                }
              />
            </div>
          </div>
          <br></br>
          <div className="inputs">
            <h3>Компания</h3>
            <div className="ui input">
              <input
                type="text"
                placeholder="Search..."
                value={informations.address.city}
                onChange={e =>
                  setInformations({
                    ...informations,
                    address: { city: e.target.value },
                  })
                }
              />
            </div>
          </div>
          <br></br>
          <div className="inputs">
            <h3>Компания</h3>
            <div className="ui input">
              <input
                type="text"
                placeholder="Search..."
                value={informations.company.name}
                onChange={e =>
                  setInformations({
                    ...informations,
                    company: { name: e.target.value },
                  })
                }
              />
            </div>
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={onSave}>
          Добавить
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const mapStateToProps = state => {
  return { state };
};

export default connect(mapStateToProps, actions)(ModalPrice);
