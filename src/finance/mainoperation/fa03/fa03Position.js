import React, { PureComponent } from 'react';
import { Popup, Segment, Label, Input } from 'semantic-ui-react';
import { moneyFormat } from '../../../utils/helpers';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { injectIntl } from 'react-intl';
import { messages } from '../../../locales/defineMessages';

const PopupHkontInfo = (hkont, hkontName, hkontWaers) => (
  <Popup trigger={<span>{hkont}</span>} flowing hoverable>
    <Segment inverted>
      {' '}
      {hkontName} {hkontWaers}
    </Segment>
  </Popup>
);

class Fa03Position extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.bseg) {
      return '';
    }

    const { formatMessage } = this.props.intl;

    let readOnlyValue = true;
    if (this.props.trans === 'FA02') {
      readOnlyValue = false;
    }

    const columns = [];

    const col01 = {
      Header: ({ value }) => <b>{formatMessage(messages.buzei)}</b>,
      accessor: 'buzei',
      width: 40,
    };
    const col02 = {
      Header: ({ value }) => <b>{formatMessage(messages.bschl)}</b>,
      accessor: 'bschl',
      width: 40,
    };
    const col03 = {
      Header: ({ value }) => <b>{formatMessage(messages.hkont)}</b>,
      accessor: 'hkontName',
      Cell: obj => (
        <span>
          {PopupHkontInfo(
            obj.original.hkont,
            obj.original.hkontName,
            obj.original.hkontWaers,
          )}
        </span>
      ),
      width: 100,
    };
    const col04 = {
      Header: ({ value }) => (
        <b>
          {formatMessage(messages.amount)}{' '}
          {formatMessage(messages.inLocalCurrency)}
        </b>
      ),
      accessor: 'dmbtr',
      Cell: ({ value }) => (
        <span>
          {' '}
          {moneyFormat(value)} {'USD'}{' '}
        </span>
      ),
      width: 240,
    };
    const col05 = {
      Header: ({ value }) => (
        <b>
          {formatMessage(messages.amount)}{' '}
          {formatMessage(messages.inDocumentCurrency)}
        </b>
      ),
      accessor: 'wrbtr',
      Cell: ({ value }) => (
        <span>
          {' '}
          {moneyFormat(value)} {this.props.bkpf.waers}
        </span>
      ),
      width: 240,
    };
    const col06 = {
      Header: ({ value }) => <b>{formatMessage(messages.shkzg)}</b>,
      accessor: 'shkzg',
      width: 40,
    };
    const col07 = {
      Header: ({ value }) => <b>{formatMessage(messages.matnr)}</b>,
      accessor: 'matnrName',
      width: 200,
    };
    const col08 = {
      Header: ({ value }) => <b>{formatMessage(messages.werks)}</b>,
      accessor: 'werksName',
      width: 150,
    };
    const col09 = {
      Header: ({ value }) => <b>{formatMessage(messages.menge)}</b>,
      accessor: 'menge',
      width: 80,
    };
    const col10 = {
      Header: ({ value }) => <b>{formatMessage(messages.meins)}</b>,
      accessor: 'meins',
      width: 100,
    };
    const col11 = {
      Header: ({ value }) => <b>{formatMessage(messages.customer)}</b>,
      accessor: 'lifnrName',
      width: 160,
    };
    const col12 = {
      Header: ({ value }) => <b>{formatMessage(messages.bktxt)}</b>,
      accessor: 'sgtxt',
      // Cell: (obj) =>  <input onChange={(e, { value }) => this.props.onInputChangeData(value,'bktxt','') />,

      Cell: obj => (
        <span>
          <Input
            value={obj.original.sgtxt}
            maxLength="45"
            readOnly={readOnlyValue}
            onChange={(e, { value }) =>
              this.props.onInputChangeData(value, 'sgtxt', obj.index)
            }
          />
        </span>
      ),
      width: 200,
    };

    columns.push(col01);
    columns.push(col02);
    columns.push(col03);
    columns.push(col04);
    columns.push(col05);
    columns.push(col06);
    columns.push(col07);
    columns.push(col08);
    columns.push(col09);
    columns.push(col10);
    columns.push(col11);
    columns.push(col12);

    return (
      <Segment padded size="small">
        <Label color="green" ribbon>
          {formatMessage(messages.buzeiFullText)}
        </Label>
        <br />
        <br />
        <ReactTable
          data={this.props.bseg}
          columns={columns}
          showPagination={this.props.bseg.length > 10}
          className="-striped -highlight"
          defaultPageSize={
            this.props.bseg.length < 11 ? this.props.bseg.length : 10
          }
          loadingText={formatMessage(messages.loadingText)}
          noDataText={formatMessage(messages.noDataText)}
          previousText={formatMessage(messages.previousText)}
          nextText={formatMessage(messages.nextText)}
          rowsText={formatMessage(messages.rowsText)}
          pageText={formatMessage(messages.pageText)}
          ofText={formatMessage(messages.ofText)}
        />
      </Segment>
    );
  }
}

export default injectIntl(Fa03Position);
