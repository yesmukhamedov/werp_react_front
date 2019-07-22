import React, { PureComponent } from 'react';
import {
  Popup,
  Button,
  Table,
  Icon,
  Grid,
  Segment,
  Input,
  Checkbox,
  TextArea,
  Label,
} from 'semantic-ui-react';
import { moneyFormat } from '../../../utils/helpers';
import { LinkToMmcvNewTab } from '../../../utils/outlink';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { injectIntl } from 'react-intl';
import { messages } from '../../../locales/defineMessages';

require('moment/locale/ru');
require('moment/locale/tr');

class Fa03Header extends PureComponent {
  constructor(props) {
    super(props);
    this.initializeBkpf = this.initializeBkpf.bind(this);
  }
  initializeBkpf() {
    const bkpf = {
      bukrs: '',
      brnch: '',
      business_area: '',
      official: false,
      dep: '',
      waers: '',
      kursf: '',
      zreg: '',
      blart: '',
      budat: '',
      bldat: '',
      bktxt: '',
      contract_number: '',
      awkey: '',
      usnam: '',
      tcode: '',
      storno: '',
      docStorno: '',
      docOriginal: '',

      cpudt: '',
      awtyp: '',
      customer_id: '',
      payroll_id: '',
      invoice_id: '',
      log_doc: '',
      closed: '',
      awkey2: '',
      dmbtr: '',
      dmbtr_paid: '',
      wrbtr: '',
      wrbtr_paid: '',
    };
    return { bkpf };
  }
  render() {
    if (!this.props.bkpf) {
      return '';
    }
    const { bkpf } = !this.props.bkpf ? this.initializeBkpf() : this.props;
    const { formatMessage } = this.props.intl;

    const language = localStorage.getItem('language');
    const customerName = !this.props.customerName
      ? ''
      : this.props.customerName;
    const branchName = !this.props.branchName ? '' : this.props.branchName;
    const userFIO = !this.props.userFIO ? '' : this.props.userFIO;
    const baName = !this.props.baName ? '' : this.props.baName;
    const depName = !this.props.depName ? '' : this.props.depName;
    const companyOptions = !this.props.companyOptions
      ? ''
      : this.props.companyOptions;

    const stornoOriginal = !this.props.stornoOriginal
      ? ''
      : this.props.stornoOriginal;
    const stornoOriginalBelnr = !this.props.stornoOriginalBelnr
      ? ''
      : this.props.stornoOriginalBelnr;
    const stornoOriginalGjahr = !this.props.stornoOriginalGjahr
      ? ''
      : this.props.stornoOriginalGjahr;
    const stornoOriginalBukrs = !this.props.stornoOriginalBukrs
      ? ''
      : this.props.stornoOriginalBukrs;

    let docName = '';
    if (stornoOriginal === 'storno')
      docName = formatMessage(messages.cancelDocument);
    if (stornoOriginal === 'original')
      docName = formatMessage(messages.originalDocument);

    let awkeyBelnr = '';
    let awkeyGjahr = '';
    if (bkpf.awkey && bkpf.awkey.toString().length === 14) {
      const str = bkpf.awkey.toString();
      awkeyBelnr = str.substring(0, 10);
      awkeyGjahr = str.substring(10, 14);
    }

    let backgroundColor = '';
    if (bkpf.storno === 1 || bkpf.blart === 'ST') {
      backgroundColor = '#F54C4C';
    }

    let readOnlyValue = true;
    if (this.props.trans === 'FA02') {
      readOnlyValue = false;
    }
    const PopupBkpfInfo = (
      waers,
      cpudt,
      awtyp,
      customer_id,
      payroll_id,
      invoice_id,
      log_doc,
      closed,
      awkey2,
      dmbtr,
      dmbtr_paid,
      wrbtr,
      wrbtr_paid,
    ) => (
      <Popup
        trigger={
          <span>
            <Button icon labelPosition="left" primary size="small">
              <Icon name="info" size="large" />
              {formatMessage(messages.extraInfo)}
            </Button>
          </span>
        }
        flowing
        on="click"
      >
        <Table compact>
          <Table.Body>
            <Table.Row>
              <Table.Cell>{formatMessage(messages.openClose)}</Table.Cell>
              <Table.Cell>
                {closed === 1
                  ? formatMessage(messages.close)
                  : formatMessage(messages.open)}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{formatMessage(messages.time)}</Table.Cell>
              <Table.Cell>
                <DatePicker
                  className="date-auto-width"
                  autoComplete="off"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select" // timezone="UTC"
                  selected={cpudt ? moment(cpudt) : ''}
                  locale={language}
                  dateFormat="DD.MM.YYYY"
                  readOnly
                  disabled
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{formatMessage(messages.awtyp)}</Table.Cell>
              <Table.Cell>{awtyp}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{formatMessage(messages.customer_id)}</Table.Cell>
              <Table.Cell>{customer_id}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{formatMessage(messages.invoice)} ID</Table.Cell>
              <Table.Cell>{invoice_id}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{formatMessage(messages.payroll)} ID</Table.Cell>
              <Table.Cell>{payroll_id}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{formatMessage(messages.logDoc)}</Table.Cell>
              <Table.Cell>{log_doc}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{formatMessage(messages.awkey)} 2</Table.Cell>
              <Table.Cell>{awkey2}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                {formatMessage(messages.amount)}{' '}
                {formatMessage(messages.inLocalCurrency)}
              </Table.Cell>
              <Table.Cell>USD {moneyFormat(dmbtr)}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                {formatMessage(messages.paid)}{' '}
                {formatMessage(messages.inLocalCurrency)}
              </Table.Cell>
              <Table.Cell>USD {moneyFormat(dmbtr_paid)}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                {formatMessage(messages.amount)}{' '}
                {formatMessage(messages.inDocumentCurrency)}
              </Table.Cell>
              <Table.Cell>
                {waers} {moneyFormat(wrbtr)}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                {formatMessage(messages.paid)}{' '}
                {formatMessage(messages.inDocumentCurrency)}
              </Table.Cell>
              <Table.Cell>
                {waers} {moneyFormat(wrbtr_paid)}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Popup>
    );

    return (
      <Segment padded size="small" style={{ backgroundColor }}>
        <Label color="blue" ribbon>
          {formatMessage(messages.header)}
        </Label>
        <br />
        <br />
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
                      {bkpf.bukrs !== undefined &&
                        companyOptions
                          .filter(item => item.value === bkpf.bukrs)
                          .map(item => (
                            <Input key={item.key} value={item.text} readOnly />
                          ))}

                      {bkpf.bukrs === '' && <Input value="" readOnly />}
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Icon name="browser" />
                      {formatMessage(messages.brnch)}
                    </Table.Cell>
                    <Table.Cell>
                      <Input value={branchName} readOnly />
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Icon name="browser" />
                      {formatMessage(messages.business_area)}
                    </Table.Cell>
                    <Table.Cell>
                      <Input value={baName} readOnly />
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>{formatMessage(messages.snNum)}</Table.Cell>
                    <Table.Cell>
                      <LinkToMmcvNewTab contractNumber={bkpf.contract_number} />
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>{formatMessage(messages.customer)}</Table.Cell>
                    <Table.Cell>
                      <Input value={customerName} readOnly />
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>{formatMessage(messages.official)}</Table.Cell>
                    <Table.Cell>
                      <Checkbox checked={bkpf.official === 1} readOnly />
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell />
                    <Table.Cell>
                      {PopupBkpfInfo(
                        bkpf.waers,
                        bkpf.cpudt,
                        bkpf.awtyp,
                        bkpf.customer_id,
                        bkpf.payroll_id,
                        bkpf.invoice_id,
                        bkpf.log_doc,
                        bkpf.closed,
                        bkpf.awkey2,
                        bkpf.dmbtr,
                        bkpf.dmbtr_paid,
                        bkpf.wrbtr,
                        bkpf.wrbtr_paid,
                      )}
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
                      <Input value={depName} readOnly />
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Icon name="dollar" />
                      {formatMessage(messages.waers)}
                    </Table.Cell>
                    <Table.Cell>
                      <Input value={bkpf.waers} readOnly />
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Icon name="exchange" />
                      {formatMessage(messages.kursf)}
                    </Table.Cell>
                    <Table.Cell>
                      <Input value={bkpf.kursf} readOnly />
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Icon name="wordpress forms" />
                      {formatMessage(messages.zreg)}
                    </Table.Cell>
                    <Table.Cell>
                      <Input value={!bkpf.zreg ? '' : bkpf.zreg} readOnly />
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>{formatMessage(messages.tcode)}</Table.Cell>
                    <Table.Cell>
                      <Input value={bkpf.tcode} readOnly />
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>{formatMessage(messages.storno)}</Table.Cell>
                    <Table.Cell>
                      <Checkbox checked={bkpf.storno === 1} readOnly />
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>{docName}</Table.Cell>
                    <Table.Cell>
                      {stornoOriginalBelnr && (
                        <Link
                          target="_blank"
                          to={`/finance/mainoperation/fa03?belnr=${stornoOriginalBelnr}&bukrs=${
                            bkpf.bukrs
                          }&gjahr=${stornoOriginalGjahr}`}
                        >
                          {stornoOriginalBelnr} {stornoOriginalGjahr}
                        </Link>
                      )}
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
                      <Input value={bkpf.blart} readOnly />
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
                        selected={bkpf.budat ? moment(bkpf.budat) : ''}
                        locale={language}
                        dateFormat="DD.MM.YYYY"
                        readOnly
                        disabled
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
                        selected={bkpf.bldat ? moment(bkpf.bldat) : ''}
                        locale={language}
                        dateFormat="DD.MM.YYYY"
                        readOnly
                        disabled
                      />
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>{formatMessage(messages.awkey)}</Table.Cell>
                    <Table.Cell>
                      {awkeyBelnr.length > 0 && (
                        <Link
                          target="_blank"
                          to={`/finance/mainoperation/fa03?belnr=${awkeyBelnr}&bukrs=${
                            bkpf.bukrs
                          }&gjahr=${awkeyGjahr}`}
                        >
                          {bkpf.awkey}
                        </Link>
                      )}
                    </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>{formatMessage(messages.user)}</Table.Cell>
                    <Table.Cell>
                      <Input value={userFIO} readOnly />
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
                        value={!bkpf.bktxt ? '' : bkpf.bktxt}
                        maxLength="255"
                        readOnly={readOnlyValue}
                        onChange={(e, { value }) =>
                          this.props.onInputChangeData(value, 'bktxt', '')
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

export default injectIntl(Fa03Header);
