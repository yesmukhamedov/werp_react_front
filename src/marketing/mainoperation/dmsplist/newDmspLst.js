import React from 'react';
import 'react-table/react-table.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { Form, Dropdown, Input, Button, Icon } from 'semantic-ui-react';
import OutputErrors from '../../../general/error/outputErrors';

export default function List(props) {
  const onInputChange = (value, fieldName) => {
    props.onInputChange(value, fieldName);
  };

  const {
    messages,
    companyOptions,
    branchOptions,
    dmsp,
    dynamicObject,
    countryList,
    errors,
  } = props;
  if (dmsp.dateStart === undefined || null) {
    let date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    let firstDay = new Date(y, m, 1);
    let lastDay = new Date(y, m + 1, 0);
    dmsp['dateStart'] = moment(firstDay).format('DD.MM.YYYY');
    dmsp['dateEnd'] = moment(lastDay).format('DD.MM.YYYY');
  }
  const pmType = [
    { key: 1, text: messages['gift'], value: 1 },
    { key: 2, text: messages['discount'], value: 2 },
    { key: 3, text: messages['bonus'], value: 3 },
  ];

  const pmScope = [
    { key: 'GEN', text: 'Внутри страны', value: 'GEN' },
    { key: 'COM', text: 'Внутри компании', value: 'COM' },
    { key: 'REG', text: 'Внутри региона', value: 'REG' },
    { key: 'INT', text: 'Внутри филиала', value: 'INT' },
  ];

  const handleSubmit = e => {
    e.preventDefault();
    props.saveForm();
    props.handleClose();
  };
  return (
    <Form onSubmit={handleSubmit}>
      <div className="ui segments">
        <div className="ui segment"></div>
        <div className="ui secondary segment">
          <Form.Group widths="equal">
            <Form.Field required>
              <label>{'Cфера действия'} </label>
              <Dropdown
                fluid
                search
                selection
                options={pmScope}
                value={dmsp.pmScope}
                onChange={(e, o) => onInputChange(o, 'pmScope')}
              />
            </Form.Field>
            <Form.Field>
              <label>{messages['country']}</label>
              <Dropdown
                fluid
                search
                selection
                options={getCountryOptions(countryList)}
                value={dmsp.countryId}
                onChange={(e, o) => onInputChange(o, 'countryId')}
                disabled={dmsp.pmScope === 'GEN' ? false : true}
              />
            </Form.Field>
            <Form.Field>
              <label>{messages['region']} </label>
              <Dropdown
                fluid
                search
                selection
                options={getRegions(dynamicObject.regions)}
                value={dmsp.regionId}
                onChange={(e, o) => onInputChange(o, 'regionId')}
                disabled={dmsp.pmScope === 'REG' ? false : true}
              />
            </Form.Field>
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field>
              <label>{messages['kind']}</label>
              <Dropdown
                fluid
                search
                selection
                options={pmType}
                value={dmsp.pmType}
                onChange={(e, o) => onInputChange(o, 'pmType')}
              />
            </Form.Field>
            <Form.Field>
              <label>{messages['L__COMPANY']}</label>
              <Dropdown
                fluid
                search
                selection
                options={getCompanyOptions(companyOptions)}
                value={dmsp.bukrs}
                onChange={(e, o) => onInputChange(o, 'bukrs')}
                disabled={dmsp.pmScope === 'COM' ? false : true}
              />
            </Form.Field>
            <Form.Field>
              <label>{messages['brnch']}</label>
              <Dropdown
                fluid
                search
                selection
                options={dmsp.bukrs ? branchOptions[dmsp.bukrs] : []}
                value={dmsp.branchId}
                onChange={(e, o) => onInputChange(o, 'branchId')}
                disabled={dmsp.bukrs ? false : true}
              />
            </Form.Field>
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field>
              <label>
                {messages['matnr']} ({messages['Product']})
              </label>
              <Dropdown
                fluid
                search
                selection
                options={getMatnrs(dynamicObject.matnrs)}
                value={dmsp.matnr}
                onChange={(e, o) => onInputChange(o, 'matnr')}
              />
            </Form.Field>
            <Form.Field required>
              <label>
                {messages['matnr']}({messages['Product']})
              </label>
              <Dropdown
                fluid
                search
                selection
                options={getMatnrs2(dynamicObject.matnrs2)}
                value={dmsp.matnr2}
                onChange={(e, o) => onInputChange(o, 'matnr2')}
              />
            </Form.Field>
            <Form.Field
              control={Input}
              label={messages['discount']}
              onChange={(e, o) => onInputChange(o, 'discount')}
            />
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label={messages['bonus'] + ' %'}
              onChange={(e, o) => onInputChange(o, 'bonus')}
            />
            <Form.Field
              required
              control={Input}
              label={'От диллера'}
              onChange={(e, o) => onInputChange(o, 'fromDealer')}
            />
            <Form.Field required>
              <label>{messages['waers']}</label>
              <Dropdown
                fluid
                search
                selection
                options={getWaers(countryList)}
                value={dmsp.fdCurrency}
                onChange={(e, o) => onInputChange(o, 'fdCurrency')}
              />
            </Form.Field>
          </Form.Group>

          <Form.Group>
            <Form.Field
              required
              width={10}
              control={Input}
              label={'Название промо акции'}
              onChange={(e, o) => onInputChange(o, 'name')}
            />
            <Form.Field required>
              <label>{messages['Form.DateFrom']}</label>
              <DatePicker
                autoComplete="off"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select" //timezone="UTC"
                selected={
                  dmsp.dateStart ? moment(dmsp.dateStart, 'DD-MM-YYYY') : null
                }
                locale="ru"
                onChange={(e, o) => {
                  onInputChange(e, 'dateStart');
                }}
                dateFormat="DD.MM.YYYY"
              />
            </Form.Field>
            <Form.Field required>
              <label>{messages['Form.DateTo']}</label>
              <DatePicker
                className="date-100-width"
                autoComplete="off"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select" //timezone="UTC"
                selected={
                  dmsp.dateEnd ? moment(dmsp.dateEnd, 'DD-MM-YYYY') : null
                }
                locale="ru"
                onChange={(e, o) => {
                  onInputChange(e, 'dateEnd');
                }}
                dateFormat="DD.MM.YYYY"
              />
            </Form.Field>
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label={messages['bktxt']}
              onChange={(e, o) => onInputChange(o, 'pmInfo')}
            />
          </Form.Group>
        </div>
      </div>
      <OutputErrors errors={errors} />
      <Button color="teal" floated="right">
        <Icon name="checkmark" />
        {messages['Form.Save']}
      </Button>
      <Button
        negative
        floated="right"
        onClick={() => {
          props.handleClose();
        }}
      >
        <Icon name="remove" />
        {messages['BTN__CANCEL']}
      </Button>
      <br />
      <br />
    </Form>
  );
}

