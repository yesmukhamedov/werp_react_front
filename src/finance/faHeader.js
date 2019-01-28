import React, { PureComponent } from 'react';
import {
  Table,
  Dropdown,
  Icon,
  Grid,
  Segment,
  Input,
  Checkbox,
  TextArea,
  Label,
} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import './fa.css';
import { injectIntl } from 'react-intl';
import { messages } from '../locales/defineMessages';

require('moment/locale/ru');
require('moment/locale/tr');

class FaHeader extends PureComponent {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
  }
  onInputChange(value, stateFieldName) {
    const wabkpf = Object.assign({}, this.props.bkpf);
    if (stateFieldName === 'official') {
      wabkpf[stateFieldName] = !wabkpf[stateFieldName];
    } else if (stateFieldName === 'waers') {
      let waRate = 0;
      waRate = this.props.exRateNational
        ? this.props.exRateNational[value]
          ? this.props.exRateNational[value]
          : 0
        : 0;
      if (value === 'USD') {
        waRate = 1;
      }
      if (waRate === null || waRate === undefined) {
        waRate = 0;
      }
      wabkpf.kursf = waRate;
      wabkpf[stateFieldName] = value;
    } else if (stateFieldName === 'budat' || stateFieldName === 'bldat') {
      if (value !== null && value !== undefined) {
        wabkpf[stateFieldName] = value.format('DD.MM.YYYY');
      } else wabkpf[stateFieldName] = '';
    } else if (stateFieldName === 'bukrs') {
      wabkpf[stateFieldName] = value;
      wabkpf['brnch'] = '';
    } else {
      wabkpf[stateFieldName] = value;
    }

    this.props.changefaBkpf(wabkpf);
  }

  render() {
    // console.log(this.props)
    const {
      companyOptions,
      branchOptions,
      departmentOptions,
      businessAreaOptions,
      currencyOptions,
    } = this.props;

    const { formatMessage } = this.props.intl;
    const language = localStorage.getItem('language');
    // let wabkpf = Object.assign({}, this.props.bkpf);

    const {
      bukrs,
      brnch,
      business_area_id,
      dep,
      budat,
      bldat,
      blart,
      waers,
      kursf,
      bktxt,
      official,
      zreg,
    } = this.props.bkpf;

    const {
      bukrsInfo,
      brnchInfo,
      business_area_idInfo,
      depInfo,
      budatInfo,
      bldatInfo,
      blartInfo,
      waersInfo,
      kursfInfo,
      bktxtInfo,
      officialInfo,
      zregInfo,
    } = this.props.bkpfInfo;

    return (
      <Segment padded size="small">
        <Label color="blue" ribbon>
          {formatMessage(messages.header)}
        </Label>
        <Grid columns={3} stackable>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={16} computer={5}>
              <Table collapsing className="borderLess">
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Icon name="folder" /> {formatMessage(messages.bukrs)}
                    </Table.Cell>
                    <Table.Cell>
                      <Dropdown
                        placeholder={formatMessage(messages.bukrs)}
                        selection
                        options={companyOptions ? companyOptions : []}
                        value={bukrs}
                        onChange={(e, { value }) =>
                          this.onInputChange(value, 'bukrs')
                        }
                        readOnly={
                          bukrsInfo
                            ? bukrsInfo.readOnly
                              ? bukrsInfo.readOnly
                              : false
                            : false
                        }
                        disabled={
                          bukrsInfo
                            ? bukrsInfo.disabled
                              ? bukrsInfo.disabled
                              : false
                            : false
                        }
                      />
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Icon name="browser" />
                      {formatMessage(messages.brnch)}
                    </Table.Cell>
                    <Table.Cell>
                      <Dropdown
                        placeholder={formatMessage(messages.brnch)}
                        search
                        selection
                        options={
                          branchOptions
                            ? branchOptions[bukrs]
                              ? branchOptions[bukrs]
                              : []
                            : []
                        }
                        value={brnch}
                        onChange={(e, { value }) =>
                          this.onInputChange(value, 'brnch')
                        }
                        disabled={
                          brnchInfo
                            ? brnchInfo.disabled
                              ? brnchInfo.disabled
                              : false
                            : false
                        }
                      />
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Icon name="browser" />
                      {formatMessage(messages.business_area)}
                    </Table.Cell>
                    <Table.Cell>
                      <Dropdown
                        placeholder={formatMessage(messages.business_area)}
                        search
                        selection
                        options={
                          bukrs
                            ? businessAreaOptions
                              ? businessAreaOptions[bukrs]
                                ? businessAreaOptions[bukrs]
                                : []
                              : []
                            : []
                        }
                        value={business_area_id}
                        onChange={(e, { value }) =>
                          this.onInputChange(value, 'business_area_id')
                        }
                        disabled={
                          business_area_idInfo
                            ? business_area_idInfo.disabled
                              ? business_area_idInfo.disabled
                              : false
                            : false
                        }
                      />
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>{formatMessage(messages.official)}</Table.Cell>
                    <Table.Cell>
                      <Checkbox
                        checked={official}
                        onChange={(e, { value }) =>
                          this.onInputChange(value, 'official')
                        }
                        readOnly={
                          officialInfo
                            ? officialInfo.readOnly
                              ? officialInfo.readOnly
                              : false
                            : false
                        }
                        disabled={
                          officialInfo
                            ? officialInfo.disabled
                              ? officialInfo.disabled
                              : false
                            : false
                        }
                      />
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={5}>
              <Table collapsing className="borderLess">
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Icon name="browser" /> {formatMessage(messages.dep)}
                    </Table.Cell>
                    <Table.Cell>
                      <Dropdown
                        placeholder={formatMessage(messages.dep)}
                        search
                        selection
                        options={departmentOptions ? departmentOptions : []}
                        value={dep}
                        onChange={(e, { value }) =>
                          this.onInputChange(value, 'dep')
                        }
                        disabled={
                          depInfo
                            ? depInfo.disabled
                              ? depInfo.disabled
                              : false
                            : false
                        }
                      />
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Icon name="dollar" />
                      {formatMessage(messages.waers)}
                    </Table.Cell>
                    <Table.Cell>
                      <Dropdown
                        placeholder={formatMessage(messages.waers)}
                        search
                        selection
                        options={currencyOptions || []}
                        value={waers}
                        onChange={(e, { value }) =>
                          this.onInputChange(value, 'waers')
                        }
                        disabled={
                          waersInfo
                            ? waersInfo.disabled
                              ? waersInfo.disabled
                              : false
                            : false
                        }
                      />
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Icon name="exchange" />
                      {formatMessage(messages.kursf)}
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                        value={kursf}
                        placeholder={formatMessage(messages.kursf)}
                        onChange={(e, { value }) =>
                          this.onInputChange(value, 'kursf')
                        }
                        readOnly={
                          kursfInfo
                            ? kursfInfo.readOnly
                              ? kursfInfo.readOnly
                              : false
                            : false
                        }
                        disabled={
                          kursfInfo
                            ? kursfInfo.disabled
                              ? kursfInfo.disabled
                              : false
                            : false
                        }
                      />
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Icon name="wordpress forms" />
                      {formatMessage(messages.zreg)}
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                        value={zreg}
                        maxLength="10"
                        placeholder={formatMessage(messages.zreg)}
                        onChange={(e, { value }) =>
                          this.onInputChange(value, 'zreg')
                        }
                        readOnly={
                          zregInfo
                            ? zregInfo.readOnly
                              ? zregInfo.readOnly
                              : false
                            : false
                        }
                        disabled={
                          zregInfo
                            ? zregInfo.disabled
                              ? zregInfo.disabled
                              : false
                            : false
                        }
                      />
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={5}>
              <Table collapsing className="borderLess">
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Icon name="square outline" />
                      {formatMessage(messages.blart)}
                    </Table.Cell>
                    <Table.Cell>
                      <Input
                        value={blart}
                        placeholder={formatMessage(messages.blart)}
                        readOnly={
                          blartInfo
                            ? blartInfo.readOnly
                              ? blartInfo.readOnly
                              : false
                            : false
                        }
                        disabled={
                          blartInfo
                            ? blartInfo.disabled
                              ? blartInfo.disabled
                              : false
                            : false
                        }
                      />
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Icon name="calendar" />
                      {formatMessage(messages.budat)}
                    </Table.Cell>
                    <Table.Cell>
                      <DatePicker
                        className="date-auto-width"
                        autoComplete="off"
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select" // timezone="UTC"
                        selected={budat ? moment(budat, 'DD.MM.YYYY') : ''}
                        locale={language}
                        onChange={event => this.onInputChange(event, 'budat')}
                        dateFormat="DD.MM.YYYY"
                        readOnly={
                          budatInfo
                            ? budatInfo.readOnly
                              ? budatInfo.readOnly
                              : false
                            : false
                        }
                        disabled={
                          budatInfo
                            ? budatInfo.disabled
                              ? budatInfo.disabled
                              : false
                            : false
                        }
                      />
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Icon name="calendar" />
                      {formatMessage(messages.bldat)}
                    </Table.Cell>
                    <Table.Cell>
                      <DatePicker
                        className="date-auto-width"
                        autoComplete="off"
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select" // timezone="UTC"
                        selected={bldat ? moment(bldat, 'DD.MM.YYYY') : ''}
                        locale={language}
                        onChange={event => this.onInputChange(event, 'bldat')}
                        dateFormat="DD.MM.YYYY"
                        readOnly={
                          bldatInfo
                            ? bldatInfo.readOnly
                              ? bldatInfo.readOnly
                              : false
                            : false
                        }
                        disabled={
                          bldatInfo
                            ? bldatInfo.disabled
                              ? bldatInfo.disabled
                              : false
                            : false
                        }
                      />
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Icon name="comments outline" />
                      {formatMessage(messages.bktxt)}
                    </Table.Cell>

                    <Table.Cell>
                      <TextArea
                        style={{
                          maxHeight: 45,
                          minHeight: 45,
                          minWidth: 180,
                          maxWidth: 180,
                        }}
                        value={bktxt}
                        maxLength="255"
                        onChange={(e, { value }) =>
                          this.onInputChange(value, 'bktxt')
                        }
                        placeholder={formatMessage(messages.bktxt)}
                        readOnly={
                          bktxtInfo
                            ? bktxtInfo.readOnly
                              ? bktxtInfo.readOnly
                              : false
                            : false
                        }
                        disabled={
                          bktxtInfo
                            ? bktxtInfo.disabled
                              ? bktxtInfo.disabled
                              : false
                            : false
                        }
                      />
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default injectIntl(FaHeader);
