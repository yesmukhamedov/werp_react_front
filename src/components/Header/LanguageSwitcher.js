import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import { Dropdown } from 'semantic-ui-react';

const options = [{key:'en', value:'en', flag:'us', text:'English'},
                 {key:'ru', value:'ru', flag:'ru', text:'Русский'}];

class LanguageSwitcher extends Component {

    handleChange = (e, { value }) => {
        this.props.changeLanguage(value);
    }

    render () {
      return (
        <Dropdown item  value={this.props.locales.lang} options={options} onChange={this.handleChange}/>
      );
    }
}

function mapStateToProps(state) {
    return {
        locales: state.locales
    };
}

export default connect(mapStateToProps, actions)(LanguageSwitcher);