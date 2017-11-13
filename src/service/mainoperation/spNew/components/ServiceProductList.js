import React, { Component } from "react"
import { Table, Input } from 'semantic-ui-react'

export default class ServiceProductList extends Component {
  render() {
    return (
    <Table celled compact definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="9">
              {/* <div className="ui small disabled icon button">
                <i className="save icon" />
                Сохранить
              </div>

              <div className="ui right floated basic buttons">
                <div className="ui small icon button">
                  <i className="retweet icon" />
                  Сформировать
                </div>
                <div className="ui small icon button">
                  <i className="plus icon" />
                  Добавить
                </div>
              </div> */}
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>Операция</Table.HeaderCell>
            <Table.HeaderCell>Материал</Table.HeaderCell>
            <Table.HeaderCell>Описание</Table.HeaderCell>
            <Table.HeaderCell>Гарантия (в мес.)</Table.HeaderCell>
            <Table.HeaderCell>Цена</Table.HeaderCell>
            <Table.HeaderCell>Количество (шт.)</Table.HeaderCell>
            <Table.HeaderCell>Сумма</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>1</Table.Cell>
            <Table.Cell className="collapsing">
              <div className="ui selection dropdown">
                <Input name="gender" type="hidden" />
                <i className="dropdown icon" />
                <div className="default text">Выберите операцию</div>
                <div className="menu">
                  <div className="item" data-value="1">
                    Продажа_зап
                  </div>
                  <div className="item" data-value="0">
                    Услуга
                  </div>
                </div>
              </div>
            </Table.Cell>
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
              <div className="ui Input focus">
                <Input placeholder="цена" type="text" />
              </div>
            </Table.Cell>
            <Table.Cell>
              <div className="ui Input">
                <Input placeholder="кол-во" type="text" />
              </div>
            </Table.Cell>
            <Table.Cell>
              <div className="ui Input">
                <Input placeholder="сумма" type="text" />
              </div>
            </Table.Cell>
            <Table.Cell>
              <div className="ui right floated mini icon button">
                <i className="remove icon" />
              </div>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Footer className="full-widTable.HeaderCell">
          <Table.Row>
            <Table.HeaderCell colSpan="6" />
            <Table.HeaderCell>Итоги:</Table.HeaderCell>
            <Table.HeaderCell>0,00</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Footer>
    </Table>
    )
  }
}
