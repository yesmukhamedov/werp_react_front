import React, { Component } from 'react';
import axios from 'axios';
import { Form } from 'semantic-ui-react';
import { ROOT_URL } from '../../../utils/constants';

const bukrsBranches = {};
class BranchF4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      selected: '',
      selectedName: '',
      selectedBukrs: this.props.bukrs,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  loadItems(bukrs) {
    if (!bukrs || bukrs.length === 0) {
      console.log('ERR');
      return;
    }
    axios
      .get(`${ROOT_URL}/api/reference/branches/${bukrs}`, {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      })
      .then(res => {
        const loaded = res.data.map(b => ({
          key: b.branch_id,
          text: b.text45,
          value: b.branch_id,
        }));

        this.setState({
          ...this.state,
          options: loaded,
        });
        bukrsBranches[bukrs] = loaded;
      })
      .catch(e => {
        console.log(e);
      });
  }

  handleChange(e, v) {
    this.props.handleChange(e, v);
  }

  componentWillReceiveProps(props) {
    if (props.bukrs && props.bukrs.length > 0) {
      if (bukrsBranches[props.bukrs]) {
        this.setState({
          ...this.state,
          options: bukrsBranches[props.bukrs],
        });
      } else {
        this.loadItems(props.bukrs);
      }
    }
  }

  render() {
    return (
      <Form.Select
        name="branch"
        multiple={this.props.multiple}
        search={this.props.search}
        selection
        label="Филиал"
        options={this.state.options}
        placeholder="Филиал"
        onChange={this.handleChange}
      />
    );
  }
}

export default BranchF4;
