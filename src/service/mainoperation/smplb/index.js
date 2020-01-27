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
import { clearDynObjService, fetchSmplb } from '../../serviceAction';

const Smplb = props => {
  const {
    positionList,
    companyPosition,
    clearDynObjService,
    intl: { messages },
    fetchSmplb,
  } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);
  const [error, setError] = useState([]);
  const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
  const language = localStorage.getItem('language');
  let queryString = 'bukrs={0.bukrs};';
  const [positions, setPositions] = useState([]);

  const [search, setSearch] = useState({
    bukrs: '',
  });

  let query = {
    search: format(queryString, search),
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
      fetchSmplb('bukrs=1000');
      //setPositions(positionList)
      console.log(positionList);
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
          <Icon name="search"></Icon>
          {messages['search']}
        </Button>
        <OutputErrors errors={error} />
        <br></br>
        <br></br>
        <ReactTableWrapper
          data={positions}
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
    positionList: state.serviceReducer.dynamicObject,
  };
};

export default connect(mapStateToProps, {
  clearDynObjService,
  fetchSmplb,
})(injectIntl(Smplb));
