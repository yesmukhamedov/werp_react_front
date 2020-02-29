import React, { useState, Fragment } from 'react';
import {
  Segment,
  Header,
  Divider,
  Dropdown,
  Form,
  Button,
  Icon,
  Grid,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import ReactTableWrapper from '../../../utils/ReactTableWrapper';
import 'react-table/react-table.css';

const Smslsp = props => {
  const {
    intl: { messages },
    companyOptions,
  } = props;
  const [search, setSearch] = useState({
    bukrs: '',
  });

  const onChange = value => {
    setSearch(value);
  };

  return (
    <Segment>
      <Divider hidden />

      <Header as="h2">{messages['List_of_employees']}</Header>

      <Divider />

      <Grid columns={5}>
        <Grid.Row>
          <Grid.Column>
            <Dropdown
              clearable="true"
              selection
              options={companyOptions}
              placeholder={messages['bukrs']}
              onChange={(e, { value }) => onChange(value)}
            />
          </Grid.Column>
          <Grid.Column>
            <Button color="brown">
              <Icon name="search" />
              {messages['search']}
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <br />

      <ReactTableWrapper
        columns={[
          {
            Header: () => <div style={{ textAlign: 'center' }}>id</div>,
            accessor: 'id',
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>{messages['bukrs']}</div>
            ),
            accessor: 'bukrs',
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
          {
            Header: () => (
              <div style={{ textAlign: 'center' }}>
                {messages['Table.Position']}
              </div>
            ),
            accessor: 'position',
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
          },
          {
            Header: () => <div style={{ textAlign: 'center' }}>FC</div>,
            accessor: 'fc',
            Cell: row => <div style={{ textAlign: 'center' }}>{row.value}</div>,
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
  );
};

const mapStateToProps = state => {
  return {
    companyOptions: state.userInfo.companyOptions,
  };
};

export default connect(mapStateToProps, {})(injectIntl(Smslsp));
