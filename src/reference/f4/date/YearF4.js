import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { YEAR_OPTIONS } from '../../../utils/constants';

const currentDate = new Date();

class YearF4 extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, v) {
    this.props.handleChange(e, v);
  }

  render() {
    return (
      <Form.Select
        defaultValue={currentDate.getFullYear()}
        name="year"
        label="Год"
        options={YEAR_OPTIONS}
        placeholder="Год"
        onChange={this.handleChange}
      />
    );
  }
}

export default YearF4;
