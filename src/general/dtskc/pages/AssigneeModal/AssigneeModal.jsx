import React, { Component } from 'react';
import { debounce } from 'lodash';
import {
  Modal,
  Form,
  Input,
  Select,
  TextArea,
  Button,
  Divider,
  Search,
  Tab,
  Label,
} from 'semantic-ui-react';
import axios from 'axios';
import AssigneeGroupPane from './AssigneeGroupPane';
import AssigneeOtherPane from './AssigneeOtherPaneComponent';
import AssigneeSearchPaneComponent from'./AssigneeSearchPaneComponent';
import { GET } from '../../../../utils/helpers';
import { ROOT_URL } from '../../../../utils/constants';
import './style.css';

const assigneeSearchUrl = `${ROOT_URL}/api/tasks/assignee?keyword=`;

const panes = [
  {
    menuItem: 'Добавить по группе',
    render: () => (
      <Tab.Pane attached={false}>
        <AssigneeGroupPane />
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Добавить по исполнителю',
    render: (props) => <Tab.Pane attached={false}><AssigneeSearchPaneComponent {...props} /></Tab.Pane>,
  },
  {
    menuItem: 'Добавить по филалу (филиал-отдел-менеджер исполнителя)',
    render: (props) => <Tab.Pane attached={false}><AssigneeOtherPane {...props} /></Tab.Pane>,
  },
];

class AssigneeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      assigneesList: [],
      selectedAssignee: '',
    };
  }

  render() {
    const { modalOpen, toggleAssigneeModal } = this.props;
    return (
      <Modal open={modalOpen} onClose={() => toggleAssigneeModal(modalOpen)}>
        <Modal.Header>Select assignees</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Tab menu={{ attached: false }} panes={panes} {...this.props} />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }

  // componentWillMount() {
  //   this.resetComponent()
  // }

  // resetComponent = () => this.setState({ isLoading: false, assigneesList: [], selectedAssignee: '' })

  // handleResultSelect = (e, { result }) => this.setState({ selectedAssignee: result.title })

  // handleSearchChange = (e, { value }) => {
  //   console.log(value)
  //   // this.setState({ isLoading: true, selectedAssignee: value })

  //   // cancel the previous request
  //   if (typeof this._source != typeof undefined) {
  //     this._source.cancel('Operation canceled due to new request.')
  //   }

  //   // save the new request for cancellation
  //   this._source = axios.CancelToken.source();

  //   // if (this.state.selectedAssignee.length < 1) return this.resetComponent()
  //   const req = axios.get(`${assigneeSearchUrl}${value}`, {
  //     headers: { authorization: localStorage.getItem('token') },
  //     cancelToken: this._source.token,
  //   })

  //   req
  //     .then(({ data }) => {
  //       const assignees = data.map((el, idx) => ({
  //         key: idx,
  //         title: el.fio,
  //         description: el.text,
  //         price: "",
  //         image: "",
  //       }));
  //       this.setState({
  //         isLoading: false,
  //         assigneesList: assignees,
  //         selectedAssignee: value,
  //       });
  //     })
  //     .catch(error => {
  //       if (axios.isCancel(error)) {
  //         console.log('Request canceled', error);
  //       } else {
  //         console.log(error);
  //       }
  //     })
  // }

  // render() {
  //   const {
  //     modalOpen,
  //     toggleAssigneeModal,
  //     branchOpts,
  //     deptOpts,
  //     managerOpts,
  //     selectedCompany,
  //   } = this.props;
  //   return (
  //     <Modal open={modalOpen} onClose={() => toggleAssigneeModal(modalOpen)}>
  //       <Modal.Header>Select assignees</Modal.Header>
  //       <Modal.Content>
  //         <Modal.Description>
  //           <Form>
  //             <Form.Group widths="equal">
  //               <Form.Field
  //                 control={Select}
  //                 options={genderOptions}
  //                 label={{
  //                   children: 'Groups',
  //                   htmlFor: 'form-select-control-group',
  //                 }}
  //                 placeholder="Select Groups"
  //                 //   search
  //                 //   searchInput={{ id: 'form-select-control-group' }}
  //               />
  //             </Form.Group>
  //             <Divider horizontal>DIVIDER</Divider>
  //             <Form.Group widths="equal">
  //               {/* <Form.Field
  //                 id="form-input-control-assignee"
  //                 control={Select}
  //                 options={this.state.assigneesList}
  //                 label={{
  //                   children: 'assignees',
  //                   htmlFor: 'form-select-control-assignee',
  //                 }}
  //                 placeholder="Select assignee"
  //                 search
  //                 searchInput={{ id: 'form-select-control-assignee' }}
  //                 onSearchChange={_.debounce(this.handleSearchAssigneeChange, 500)}
  //               /> */}
                // <Search
                //   className="dtskc-search"
                //   // category
                //   onResultSelect={this.handleResultSelect}
                //   onSearchChange={debounce(this.handleSearchChange, 800, { leading: true })}
                //   results={this.state.assigneesList}
                //   resultRenderer={resultRenderer}
                //   // value={this.state.selectedAssignee}
                // />

  //             </Form.Group>
  //             <Form.Group widths="equal">
  //               <Form.Field
  //                 id="form-input-control-branch"
  //                 control={Select}
  //                 label="Branch"
  //                 placeholder="Branch"
  //                 options={selectedCompany && branchOpts[selectedCompany]}
  //               />
  //               <Form.Field
  //                 id="form-input-control-department"
  //                 control={Select}
  //                 label="Department"
  //                 placeholder="Department"
  //                 options={deptOpts}
  //               />
  //               <Form.Field
  //                 id="form-input-control-assignee-manager"
  //                 control={Select}
  //                 label="Assignee Manager"
  //                 placeholder="Assignee Manager"
  //                 options={managerOpts}
  //               />
  //             </Form.Group>
  //           </Form>
  //         </Modal.Description>
  //       </Modal.Content>
  //     </Modal>
  //   );
  // }
}

export default AssigneeModal;
