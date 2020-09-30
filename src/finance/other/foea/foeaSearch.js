import React, { useState, useEffect } from 'react';

import { Table, Button, Dropdown, Icon } from 'semantic-ui-react';

import SelectWithCheckBox from '../../../utils/Dropdown/selectWithCheckBox';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  stringYYYYMMDDToMoment,
  momentToStringYYYYMMDD,
} from '../../../utils/helpers';
import moment from 'moment';

require('moment/locale/ru');
require('moment/locale/tr');

const FoeaSearch = props => {
  const {
    messages = [],
    companyOptions = [],
    branchOptions = [],
    language,
    fetchingOutputTable = false,
    fetchOutputTable = () => {},
    types = [],
    statuses = [],
    changeFoeaSearchParamsAction = () => {},
  } = props;

  const {
    bukrs,
    bldatFrom,
    bldatTo,
    selectedBranches,
    selectedStatuses,
    selectedTypes,
  } = props.searchParams;

  // var date = new Date(),
  //   y = date.getFullYear(),
  //   m = date.getMonth();
  // var firstDay = new Date(y, m, 1);
  // var lastDay = new Date(y, m + 1, 0);

  // const [bukrs, setBukrs] = useState('');
  // const [bldatFrom, setBldatFrom] = useState(
  //   moment(firstDay).format('YYYY-MM-DD'),
  // );
  // const [bldatTo, setBldatTo] = useState(moment(lastDay).format('YYYY-MM-DD'));
  // const [selectedBranches, setSelectedBranches] = useState([]);
  // const [selectedStatuses, setSelectedStatues] = useState([]);
  // const [selectedTypes, setSelectedTypes] = useState([]);

  //componentDidMount
  useEffect(() => {
    // const [bukrs, setBukrs] = useState('');
    // const [bldatFrom, setBldatFrom] = useState(
    //   moment(firstDay).format('YYYY-MM-DD'),
    // );
    // const [bldatTo, setBldatTo] = useState(moment(lastDay).format('YYYY-MM-DD'));
    // const [selectedBranches, setSelectedBranches] = useState([]);
    // const [selectedStatuses, setSelectedStatues] = useState([]);
    // const [selectedTypes, setSelectedTypes] = useState([]);
    //unmount
    return () => {
      // clearAnyObject('CLEAR_FOEA');
    };
  }, []);

  return (
    <Table compact>
      <Table.Body>
        <Table.Row>
          <Table.Cell collapsing>
            <Icon name="folder" />
            {messages['bukrs']}
          </Table.Cell>
          <Table.Cell colSpan="2">
            <Dropdown
              fluid
              placeholder={messages['bukrs']}
              selection
              options={companyOptions || []}
              value={bukrs}
              onChange={(e, { value }) => {
                changeFoeaSearchParamsAction({
                  bukrs: value,
                  selectedBranches: [],
                });
              }}
            />
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell collapsing>
            <Icon name="browser" />
            {messages['brnch']}
          </Table.Cell>
          <Table.Cell colSpan="2">
            <SelectWithCheckBox
              listItem={branchOptions[bukrs]}
              onSelectDone={selBranchesFromChild =>
                changeFoeaSearchParamsAction({
                  selectedBranches: selBranchesFromChild
                    .map(element => element.value)
                    .join(),
                })
              }
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell collapsing>
            <Icon name="browser" />
            {messages['status']}
          </Table.Cell>
          <Table.Cell colSpan="2">
            <SelectWithCheckBox
              listItem={statuses}
              selection="single"
              onSelectDone={selStatusesFromChild =>
                changeFoeaSearchParamsAction({
                  selectedStatuses: selStatusesFromChild
                    .map(element => element.value)
                    .join(),
                })
              }
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell collapsing>
            <Icon name="browser" />
            {messages['type']}
          </Table.Cell>
          <Table.Cell colSpan="2">
            <SelectWithCheckBox
              listItem={types}
              onSelectDone={selTypesFromChild =>
                changeFoeaSearchParamsAction({
                  selectedTypes: selTypesFromChild
                    .map(element => element.value)
                    .join(),
                })
              }
            />
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell>{messages['bldat']}</Table.Cell>
          <Table.Cell>
            {messages['from']}
            <DatePicker
              className="date-auto-width"
              autoComplete="off"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select" // timezone="UTC"
              selected={stringYYYYMMDDToMoment(bldatFrom)}
              locale={language}
              onChange={event =>
                changeFoeaSearchParamsAction({
                  bldatFrom: momentToStringYYYYMMDD(event),
                })
              }
              dateFormat="DD.MM.YYYY"
            />
          </Table.Cell>
          <Table.Cell>
            {messages['to']}
            <DatePicker
              className="date-auto-width"
              autoComplete="off"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select" // timezone="UTC"
              selected={stringYYYYMMDDToMoment(bldatTo)}
              locale={language}
              onChange={event =>
                changeFoeaSearchParamsAction({
                  bldatTo: momentToStringYYYYMMDD(event),
                })
              }
              dateFormat="DD.MM.YYYY"
            />
          </Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.Cell />
          <Table.Cell colSpan="2">
            <Button
              icon
              labelPosition="left"
              primary
              size="small"
              loading={fetchingOutputTable}
              disabled={fetchingOutputTable}
              onClick={() => fetchOutputTable()}
            >
              <Icon name="search" size="large" />
              {messages['search']}
            </Button>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default FoeaSearch;
