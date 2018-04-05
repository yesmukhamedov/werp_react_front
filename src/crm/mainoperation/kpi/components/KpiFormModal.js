import React, {Component} from 'react'
import {Modal, Form, Input, TextArea, Button } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import moment from 'moment'
import { connect } from 'react-redux'
import {toggleKpiSettingFormModal,createItem} from '../actions/kpiSettingAction'
import BukrsF4 from '../../../../reference/f4/bukrs/BukrsF4'
import BranchF4 from '../../../../reference/f4/branch/BranchF4'
import YearF4 from '../../../../reference/f4/date/YearF4'
import MonthF4 from '../../../../reference/f4/date/MonthF4'
import PositionF4 from '../../../../reference/f4/position/PositionF4'

class KpiFormModal extends Component {
  constructor (props) {
    super(props)

    this.state = {
        localItem:{},
      errors: {
        dealerId: false,
        resultId: false,
        reasonId: false,
        dateTime: false,
        clientName: false,
        address: false,
        locationId: false
      }
    }

    this.close = this.close.bind(this)
    this.renderUpdateForm = this.renderUpdateForm.bind(this)
    this.saveItem = this.saveItem.bind(this)
    this.handleDropdownChange = this.handleDropdownChange.bind(this)
      this.handleIndicatorChange = this.handleIndicatorChange.bind(this)
  }

  componentWillMount () {
  }

  renderUpdateForm () {
      let {localItem} = this.state
    return <Form>
      <Form.Group widths='equal'>
          <BukrsF4 handleChange={this.handleDropdownChange} />
          <BranchF4 search handleChange={this.handleDropdownChange} bukrs={this.state.localItem.bukrs || ''} />
          <YearF4 handleChange={this.handleDropdownChange} />
          <MonthF4 handleChange={this.handleDropdownChange} />
          <PositionF4 handleChange={this.handleDropdownChange} />
      </Form.Group>

        {this.renderIndicators(localItem.items || [])}
    </Form>
  }

  renderIndicators(items){
      return items.map((item,idx) => {
          return <Form.Group widths='equal' key={idx}>
              <Form.Select name='indicatorId'
                           label='Индикатор' value={item.indicatorId} options={this.props.indicatorOptions}
                           placeholder='Индикатор' onChange={(e,o) => this.handleIndicatorChange('indicatorId',idx,o)} />
              <Form.Input onChange={(e,o) => this.handleIndicatorChange('value',idx,o)} name="value" label='План' type='number' />
              <Form.Input onChange={(e,o) => this.handleIndicatorChange('point',idx,o)} name="point" label='Балл' type='number' />
          </Form.Group>
      })
  }

  handleIndicatorChange(fieldName,key,o){
      let localItem = Object.assign({}, this.state.localItem);
      let items = localItem['items']
      if(items[key]){
          let item = items[key]
          switch (fieldName){
              case 'indicatorId':
              case 'value':
              case 'point':
                  item[fieldName] = o.value
                  break

              default:
                  break
          }

          items[key] = item
      }else{
          console.log('NO')
      }

      localItem['items'] = items
      this.setState({
          ...this.state,
          localItem: localItem
      })
  }

    handleDropdownChange (e,o) {
      const {name,value} = o
        console.log('ss')
      let localItem = Object.assign({}, this.state.localItem);
        switch (name){
            case 'bukrs':
            case 'year':
            case 'month':
                localItem[name] = value
            break

            case 'position':
                localItem['positionId'] = value
                break

            case 'branch':
                localItem['branchId'] = value
                break
            default:{}
    }

    this.setState({
        ...this.state,
        localItem: localItem
    })
  }

  componentWillReceiveProps (props) {
      if(props.item !== this.state.localItem){
          let localItem = Object.assign({}, this.props.item);
          console.log(localItem)
          this.setState({
              ...this.state,
              localItem: localItem
          })
      }
  }

  saveItem () {
    this.props.createItem(this.state.localItem)
  }

  close () {
    this.props.toggleKpiSettingFormModal(false)
  }

  render () {
    const {open} = this.props
    return (
      <Modal size={'large'} open={open}>
        <Modal.Header>Добавление/Редактирование KPI настройки</Modal.Header>
        <Modal.Content>
          {this.renderUpdateForm()}
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => this.props.toggleKpiSettingFormModal(false)}>Отмена</Button>
          <Button positive icon='checkmark' onClick={this.saveItem} labelPosition='right' content='Сохранить' />
        </Modal.Actions>
      </Modal>
    )
  }
}

function mapStateToProps (state) {
    return {
        open:state.crmKpiSetting.openKpiFormModal,
        item:state.crmKpiSetting.item,
        indicators:state.crmKpiSetting.indicators,
        indicatorOptions:state.crmKpiSetting.indicatorOptions
    }
}

export default connect(mapStateToProps, {toggleKpiSettingFormModal,createItem})(KpiFormModal)
