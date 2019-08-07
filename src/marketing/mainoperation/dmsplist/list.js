import React, { useState } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import matchSorter from 'match-sorter';
import { Form, Icon, Input, Button, Modal, Dropdown } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
require('moment/locale/ru');
require('moment/locale/tr');

export default function List(props) {
  const [uptModal, setUptModal] = useState(false);

  const {
    dynamicObject,
    messages,
    fOpen,
    companyOptions,
    dmsp,
    branchOptions,
    countryList,
  } = props;
  const updateRow = row => {
    props.selRow(row);
    setUptModal(!uptModal);
  };
  const cancelModal = () => {
    setUptModal(!uptModal);
  };
  const columns = [
    {
      Header: messages['code'],
      accessor: 'pmNumber',
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'сфера действий',
      accessor: 'pmScope',
      Cell: props => {
        const { value } = props;
        if (value === 'GEN') return <div>{'Внутри страны'}</div>;
        else if (value === 'COM') return <div>{'Внутри компании'}</div>;
        else if (value === 'REG') return <div>{'Внутри региона'}</div>;
        else return <div>{'Внутри филиала'}</div>;
      },
      width: 150,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: messages['bukrs'],
      accessor: 'bukrsName',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['bukrsName'] }),
      filterAll: true,
      width: 150,
      maxWidth: 200,
      minWidth: 100,
    },

    {
      Header: messages['country'],
      show: fOpen.countryfilter,
      accessor: 'countryName',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['countryName'] }),
      filterAll: true,
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: messages['region'],
      show: fOpen.regionfilter,
      accessor: 'regionName',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['regionName'] }),
      filterAll: true,
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: messages['brnch'],
      show: fOpen.brnchfilter,
      accessor: 'branchName',
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'Название промо-акций',
      accessor: 'name',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['name'] }),
      filterAll: true,
    },
    {
      Header: messages['dateStart'],
      accessor: 'dateStart',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['dateStart'] }),
      filterAll: true,
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: messages['dateEnd'],
      accessor: 'dateEnd',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['dateEnd'] }),
      filterAll: true,
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: messages['kind'],
      show: fOpen.kindfilter,
      accessor: 'type',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['type'] }),
      filterAll: true,
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: messages['matnr'] + '(' + messages['Product'] + ')',
      accessor: 'matnrName',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['matnrName'] }),
      filterAll: true,
    },
    {
      Header: messages['discount'],
      accessor: 'discount',
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: messages['bonus'],
      show: fOpen.bonusfilter,
      accessor: 'pmBonus',
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'from dealer',
      accessor: 'fromDealer',
      Cell: props => (
        <div>
          {props.original.fromDealer}&nbsp;
          <span>{props.original.fdCurrency}</span>
        </div>
      ),
      style: { textAlign: 'right' },
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['fromDealer'] }),
      filterAll: true,
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: messages['extraInfo'],
      show: fOpen.extraInfofilter,
      accessor: 'pmInfo',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['pmInfo'] }),
      filterAll: true,
    },
    {
      Header: 'Aктивна',
      accessor: 'isActive',
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Cell: props => (
        <Button onClick={updateRow.bind(this, props.original)}>
          <Icon name="edit" /> {messages['change']}
        </Button>
      ),
      width: 150,
      maxWidth: 200,
      minWidth: 100,
      sortable: false,
      filterable: false,
    },
  ];
  const onInputChange = (value, fieldName) => {
    props.onInputChange(value, fieldName);
  };
  const language = localStorage.getItem('language');

  const handleSubmit = e => {
    e.preventDefault();
    props.updateDmsplst();
    setUptModal(!uptModal);
  };
  const pmType = [
    { key: 1, text: messages['gift'], value: 1 },
    { key: 2, text: messages['discount'], value: 2 },
    { key: 3, text: messages['bonus'], value: 3 },
  ];
  return (
    <div>
      {dynamicObject.promolst === undefined ||
      dynamicObject.promolst.length == 0 ? (
        ''
      ) : (
        <ReactTable
          filterable
          columns={columns}
          data={dynamicObject.promolst}
          resolveData={data => data.map(row => row)}
          rowsText={messages['rowsText']}
          pageText={messages['pageText']}
          ofText={messages['ofText']}
          previousText={messages['previousText']}
          nextText={messages['nextText']}
          noDataText={messages['loadingText']}
        />
      )}
      {
        <Modal size="large" open={uptModal}>
          <Modal.Header>{messages['mainInfos']}</Modal.Header>
          <Modal.Content>
            <Form onSubmit={handleSubmit}>
              <div className="ui secondary segment">
                <Form.Group widths="equal">
                  <Form.Field
                    required
                    value={dmsp.pmNumber}
                    control={Input}
                    label={'Number'}
                    readOnly
                  />
                  <Form.Field
                    required
                    onChange={(e, o) => onInputChange(o, 'name')}
                    defaultValue={dmsp.name}
                    control={Input}
                    label={messages['promotion_name']}
                  />
                  <Form.Field>
                    <label>{'Active'} </label>
                    <Dropdown
                      fluid
                      search
                      selection
                      options={active}
                      value={dmsp.isActive}
                      onChange={(e, o) => onInputChange(o, 'isActive')}
                    />
                  </Form.Field>
                </Form.Group>
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
                      value={dmsp.region}
                      onChange={(e, o) => onInputChange(o, 'regionId')}
                      disabled={dmsp.pmScope === 'REG' ? false : true}
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
                    <label>{messages['bukrs']}</label>
                    <Dropdown
                      fluid
                      search
                      selection
                      options={getCompanyOptions(companyOptions)}
                      value={parseInt(dmsp.bukrs, 10)}
                      onChange={(e, o) => onInputChange(o, 'bukrs')}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>{messages['brnch']}</label>
                    <Dropdown
                      fluid
                      selection
                      search
                      value={dmsp.branchId}
                      options={getBranchOptions(branchOptions, dmsp.bukrs)}
                      onChange={(e, o) => onInputChange(o, 'branchId')}
                      disabled={dmsp.pmScope === 'INT' ? false : true}
                    />
                  </Form.Field>
                </Form.Group>
                {/*************************** third row */}
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
                  <Form.Field>
                    <label>
                      {messages['matnr']}({messages['Product']})
                    </label>
                    <Dropdown
                      fluid
                      search
                      selection
                      options={getMatnrs2(dynamicObject.matnrs2)}
                      value={dmsp.matnr}
                      onChange={(e, o) => onInputChange(o, 'matnr')}
                    />
                  </Form.Field>
                  <Form.Field
                    defaultValue={dmsp.discount}
                    control={Input}
                    label={messages['discount'] + ' %'}
                    onChange={(e, o) => onInputChange(o, 'discount')}
                  />
                </Form.Group>

                <Form.Group widths="equal">
                  <Form.Field
                    defaultValue={dmsp.bonus}
                    control={Input}
                    label={messages['bonus']}
                    onChange={(e, o) => onInputChange(o, 'bonus')}
                  />
                  <Form.Field
                    control={Input}
                    label={'От диллера'}
                    onChange={(e, o) => onInputChange(o, 'fromDealer')}
                    value={dmsp.fromDealer}
                  />
                  <Form.Field>
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

                <Form.Group widths="equal">
                  <Form.Field
                    control={Input}
                    label={messages['bktxt']}
                    onChange={(e, o) => onInputChange(o, 'pmInfo')}
                    defaultValue={dmsp.pmInfo}
                  />
                  <Form.Field>
                    <label>{messages['Form.DateFrom']}</label>
                    <DatePicker
                      autoComplete="off"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select" //timezone="UTC"
                      selected={
                        dmsp.dateStart
                          ? moment(dmsp.dateStart, 'DD-MM-YYYY')
                          : null
                      }
                      locale={language}
                      onChange={(e, o) => {
                        onInputChange(e, 'dateStart');
                      }}
                      dateFormat="DD.MM.YYYY"
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>{messages['Form.DateTo']}</label>
                    <DatePicker
                      autoComplete="off"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select" //timezone="UTC"
                      selected={
                        dmsp.dateEnd ? moment(dmsp.dateEnd, 'DD-MM-YYYY') : null
                      }
                      locale={language}
                      onChange={(e, o) => {
                        onInputChange(e, 'dateEnd');
                      }}
                      dateFormat="DD.MM.YYYY"
                    />
                  </Form.Field>
                </Form.Group>
              </div>
              <Button color="teal" floated="right">
                {messages['change']}
              </Button>

              <Button negative floated="right" onClick={cancelModal.bind(this)}>
                <Icon name="remove" /> {messages['cancel']}
              </Button>
              <br />
              <br />
            </Form>
          </Modal.Content>
        </Modal>
      }
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

const getBranchOptions = (brOptions, bukrs) => {
  const brachOptions = brOptions;
  if (!bukrs) {
    return [];
  }
  let out = brachOptions[bukrs].map(c => {
    return {
      key: parseInt(c.key, 10),
      text: `${c.text}`,
      value: parseInt(c.value, 10),
    };
  });
  return out;
};

const pmScope = [
  { key: 'GEN', text: 'Внутри страны', value: 'GEN' },
  { key: 'COM', text: 'Внутри компании', value: 'COM' },
  { key: 'REG', text: 'Внутри региона', value: 'REG' },
  { key: 'INT', text: 'Внутри филиала', value: 'INT' },
];

const active = [
  { key: 0, text: 'Not Active', value: 0 },
  { key: 1, text: 'Active', value: 1 },
];

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
      key: `${c.currency}`,
      text: `${c.currency}`,
      value: `${c.currency}`,
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
