import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { f4FetchStaffList, f4ClearStaffList } from '../f4_action';
import {
  Table,
  Modal,
  Dropdown,
  Icon,
  Input,
  Checkbox,
  Button,
} from 'semantic-ui-react';
import matchSorter, { rankings } from 'match-sorter';
import { injectIntl } from 'react-intl';
import { LinkToStaffCardViewID } from '../../../utils/outlink';
// import './notification.css'

// const arrayList= ;
class StaffF4Modal extends PureComponent {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.close = this.close.bind(this);
    this.state = {
      bukrsDisabledState: false,
      brnchDisabledState: false,
      unemployedDisabledState: false,
      bukrsSV: '',
      brnchSV: '',
      fioSV: '',
      iinBinSV: '',
      unemployed: false,
      loading: false,
    };
  }

  componentDidMount() {
    // console.log('didmount')
    const { trans } = this.props;
    if (trans === 'faia') {
      this.setState({
        brnchDisabledState: true,
        unemployedDisabledState: true,
      });
    }
    if (trans === 'mmcef') {
      this.setState({
        brnchDisabledState: true,
        unemployedDisabledState: true,
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.bukrs !== this.props.bukrs) {
      this.setState({ bukrsSV: nextProps.bukrs });
      this.props.f4ClearStaffList();
    }
    if (nextProps.brnch !== this.props.brnch) {
      this.setState({ brnchSV: nextProps.brnch });
      this.props.f4ClearStaffList();
    }
  }

  componentWillUnmount() {
    this.props.f4ClearStaffList();
  }

  onInputChange(value, stateFieldName) {
    if (stateFieldName === 'unemployed') {
      this.setState({
        unemployed: !this.state.unemployed,
        bukrsDisabledState: !this.state.unemployed,
        brnchDisabledState: !this.state.unemployed,
      });
    } else {
      this.setState({ [stateFieldName]: value });
    }
  }

  onSearch() {
    this.props.f4FetchStaffList(
      this.props.trans,
      this.state.bukrsSV,
      this.state.brnchSV,
      this.state.fioSV,
      this.state.iinBinSV,
      this.state.unemployed,
      value => this.setState({ loading: value }),
    );
  }

  close = () => {
    this.props.closeModal(false);
  };

  render() {
    const {
      companyOptions = [],
      branchOptions,
      bukrsDisabledParent,
      trans,
      unemployedDisabledParent,
      intl: { messages },
    } = this.props;
    const {
      bukrsDisabledState,
      brnchDisabledState,
      unemployedDisabledState,
      bukrsSV,
      brnchSV,
      fioSV,
      iinBinSV,
      unemployed,
    } = this.state;

    let t1columns = [];
    let t1r1c1 = {},
      t1r1c2 = {},
      t1r1c3 = {},
      t1r1c4 = {};

    if (
      trans === 'fcis' ||
      trans === 'mmcc' ||
      trans === 'mmcef' ||
      trans === 'faia' ||
      trans === 'LG_POS_TRD_IN' ||
      trans.startsWith('hr_doc_create_') ||
      trans === 'hr_doc_approvers'
    ) {
      t1r1c1 = {
        Header: ({ value }) => <b>ID</b>,
        accessor: 'staffId',
        width: 100,
        className: 'clickableItem',
        Cell: obj => (
          <span>
            <LinkToStaffCardViewID
              staffId={obj.original.staffId}
              staffFio={obj.original.fio}
            />
          </span>
        ),
      };
      t1r1c2 = {
        Header: ({ value }) => <b>{messages['fio']}</b>,
        width: 300,
        id: 'fio',
        accessor: d => d.fio,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, {
            keys: [{ threshold: rankings.CONTAINS, key: 'fio' }],
          }),
        filterAll: true,
        className: 'clickableItem',
      };

      t1r1c3 = {
        Header: ({ value }) => <b>{messages['iinBin']}</b>,
        accessor: 'iinBin',
        width: 150,
        className: 'clickableItem',
      };

      t1columns.push(t1r1c1);
      t1columns.push(t1r1c2);
      t1columns.push(t1r1c3);
      // t1columns.push(t1r1c4);
    }

    if (trans === 'mmcc' || trans === 'mmcef') {
      t1r1c4 = {
        Header: ({ value }) => <b>{messages['position']}</b>,
        id: 'positionName',
        accessor: d => d.positionName,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, {
            keys: [{ threshold: rankings.CONTAINS, key: 'positionName' }],
          }),
        filterAll: true,
        className: 'clickableItem',
      };

      t1columns.push(t1r1c4);
    }

    return (
      <Modal
        open={this.props.open}
        onClose={this.close}
        dimmer={'inverted'}
        size="small"
      >
        <Modal.Header>
          <Icon name="filter" size="big" />
          {messages['staff']}
        </Modal.Header>
        <Modal.Content>
          <Table collapsing>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Icon name="folder" />
                  {messages['bukrs']}
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    placeholder={messages['bukrs']}
                    selection
                    noResultsMessage={messages['noResultsMessage']}
                    options={companyOptions}
                    value={bukrsSV}
                    onChange={(e, { value }) =>
                      this.onInputChange(value, 'bukrsSV')
                    }
                    disabled={
                      bukrsDisabledParent
                        ? bukrsDisabledParent
                        : bukrsDisabledState
                    }
                  />
                </Table.Cell>
                <Table.Cell>{messages['fio']}</Table.Cell>
                <Table.Cell>
                  <Input
                    value={fioSV}
                    placeholder={messages['fio']}
                    onChange={(e, { value }) =>
                      this.onInputChange(value, 'fioSV')
                    }
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Icon name="browser" />
                  {messages['brnch']}
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    placeholder={messages['brnch']}
                    search
                    selection
                    noResultsMessage={messages['noResultsMessage']}
                    options={
                      branchOptions[bukrsSV] ? branchOptions[bukrsSV] : []
                    }
                    value={brnchSV}
                    onChange={(e, { value }) =>
                      this.onInputChange(value, 'brnchSV')
                    }
                    disabled={brnchDisabledState}
                  />
                </Table.Cell>
                <Table.Cell>{messages['iinBin']}</Table.Cell>
                <Table.Cell>
                  <Input
                    value={iinBinSV}
                    placeholder={messages['iinBin']}
                    onChange={(e, { value }) =>
                      this.onInputChange(value, 'iinBinSV')
                    }
                  />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>{messages['dismissed']}</Table.Cell>
                <Table.Cell>
                  <Checkbox
                    checked={unemployed}
                    onChange={(e, { value }) =>
                      this.onInputChange(value, 'unemployed')
                    }
                    disabled={
                      unemployedDisabledParent
                        ? unemployedDisabledParent
                        : unemployedDisabledState
                    }
                  />
                </Table.Cell>
                <Table.Cell>
                  <Button
                    icon
                    labelPosition="left"
                    primary
                    size="small"
                    onClick={() => {
                      this.setState({ loading: true });
                      this.onSearch();
                    }}
                    loading={this.state.loading}
                    disabled={this.state.loading}
                  >
                    <Icon name="search" size="large" />
                    {messages['search']}
                  </Button>
                </Table.Cell>
                <Table.Cell />
              </Table.Row>
            </Table.Body>
          </Table>

          <ReactTable
            filterable
            data={this.props.table}
            columns={t1columns}
            defaultPageSize={10}
            showPagination={true}
            // style={{ height: '400px' }}
            className="-striped -highlight"
            loadingText={messages['loadingText']}
            noDataText={messages['noDataText']}
            previousText={messages['previousText']}
            nextText={messages['nextText']}
            rowsText={messages['rowsText']}
            pageText={messages['pageText']}
            ofText={messages['ofText']}
            showPageSizeOptions={false}
            getTrProps={(state, rowInfo, column) => {
              return {
                onClick: (e, handleOriginal) => {
                  this.props.onStaffSelect(rowInfo.original);
                  this.props.closeModal(false);
                },
              };
            }}
          />
        </Modal.Content>
      </Modal>
    );
  }
}
// export default Notification;
function mapStateToProps(state) {
  return { table: state.f4.staffList };
}

export default connect(
  mapStateToProps,
  { f4FetchStaffList, f4ClearStaffList },
)(injectIntl(StaffF4Modal));
