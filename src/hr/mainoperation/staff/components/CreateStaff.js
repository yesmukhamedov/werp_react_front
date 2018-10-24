import React, {Component} from 'react'
import {Container} from 'semantic-ui-react'
import StaffForm from './StaffForm'

class CreateStaff extends Component {
  render () {
    return (
      <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
        <h2>Добавление нового сотрудника</h2>
        <StaffForm />
      </Container>
    )
  }
}

export default CreateStaff
