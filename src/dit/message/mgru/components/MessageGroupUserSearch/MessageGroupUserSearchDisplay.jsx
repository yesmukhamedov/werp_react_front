import { doGetCancelToken } from '../../../../../utils/apiActions';
import _ from 'lodash';
import React, { Component } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Field, reduxForm } from 'redux-form';
import {
  Dimmer,
  Form,
  Grid,
  Label,
  Loader,
  Search,
  Segment,
} from 'semantic-ui-react';
import { DropdownFormField } from '../../../../../utils/formFields';

const userSearchUrl = `${ROOT_URL}/api/mgru/users`;

class MessageGroupUserSearchDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      results: [],
      value: '',
      userId: '',
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
  }

  handleSearch(values) {
    // console.log("values: ", values);
    const { userId } = this.state;
    const paramsDict = {
      groupId: values.messageGroup !== -1 ? values.messageGroup : undefined,
      userId,
    };
    const params = _.map(paramsDict, (val, key) =>
      val ? `${key}=${val}` : val === false ? `${key}=${val}` : '',
    )
      .filter(param => param)
      .join('&');
    // console.log(params)
    return new Promise(resolve =>
      this.props.fetchMessageGroupUsers(params, resolve),
    );
  }

  resetSearch() {
    this.props.reset();
    this.resetComponent();
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: '', userId: '' });

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.title, userId: result.key });

  resultRenderer = ({ title }) => <Label content={title} />;

  handleSearchChange = (e, { value }) => {
    const paramsDict = {
      username: value,
    };
    const params = _.map(paramsDict, (val, key) =>
      val ? `${key}=${val}` : val === false ? `${key}=${val}` : '',
    )
      .filter(param => param)
      .join('&');
    this.setState({ isLoading: true, value, userId: '' });

    // cancel the previous request
    if (typeof this._source != typeof undefined) {
      this._source.cancel('Operation canceled due to new request.');
    }

    // save the new request for cancellation
    this._source = axios.CancelToken.source();

    const req = doGetCancelToken(
      `${userSearchUrl}?${params}`,
      this._source.token,
    );

    req
      .then(({ data }) => {
        const users = data.map((el, idx) => ({
          key: el.userId,
          title: el.userName,
          description: el.fio,
        }));
        this.setState({
          isLoading: false,
          results: users,
        });
      })
      .catch(error => {
        this.resetComponent();
        if (axios.isCancel(error)) {
          console.log('Request canceled', error);
        } else {
          console.log(error);
        }
      });
  };

  render() {
    const { formatMessage } = this.props.intl;
    const {
      reference,
      handleSubmit,
      submitting,
      pristine,
      reset,
      messages,
    } = this.props;
    const { isLoading, value, results } = this.state;
    const allOpt = {
      key: -1,
      text: formatMessage({ id: 'Select.All' }),
      value: -1,
    };
    if (reference) {
      return (
        <Form onSubmit={handleSubmit(this.handleSearch)}>
          <Form.Group widths="equal">
            <Field
              name="messageGroup"
              component={DropdownFormField}
              label={messages.L__GROUP}
              opts={
                reference
                  ? [allOpt, ...Object.values(reference.messgrOptions)]
                  : []
              }
            />
            <Form.Field>
              <label>{messages.L__USER}</label>
              <Search
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 800, {
                  leading: true,
                })}
                results={results}
                // value={value}
              />
            </Form.Field>
            <Form.Group widths="equal">
              <Form.Button
                content={messages.search}
                // content="Search"
                type="submit"
                loading={submitting}
                disabled={submitting}
                style={{
                  marginTop: '1.7em',
                  background: 'rgba(84,170,169, 1)',
                  color: 'white',
                }}
              />
              {/* <Form.Button
                    content={formatMessage(messages.reset)}
                    // content="Reset"
                    type="button"
                    disabled={submitting}
                    style={
                        { marginTop: '1.6em', background: 'rgba(84,170,169, 1)', color: 'white' }}
                    onClick={this.resetSearch}
                    /> */}
            </Form.Group>
          </Form.Group>
          {/* <Grid.Column width={10}>
                <Segment>
                    <pre style={{ overflowX: 'auto' }}>{JSON.stringify(this.state, null, 2)}</pre>
                </Segment>
            </Grid.Column> */}
        </Form>
      );
    }
    return (
      <Dimmer active inverted>
        <Loader inline="centered">Fetching directories..</Loader>
      </Dimmer>
    );
  }
}

MessageGroupUserSearchDisplay = reduxForm({
  form: 'messageGroupUserSearchDisplay',
})(MessageGroupUserSearchDisplay);

export default MessageGroupUserSearchDisplay;
