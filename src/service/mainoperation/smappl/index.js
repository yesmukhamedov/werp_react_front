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
} from 'semantic-ui-react';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
import format from 'string-format';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import OutputErrors from '../../../general/error/outputErrors';
import 'react-table/react-table.css';
import { clearDynObjService } from '../../serviceAction';
import NewService from './NewService';

const Smappl = props => {
  const {
    companyPosition,
    clearDynObjService,
    intl: { messages },
    branchOptions,
  } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);
  const [error, setError] = useState([]);
  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');
  let queryString = 'bukrs=={0.bukrs};';

  const [search, setSearch] = useState({
    bukrs: 0,
    branch: 0,
  });

  let query = {
    search: format(queryString, { ...search }),
  };

  useEffect(() => {
    clearDynObjService();
  }, []);

  const onChange = (text, value) => {
    setSearch(prev => {
      const varTs = { ...prev };
      switch (text) {
        case 'bukrs':
          varTs.bukrs = value;
        case 'branch':
          varTs.branch = value;
      }
      return varTs;
    });

    setDropdownActive(true);
  };
  console.log(search);
  const onSearchCompany = () => {
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

  const onEditPosition = row => {
    setModalOpen(true);
  };

  const onDelete = id => {
    console.log(id);
  };

  return (
    <Fragment>
      <Segment>
        <Divider hidden></Divider>
        <Header as="h2">
          {messages['service_requests']}
          <NewService />
        </Header>
        <Divider />
        <Grid columns={8}>
          <Grid.Column>
            <Dropdown
              clearable="true"
              selection
              options={companyPosition}
              placeholder={messages['bukrs']}
              onChange={(e, { value }) => onChange('bukrs', value)}
            />
          </Grid.Column>
          <Grid.Column>
            <Dropdown
              clearable="true"
              selection
              options={search.bukrs ? branchOptions[search.bukrs] : []}
              placeholder={messages['Task.Branch']}
              onChange={(e, { value }) => onChange('branch', value)}
            />
          </Grid.Column>
          <Grid.Column>
            <Dropdown
              clearable="true"
              selection
              options={[]}
              placeholder={messages['product_category']}
              onChange={(e, { value }) => onChange('product', value)}
            />
          </Grid.Column>
          <Grid.Column>
            <Dropdown
              clearable="true"
              selection
              options={[]}
              placeholder={messages['L__ORDER_STATUS']}
              onChange={(e, { value }) => onChange('status', value)}
            />
          </Grid.Column>
          <Grid.Column>
            <Dropdown
              clearable="true"
              selection
              options={[]}
              placeholder={messages['type_of_application']}
              onChange={(e, { value }) => onChange('ApplicationType', value)}
            />
          </Grid.Column>
          <Grid.Column>
            <Input placeholder="wa" />
          </Grid.Column>
          <Grid.Column>
            <Input placeholder="wa" />
          </Grid.Column>
          <Grid.Column>
            <Button color="teal" id="searchButton" onClick={onSearchCompany}>
              {messages['apply']}
            </Button>
          </Grid.Column>
        </Grid>
        <OutputErrors errors={error} />
        <br></br>
        <br></br>
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
                <div style={{ textAlign: 'center' }}>{messages['toEdit']}</div>
              ),
              accessor: 'fc',
              filterable: false,
              Cell: ({ row }) => (
                <div style={{ textAlign: 'center' }}>
                  <Button
                    icon
                    color="instagram"
                    onClick={() => onEditPosition(row.row)}
                  >
                    <Icon name="edit"></Icon>
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
  return {
    companyPosition: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsService,
  };
};

export default connect(mapStateToProps, {
  clearDynObjService,
})(injectIntl(Smappl));
