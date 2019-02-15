import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Icon } from 'semantic-ui-react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import matchSorter from 'match-sorter';

// pull in the HOC
import treeTableHOC from 'react-table/lib/hoc/treeTable';
const TreeTable = treeTableHOC(ReactTable);

export default function ListTable(props) {
  const columns = [
    {
      Header: 'parent_id',
      id: 'parent_id',
      accessor: d => d.parent_id,
      width: 100,
      maxWidth: 200,
      minWidth: 100,
    },
    {
      Header: 'Название (рус)',
      accessor: 'name_ru',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['name_ru'] }),
      filterAll: true,
    },
    {
      Header: 'Название (En)',
      accessor: 'name_en',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['name_en'] }),
      filterAll: true,
    },
    {
      Header: 'Название (Tr)',
      accessor: 'name_tr',
      filterMethod: (filter, rows) =>
        matchSorter(rows, filter.value, { keys: ['name_tr'] }),
      filterAll: true,
    },
  ];
  console.log('props ', props.currentMenu);
  return (
    <div>
      <div id="table_style">
        <div className="list_table_header" />
        <div>
          <TreeTable
            filterable
            defaultFilterMethod={(filter, row, column) => {
              console.log('filter ', filter);
              console.log('row ', row);
              console.log('column ', column);
              const id = filter.pivotId || filter.id;
              return row[id] !== undefined
                ? String(row[id])
                    .toLowerCase()
                    .includes(filter.value.toLowerCase())
                : true;
            }}
            data={props.currentMenu}
            pivotBy={['parent_id']}
            columns={columns}
          />
          list table menu
        </div>
      </div>
    </div>
  );
}
