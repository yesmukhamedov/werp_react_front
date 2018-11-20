import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import { Label } from 'semantic-ui-react';
import 'react-table/react-table.css';
import PropTypes from 'prop-types';
import { outCallStatusColorMap } from '../../../../../utils/constants';
import { formatDMYMS, constructFullName } from '../../../../../utils/helpers';


class PrivateTaskListTableDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIdx: undefined,
    };
  }

  componentWillMount() {
    this.props.fetchPrivateTasks();
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { lang, messages } = this.props;
    const columns = [
      {
        Header: '#',
        accessor: 'id',
        maxWidth: 50,
        Cell: (props) => {
          const { id } = props.original;
          return (
            <Link target="_blank" to={`/general/dtskedit/${id}`}>
              {id}
            </Link>
          );
        },
      },
      {
        Header: formatMessage(messages.branch),
        accessor: 'recipient.branch.value',
        maxWidth: 160,
        Cell: (props) => {
          const { recipient } = props.original;
          return (
            <div>
              {recipient.branch.value}
            </div>
          );
        },
      },
      {
        Header: formatMessage(messages.department),
        accessor: 'recipient.department.value',
        Cell: (props) => {
          const { recipient } = props.original;
          return (
            <div>
              {recipient.department.value}
            </div>
          );
        },
      },
      {
        Header: formatMessage(messages.type),
        accessor: 'type.code',
        Cell: (props) => {
          const { type } = props.original;
          return (
            <div>
              {type[lang]}
            </div>
          );
        },
      },
      {
        Header: formatMessage(messages.title),
        accessor: 'title',
        maxWidth: 380,
        Cell: (props) => {
          const { title, id } = props.original;
          return (
            <Link target="_blank" to={`/general/dtskedit/${id}`}>
              {title}
            </Link>
          );
        },
      },
      {
        Header: formatMessage(messages.status),
        accessor: 'status.id',
        Cell: (props) => {
          const { status } = props.original;
          return (
            <div>
              <Label
                color={outCallStatusColorMap[status.id]}
                size="mini"
              >
                {status[lang]}
              </Label>
            </div>
          );
        },
      },
      {
        Header: formatMessage(messages.createdAt),
        accessor: 'createdAt',
        // maxWidth: 125,
        Cell: (props) => {
          const { createdAt } = props.original;
          return formatDMYMS(createdAt);
        },
      },
      {
        Header: formatMessage(messages.estimatedAt),
        accessor: 'estimatedAt',
        // maxWidth: 125,
        Cell: (props) => {
          const { estimatedAt } = props.original;
          return (
            <div>
              { estimatedAt && formatDMYMS(estimatedAt) }
            </div>
          );
        },
      },
      {
        Header: formatMessage(messages.author),
        accessor: 'author.id',
        Cell: (props) => {
          const { author } = props.original;
          return (
            <div>
              {author && constructFullName(author)}
            </div>
          );
        },
      },
      {
        Header: formatMessage(messages.recipient),
        accessor: 'recipient',
        Cell: (props) => {
          const { recipient } = props.original;
          return (
            <div>
              {recipient.assignee && recipient.assignee.value}
            </div>
          );
        },
      },
    ];
    return (
      <div>
        <ReactTable
          loading={!this.props.result}
          data={this.props.result}
          columns={columns}
          pageSizeOptions={[10, 20, 30, 50]}
          defaultPageSize={10}
          previousText={formatMessage(messages.previousText)}
          nextText={formatMessage(messages.nextText)}
          loadingText={formatMessage(messages.loadingText)}
          noDataText={formatMessage(messages.noDataText)}
          pageText={formatMessage(messages.pageText)}
          ofText={formatMessage(messages.ofText)}
          rowsText={formatMessage(messages.rowsText)}
          className="-highlight"
          getTrProps={(state, rowInfo) => ({
            onClick: () => {
                this.setState({
                  selectedIdx: rowInfo.index,
                });
            },
            style: {
                background: (rowInfo === undefined ? '' : (this.state.selectedIdx === rowInfo.index ? 'rgba(241,250,229, 1)' : '')),
            },
          })}
          getTheadProps={() => ({
            style: {
              background: 'rgba(227,232,238, 1)',
            },
          })}
        />
      </div>
    );
  }
}

PrivateTaskListTableDisplay.propTypes = {
  result: PropTypes.arrayOf(PropTypes.object),
};

export default PrivateTaskListTableDisplay;
