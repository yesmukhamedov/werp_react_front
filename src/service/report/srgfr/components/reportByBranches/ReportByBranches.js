import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Form, Icon } from 'semantic-ui-react';
import DropdownClearable from '../../../../../utils/DropdownClearable';
import { f4FetchCountryList } from '../../../../../reference/f4/f4_action';
import OutputErrors from '../../../../../general/error/outputErrors';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  stringYYYYMMDDToMoment,
  momentToStringYYYYMMDD,
} from '../../../../../utils/helpers';
import { errorTableText } from '../../../../../utils/helpers';
import { fetchReportByBranches } from '../../srgfrAction';
import Table from './Table';
require('moment/locale/ru');

const ReportByBranches = props => {
  const {
    intl: { messages },
    language,
    countries = [],
    branches = [],
    companies = [],
    reportByBranches = [],
  } = props;

  const [filterParams, setFilterParams] = useState({
    bukrs: null,
    branchId: null,
    countryId: null,
    dateFrom: null,
    dateTo: null,
  });
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    props.f4FetchCountryList();
  }, []);

  const apply = () => {
    if (validation()) {
      props.fetchReportByBranches(filterParams);
    }
  };

  const validation = () => {
    const errors = [];

    if (filterParams.bukrs === null) {
      errors.push(errorTableText(5));
    }

    setErrors(errors);
    return errors.length === 0;
  };

  return (
    <>
      <Form>
        <Form.Group widths="equal">
          <Form.Field>
            <label>{messages['country']}</label>
            <DropdownClearable
              selection
              options={countries.map(item => {
                return {
                  key: item.countryId,
                  text: item.country,
                  value: item.countryId,
                };
              })}
              value={filterParams.countryId}
              placeholder={messages['country']}
              onChange={(e, { value }) =>
                setFilterParams({ ...filterParams, countryId: value })
              }
              handleClear={() =>
                setFilterParams({ ...filterParams, countryId: null })
              }
            />
          </Form.Field>

          <Form.Field required>
            <label>{messages['bukrs']}</label>
            <DropdownClearable
              selection
              options={companies ? companies : []}
              value={filterParams.bukrs}
              placeholder={messages['bukrs']}
              onChange={(e, { value }) =>
                setFilterParams({ ...filterParams, bukrs: value })
              }
              handleClear={() =>
                setFilterParams({
                  ...filterParams,
                  bukrs: null,
                  branchId: null,
                })
              }
            />
          </Form.Field>

          <Form.Field>
            <label>{messages['Task.Branch']}</label>
            <DropdownClearable
              selection
              options={filterParams.bukrs ? branches[filterParams.bukrs] : []}
              value={filterParams.branchId}
              placeholder={messages['Task.Branch']}
              onChange={(e, { value }) =>
                setFilterParams({ ...filterParams, branchId: value })
              }
              handleClear={() =>
                setFilterParams({ ...filterParams, branchId: null })
              }
            />
          </Form.Field>
        </Form.Group>

        <Form.Group className="spaceBetween">
          <div className="flexDirectionRow">
            <Form.Field className="marginRight">
              <label>{messages['Form.DateFrom']}</label>
              <DatePicker
                placeholderText={messages['Form.DateFrom']}
                isClearable
                className="date-auto-width"
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                selected={
                  filterParams.dateFrom === null
                    ? ''
                    : stringYYYYMMDDToMoment(filterParams.dateFrom)
                }
                onChange={date =>
                  setFilterParams({
                    ...filterParams,
                    dateFrom: momentToStringYYYYMMDD(date),
                  })
                }
                dateFormat="DD.MM.YYYY"
              />
            </Form.Field>

            <Form.Field className="marginRight">
              <label>{messages['Form.DateTo']}</label>
              <DatePicker
                placeholderText={messages['Form.DateTo']}
                isClearable
                className="date-auto-width"
                autoComplete="off"
                locale={language}
                dropdownMode="select" //timezone="UTC"
                selected={
                  filterParams.dateTo === null
                    ? ''
                    : stringYYYYMMDDToMoment(filterParams.dateTo)
                }
                onChange={date =>
                  setFilterParams({
                    ...filterParams,
                    dateTo: momentToStringYYYYMMDD(date),
                  })
                }
                dateFormat="DD.MM.YYYY"
              />
            </Form.Field>
            <Form.Button
              color="blue"
              className="alignBottom"
              onClick={() => apply()}
            >
              <Icon name="search" />
              {messages['apply']}
            </Form.Button>
          </div>
        </Form.Group>
      </Form>

      <OutputErrors errors={errors} />

      <Table data={reportByBranches} />
    </>
  );
};

const mapStateToProps = state => {
  return {
    language: state.locales.lang,
  };
};

export default connect(mapStateToProps, {
  f4FetchCountryList,
  fetchReportByBranches,
})(injectIntl(ReportByBranches));
