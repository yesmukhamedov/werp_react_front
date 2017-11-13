import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'

export default class ServicePaymentDetails extends Component {
    render() {
        return (
            <div className="total-box">
            <div className="ui four column doubling grid">
              <div className="column">
                <div className="field">
                  <label>Сумма</label>
                  <Input name="sum" placeholder="" type="text" />
                </div>
                <div className="field">
                  <label>Скидка</label>
                  <Input name="discount" placeholder="" type="text" />
                </div>
                <div className="field">
                  <label>Сумма к оплате</label>
                  <Input name="total" placeholder="" type="text" />
                </div>
              </div>
              <div className="column">
                <div className="field">
                  <label>Премия Мастера</label>
                  <Input name="master-reward" placeholder="" type="text" />
                </div>
                <div className="field">
                  <label>Премия оператора</label>
                  <Input name="operator-reward" placeholder="" type="text" />
                </div>
              </div>
            </div>
          </div>
        )
    }
}