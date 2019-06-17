import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Header,
  Segment,
  Button,
  Container,
  Modal,
  Icon,
} from 'semantic-ui-react';
import AddNode from './addNode';
import {
  fetchCurrDmulst,
  treeDmuChanged,
  getBlankDmu,
  newDmuNode,
  deleteDmuNode,
  updDmuNode,
  onMoveDmuNode,
} from './../ditAction';
import { fetchCurrDtrLst } from '../ditAction';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import OutputErrors from '../../general/error/outputErrors';
import UpdateMenuNode from './updateNode';
import { injectIntl } from 'react-intl';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUpdateModal: false,
      showAddModal: false,
      showDeleteModal: false,
      nodeForDelete: null,
      deleteNotifyTxt: '',
      removeNotifyTxt: '',
      nodeForEdit: {},
    };
    this.onChanged = this.onChanged.bind(this);
  }

  componentWillMount() {
    this.props.fetchCurrDmulst();
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

  newNode(node) {
    node.path = this.state.currentItemPath;
    this.props.newDmuNode(node);
  }

  addFormModal(truefalse) {
    this.setState({
      ...this.state,
      showAddModal: truefalse,
    });
  }

  onChanged(a) {
    this.props.treeDmuChanged(a);
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
          this.props.onMoveDmuNode(args.node, changeNode);
        } else {
          for (let x = args.nextParentNode.children.length - 1; x >= 0; x--) {
            if (args.nextParentNode.children[x].id === args.node.id) {
              changeNode = args.nextParentNode.children[x + 1];
              break;
            }
          }
          this.props.onMoveDmuNode(args.node, changeNode);
        }
      } else {
        if (args.prevTreeIndex > args.nextTreeIndex) {
          this.props.onMoveDmuNode(
            args.node,
            this.props.treeData[args.treeIndex + 1],
          );
        } else {
          this.props.onMoveDmuNode(
            args.node,
            this.props.treeData[args.treeIndex - 1],
          );
        }
      }
    }
  };

  render() {
    const treeData = this.props.treeData || [];
    const { messages } = this.props.intl;
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
                {messages['menu_list']}
              </Header>
              <Button
                floated="right"
                color="teal"
                onClick={() => {
                  this.props.getBlankDmu(0);
                  this.props.fetchCurrDtrLst();
                  this.addFormModal(true);
                }}
              >
                <Icon name="plus" /> {messages['BTN__ADD']}
              </Button>
            </Segment>
            <OutputErrors errors={this.state.errors} />
          </Container>
          <div className="ui grid">
            <div className="two wide column">
              {this.renderDeleteNotifyModal()}
            </div>
            <div className="twelve wide column">
              <AddNode
                showAddModal={this.state.showAddModal}
                addFormModal={this.addFormModal.bind(this)}
                newNode={this.newNode.bind(this)}
                blankMenuNode={this.props.blankMenuNode}
                currTrans={this.props.currTrans}
                messages={messages}
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
                            this.props.getBlankDmu(node.id);
                            this.props.fetchCurrDtrLst();
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
                messages={messages}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /****************************************************************** UPDATE NODE */
  submitUpdate() {
    const nodeForEdit = Object.assign({}, this.state.nodeForEdit);
    nodeForEdit.path = this.state.currentItemPath;
    this.props.updDmuNode(nodeForEdit);
    this.setState({
      ...this.state,
      showUpdateModal: false,
    });
  }

  showUpdateModal(node) {
    this.setState({
      ...this.state,
      showUpdateModal: true,
      nodeForEdit: node,
    });
  }
  close = () => this.setState({ showUpdateModal: false });

  /****************************************************************** DELETE NODE */
  showDeteleModal(node, path) {
    const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
    const language = localStorage.getItem('language');
    node.path = path;
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
        <Header>{this.props.intl.messages['Crm.DeleteWarningHeader']} !</Header>
        <Modal.Content>
          <h3>
            {this.props.intl.messages['Crm.ConfirmDelete']}{' '}
            {this.state.deleteNotifyTxt}
          </h3>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.resetDelete.bind(this)}>
            {this.props.intl.messages['BTN__NO']}
          </Button>
          <Button color="red" onClick={this.deletePyramid.bind(this)}>
            {this.props.intl.messages['BTN__YES']}
          </Button>
        </Modal.Actions>
      </Modal>
    );
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
    this.props.deleteDmuNode(nodeForDelete);
    this.resetDelete();
  }
}

function mapStateToProps(state) {
  return {
    treeData: state.ditReducer.treeData,
    blankMenuNode: state.ditReducer.blankMenuNode,
    currTrans: state.ditReducer.currTrans,
  };
}

export default connect(
  mapStateToProps,
  {
    onMoveDmuNode,
    fetchCurrDmulst,
    treeDmuChanged,
    getBlankDmu,
    newDmuNode,
    deleteDmuNode,
    updDmuNode,
    fetchCurrDtrLst,
  },
)(injectIntl(Menu));
