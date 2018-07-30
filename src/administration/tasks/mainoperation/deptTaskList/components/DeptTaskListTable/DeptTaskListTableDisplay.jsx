import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import { Icon, Label } from 'semantic-ui-react';
import 'react-table/react-table.css';
import PropTypes from 'prop-types';
import RecipientEditModal from './RecipientEdit/RecipientEditModal';
import { outCallStatusColorMap } from '../../../../../../utils/constants';
import { formatDMYMS, constructFullName } from '../../../../../../utils/helpers';


class DeptTaskListTableDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIdx: undefined,
      modalOpen: false,
      taskId: undefined,
      recipientId: undefined,
    };

    this.handleEditModal = this.handleEditModal.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleEditModal() {
    this.setState({
      modalOpen: true,
    });
  }

  handleModalClose() {
    this.setState({
      modalOpen: false,
    });
  }

  render() {
    const { lang } = this.props;
    const columns = [
      {
        Header: '#',
        accessor: 'id',
        maxWidth: 50,
        Cell: (props) => {
          const { id } = props.original;
          return (
            <Link target="_blank" to={`/general/gtskedit/${id}`}>
              {id}
            </Link>
          );
        },
      },
      {
        Header: 'Филиал',
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
        Header: 'Отдел',
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
        Header: 'Тип',
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
        Header: 'Название ',
        accessor: 'title',
        maxWidth: 380,
        Cell: (props) => {
          const { title, id } = props.original;
          return (
            <Link target="_blank" to={`/general/gtskedit/${id}`}>
              {title}
            </Link>
          );
        },
      },
      {
        Header: 'Статус',
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
        Header: 'Дата создания',
        accessor: 'createdAt',
        // maxWidth: 125,
        Cell: (props) => {
          const { createdAt } = props.original;
          return formatDMYMS(createdAt);
        },
      },
      {
        Header: 'Дата завершения',
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
        Header: 'Заказчик',
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
        Header: 'Исполнитель',
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
      {
        accessor: 'id',
        maxWidth: 60,
        Cell: (props) => {
          const { id } = props.original;
          return (
            <div style={{ textAlign: 'center' }}>
              {/* <Icon link name="edit" size="large" color="black" onClick={this.handleEditModal} /> */}
              <Link target="_blank" to={`/administration/dtskredit/${id}`}>
                <Icon link name="edit" size="large" color="black" />
              </Link>
            </div>
          );
        },
      },
    ];
    return (
      <div>
        <ReactTable
          loading={this.props.loading}
          data={this.props.result}
          columns={columns}
          pageSizeOptions={[10, 20, 30, 50]}
          defaultPageSize={10}
          previousText="Предыдущий"
          nextText="Следующий"
          loadingText="Загружается..."
          noDataText="Нет записей"
          pageText="Страница"
          ofText="из"
          rowsText="записей"
          className="-highlight"
          getTrProps={(state, rowInfo) => ({
            onClick: () => {
                this.setState({
                  selectedIdx: rowInfo.index,
                  taskId: rowInfo.original.id,
                  recipientId: rowInfo.original.recipient && rowInfo.original.recipient.position.id,
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
        <RecipientEditModal
          modalOpen={this.state.modalOpen}
          handleClose={this.handleModalClose}
          {...this.state}
        />
      </div>
    );
  }
}

DeptTaskListTableDisplay.propTypes = {
  result: PropTypes.arrayOf(PropTypes.object),
};

export default DeptTaskListTableDisplay;
