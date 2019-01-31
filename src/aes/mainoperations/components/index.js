import React, { Component } from 'react';
import { Icon, Form, Segment, Button, Container } from 'semantic-ui-react';
import { Redirect } from 'react-router';

const options = [
  { key: 'operations', text: 'Операции', value: 'operations' },
  { key: 'report', text: 'отчет', value: 'report' },
  { key: 'otheroperations', text: 'Другие Операции', value: 'otheroperations' },
];
const operations = [
  { key: 'addChange', text: 'Добавление ОС', value: 'addChange' },
  { key: 'approval', text: 'Одобрение ОС', value: 'approval' },
];
const report = [{ key: 'replist', text: 'Список ОС', value: 'replist' }];
const otheroperations = [
  { key: 'aesnew', text: 'Наименование и коды ОС', value: 'aesnew' },
];

class Aes extends Component {
  constructor() {
    super();
    this.state = { selected: [], currentSelected: '', toDashboard: false };
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  handleDropdownChange(o, { value }) {
    switch (value) {
      case 'operations':
        this.setState({ selected: operations });
        break;

      case 'report':
        this.setState({ selected: report });
        break;

      case 'otheroperations':
        this.setState({ selected: otheroperations });
        break;
      //sub change
      case 'addChange':
        this.setState({ currentSelected: value });
        break;
      case 'approval':
        this.setState({ currentSelected: value });
        break;
      case 'replist':
        this.setState({ currentSelected: value });
        break;
      case 'aesnew':
        this.setState({ currentSelected: value });
        break;
      default:
        null;
        break;
    }
  }
  submitForm(e) {
    if (this.state.currentSelected != '') {
      this.setState({ toDashboard: true });
    }
  }

  render() {
    if (this.state.toDashboard === true) {
      return (
        <Redirect push to={`/aes/catalog/${this.state.currentSelected}`} />
      );
    }
    const isEnabled = this.state.selected && this.state.currentSelected != '';
    return (
      <Container
        fluid
        style={{
          marginTop: '4em',
          marginBottom: '4em',
          paddingLeft: '4em',
          paddingRight: '4em',
        }}
      >
        <Segment padded size="small">
          <div className="ui grid">
            <div className="two wide column" />
            <div className="twelve wide column   ">
              <Form onSubmit={this.submitForm.bind(this)}>
                <Form.Select
                  label="АХС"
                  options={options}
                  placeholder="выберите АХС"
                  onChange={this.handleDropdownChange}
                />
                <Form.Select
                  search
                  selection
                  label="Под компонет АХС"
                  placeholder="Под компонет АХС"
                  options={this.state.selected}
                  onChange={this.handleDropdownChange}
                />
                <Button floated="right" disabled={!isEnabled} color="teal">
                  <Icon name="checkmark" />
                  Показать
                </Button>
              </Form>
              <br />
            </div>
            <div className="two wide column" />
          </div>
        </Segment>
      </Container>
    );
  }
}

export default Aes;
