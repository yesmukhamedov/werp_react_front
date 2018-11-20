import React from 'react';
import ReactTable from 'react-table';
import { Button, Icon } from 'semantic-ui-react';
import 'react-table/react-table.css';

const MessageGroupTableDisplay = (props) => {
  const { messageGroupList = [], removeMessageGroup, fetchMessageGroups, open, messages} = props;

  const columns = [
    {
      Header: 'ID',
      accessor: 'groupId',
      maxWidth: 50,
    },
    {
      Header: messages.L__TITLE,
      accessor: 'groupName',
    },
    {
      accessor: 'groupId',
      maxWidth: 100,
      Cell: (row) => {
        const { groupId, groupName } = row.original;
        const modalData = {
          groupId,
          groupName,
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
                onClick={() => removeMessageGroup(groupId, () => fetchMessageGroups())}
              />
            </Button.Group>
          </div>
        );
      },
    },
  ];

  return (
    <ReactTable
      data={messageGroupList}
      columns={columns}
      pageSizeOptions={[7, 10, 15, 20]}
      defaultPageSize={7}
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

export default MessageGroupTableDisplay;
