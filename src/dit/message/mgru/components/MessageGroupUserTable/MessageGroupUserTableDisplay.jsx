import React from 'react';
import ReactTable from 'react-table';
import { Button, Icon } from 'semantic-ui-react';
import 'react-table/react-table.css';
import { constructFullName } from '../../../../../utils/helpers';

const MessageGroupUserTableDisplay = (props) => {
  const { 
    messageGroupUserList = [], 
    removeMessageGroupUser, 
    fetchMessageGroupUsers, 
    open, lang,
    messages } = props;
  const {formatMessage} = props.intl;

  const columns = [
    // {
    //   Header: 'ID',
    //   accessor: 'mguId',
    //   maxWidth: 50,
    // },
    {
      Header: messages.L__GROUP,
      id: 'groupId',
      accessor: 'messageGroup.groupName',
      maxWidth: 100,
    },
    {
      Header: 'Username',
      accessor: 'user.username',
      maxWidth: 100,
    },
    {
      Header: messages.L__USER,
      id: 'fullName',
      accessor: item => item.user && constructFullName(item.user),
    },
    {
      Header: messages.L__BRANCH,
      id: 'branchName',
      accessor: item => item.branch && item.branch.value,
      maxWidth: 160,
    },
    {
      Header: formatMessage({ id: 'Table.Department' }),
      id: 'departmentName',
      accessor: item => item.department[lang],
      maxWidth: 160,
    },
    {
      Header: messages.TBL_H__MANAGER,
      id: 'supervisorName',
      accessor: item => item.supervisor && constructFullName(item.supervisor),
    },
    {
      accessor: 'mguId',
      maxWidth: 50,
      Cell: (row) => {
        const { mguId, messageGroup, user, branch, department, supervisor } = row.original;
        const modalData = {
          mguId,
          groupId: messageGroup.groupId,
          // userId: user.id,
          // companyId: user.bukrs,
          branchId: branch.id,
          departmentId: department.id,
          supervisorId: supervisor.id
        };
        return (
          <div style={{ textAlign: 'center' }}>
            <Button.Group icon size="mini">
              {/* <Button
                icon="edit"
                size="mini"
                onClick={() => open('edit', modalData)}
              /> */}
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
      filterable
      defaultFilterMethod={(filter, row, column) => {
        const id = filter.pivotId || filter.id
        return row[id] !== undefined ? String(row[id]).toLowerCase().startsWith(filter.value) : true
      }}
      pageSizeOptions={[10, 15, 20]}
      defaultPageSize={10}
      defaultSorted={[{ id: 'groupId' }]}
      previousText={messages.previousText}
      nextText={messages.nextText}
      loadingText={messages.loadingText}
      noDataText={messages.noDataText}
      pageText={messages.pageText}
      ofText={messages.ofText}
      rowsText={messages.rowsText}
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
