import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Dropdown, Icon, Container, Header, Grid,Segment  } from 'semantic-ui-react';
import { Field } from 'redux-form';
import {
  DropdownFormField,
  TextAreaFormField,
  TextInputFormField,
} from '../../../utils/formFields';
class FcisHeader extends Component{

    
    render(){
        const {companyOptions, branchOptions} = this.props;
        console.log(this.props);
        // console.log(branchOptionsAll,'branchOptionsAll')
        // 
        // const branchOptions = branchOptionsAll[].map(item => {
        //     return {
        //         key: item.key,
        //         text: item.text,
        //         value: item.value
        //     }
            
        // });
        return(
            <Segment padded size="small">
            <Grid stackable>
              <Grid.Column width={3}>
              <Field
                  required
                  name="company"
                  component={DropdownFormField}
                  label="Компания"
                  opts={companyOptions}
                />
              <Field
                  required
                  name="branch"
                  component={DropdownFormField}
                  label="Компания"
                  opts={this.props.company ? this.props.branchOptions[this.props.company] : []}
                />  
              </Grid.Column>
              {/* <Grid.Column width={3}>
                <Field
                  // required
                  name="branch"
                  component={DropdownFormField}
                  label="Филиал"
                  opts={this.props.company ? this.props.branchOptions[this.props.company] : []}
                />
              </Grid.Column>
              <Grid.Column width={3}>
                <Field
                  name="state"
                  component={DropdownFormField}
                  label="Состояние"
                  opts={this.props.directories.stateOptions}
                />
              </Grid.Column>
              <Grid.Column width={2}>
                <Field
                  required
                  name="startDate"
                  label="с"
                  component={DatePickerFormField}
                />
              </Grid.Column>
              <Grid.Column width={2}>
                <Field
                  required
                  name="endDate"
                  label="до"
                  component={DatePickerFormField}
                />
              </Grid.Column>
              <Grid.Column width={2}>
                <Form.Group widths="equal">
                  <Form.Button
                    content="Поиск"
                    type="submit"
                    loading={submitting}
                    disabled={pristine || submitting}
                    style={
                      { marginTop: '1.6em', background: 'rgba(84,170,169, 1)', color: 'white' }}
                  />
                  <Form.Button
                    content="Сброс"
                    type="button"
                    disabled={pristine || submitting}
                    style={
                      { marginTop: '1.6em', background: 'rgba(84,170,169, 1)', color: 'white' }}
                    onClick={reset}
                  />
                </Form.Group>
              </Grid.Column> */}
            </Grid>
          </Segment>
        )
    }
}
function mapStateToProps(state)
{
    // console.log(state);
    return { companyOptions:state.userInfo.companyOptions
        ,branchOptions:state.userInfo.branchOptionsAll
        ,currencyList:state.f4.currencyList
    };
}

export default connect(mapStateToProps, { })(FcisHeader)