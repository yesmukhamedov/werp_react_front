import React, {Component} from 'react'
import {Modal,Form, Input, TextArea, Button } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment'
import {fetchSingleVisit,createVisit,modalToggle,updateVisit,visitModalClearState} from '../actions/visitAction'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

class VisitCreateModal extends Component {
  constructor (props) {
    super(props)

    this.state = {
        localVisit:{
            id: -1
        },
        phoneNumberDisplay: '',
        phoneNumber: '',
        dealers: [],
        isUpdate: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.renderForm = this.renderForm.bind(this)
      this.saveVisit = this.saveVisit.bind(this)
  }

  renderForm (messages) {
      let localVisit = Object.assign({},this.state.localVisit)
      let client = Object.assign({},localVisit.client)
      const {phoneMeta} = this.props
      const {locale} = this.props.intl
      let hidePhoneInput = this.state.isUpdate || (client && client.id && typeof client.id !== 'undefined')
        return <Form>
          <Form.Group widths='equal'>
              {hidePhoneInput?'':<Form.Field>
                  <label>{messages['Form.PhoneNumber']}</label>
                  <Input
                      label={{ basic:true,content:phoneMeta.phoneCode}}
                      placeholder={phoneMeta.phonePattern}
                      onChange={(e,v) => this.handleChange('phoneNumber',v)}
                      value={this.state.phoneNumberDisplay || ''}/>
              </Form.Field>}

            <Form.Field value={localVisit.clientName || ''}
                        onChange={(e, v) => this.handleChange('clientName', v)}
                        control={Input}
                        required label={messages['Form.ClientFullName']} placeholder={messages['Form.ClientFullName']} />
          </Form.Group>

            <Form.Group widths='equal'>
                <Form.Field required>
                    <label>{messages['Form.Date']}</label>
                    <DatePicker
                        locale={locale}
                        label=''
                        placeholderText={messages['Form.Date']}
                        showMonthDropdown showYearDropdown dropdownMode='select'
                        dateFormat='DD.MM.YYYY' selected={localVisit.docDate ? moment(localVisit.docDate) : null}
                        onChange={(v) => this.handleChange('docDate', v)} />
                </Form.Field>

                <Form.Select
                    value={localVisit.visitorId}
                    required fluid selection
                    label={messages['Table.Visitor']} options={this.props.dealers}
                    onChange={(e, v) => this.handleChange('visitorId', v)} />

            </Form.Group>

          <Form.Group widths='equal'>
            <Form.Field control={TextArea}
              onChange={(e, o) => this.handleChange('address', o)}
              label={messages['Form.Address']} placeholder={messages['Form.Address']}
              value={localVisit.address || ''}
            />

              <Form.Field control={TextArea}
                          onChange={(e, o) => this.handleChange('note', o)}
                          label={messages['Table.Note']} placeholder={messages['Table.Note']}
                          value={localVisit.note || ''}
              />

          </Form.Group>

        </Form>
  }

  handleChange (fieldName, o) {
    let localVisit = Object.assign({}, this.state.localVisit)
      let client = Object.assign({},localVisit.client)
      let {phoneNumber,phoneNumberDisplay} = this.state
      const {phoneMeta} = this.props
    // console.log(o);
    switch (fieldName) {
      case 'docDate':
        if (o) {
            localVisit[fieldName] = o.valueOf()
        } else {
            localVisit[fieldName] = null
        }
        break

        case 'phoneNumber':
            let value = o.value
            const phonePattern = phoneMeta.phonePattern || '';
            const ppLenght = phonePattern.replace(/[^0-9]+/g, '').length;
            let v = value.replace(/[^0-9]+/g, '');
            if(v.length === 0){
                phoneNumber = ''
                phoneNumberDisplay = ''
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
                //console.log(phonePattern,temp)
                phoneNumberDisplay = temp;
                phoneNumber = v.substring(0, ppLenght)
            }

            break

      case 'clientName':
      case 'note':
      case 'address':
        case 'visitorId':
          localVisit[fieldName] = o.value
        break

        default:{}
    }

    this.setState({
      ...this.state,
        localVisit: localVisit,
        phoneNumber: phoneNumber,
        phoneNumberDisplay: phoneNumberDisplay
    })
  }

    componentWillReceiveProps (nextProps) {
        if(nextProps.visit.id !== this.state.localVisit.id){
            let localVisit = Object.assign({id: -1}, nextProps.visit);
            this.setState({
                ...this.state,
                localVisit: localVisit,
                phoneNumberDisplay: '',
                phoneNumber: '',
                isUpdate: localVisit.id && typeof localVisit.id !== 'undefined'
            })
        }
    }

    saveVisit(){
      let localVisit = Object.assign({},this.state.localVisit)
        let client = Object.assign({},localVisit.client)
        let phoneNumber = this.state.phoneNumber

        let phones = []
        if(phoneNumber){
          phones[0] = {phoneNumber: phoneNumber}
        }
        client['phones'] = phones
        localVisit['client'] = client

        if(this.state.isUpdate){
            this.props.updateVisit(localVisit,'view')
        }else{
            this.props.createVisit(localVisit)
        }
    }

    componentWillUnmount(){
        this.props.visitModalClearState()
    }

  render () {
    const {modalOpened} = this.props
      const {messages} = this.props.intl
    return (
      <Modal size={'small'} open={modalOpened}>
        <Modal.Header>{this.state.localVisit.id && this.state.localVisit.id > 0 ?messages['Form.Visit.Editing']:messages['Form.Visit.Creating']}</Modal.Header>
        <Modal.Content>
          {this.renderForm(messages)}
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => this.props.modalToggle(false)}>{messages['cancel']}</Button>
          <Button positive icon='checkmark'
                  onClick={this.saveVisit}
                  labelPosition='right' content={messages['Form.Save']} />
        </Modal.Actions>
      </Modal>
    )
  }
}



function mapStateToProps (state) {
    return {
        modalOpened: state.crmVisit.modalOpened,
        visit: state.crmVisit.visit,
        dealers: state.crmDemo.dealers,
        phoneMeta: state.crmReco.phoneMeta
    }
}

export default connect(mapStateToProps, {
    fetchSingleVisit,createVisit,modalToggle,updateVisit, visitModalClearState
})(injectIntl(VisitCreateModal))
