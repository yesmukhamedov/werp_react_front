import React, {Component} from 'react'
import {connect} from 'react-redux'
import {v4} from 'uuid'
import { Header, Container, Label, Icon, Form, Grid, Segment, Dropdown, Button, Divider, List } from 'semantic-ui-react'
import axios from 'axios'
import {ROOT_URL} from '../../../../utils/constants'
import { notify } from '../../../../general/notification/notification_action'
import RecoCard from './RecoCard'
import 'react-datepicker/dist/react-datepicker.css';
import '../css/recoStyles.css';
import {fetchGroupDealers} from '../../demo/actions/demoAction';
import {checkPhoneNumber,createRecoList,blankRecoItem} from '../actions/recoAction'
import { injectIntl } from 'react-intl'
require('moment/locale/ru');

const DEFAULT_CONTEXT = 'aa'


class RecoCreatePage extends Component {
  constructor (props) {
    super(props)
    this.loadedSuccess = true
    this.state = {
      reco: {
        context: this.props.match.params.context || DEFAULT_CONTEXT,
        contextId: this.props.match.params.contextId || 0,
        tempRecommender: '',
        recommenderInfo: '',
        responsibleId: 0,
        items: []
      },
      itemPhones: [],
        saveBtnDisabled: false
    }

    this.renderHeaderForm = this.renderHeaderForm.bind(this)
    this.addReco = this.addReco.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeDate = this.handleChangeDate.bind(this)
    this.validateAndSendData = this.validateAndSendData.bind(this)
    this.removeReco = this.removeReco.bind(this)
      this.handleItemChange = this.handleItemChange.bind(this)
  }

  componentWillMount () {
      this.props.fetchGroupDealers()
      let context = this.props.match.params.context
      let contextId = this.props.match.params.contextId
    axios.get(`${ROOT_URL}/api/crm/reco/create?context=` + (context || DEFAULT_CONTEXT) + `&contextId=` + (contextId || 0), {
      headers: {
        authorization: localStorage.getItem('token')}
    }).then((res) => {
      this.setState({
        ...this.state,
        reco: res.data
      })
    }).catch((e) => {
      console.log(e)
    })
  }

  handleItemChange (fieldName, id,value) {
    let reco = Object.assign({},this.state.reco)
    let item = {}
    let index = -1
    for(let k in reco['items']){
        if(reco['items'][k]['id'] === id){
            index = k
            item = reco['items'][k]
            break
        }
    }
    if(index < 0){
        return
    }

      switch (fieldName) {
          case 'phoneNumber1':
          case 'phoneNumber2':
              let displayName = 'displayPhone1'
              if(fieldName === 'phoneNumber2'){
                  displayName = 'displayPhone2'
              }
              const phonePattern = this.state.reco.phonePattern || '';
              const ppLenght = phonePattern.replace(/[^0-9]+/g, '').length;
              let v = value.replace(/[^0-9]+/g, '');
              if(v.length === 0){
                  item[displayName] = '';
                  item[fieldName] = '';
              } else {
                  let temp = '';
                  let userCounter = 0;
                  for(let k = 0; k < phonePattern.length; k++) {
                      const userChar = v.charAt(userCounter);
                      userCounter++;
                      if(!userChar){
                          break;
                      }

                      const char = phonePattern.charAt(k);
                      if(isNaN(char)) {
                          temp += char;
                          userCounter--;
                      }else{
                          temp += userChar;
                      }
                  }

                  item[displayName] = temp;
                  item[fieldName] = v.substring(0,ppLenght);
                  if(item[fieldName].length === ppLenght && typeof this.props.phoneErrors[item[fieldName]] === 'undefined'){
                      this.props.checkPhoneNumber(reco['responsibleId'],item[fieldName])
                  }
              }

              break

          default:
              item[fieldName] = value
              break
      }

      reco['items'][index] = item

    this.setState({
      ...this.state,
      reco: reco
    })
  }

  handleChange(e,data){
      const {name,value} = data
      let reco = Object.assign({},this.state.reco)
      reco[name] = value

      this.setState({
          ...this.state,
          reco: reco
      })
  }

    handleChangeDate(m,index){
        let {reco} = this.state;
        let item = reco['items'][index];
        if(m){
            item['callDate'] = m.valueOf();
        }else{
            item['callDate'] = null;
        }

    reco['items'][index] = item
    this.setState({
      ...this.state,
      reco: reco
    })
  }

