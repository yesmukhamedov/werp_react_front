import React, { Fragment, useState, useEffect } from 'react';
import {
  Segment,
  Header,
  Divider,
  Dropdown,
  Button,
  Icon,
} from 'semantic-ui-react';
import AddPosition from './AddPosition';
import EditPosition from './EditPosition';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
import './index.css';
import format from 'string-format';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import OutputErrors from '../../../general/error/outputErrors';
import 'react-table/react-table.css';
import { clearDynObjService } from '../../serviceAction';

const Smplb = props => {
  const {
    companyPosition,
    clearDynObjService,
    intl: { messages },
  } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);
  const [error, setError] = useState([]);
  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');
  let queryString = 'bukrs=={0.bukrs};';

  const [search, setSearch] = useState({
    bukrs: 0,
  });

  let query = {
    search: format(queryString, { ...search }),
  };

  useEffect(() => {
    clearDynObjService();
  }, []);

  const onChange = value => {
    setSearch({ bukrs: value });
    setDropdownActive(true);
  };

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
      <EditPosition open={modalOpen} cancel={() => setModalOpen(false)} />
      <Segment>
        <Divider hidden></Divider>
        <Header as="h2">
          {messages['List_of_posts_receiving_bonuses']}
          <AddPosition />
        </Header>

        <Divider />
        <Dropdown
          clearable="true"
          selection
          options={companyPosition}
          placeholder={messages['bukrs']}
          onChange={(e, { value }) => onChange(value)}
        />
        <Button color="teal" id="searchButton" onClick={onSearchCompany}>
          <Icon name="search"></Icon>Search
        </Button>
        <OutputErrors errors={error} />
        <br></br>
        <br></br>
        <ReactTableWrapper
          data={[
            { id: 1, bukrs: 'Aura', Position: 'fergre' },
            { id: 2, bukrs: 'CONSTRUCTION', Position: 'fergre' },
          ]}
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
                <div style={{ textAlign: 'center' }}>{messages['bukrs']}</div>
              ),
              accessor: 'bukrs',
              Cell: row => (
                <div style={{ textAlign: 'center' }}>{row.value}</div>
              ),
            },
            {
              Header: () => (
                <div style={{ textAlign: 'center' }}>
                  {messages['Table.Position']}
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
                  {messages['Crm.ToDelete']}
                </div>
              ),
              accessor: 'fc',
              filterable: false,
              Cell: ({ row }) => (
                <div style={{ textAlign: 'center' }}>
                  <Button
                    icon="trash"
                    color="red"
                    onClick={() => onDelete(row.row.id)}
                  />
                </div>
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
  };
};

export default connect(mapStateToProps, {
  clearDynObjService,
})(injectIntl(Smplb));
