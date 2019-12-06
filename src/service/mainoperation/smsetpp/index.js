import React, { Component } from 'react';
import { Segment, Dropdown } from 'semantic-ui-react';
import './index.css';
import axios from 'axios';

class Smsetpp extends Component {
  constructor() {
    super();
    this.state = {
      informations: [],
      names: [],
      usernames: [],
      search: '',
    };
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/users').then(res => {
      this.setState({ informations: res.data });
      console.log(res.data);
      res.data.map(item => {
        this.setState({
          names: [
            ...this.state.names,
            { key: item.name, text: item.name, value: item.name },
          ],
        });
        this.setState({
          usernames: [
            ...this.state.usernames,
            { key: item.username, text: item.username, value: item.username },
          ],
        });
      });
    });
  }

  handleClick = (e, { value }) => {
    console.log(value, 'f');
  };

  render() {
    const { names, usernames, informations } = this.state;
    let f = this.state.informations.filter(informations => {
      return (
        informations.name
          .toLowerCase()
          .toUpperCase()
          .indexOf(this.state.search.toLowerCase().toUpperCase()) !== -1
      );
    });
    return (
      <Segment>
        <div className="setting">
          <div className="flex-container">
            <h1>Настройка цен и премии сервис услуг</h1>
            <button className="ui blue button" id="addPrice">
              <i aria-hidden="true" class="add square icon"></i>Добавить новую
              цену
            </button>
          </div>
          <Dropdown
            selection
            options={names}
            placeholder="Компания"
            onChange={this.handleClick}
          />
          <Dropdown
            selection
            options={usernames}
            placeholder="Страна"
            id="secondDropdown"
          />
          <button className="ui blue tiny button" id="addPrice2">
            Поиск
          </button>
          <table class="ui black table">
            <thead class="">
              <tr class="">
                <th class="">id</th>
                <th class="">Компания</th>
                <th class="">FC</th>
                <th class="">MC</th>
                <th class="">Офис</th>
                <th class="">Мастер</th>
                <th class="">Оператор</th>
                <th class="">Редактировать</th>
              </tr>
            </thead>
            <tbody class="">
              {f.map((item, id) => (
                <tr class="">
                  <td class="">{item.id}</td>
                  <td class="">{item.name}</td>
                  <td class="">{item.username}</td>
                  <td class="">{item.website}</td>
                  <td class="">{item.phone}</td>
                  <td class="">{item.address.city}</td>
                  <td class="">{item.company.name}</td>
                  <td class="">
                    <i
                      aria-hidden="true"
                      id="edit"
                      class="pencil huge link icon"
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Segment>
    );
  }
}
export default Smsetpp;
