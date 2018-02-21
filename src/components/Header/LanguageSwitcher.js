import React, { Component } from 'react';
import {connect} from 'react-redux';
import changeLanguage from '../../actions/language';
import { Dropdown } from 'semantic-ui-react';
import './Header.css';

const options = [
                 {key:'en', value:'en', flag:'us', text:'English'},
                 {key:'ru', value:'ru', flag:'ru', text:'Русский'},                 
                 {key:'tr', value:'tr', flag:'tr', text:'Türkçe'}];

class LanguageSwitcher extends Component {

    handleChange = (e, { value }) => {
        this.props.changeLanguage(value);
    }

    render () {
        if(this.props.type === "signin"){
            return (
                <Dropdown style={{ marginRight: '0', marginBottom: '11px', background: 'rgba(0,0,0,.05)' }}
                    button 
                    className='icon'
                    labeled
                    fluid
                    icon='world'
                    options={options}
                    onChange={this.handleChange}
                    value={this.props.locales.lang}
                />
              );
        } else {
            return (
                <Dropdown item  value={this.props.locales.lang} options={options} onChange={this.handleChange}/>
              );
        }      
    }
}

function mapStateToProps(state) {
    return {
        locales: state.locales
    };
}

export default connect(mapStateToProps, {changeLanguage})(LanguageSwitcher);