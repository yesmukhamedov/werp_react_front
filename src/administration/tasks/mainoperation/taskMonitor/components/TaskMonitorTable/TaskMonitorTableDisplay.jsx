import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Label } from 'semantic-ui-react';
import 'react-table/react-table.css';
import PropTypes from 'prop-types';
import { outCallStatusColorMap } from '../../../../../../utils/constants';


class TaskMonitorTableDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIdx: undefined,
    };
    this.deepCopy = this.deepCopy.bind(this);
    this.mapToList = this.mapToList.bind(this);
  }

  deepCopy(task) {
    return {
      'branch': task.branch,
      'department': task.department,
      'type': task.type,
      'status': task.status,
      'amount': task.amount
    };
  }

  mapToList(result, lang) {
    const listOfTasks = [];
    let singleObj = {};
    Object.entries(result.data).forEach(
      ([branch, value1]) => {
        singleObj = {}
        singleObj['branch'] = result.branchList[branch].value;
        Object.entries(value1).forEach(
          ([department, value2]) => {
            singleObj['department'] = result.departmentList[department].value;
            Object.entries(value2).forEach(
              ([type, value3]) => {
                singleObj['type'] = result.taskTypeList[type][lang];
                Object.entries(value3).forEach(
                  ([status, amount]) => {
                    singleObj['status'] = result.taskStatusList[status].id;
                    singleObj['amount'] = amount;
                    const temp = this.deepCopy(singleObj);
                    listOfTasks.push(temp);
                  }
                )
              }
            )
          }
        )
      }
    )
    // console.log(listOfTasks)
    return listOfTasks;
  }

  render() {
    const {lang, result} = this.props;
    let listOfTasks = [];
    if (result) {
      listOfTasks = this.mapToList(result, lang);
    }
    const columns = [
      {
        Header: 'Филиал',
        accessor: 'branch',
      },
      {
        Header: 'Отдел',
        accessor: 'department',
      },
      {
        Header: 'Тип',
        accessor: 'type',
      },
      {
        Header: 'Статус',
        accessor: 'status',
        Cell: (props) => {
          const { status } = props.original;
          return (
            <div>
              <Label
                color={outCallStatusColorMap[status]}
                size="mini"
              >
                {result.taskStatusList[status][lang]}
              </Label>
            </div>
          );
        },
      },
      {
        Header: 'Количество',
        accessor: 'amount',
      },
    ];
    return (<ReactTable
      loading={this.props.loading}
      data={listOfTasks}
      columns={columns}
      pageSizeOptions={[10, 20, 30, 50]}
      defaultPageSize={10}
      // defaultSorted={[
      //   {
      //     id: 'amount',
      //     desc: true,
      //   },
      // ]}
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
                                this.setState({ selectedIdx: rowInfo.index });
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
    />);
  }
}

TaskMonitorTableDisplay.propTypes = {
  result: PropTypes.object,
};

export default TaskMonitorTableDisplay;
