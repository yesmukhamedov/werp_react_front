import React, { Fragment, useState, useEffect } from 'react';
import {
  Segment,
  Header,
  Divider,
  Dropdown,
  Button,
  Icon,
  Grid,
  Input,
  Form,
} from 'semantic-ui-react';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
import format from 'string-format';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import OutputErrors from '../../../general/error/outputErrors';
import 'react-table/react-table.css';
import { clearDynObjService } from '../../serviceAction';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import {
  stringYYYYMMDDToMoment,
  momentToStringYYYYMMDD,
} from '../../../utils/helpers';

const Smappl = props => {
  const {
    companyPosition,
    clearDynObjService,
    intl: { messages },
    branchOptions,
  } = props;
  const [dropdownActive, setDropdownActive] = useState(false);
  const [error, setError] = useState([]);
  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');
  let queryString = 'bukrs=={0.bukrs};';

  const [search, setSearch] = useState({
    bukrs: 0,
    branch: 0,
    datefrom: momentToStringYYYYMMDD(moment()),
    dateTo: momentToStringYYYYMMDD(moment()),
  });

  let query = {
    search: format(queryString, { ...search }),
  };

  useEffect(() => {
    clearDynObjService();
  }, []);

  console.log(search);

  const onChange = (text, value) => {
    setSearch(prev => {
      const varTs = { ...prev };
      switch (text) {
        case 'bukrs':
          varTs.bukrs = value;
          break;
        case 'branch':
          varTs.branch = value;
          break;
        case 'datefrom':
          varTs.datefrom = value;
          break;
        case 'dateTo':
          varTs.dateTo = value;
          break;
        default:
          return varTs;
      }
      return varTs;
    });

    setDropdownActive(true);
  };

  const onSearch = () => {
    save();
  };

  const validate = () => {
    const errors = [];
    if (!dropdownActive) {
      errors.push(errorTable[`5${language}`]);
    }
    if (errors.length === 0) {
      console.log(query);
    }
    return errors;
  };

  const save = () => {
    let errors = [];
    errors = validate();
    setError(() => errors);
  };

  return (
    <Fragment>
      <Segment>
        <Divider hidden></Divider>
        <Header as="h2">
          {messages['service_requests']}
          <Button floated="right" color="teal">
            {messages['new_service']}
          </Button>
        </Header>
        <Divider />

        <Form>
          <Form.Group widths="equal">
            <Form.Select
              label={messages['bukrs']}
              clearable="true"
              selection
              options={companyPosition}
              placeholder={messages['bukrs']}
              onChange={(e, { value }) => onChange('bukrs', value)}
            />
            <Form.Select
              label={messages['Task.Branch']}
              clearable="true"
              selection
              options={search.bukrs ? branchOptions[search.bukrs] : []}
              placeholder={messages['Task.Branch']}
              onChange={(e, { value }) => onChange('branch', value)}
            />
            <Form.Select
              label={messages['product_category']}
              clearable="true"
              selection
              options={[]}
              placeholder={messages['product_category']}
              onChange={(e, { value }) => onChange('product', value)}
            />
            <Form.Select
              label={messages['L__ORDER_STATUS']}
              clearable="true"
              selection
              options={[]}
              placeholder={messages['L__ORDER_STATUS']}
              onChange={(e, { value }) => onChange('status', value)}
            />
            <Form.Select
              label={messages['type_of_application']}
              clearable="true"
              selection
              options={[]}
              placeholder={messages['type_of_application']}
              onChange={(e, { value }) => onChange('ApplicationType', value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Field>
              <label>{messages['Form.DateFrom']}</label>
              <DatePicker
                className="date-auto-width"
                autoComplete="off"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select" // timezone="UTC"
                selected={stringYYYYMMDDToMoment(search.datefrom)}
                locale={language}
                onChange={event =>
                  onChange('datefrom', momentToStringYYYYMMDD(event))
                }
                dateFormat="DD.MM.YYYY"
                placeholderText={messages['Form.DateFrom']}
              />
            </Form.Field>
            <Form.Field>
              <label>{messages['Form.DateTo']}</label>
              <DatePicker
                className="date-auto-width"
                autoComplete="off"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select" // timezone="UTC"
                selected={stringYYYYMMDDToMoment(search.datefrom)}
                locale={language}
                onChange={event =>
                  onChange('datefrom', momentToStringYYYYMMDD(event))
                }
                dateFormat="DD.MM.YYYY"
                placeholderText={messages['Form.DateTo']}
              />
            </Form.Field>

            <Form.Field control={Button} color="teal" style={{ marginTop: 24 }}>
              {messages['apply']}
            </Form.Field>
          </Form.Group>
        </Form>
        <OutputErrors errors={error} />
        <Divider></Divider>
        <Dropdown
          clearable="true"
          selection
          options={[]}
          placeholder={messages['columns']}
          onChange={(e, { value }) => onChange('columns', value)}
        />
        <ReactTableWrapper
          columns={[
            {
              Header: () => <div style={{ textAlign: 'center' }}>id</div>,
              accessor: 'id',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>
                  {messages['Task.Branch']} CN
                </div>
              ),
              accessor: 'bukrs',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>
                  {messages['productSerialNumber']}
                </div>
              ),
              accessor: 'Position',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>
                  {messages['TBL_H__PRODUCT']}
                </div>
              ),
              accessor: 'fc',
              Cell: row => <div style={{ textAlign: 'center' }}></div>,
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>
                  {messages['Application_Date']}
                </div>
              ),
              accessor: 'Position',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>
                  {messages['Form.Reco.RecoName']}
                </div>
              ),
              accessor: 'Position',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>
                  {messages['Table.Address']}
                </div>
              ),
              accessor: 'Position',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>{messages['Phone']}</div>
              ),
              accessor: 'Position',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>{messages['Masters']}</div>
              ),
              accessor: 'Position',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>
                  {messages['L__ORDER_STATUS']}
                </div>
              ),
              accessor: 'Position',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>
                  {messages['Operator']}
                </div>
              ),
              accessor: 'Position',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>
                  {messages['type_of_application']}
                </div>
              ),
              accessor: 'Position',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>
                  № {messages['Applications']}
                </div>
              ),
              accessor: 'Position',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>
                  {messages['service']} №
                </div>
              ),
              accessor: 'Position',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>
                  {messages['customer_story']}
                </div>
              ),
              accessor: 'fc',
              filterable: false,
              Cell: ({ row }) => (
                <div style={{ textAlign: 'center' }}>
                  <Button icon color="instagram">
                    <Icon name="id card outline"></Icon>
                  </Button>
                </div>
              ),
            },
          ]}
          defaultPageSize={15}
          pages={2}
          previousText={messages['Table.Previous']}
          nextText={messages['Table.Next']}
          showPagination={true}
          className="-striped -highlight"
          pageSizeOptions={[20, 30, 40]}
          loadingText={messages['Table.Next']}
          noDataText={messages['Table.NoData']}
          rowsText={messages['Table.Rows']}
          pageText={messages['Table.Page']}
          ofText={messages['Table.Of']}
        />
      </Segment>
    </Fragment>
  );
};

const mapStateToProps = state => {
  console.log(state);
  return {
    companyPosition: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsService,
  };
};

export default connect(mapStateToProps, {
  clearDynObjService,
})(injectIntl(Smappl));
