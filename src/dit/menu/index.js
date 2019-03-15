import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Segment, Button, Container, Modal } from 'semantic-ui-react';
import AddNode from './addNode';
import {
  fetchCurrentMenu,
  pyramidTreeChanged,
  fetchBlank,
  newPyramid,
  deletePyramid,
  updateNodeItem,
  onMoveNode,
} from './menuAction';
import SortableTree, {
  removeNodeAtPath,
  addNodeUnderParent,
  changeNodeAtPath,
} from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import OutputErrors from '../../general/error/outputErrors';
import UpdateMenuNode from './updateNode';

const getNodeKey = ({ node: { id } }) => id;

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteModal: false,
      showUpdateModal: false,
      nodeForDelete: null,
      deleteNotifyTxt: '',
      removeNotifyTxt: '',
      nodeForEdit: {},
      addModalOpened: false,
    };
    this.onChanged = this.onChanged.bind(this);
  }

  componentWillMount() {
    this.props.fetchCurrentMenu();
  }

  handleChange(fieldName, o) {
    const nodeForEdit = Object.assign({}, this.state.nodeForEdit);
    switch (fieldName) {
      case 'name':
        nodeForEdit.title = o.value;
        break;
      case 'en':
        nodeForEdit.subtitle[0] = o.value;
        break;
      case 'tr':
        nodeForEdit.subtitle[1] = o.value;
        break;
    }

    this.setState({
      ...this.state,
      nodeForEdit,
    });
  }

  submitUpdate() {
    const nodeForEdit = Object.assign({}, this.state.nodeForEdit);
    nodeForEdit.path = this.state.currentItemPath;

    this.props.updateNodeItem(nodeForEdit);
    this.setState({
      ...this.state,
      showUpdateModal: false,
    });
    // this.props.pyramidTreeChanged(a || this.props.treeData);
  }

  newNode(node) {
    node.path = this.state.currentItemPath;
    console.log('node ', node);
    this.props.newPyramid(node);
  }

  onChanged(a) {
    console.log('a ', a);
    this.props.pyramidTreeChanged(a);
  }

  changeWeight = ({ ...args }) => {
    console.log('ARGUMENTS', args);
    if (
      args.nextTreeIndex !== args.prevTreeIndex &&
      JSON.stringify(args.prevPath) === JSON.stringify(args.nextPath)
    ) {
      if (args.nextParentNode) {
        let changeNode;
        if (args.prevTreeIndex < args.nextTreeIndex) {
          for (let i = 0; i < args.nextParentNode.children.length; i++) {
            if (args.nextParentNode.children[i].id === args.node.id) {
              changeNode = args.nextParentNode.children[i - 1];
              break;
            }
          }
          this.props.onMoveNode(args.node, changeNode);
        } else {
          for (let x = args.nextParentNode.children.length - 1; x >= 0; x--) {
            if (args.nextParentNode.children[x].id === args.node.id) {
              changeNode = args.nextParentNode.children[x + 1];
              break;
            }
          }
          this.props.onMoveNode(args.node, changeNode);
        }
      } else {
        if (args.prevTreeIndex > args.nextTreeIndex) {
          this.props.onMoveNode(
            args.node,
            this.props.treeData[args.treeIndex + 1],
          );
        } else {
          this.props.onMoveNode(
            args.node,
            this.props.treeData[args.treeIndex - 1],
          );
        }
      }
    }
  };

  render() {
    const treeData = this.props.treeData || [];

    return (
      <div>
        <div id="transaction">
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
              <Header as="h2" floated="left">
                Список меню
              </Header>
            </Segment>
            <OutputErrors errors={this.state.errors} />
          </Container>
          <div className="ui grid">
            <div className="two wide column">
              {this.renderDeleteNotifyModal()}
            </div>
            <div className="twelve wide column">
              <AddNode
                addModalOpened={this.state.addModalOpened}
                addFormModal={this.addFormModal.bind(this)}
                newNode={this.newNode.bind(this)}
                item={this.props.item}
              />

              <Segment clearing>
                <div style={{ height: 700 }}>
                  <SortableTree
                    onMoveNode={args => this.changeWeight(args)}
                    getNodeKey={({ node }) => node.id}
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
                            this.showUpdateModal(node);
                          }}
                        />,
                        <Button
                          icon={'plus'}
                          size={'mini'}
                          onClick={() => {
                            this.setState({
                              ...this.state,
                              currentItemPath: path,
                            });
                            this.props.fetchBlank(node.id);
                            this.addFormModal(true);
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
                          onClick={() => {
                            this.showDeteleModal(node, path);
                          }}
                        />,
                      ],
                    })}
                  />
                </div>
              </Segment>
            </div>
            <div className="two wide column">
              <UpdateMenuNode
                nodeForEdit={this.state.nodeForEdit}
                submitUpdate={this.submitUpdate.bind(this)}
                showUpdateModal={this.state.showUpdateModal}
                close={this.close.bind(this)}
                handleChange={this.handleChange.bind(this)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  addFormModal(truefalse) {
    this.setState({
      ...this.state,
      addModalOpened: truefalse,
    });
  }

  resetDelete() {
    this.setState({
      ...this.state,
      showDeleteModal: false,
      nodeForDelete: null,
      deleteNotifyTxt: '',
      updatedTree: [],
    });
  }

  deletePyramid() {
    const { nodeForDelete } = this.state;
    console.log('nodeForDelete ', nodeForDelete);
    this.props.deletePyramid(nodeForDelete);
    this.resetDelete();
  }

  showDeteleModal(node, path) {
    const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
    const language = localStorage.getItem('language');
    console.log('node2 ', node);
    console.log('path2 ', path);
    node.path = path;
    console.log('node3 ', node);
    let errors = [];
    if (node.children === undefined || node.children.length == 0) {
      this.setState({
        ...this.state,
        showDeleteModal: true,
        nodeForDelete: node,
        deleteNotifyTxt: node.title,
        errors,
      });
    } else {
      errors.push(errorTable['112' + language]);
      this.setState({ errors });
    }
  }

  renderDeleteNotifyModal() {
    return (
      <Modal open={this.state.showDeleteModal} size={'small'}>
        <Header>Предупреждение!</Header>
        <Modal.Content>
          <h3>
            {'Вы действительно хотите удалить '} {this.state.deleteNotifyTxt}{' '}
            {' ?'}{' '}
          </h3>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.resetDelete.bind(this)}>Нет</Button>
          <Button color="red" onClick={this.deletePyramid.bind(this)}>
            Да
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

  showUpdateModal(node) {
    this.setState({
      ...this.state,
      showUpdateModal: true,
      nodeForEdit: node,
    });
  }
  close = () => this.setState({ showUpdateModal: false });
}

function mapStateToProps(state) {
  return {
    treeData: state.menuReducer.treeData,
    item: state.menuReducer.item,
  };
}

export default connect(
  mapStateToProps,
  {
    onMoveNode,
    fetchCurrentMenu,
    pyramidTreeChanged,
    fetchBlank,
    newPyramid,
    deletePyramid,
    updateNodeItem,
  },
)(Menu);