const getCompanyOptions = compOptions => {
  const companyOptions = compOptions;
  if (!companyOptions) {
    return [];
  }
  let out = companyOptions.map(c => {
    return {
      key: parseInt(c.key, 10),
      text: `${c.text}`,
      value: parseInt(c.value, 10),
    };
  });
  return out;
};

const getMatnrs = matnrs => {
  const mat = matnrs;
  if (!mat) {
    return [];
  }
  let out = mat.map(c => {
    return {
      key: parseInt(c.matnr, 10),
      text: `${c.text45}`,
      value: parseInt(c.matnr, 10),
    };
  });
  return out;
};

const getMatnrs2 = matnrs => {
  const mat = matnrs;
  if (!mat) {
    return [];
  }
  let out = mat.map(c => {
    return {
      key: parseInt(c.matnr, 10),
      text: `${c.text45}`,
      value: parseInt(c.matnr, 10),
    };
  });
  return out;
};

const getCountryOptions = countryList => {
  const countryLst = countryList;
  if (!countryLst) {
    return [];
  }
  let out = countryLst.map(c => {
    return {
      key: parseInt(c.countryId, 10),
      text: `${c.country}`,
      value: parseInt(c.countryId, 10),
    };
  });
  return out;
};

const getWaers = countryList => {
  const countryLst = countryList;
  if (!countryLst) {
    return [];
  }
  let out = countryLst.map(c => {
    return {
      key: parseInt(c.countryId, 10),
      text: `${c.currency}`,
      value: parseInt(c.countryId, 10),
    };
  });
  return out;
};

const getRegions = regions => {
  const regionLst = regions;
  if (!regionLst) {
    return [];
  }
  let out = regionLst.map(c => {
    return {
      key: parseInt(c.branch_id, 10),
      text: `${c.text45}`,
      value: parseInt(c.branch_id, 10),
    };
  });
  return out;
};
