import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Form } from 'semantic-ui-react'
import {ROOT_URL, MONTH_OPTIONS} from '../../../utils/constants'

const currentDate = new Date()

class MonthF4 extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e, v) {
    this.props.handleChange(e, v)
  }

  render () {
    return (
      <Form.Select
        defaultValue={currentDate.getMonth() + 1}
        name='month' label='Месяц'
        options={MONTH_OPTIONS} placeholder='Месяц' onChange={this.handleChange} />
    )
  }
}

export default MonthF4
