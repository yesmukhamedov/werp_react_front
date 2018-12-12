import React, { Component } from 'react';
import axios from 'axios';
import { Form } from 'semantic-ui-react';
import { ROOT_URL } from '../../../utils/constants';

const MODE_DROPDOWN = 0;
const MODE_LABEL = 1;

class BukrsF4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: MODE_DROPDOWN,
      options: [],
      selected: '',
      selectedName: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    axios
      .get(`${ROOT_URL}/api/reference/companies`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(res => {
        const loaded = res.data.map(b => ({
          key: b.id,
          text: b.name,
          value: b.id,
        }));
        if (loaded.length === 1) {
          this.setState({
            ...this.state,
            mode: MODE_LABEL,
            selected: loaded[0].value,
            selectedName: loaded[0].text,
          });
          const temp = {
            value: loaded[0].value,
            options: loaded,
            name: 'bukrs',
          };
          this.handleChange({}, temp);
        } else {
          loaded.unshift({
            key: 0,
            text: 'Не выбрано',
            value: '',
          });
          this.setState({
            ...this.state,
            mode: MODE_DROPDOWN,
            options: loaded,
          });
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  handleChange(e, v) {
    this.setState({
      ...this.state,
      selectedBukrs: v.value,
    });

    this.props.handleChange(e, v);
  }

  render() {
    if (this.state.mode === MODE_LABEL) {
      return (
        <div>
          <Form.Input
            readOnly
            disabled
            label="Компания"
            value={this.state.selectedName}
            placeholder="Компания"
          />
        </div>
      );
    }
    return (
      <Form.Select
        name="bukrs"
        label="Компания"
        options={this.state.options}
        placeholder="Компания"
        onChange={this.handleChange}
      />
    );
  }
}

export default BukrsF4;
