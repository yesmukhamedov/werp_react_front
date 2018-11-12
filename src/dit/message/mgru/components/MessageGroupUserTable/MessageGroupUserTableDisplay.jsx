import React from 'react';
import ReactTable from 'react-table';
import { Button, Icon } from 'semantic-ui-react';
import 'react-table/react-table.css';
import { constructFullName } from '../../../../../utils/helpers';

const MessageGroupUserTableDisplay = (props) => {
  const { messageGroupUserList = [], removeMessageGroupUser, fetchMessageGroupUsers, open, lang } = props;

  const columns = [
    // {
    //   Header: 'ID',
    //   accessor: 'mguId',
    //   maxWidth: 50,
    // },
    {
      Header: 'Группа',
      id: 'groupId',
      accessor: 'messageGroup.groupName',
    },
    {
      Header: 'Username',
      accessor: 'user.username',
    },
    {
      Header: 'Пользователь',
      id: 'fullName',
      accessor: item => constructFullName(item.user),
    },
    {
      Header: 'Филиал',
      accessor: 'branch.id',
      maxWidth: 160,
      Cell: (props) => {
        const { branch } = props.original;
        return (
          <div>
            {branch.value}
          </div>
        );
      },
    },
    {
      Header: 'Отдел',
      accessor: 'department.id',
      Cell: (props) => {
        const { department } = props.original;
        return (
          <div>
            {department[lang]}
          </div>
        );
      },
    },
    {
      Header: 'Начальник отдела',
      id: 'supervisor.id',
      accessor: item => constructFullName(item.supervisor),
    },
    {
      accessor: 'mguId',
      maxWidth: 100,
      Cell: (row) => {
        const { mguId, messageGroup, user, branch, department, supervisor } = row.original;
        const modalData = {
          mguId,
          groupId: messageGroup.groupId,
          userId: user.id,
          companyId: user.bukrs,
          branchId: branch.id,
          departmentId: department.id,
          supervisorId: supervisor.id
        };
        return (
          <div style={{ textAlign: 'center' }}>
            <Button.Group icon size="mini">
              <Button
                icon="edit"
                size="mini"
                onClick={() => open('edit', modalData)}
              />
              <Button
                icon="remove"
                size="mini"
                onClick={() => removeMessageGroupUser(mguId, () => fetchMessageGroupUsers())}
              />
            </Button.Group>
          </div>
        );
      },
    },
  ];

  return (
    <ReactTable
      data={messageGroupUserList}
      columns={columns}
      pageSizeOptions={[10, 15, 20]}
      defaultPageSize={10}
      defaultSorted={[{ id: 'groupId' }]}
      previousText="Предыдущий"
      nextText="Следующий"
      loadingText="Загружается..."
      noDataText="Нет записей"
      pageText="Страница"
      ofText="из"
      rowsText="записей"
      className="-highlight"
      getTheadProps={() => ({
        style: {
          background: 'rgba(227,232,238, 1)',
        },
      })}
      showPageSizeOptions={false}
    />
  );
};

export default MessageGroupUserTableDisplay;
