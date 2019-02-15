import React, { Component } from 'react';
import {
  Container,
  Divider,
  Header,
  Button,
  Segment,
  Form,
  Grid,
  Modal,
} from 'semantic-ui-react';
import SortableTree, {
  removeNodeAtPath,
  changeNodeAtPath,
  addNodeUnderParent,
} from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import { connect } from 'react-redux';

import {
  fetchBukrsPyramidsTree,
  pyramidTreeChanged,
  deletePyramid,
  blankItem,
  toggleFormModal,
  removeStaffFromEmployee,
  fetchItem,
} from '../actions/hrPyramidAction';
import BukrsF4 from '../../../../reference/f4/bukrs/BukrsF4';
import {
  f4FetchPositionList,
  f4FetchBusinessAreaList,
  f4FetchDepartmentList,
} from '../../../../reference/f4/f4_action';
import { fetchAllCurrentStaffs } from '../../staff/actions/hrStaffAction';
import PyramidFormModal from './PyramidFormModal';
import { notify } from '../../../../general/notification/notification_action';

const getNodeKey = ({ node: { id } }) => id;

class PyramidTreePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bukrs: null,
      showDeleteModal: false,
      nodeForDelete: null,
      deleteNotifyTxt: '',
      removeNotifyTxt: '',
      showRemoveModal: false,
      nodeForRemove: null,
      updatedTree: [],
      currentItemPath: [],
    };

    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.onChanged = this.onChanged.bind(this);
    this.showDeteleModal = this.showDeteleModal.bind(this);
    this.resetDelete = this.resetDelete.bind(this);
    this.deletePyramid = this.deletePyramid.bind(this);
    this.prepareForCreate = this.prepareForCreate.bind(this);
    this.loadTreeData = this.loadTreeData.bind(this);
    this.handleAfterCreating = this.handleAfterCreating.bind(this);
    this.handleAfterUpdating = this.handleAfterUpdating.bind(this);
  }

  componentWillMount() {
    this.props.f4FetchPositionList('hr_pyramid');
    this.props.f4FetchBusinessAreaList();
    this.props.f4FetchDepartmentList();
  }

  handleDropdownChange(e, o) {
    let { name, value } = o;
    let { bukrs } = this.state;
    switch (name) {
      case 'bukrs':
        bukrs = value;
        break;

      default:
        break;
    }

    this.setState({
      ...this.state,
      bukrs: bukrs,
    });
  }

  handleAfterCreating(newNode, parentKey) {
    let a = addNodeUnderParent({
      treeData: this.props.treeData,
      newNode: newNode,
      parentKey: parentKey,
      getNodeKey: getNodeKey,
    });

    this.props.pyramidTreeChanged(a['treeData'] || this.props.treeData);
  }

  handleAfterUpdating(newNode) {
    let path = this.state.currentItemPath;
    let a = changeNodeAtPath({
      treeData: this.props.treeData,
      path,
      getNodeKey,
      newNode: newNode,
    });
    this.props.pyramidTreeChanged(a || this.props.treeData);
  }

  renderSearchPanel() {
    return (
      <div>
        <Header as="h4" attached="top">
          Расширенный поиск
        </Header>
        <Segment attached>
          <Form>
            <BukrsF4 handleChange={this.handleDropdownChange} />

            <Button onClick={() => this.loadTreeData()} type="submit">
              Сформировать
            </Button>
          </Form>
        </Segment>
      </div>
    );
  }

  loadTreeData() {
    if (!this.state.bukrs) {
      this.props.notify('error', 'Выберите компанию', 'Ошибка');
      return;
    }
    this.props.fetchBukrsPyramidsTree(this.state.bukrs);
    this.props.fetchAllCurrentStaffs({ bukrs: this.state.bukrs });
  }

  onChanged(a) {
    this.props.pyramidTreeChanged(a);
  }

  showDeteleModal(node, updatedTree) {
    this.setState({
      ...this.state,
      showDeleteModal: true,
      nodeForDelete: node,
      deleteNotifyTxt: 'Вы действительно хотите удалить ' + node.title + ' ?',
      updatedTree: updatedTree,
    });
  }

  showRemoveModal = (node, updatedTree) => {
    //console.log(node)
    this.setState({
      ...this.state,
      showRemoveModal: true,
      nodeForRemove: node,
      removeNotifyTxt:
        'Вы действительно хотите удалить сотрудника ' + node.title + ' ?',
      updatedTree: updatedTree,
    });
  };

  resetDelete() {
    this.setState({
      ...this.state,
      showDeleteModal: false,
      nodeForDelete: null,
      deleteNotifyTxt: '',
      updatedTree: [],
    });
  }

  resetRemove = () => {
    this.setState({
      ...this.state,
      showRemoveModal: false,
      nodeForRemove: null,
      removeNotifyTxt: '',
      updatedTree: [],
    });
  };

  deletePyramid() {
    const { nodeForDelete, updatedTree } = this.state;
    this.props.deletePyramid(nodeForDelete.id, () => {
      this.props.pyramidTreeChanged(updatedTree);
    });

    this.resetDelete();
  }

  removeStaff = () => {
    const { nodeForRemove, updatedTree } = this.state;
    this.props.removeStaffFromEmployee(nodeForRemove.id, () => {
      this.props.pyramidTreeChanged(updatedTree);
    });

    this.resetRemove();
  };

  renderDeleteNotifyModal() {
    return (
      <Modal open={this.state.showDeleteModal} size={'small'}>
        <Header>Предупреждение!</Header>
        <Modal.Content>
          <h3>{this.state.deleteNotifyTxt}</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.resetDelete}>Нет</Button>
          <Button color="red" onClick={this.deletePyramid}>
            Да
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

  renderRemoveNotifyModal = () => {
    return (
      <Modal open={this.state.showRemoveModal} size={'small'}>
        <Header>Предупреждение (удаление сотрудника)!</Header>
        <Modal.Content>
          <h3>{this.state.removeNotifyTxt}</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.resetRemove}>Нет</Button>
          <Button color="red" onClick={this.removeStaff}>
            Да
          </Button>
        </Modal.Actions>
      </Modal>
    );
  };

  prepareForCreate(parentId) {}

  render() {
    const treeData = this.props.treeData || [];
    const getNodeKey = ({ node: { id } }) => id;
    return (
      <Container
        fluid
        style={{
          marginTop: '2em',
          marginBottom: '2em',
          paddingLeft: '2em',
          paddingRight: '2em',
        }}
      >
        <Segment clearing>
          <Header as="h3" block floated={'left'}>
            Иерархия
          </Header>
        </Segment>
        <Divider />
        <Grid>
          <Grid.Column floated="left" width={4}>
            {this.renderSearchPanel()}
            {this.renderDeleteNotifyModal()}
            {this.renderRemoveNotifyModal()}
          </Grid.Column>

          <Grid.Column floated="left" width={12}>
            <PyramidFormModal
              handleAfterCreating={this.handleAfterCreating}
              handleAfterUpdating={this.handleAfterUpdating}
            />
            <div style={{ height: 1000 }}>
              <SortableTree
                getNodeKey={getNodeKey}
                treeData={treeData}
                onChange={treeData => this.onChanged(treeData)}
                generateNodeProps={({ node, path }) => ({
                  buttons: [
                    <Button
                      icon={'pencil'}
                      size={'mini'}
                      onClick={() => {
                        this.setState({
                          ...this.state,
                          currentItemPath: path,
                        });
                        this.props.fetchItem(node.id);
                        this.props.toggleFormModal(true);
                      }}
                    />,
                    <Button
                      icon={'plus'}
                      size={'mini'}
                      onClick={() => {
                        this.props.blankItem(node.id);
                        this.props.toggleFormModal(true);
                      }}
                    />,
                    <Button size={'mini'}>
                      {node.children ? node.children.length : 0}/
                      {node.childLimit || '-'}
                    </Button>,
                    <Button
                      icon={'trash'}
                      color={'red'}
                      size={'mini'}
                      onClick={() =>
                        this.showDeteleModal(
                          node,
                          removeNodeAtPath({
                            treeData: this.props.treeData,
                            path,
                            getNodeKey,
                          }),
                        )
                      }
                    />,
                    <Button
                      icon={'remove user'}
                      size={'mini'}
                      color={'red'}
                      onClick={() =>
                        this.showRemoveModal(
                          node,
                          changeNodeAtPath({
                            treeData: this.props.treeData,
                            path,
                            getNodeKey,
                            newNode: { ...node, title: '' },
                          }),
                        )
                      }
                    />,
                  ],
                })}
              />
            </div>
          </Grid.Column>
        </Grid>
        <Divider />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    treeData: state.hrPyramid.treeData,
    item: state.hrPyramid.item,
  };
}

export default connect(
  mapStateToProps,
  {
    fetchBukrsPyramidsTree,
    pyramidTreeChanged,
    deletePyramid,
    blankItem,
    f4FetchPositionList,
    f4FetchDepartmentList,
    f4FetchBusinessAreaList,
    toggleFormModal,
    fetchAllCurrentStaffs,
    removeStaffFromEmployee,
    fetchItem,
    notify,
  },
)(PyramidTreePage);
