import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Label } from 'semantic-ui-react';
import 'react-table/react-table.css';
import PropTypes from 'prop-types';
import { outCallStatusColorMap } from '../../../../../../utils/constants';
import _ from 'lodash';


class TaskMonitorTableDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIdx: undefined,
    };
    this.test = this.test.bind(this);
  }

  test(task) {
    return {
      'branch': task.branch,
      'department': task.department,
      'type': task.type,
      'status': task.status,
      'amount': task.amount
    };
  };

  render() {
    const {lang, result} = this.props;
    let listOfTasks = [];
    if(result) {
      let singleObj = {}
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
                      singleObj['status'] = result.taskStatusList[status][lang];
                      singleObj['amount'] = amount;
                      const temp = this.test(singleObj);
                      listOfTasks.push(temp);
                    }
                  )
                }
              )
            }
          )
        }
      )
    }
    console.log("listOfTasks", listOfTasks)
    return (
      <div>
        Hello world!!!
      </div>
    );
  }
}

TaskMonitorTableDisplay.propTypes = {
  result: PropTypes.arrayOf(PropTypes.object),
};

export default TaskMonitorTableDisplay;
