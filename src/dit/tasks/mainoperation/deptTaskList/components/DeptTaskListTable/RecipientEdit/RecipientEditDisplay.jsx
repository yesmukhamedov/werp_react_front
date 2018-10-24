import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Grid, Segment, Dimmer, Loader, Container, Header, Icon } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';
import { DropdownFormField, DatePickerFormField } from '../../../../../../../utils/formFields';
import { difference } from '../../../../../../../utils/helpers';

class RecipientEditDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskId: undefined,
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillMount() {
    const { id: taskId } = this.props.match.params;
    if (taskId) {
      this.props.fetchTaskById(taskId);
      this.setState({ taskId });
    }
  }

  handleFormSubmit(values, dispatch, props) {
    const dirtyFields = difference(values, props.initialValues);
    return new Promise(resolve =>
      this.props.editRecipient(this.state.taskId, dirtyFields, resolve));
  }

  render() {
    const { formatMessage } = this.props.intl;
    const {
      handleSubmit, pristine, submitting, reset, assigneeOptions, messages,
    } = this.props;
    if (assigneeOptions) {
      return (
        <Container
          style={{
            marginTop: '2em',
            marginBottom: '2em',
            paddingLeft: '2em',
            paddingRight: '2em',
          }}
        >
          <Form onSubmit={handleSubmit(this.handleFormSubmit)}>
            <Header
              attached="top"
              style={{
                background: 'rgba(227,232,238, 1)',
              }}
            >
              <Icon name="edit" />
              <Header.Content>
                {formatMessage(messages.editHeader)}
                <Header.Subheader>
                {formatMessage(messages.editSubheader)} <a>{this.state.taskId}</a>
                </Header.Subheader>
              </Header.Content>
            </Header>
            <Segment attached>
              <Grid stackable>
                <Grid.Row columns={3} style={{ marginTop: '2em', padding: '3px' }}>
                  <Grid.Column mobile={16} tablet={8} computer={6}>
                    <Form.Group widths="equal">
                      <Field
                        // required
                        name="recipient"
                        component={DropdownFormField}
                        label={formatMessage(messages.editRecipient)}
                        opts={assigneeOptions ? [{ key: -1, text: '', value: -1 }, ...assigneeOptions] : []}
                      />
                    </Form.Group>
                  </Grid.Column>
                  <Grid.Column mobile={16} tablet={8} computer={4}>
                    <Form.Group widths="equal">
                      <Field
                        autoComplete='off'
                        name="expectedEndDate"
                        label={formatMessage(messages.editExpEndDate)}
                        component={DatePickerFormField}
                      />
                    </Form.Group>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{ padding: '3px' }}>
                  <Grid.Column width={2} >
                    <Form.Group widths="equal">
                      <Form.Button
                        content="Изменить"
                        type="submit"
                        loading={submitting}
                        disabled={pristine || submitting}
                        style={
                          { background: 'rgba(84,170,169, 1)', color: 'white' }}
                      />
                      <Form.Button
                        content="Сброс"
                        type="button"
                        disabled={pristine || submitting}
                        style={
                          { background: 'rgba(84,170,169, 1)', color: 'white' }}
                        onClick={reset}
                      />
                    </Form.Group>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Form>
        </Container>
      );
    }
    return (
      <Dimmer active>
        <Loader indeterminate>Fetching directories..</Loader>
      </Dimmer>
    );
  }
}

RecipientEditDisplay = reduxForm({
  form: 'recipientEditDisplay',
  enableReinitialize: true,
})(RecipientEditDisplay);

export default RecipientEditDisplay;
