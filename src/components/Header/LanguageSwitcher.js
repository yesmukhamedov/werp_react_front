import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import { Dropdown } from 'semantic-ui-react';

const allLanguages = [
    { code: 'en', flag:'us', name: 'English'},
    { code: 'ru', flag:'ru', name: 'Русский'}
  ]

const options = allLanguages.map(language => {
    return {key:language.code, value:language.code, flag:language.flag, text:language.name}
});

class LanguageSwitcher extends Component {
    handleChange = (e, { value }) => {
        this.props.changeLanguage(value);
    }

    render () {
      return (
        <Dropdown item defaultValue={options[0].value} options={options} onChange={this.handleChange}/>
      );
    }
}

export default connect(null, actions)(LanguageSwitcher);