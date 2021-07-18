import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { v4 } from 'uuid';
import {
  Header,
  Container,
  Label,
  Icon,
  Form,
  Grid,
  Segment,
  Dropdown,
  Button,
  Divider,
  List,
} from 'semantic-ui-react';
import { notify } from '../../../../general/notification/notification_action';
import RecoCard from './RecoCard';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/recoStyles.css';
import { fetchGroupDealers } from '../../demo/actions/demoAction';
import {
  checkPhoneNumber,
  createRecoListNew,
  blankRecoItem,
  blankReco,
  fetchRecoCategories,
} from '../actions/recoAction';
import { injectIntl } from 'react-intl';
import { doGet } from '../../../../utils/apiActions';
require('moment/locale/ru');

const DEFAULT_CONTEXT = 'aa';

class RecoCreatePage extends Component {
  constructor(props) {
    super(props);
    this.loadedSuccess = true;
    this.state = {
      phonePattern: '',
      phoneCode: '',
      reco: {
        context: null,
        contextId: null,
        tempRecommender: '',
        recommenderInfo: '',
        responsibleId: null,
        items: [],
      },
      itemPhones: [],
      saveBtnDisabled: false,
      errors: {},
    };

    this.renderHeaderForm = this.renderHeaderForm.bind(this);
    this.addReco = this.addReco.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.validateAndSendData = this.validateAndSendData.bind(this);
    this.removeReco = this.removeReco.bind(this);
    this.handleItemChange = this.handleItemChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchGroupDealers();
    this.props.fetchRecoCategories();
    let context = this.props.match.params.context;
    let contextId = this.props.match.params.contextId;
    if (context) {
      context = context.toUpperCase();
    }
    if (context && contextId) {
      this.props
        .blankReco(context, contextId)
        .then(res => {
          this.setState({
            ...this.state,
            reco: res.data,
          });
        })
        .catch(e => {
          console.log(e);
        });
    }
    doGet(`crm2/phone/meta`)
      .then(({ data }) => {
        this.setState({
          ...this.state,
          phonePattern: data.pattern,
          phoneCode: data.code,
        });
      })
      .catch(e => {
        // handleError(e, dispatch);
      });
  }

  handleItemChange(fieldName, index, value) {
    let reco = Object.assign({}, this.state.reco);
    let items = reco['items'];
    let item = items[index] || {};

    switch (fieldName) {
      case 'phoneNumber1':
      case 'phoneNumber2':
        let displayName = 'displayPhone1';
        if (fieldName === 'phoneNumber2') {
          displayName = 'displayPhone2';
        }
        const phonePattern = this.state.phonePattern || '';
        const ppLenght = phonePattern.replace(/[^0-9]+/g, '').length;
        let v = value.replace(/[^0-9]+/g, '');
        if (v.length === 0) {
          item[displayName] = '';
          item[fieldName] = '';
        } else {
          let temp = '';
          let userCounter = 0;
          for (let k = 0; k < phonePattern.length; k++) {
            const userChar = v.charAt(userCounter);
            userCounter++;
            if (!userChar) {
              break;
            }

            const char = phonePattern.charAt(k);
            if (isNaN(char)) {
              temp += char;
              userCounter--;
            } else {
              temp += userChar;
            }
          }

          item[displayName] = temp;
          item[fieldName] = v.substring(0, ppLenght);
          if (
            item[fieldName].length === ppLenght &&
            typeof this.props.phoneErrors[item[fieldName]] === 'undefined'
          ) {
            this.props.checkPhoneNumber(reco['responsibleId'], item[fieldName]);
          }
        }

        break;

      default:
        item[fieldName] = value;
        break;
    }

    reco['items'][index] = item;

    this.setState({
      ...this.state,
      reco: reco,
    });
  }

  handleChange(e, data) {
    const { name, value } = data;
    let reco = Object.assign({}, this.state.reco);
    reco[name] = value;

    this.setState({
      ...this.state,
      reco: reco,
    });
  }

  handleChangeDate(m, index) {
    let { reco } = this.state;
    let item = reco['items'][index];
    if (m) {
      item['callDate'] = m.valueOf();
    } else {
      item['callDate'] = null;
    }

    reco['items'][index] = item;
    this.setState({
      ...this.state,
      reco: reco,
    });
  }

  addReco() {
    let { reco } = this.state;
    if (!reco['responsibleId']) {
      return;
    }

    let itemIndex = reco.items.length;
    let form = {
      clientName: '',
      district: '',
      profession: '',
      relative: '',
      callDate: null,
      callerIsDealer: 0,
      note: '',
      phoneNumber1: '',
      displayPhone1: '',
      phoneNumber2: '',
      displayPhone2: '',
      category: null,
      switchDate: 0,
    };

    reco['items'][itemIndex] = form;
    this.setState({
      ...this.state,
      reco: reco,
    });
  }

