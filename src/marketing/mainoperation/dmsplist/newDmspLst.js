import React from 'react';
import 'react-table/react-table.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import {
  Header,
  Form,
  Segment,
  Dropdown,
  Input,
  Label,
  Button,
  Icon,
} from 'semantic-ui-react';

export default function List(props) {
  const onInputChange = (value, fieldName) => {
    props.onInputChange(value, fieldName);
  };

  const {
    messages,
    companyOptions,
    branchOptions,
    dmsp,
    dynDmsplst,
    countryList,
  } = props;
  const pmType = [
    { key: 1, text: messages['gift'], value: 1 },
    { key: 2, text: messages['discount'], value: 2 },
    { key: 3, text: messages['bonus'], value: 3 },
  ];
  const pmScope = [
    { key: 'gen', text: 'Внутри страны', value: 'gen' },
    { key: 'com', text: 'Внутри компании', value: 'com' },
    { key: 'reg', text: 'Внутри региона', value: 'reg' },
    { key: 'int', text: 'Внутри филиала', value: 'int' },
  ];
  console.log('dmsp ', dmsp);
  return (
    <div>
      <Segment padded size="small">
        <Label color="teal" ribbon>
          <Header as="h5" inverted color="black">
            {' '}
            {messages['sel_options']}
          </Header>
        </Label>
        <br />
        <br />
        <Form>
          <Form.Group widths="equal">
            <Form.Field required>
              <label>{'Cфера действия'} </label>
              <Dropdown
                fluid
                search
                selection
                options={pmScope}
                value={dmsp.pmscope}
                onChange={(e, o) => onInputChange(o, 'pmscope')}
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
                disabled={dmsp.pmscope === 'gen' ? false : true}
              />
            </Form.Field>
            <Form.Field>
              <label>{messages['region']} </label>
              <Dropdown
                fluid
                search
                selection
                options={getRegions(dynDmsplst.regions)}
                value={dmsp.regionId}
                onChange={(e, o) => onInputChange(o, 'regionId')}
                disabled={dmsp.pmscope === 'reg' ? false : true}
              />
            </Form.Field>
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field required>
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
                disabled={dmsp.pmscope === 'com' ? false : true}
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
            <Form.Field required>
              <label>
                {messages['matnr']} ({messages['Product']})
              </label>
              <Dropdown
                fluid
                search
                selection
                options={getMatnrs(dynDmsplst.matnrs)}
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
                options={getMatnrs2(dynDmsplst.matnrs2)}
                value={dmsp.matnr2}
                onChange={(e, o) => onInputChange(o, 'matnr2')}
              />
            </Form.Field>
            <Form.Field
              required
              control={Input}
              label={messages['discount']}
              onChange={(e, o) => onInputChange(o, 'discount')}
            />
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field
              required
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
                value={dmsp.waers}
                onChange={(e, o) => onInputChange(o, 'waers')}
              />
            </Form.Field>
          </Form.Group>

          <Form.Group>
            <Form.Field
              width={10}
              required
              control={Input}
              label={'Название промо акции'}
              onChange={(e, o) => onInputChange(o, 'pmName')}
            />
            <Form.Field>
              <label>{messages['Form.DateFrom']}</label>
              <DatePicker
                autoComplete="off"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select" //timezone="UTC"
                selected={dmsp.dateFrom ? moment(dmsp.dateFrom) : null}
                locale="ru"
                onChange={(e, o) => {
                  onInputChange(e, 'dateFrom');
                }}
                dateFormat="DD.MM.YYYY"
              />
            </Form.Field>
            <Form.Field>
              <label>{messages['Form.DateTo']}</label>
              <DatePicker
                className="date-100-width"
                autoComplete="off"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select" //timezone="UTC"
                selected={dmsp.dateTo ? moment(dmsp.dateTo) : null}
                locale="ru"
                onChange={(e, o) => {
                  onInputChange(e, 'dateTo');
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
        </Form>
      </Segment>
      <Button
        color="teal"
        floated="right"
        onClick={() => {
          props.saveForm();
        }}
      >
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
    </div>
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
