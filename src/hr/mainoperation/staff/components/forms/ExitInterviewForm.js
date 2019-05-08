import React from 'react';
import { Form, Input, Button, TextArea } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

require('moment/locale/ru');

/**
 * Функция для рендеринга формы
 */

export default function ExitInterviewForm(props) {
  const {
    address,
    reasonOptions,
    feedbackOptions,
    stateOptions,
    cityOptions,
    regionOptions,
    addressTypeOptions,
    index,
    model,
  } = props;

  let staff = {};
  let nationalityOptions = [];
  return (
    <Form>
      <div className="ui segments">
        <div className="ui segment">
          <h3>Основные данные</h3>
        </div>
        <div className="ui secondary segment">
          <Form.Group widths="equal">
            <Form.Field>
              <label>ФИО сотрудника</label>
              <Button.Group>
                <Button
                  onClick={props.openStaffListModal}
                  content={
                    model['staffName'] && model['staffName'].length > 0
                      ? model['staffName']
                      : 'Не выбрано'
                  }
                  icon="search"
                  labelPosition="left"
                />
                <Button onClick={props.removeStaff} icon="remove" />
              </Button.Group>
            </Form.Field>

            <Form.Field
              value={model.branchName || ''}
              control={Input}
              readOnly={true}
              label="Филиал"
              placeholder="Филиал"
            />

            <Form.Field
              value={model.departmentName || ''}
              control={Input}
              readOnly={true}
              label="Отдел/Сектор"
              placeholder="Отдел/Сектор"
            />
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field
              value={model.departmentName || ''}
              control={Input}
              readOnly={true}
              label="Должность"
              placeholder="Должность"
            />

            <Form.Field
              value={model.begDate || ''}
              control={Input}
              readOnly={true}
              label="Дата начало"
              placeholder="Дата начало"
            />

            <Form.Field
              value={model.endDate || ''}
              control={Input}
              readOnly={true}
              label="Дата увольнения"
              placeholder="Дата увольнения"
            />
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field
              value={model.phoneNumber || ''}
              control={Input}
              name="phoneNumber"
              onChange={props.handleChange}
              label="Контактный номер"
              placeholder="Контактный номер"
            />

            <Form.Field required>
              <label>Дата обзвона</label>
              <DatePicker
                autoComplete="off"
                locale="ru"
                placeholderText="Дата обзвона"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                value={model.callDate ? model.callDate : null}
                //selected={model.callDate ? model.callDate : '2019-02-02'}
                onChange={v => props.handleDate('callDate', v)}
              />
            </Form.Field>

            <Form.Select
              name="reasonId"
              value={model.reasonId}
              label="Причина увольнения"
              options={reasonOptions}
              placeholder="Причина увольнения"
              onChange={props.handleChange}
            />
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Select
              name="feedbackStatus"
              value={model.feedbackStatus}
              label="Отзыв о компании"
              options={feedbackOptions}
              placeholder="Отзыв о компании"
              onChange={props.handleChange}
            />

            <Form.Field
              value={model.note || ''}
              control={TextArea}
              name="note"
              onChange={props.handleChange}
              label="Примечание"
              placeholder="Примечание"
            />

            <Form.Field
              value={model.suggestion || ''}
              control={TextArea}
              name="suggestion"
              onChange={props.handleChange}
              label="Предложение и пожелания"
              placeholder="Предложение и пожелания"
            />
          </Form.Group>
        </div>
      </div>
    </Form>
  );
}