  addReco () {
    let {reco} = this.state
      if(!reco['responsibleId'] || reco['responsibleId'] === null || reco['responsibleId'] === 0){
        return
      }
    let itemIndex = reco.items.length
    let form = {
      id: v4(),
      clientName: '',
      districtName: '',
      professionName: '',
      relativeName: '',
      callDate: null,
      callerIsDealer: 0,
      note: '',
      phoneNumber1: '',
        displayPhone1: '',
      phoneNumber2: '',
        displayPhone2: '',
      hasChild: 0,
      hasAnimal: 0,
      hasAllergy: 0,
      hasAsthma: 0,
      categoryId: 0,
      switchDate: 0
    }

    reco['items'][itemIndex] = form
    this.setState({
      ...this.state,
      reco: reco
    })
  }

  renderRecoForms () {
        const {messages} = this.props.intl
    let {items} = this.state.reco
    return items.map((item,index) => {
        return <RecoCard messages={messages} handleChangeDate={this.handleChangeDate}
                         itemPhones={this.state.itemPhones}
                         phoneCode={this.state.reco['phoneCode']}
                         phonePattern={this.state.reco['phonePattern']}
                         handleChange={this.handleItemChange}
                         removeReco={this.removeReco}
                         key={item.id} item={item}
                         phoneErrors={this.props.phoneErrors}
                         loadingPhones={this.props.loadingPhones}
                         recoErrors={this.props.recoErrors}
                         index={index}/>
      //return this.renderRecoForm(item, index)
    })
  }

  validateAndSendData = e => {
        e.preventDefault()
        if(this.state.saveBtnDisabled){
            return
        }
        this.setState({
            ...this.state,
            saveBtnDisabled: true
        })
      //this.refs.btn.setAttribute("disabled", "disabled")
      this.props.createRecoList({ ...this.state.reco },() => {
          this.setState({
              ...this.state,
              saveBtnDisabled: false
          })
      })
  }

  renderError (error) {
    return <List items={error} />
  }

  removeReco (index,id) {
    if (!window.confirm('Вы действительно хотите удалить рекомендацию №' + (index + 1))) {
      return false
    }
      let reco = Object.assign({}, this.state.reco)

    if (reco['items'][index]) {
      reco.items.splice(index, 1)

      this.setState({
        ...this.state,
        reco: reco,
        itemIndex: reco.items.length
      })
    }
  }

  isArchive = () => {
        return this.state.reco.contextId === 0 || this.state.reco.context === DEFAULT_CONTEXT
  }

  renderHeaderForm (messages) {
    return (
      <Form>
        <Form.Group widths='equal'>
          <Form.Field>
            <label>{messages['Form.Dealer']}</label>
            <Dropdown name='responsibleId'
              error={!this.state.reco.responsibleId || this.state.reco.responsibleId === null || this.state.reco.responsibleId === 0}
              placeholder='Выберите дилера'
              fluid selection search
              value={this.state.reco.responsibleId}
              selectOnBlur={false}
              options={this.props.dealers}
              onChange={this.handleChange} />
          </Form.Field>

          <Form.Input
              error={!this.state.reco.tempRecommender || this.state.reco.tempRecommender.length === 0}
            name='tempRecommender'
            value={this.state.reco.tempRecommender || ''}
            readOnly={this.state.reco.contextId > 0}
            onChange={this.handleChange} label={messages['Form.RecommenderFullName']} />
          {this.state.reco.contextId > 0 ? '' : <Form.TextArea name='recommenderInfo' onChange={this.handleChange} label={messages['Form.RecommenderAddData']} />}
        </Form.Group>
        <Button icon labelPosition='left' onClick={this.addReco}>
          <Icon name='plus' />
            {messages['Table.Add']}
        </Button>
          {this.state.reco.items.length}

        <Button
            //ref={btn => { this.btn = btn; }}
            disabled={this.state.saveBtnDisabled}
            onClick={this.validateAndSendData}
                primary floated='right'>
                {this.state.saveBtnDisabled ? messages['Form.Wait']:messages['Form.Save']}
            </Button>
      </Form>
    )
  }

  render () {
        const {messages} = this.props.intl
    return (
      <Container className={'pageStyle'} fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
        <Segment padded size='small'>
          <Label attached='top'><Header as='h3'>{this.isArchive()?messages['Form.CreatingRecoFromArchive']:messages['Form.CreatingReco']}</Header></Label>
          {this.renderHeaderForm(messages)}
          <Divider />
          <Grid className='recoGrid'>
            {this.renderRecoForms()}
          </Grid>
        </Segment>

      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      dealers:state.crmDemo.dealers,
      phoneErrors: state.crmReco.phoneErrors,
      loadingPhones: state.crmReco.loadingPhones,
      recoErrors: state.crmReco.recoErrors
  }
}

export default connect(mapStateToProps, {
    notify,fetchGroupDealers,checkPhoneNumber,createRecoList,
    blankRecoItem
})(injectIntl(RecoCreatePage))