  renderRecoForms() {
    const { messages, locale } = this.props.intl;
    let { items } = this.state.reco;
    const { errors } = this.state;

    return items.map((item, index) => {
      return (
        <RecoCard
          categories={this.props.categories}
          messages={messages}
          locale={locale}
          handleChangeDate={this.handleChangeDate}
          itemPhones={this.state.itemPhones}
          phoneCode={this.state.phoneCode}
          phonePattern={this.state.phonePattern}
          handleChange={this.handleItemChange}
          removeReco={this.removeReco}
          key={index}
          item={item}
          phoneErrors={this.props.phoneErrors}
          loadingPhones={this.props.loadingPhones}
          recoErrors={this.props.recoErrors}
          index={index}
          errors={errors}
        />
      );
      //return this.renderRecoForm(item, index)
    });
  }

  validateAndSendData = e => {
    let _this = this;
    e.preventDefault();
    if (this.state.saveBtnDisabled) {
      return;
    }
    this.setState(
      {
        ...this.state,
        saveBtnDisabled: true,
      },
      () => {
        this.props
          .createRecoListNew(this.state.reco)
          .then(({ data }) => {
            this.setState({
              ...this.state,
              saveBtnDisabled: false,
            });
            window.location.pathname = '/crm2021/reco/current';
          })
          .catch(function(error) {
            let stateErrors = {};
            if (error && error.response && error.response.status) {
              if (400 === error.response.status) {
                stateErrors = error.response.data['messages'] || {};
              }
            }
            _this.setState({
              ..._this.state,
              saveBtnDisabled: false,
              errors: stateErrors,
            });
          });
      },
    );
    //this.refs.btn.setAttribute("disabled", "disabled")
  };

  renderError(error) {
    return <List items={error} />;
  }

  removeReco(index, id, message) {
    if (!window.confirm(message['Crm.ConfirmDelete'])) {
      return false;
    }
    let reco = Object.assign({}, this.state.reco);

    if (reco['items'][index]) {
      reco.items.splice(index, 1);

      this.setState({
        ...this.state,
        reco: reco,
        itemIndex: reco.items.length,
      });
    }
  }

  isArchive = () => {
    return (
      this.state.reco.contextId === null ||
      this.state.reco.context === DEFAULT_CONTEXT
    );
  };

  renderHeaderForm(messages) {
    const { errors } = this.state;
    return (
      <Form>
        <Form.Group widths="equal">
          <Form.Field>
            <label>{messages['Form.Dealer']}</label>
            <Dropdown
              name="responsibleId"
              error={
                !this.state.reco.responsibleId ||
                this.state.reco.responsibleId === null ||
                this.state.reco.responsibleId === 0
              }
              placeholder={messages['Crm.Select']}
              fluid
              selection
              search
              value={this.state.reco.responsibleId}
              selectOnBlur={false}
              options={this.props.dealers}
              onChange={this.handleChange}
            />
            <div style={{ color: 'red' }}>{errors['responsibleId']}</div>
          </Form.Field>

          <Form.Field>
            <label>{messages['Form.RecommenderFullName']}</label>
            <Form.Input
              error={
                !this.state.reco.tempRecommender ||
                this.state.reco.tempRecommender.length === 0
              }
              name="tempRecommender"
              value={this.state.reco.tempRecommender || ''}
              readOnly={this.state.reco.contextId > 0}
              onChange={this.handleChange}
            />
            <div style={{ color: 'red' }}>{errors['tempRecommender']}</div>
          </Form.Field>
          {this.state.reco.contextId > 0 ? (
            ''
          ) : (
            <Form.TextArea
              name="recommenderInfo"
              onChange={this.handleChange}
              label={messages['Form.RecommenderAddData']}
            />
          )}
        </Form.Group>
        <Button icon labelPosition="left" onClick={this.addReco}>
          <Icon name="plus" />
          {messages['Table.Add']}
        </Button>
        {this.state.reco.items.length}
        <Button
          //ref={btn => { this.btn = btn; }}
          disabled={this.state.saveBtnDisabled}
          onClick={this.validateAndSendData}
          primary
          floated="right"
        >
          {this.state.saveBtnDisabled
            ? messages['Form.Wait']
            : messages['Form.Save']}
        </Button>
        <div style={{ color: 'red', margin: 'auto', width: '200px' }}>
          {errors['items']}
        </div>
      </Form>
    );
  }

  render() {
    const { messages } = this.props.intl;
    return (
      <Container
        className={'pageStyle'}
        fluid
        style={{
          marginTop: '2em',
          marginBottom: '2em',
          paddingLeft: '2em',
          paddingRight: '2em',
        }}
      >
        <Segment padded size="small">
          <Label attached="top">
            <Header as="h3">
              {this.isArchive()
                ? messages['Form.CreatingRecoFromArchive']
                : messages['Form.CreatingReco']}
            </Header>
          </Label>
          {this.renderHeaderForm(messages)}
          <Divider />
          <Grid className="recoGrid">{this.renderRecoForms()}</Grid>
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    dealers: state.crmDemo2021.dealers,
    phoneErrors: state.crmReco2021.phoneErrors,
    loadingPhones: state.crmReco2021.loadingPhones,
    recoErrors: state.crmReco2021.recoErrors,
    categories: state.crmReco2021.recoCategories,
  };
};

export default connect(mapStateToProps, {
  notify,
  fetchGroupDealers,
  checkPhoneNumber,
  createRecoListNew,
  blankRecoItem,
  blankReco,
  fetchRecoCategories,
})(injectIntl(RecoCreatePage));
