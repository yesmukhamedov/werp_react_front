import React, { Component } from 'react'
import { Table, Input } from 'semantic-ui-react'

export default class extends Component {
    render() {
        return (
            <Table celled compact definition>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="9">
                </Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell>#</Table.HeaderCell>
                <Table.HeaderCell>Материал</Table.HeaderCell>
                <Table.HeaderCell>Описание</Table.HeaderCell>
                <Table.HeaderCell>Гарантия (в мес.)</Table.HeaderCell>
                <Table.HeaderCell />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>1</Table.Cell>
                <Table.Cell className="center aligned">
                  <div className="ui icon mini button">
                    <i className="plus icon" />
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="ui Input focus">
                    <Input placeholder="описание" type="text" />
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="ui Input focus">
                    <Input placeholder="гарантия" type="text" />
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="ui right floated mini icon button">
                    <i className="remove icon" />
                  </div>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
        </Table>
        )
    }
}
