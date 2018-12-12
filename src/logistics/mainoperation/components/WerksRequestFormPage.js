import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Header,
  Container,
  Icon,
  Segment,
  Divider,
  Tab,
  Loader,
  Menu,
  Dropdown,
  Button,
  Form,
} from 'semantic-ui-react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { blankWerksRequest } from '../actions/logisticsActions';

class WerksRequestFormPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      model: {},
    };
  }

  componentWillMount() {
    this.props.blankWerksRequest();
  }

  render() {
    return (
      <div className="ui segments">
        <div className="ui segment">
          <h3>Основные данные</h3>
        </div>
        <div className="ui secondary segment">
          <Form.Group widths="equal">
            <Form.Input
              label="Фамилия"
              placeholder="Фамилия"
              onChange={e => this.onInputChange('lastname', e.target.value)}
            />
            <Form.Input
              label="Имя"
              placeholder="Имя"
              onChange={e => this.onInputChange('firstname', e.target.value)}
            />
            <Form.Input
              label="Отчество"
              placeholder="Отчество"
              onChange={e => this.onInputChange('middlename', e.target.value)}
            />
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Input
              label="ИИН"
              placeholder="ИИН"
              onChange={e => this.onInputChange('iin', e.target.value)}
            />
          </Form.Group>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    model: state.logisticsReducer.werksRequestModel,
    pageLoading: state.documentReducer.pageLoading,
  };
}

export default connect(
  mapStateToProps,
  {
    blankWerksRequest,
  },
)(WerksRequestFormPage);
