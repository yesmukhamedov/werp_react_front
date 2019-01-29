import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Header,
  Container,
  Segment,
  Divider,
  Loader,
  Form,
} from 'semantic-ui-react';
//import {f4FetchBuk} from '../../../../reference/f4/f4_action'
import { documentTypeOptions, documentStatusOptions } from '../../../hrUtil';
import { fetchAllHrDocs } from '../actions/hrDocAction';
import { formatDMYMS } from '../../../../utils/helpers';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class HrAllDocsListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchModel: {},
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.renderDataTable = this.renderDataTable.bind(this);
  }

  handleFormChange(e, { name, value }) {
    let searchModel = Object.assign({}, this.state.searchModel);
    searchModel[name] = value;

    if (name === 'bukrs') {
      searchModel['branchId'] = null;
    }

    this.setState({
      ...this.state,
      searchModel: searchModel,
    });
  }

  getBranchOptions = bukrs => {
    if (!this.props.branchOptions || !bukrs) {
      return [];
    }

    return this.props.branchOptions[bukrs] || [];
  };

  loadItems = () => {
    this.props.fetchAllHrDocs(this.state.searchModel);
  };

  renderSearchPanel() {
    const { searchModel } = this.state;
    return (
      <Form>
        <Form.Group widths="equal">
          <Form.Select
            selected={searchModel['bukrs'] || ''}
            name="bukrs"
            onChange={this.handleFormChange}
            fluid
            label="Компания"
            options={this.props.companyOptions || []}
            placeholder="Компания"
          />

          <Form.Select
            selected={searchModel['branchId'] || ''}
            name="branchId"
            onChange={this.handleFormChange}
            fluid
            label="Филиал"
            options={this.getBranchOptions(searchModel['bukrs'])}
            placeholder="Филиал"
          />

          <Form.Select
            selected={searchModel['typeId'] || ''}
            name="typeId"
            onChange={this.handleFormChange}
            fluid
            label="Тип документа"
            options={documentTypeOptions(true)}
            placeholder="Тип документа"
          />

          <Form.Select
            selected={searchModel['statusId'] || ''}
            name="statusId"
            onChange={this.handleFormChange}
            fluid
            label="Статус документа"
            options={documentStatusOptions(true)}
            placeholder="Статус документа"
          />
        </Form.Group>
        <Form.Button
          disabled={this.props.loading}
          onClick={() => this.props.fetchAllHrDocs(searchModel)}
        >
          {this.props.loading ? 'Загружается...' : 'Загрузить'}
        </Form.Button>
      </Form>
    );
  }

  renderDataTable() {
    const { items } = this.props;

    return (
      <div>
        {this.props.pageLoading ? (
          <Loader active inline="centered" />
        ) : (
          <ReactTable
            data={items || []}
            columns={[
              {
                Header: '№',
                accessor: 'id',
                maxWidth: 100,
              },
              {
                Header: 'Компания',
                accessor: 'bukrsName',
                maxWidth: 150,
              },
              {
                Header: 'Филиал',
                accessor: 'branchName',
                maxWidth: 150,
              },
              {
                Header: 'Тип',
                accessor: 'typeName',
                maxWidth: 250,
              },
              {
                Header: 'Статус',
                accessor: 'statusName',
                maxWidth: 150,
              },
              {
                Header: 'Дата создания',
                accessor: 'createdAt',
                Cell: props => {
                  const { createdAt } = props.original;
                  return formatDMYMS(createdAt);
                },
              },
              {
                Header: '',
                accessor: 'id',
                filterable: false,
                Cell: ({ value }) => (
                  <Link
                    target="_blank"
                    className="ui icon button mini"
                    to={`/hr/doc/view/${value}`}
                  >
                    Просмотр
                  </Link>
                ),
              },
            ]}
            indexKey="indexKey"
            defaultPageSize={50}
            className="-striped -highlight"
          />
        )}
      </div>
    );
  }

  render() {
    return (
      <Container
        fluid
        style={{
          marginTop: '2em',
          marginBottom: '2em',
          paddingLeft: '2em',
          paddingRight: '2em',
        }}
      >
        <Segment clearing>
          <Header as="h2" floated="left">
            Список всех документов HR
          </Header>
          <Divider clearing />
          {this.renderSearchPanel()}
        </Segment>
        <Divider clearing />
        {this.renderDataTable()}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.loader.active);
  return {
    companyOptions: state.userInfo.companyOptions,
    branchOptions: state.userInfo.branchOptionsAll,
    items: state.hrDocReducer.items,
    loading: state.hrDocReducer.pageLoading,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchAllHrDocs,
  },
)(HrAllDocsListPage);
