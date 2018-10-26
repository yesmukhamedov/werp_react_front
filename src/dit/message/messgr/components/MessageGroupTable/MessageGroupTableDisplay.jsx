import React from 'react';
import ReactTable from 'react-table';
import { Button } from 'semantic-ui-react';
import 'react-table/react-table.css';

const MessageGroupTableDisplay = (props) => {
  const { messageGroupList = [], removeMessageGroup, fetchMessageGroups } = props;

  const columns = [
    {
      Header: 'ID',
      accessor: 'groupId',
      maxWidth: 50,
    },
    {
      Header: 'Название',
      accessor: 'groupName',
    },
    {
      maxWidth: 50,
      Cell: row => (
        <Button
          icon="remove"
          size="mini"
          onClick={() => removeMessageGroup(row.original.groupId, () => fetchMessageGroups())}
        />
      ),
    },
  ];

  return (
    <ReactTable
      data={messageGroupList}
      columns={columns}
      pageSizeOptions={[7, 10, 15, 20]}
      defaultPageSize={7}
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

export default MessageGroupTableDisplay;
