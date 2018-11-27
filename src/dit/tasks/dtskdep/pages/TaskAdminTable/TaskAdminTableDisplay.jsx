import React from 'react';
import ReactTable from 'react-table';
import { Button } from 'semantic-ui-react';
import 'react-table/react-table.css';
import { constructFullName } from '../../../../../utils/helpers';

const TaskAdminTableDisplay = (props) => {
  const { taskAdminList = [], lang, removeTaskAdmin, fetchTaskAdmins, messages } = props;
  const {formatMessage} = props.intl;
  
  const columns = [
    {
      Header: '#',
      accessor: 'id',
      maxWidth: 50,
    },
    {
      Header: messages.L__USER,
      id: 'fullName',
      accessor: item => constructFullName(item.user),
    },
    {
      Header: formatMessage({ id: 'Table.Department' }),
      id: 'department',
      accessor: item => item.department[lang],
    },
    {
      maxWidth: 50,
      Cell: row => (
        <Button
          icon="remove user"
          size="mini"
          onClick={() => removeTaskAdmin(row.original.id, () => fetchTaskAdmins(lang))}
        />
      ),
    },
  ];

  return (
    <ReactTable
      data={taskAdminList}
      columns={columns}
      pageSizeOptions={[15, 20, 30, 50]}
      defaultPageSize={15}
      defaultSorted={[{ id: 'id' }]}
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
    />
  );
};

export default TaskAdminTableDisplay;
