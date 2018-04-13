import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Container,Divider,Header,Button,Segment,Form,Grid,Input,Modal} from 'semantic-ui-react';
import SortableTree, {removeNodeAtPath} from 'react-sortable-tree'
import 'react-sortable-tree/style.css'
import { connect } from 'react-redux'

import {fetchBukrsPyramidsTree,pyramidTreeChanged,deletePyramid,blankItem,toggleFormModal} from  '../actions/hrPyramidAction'
import BukrsF4 from '../../../../reference/f4/bukrs/BukrsF4'
import {f4FetchPositionList,f4FetchBusinessAreaList,f4FetchDepartmentList} from '../../../../reference/f4/f4_action'
import PyramidFormModal from './PyramidFormModal'

class PyramidTreePage extends Component {
  constructor (props) {
      super(props)
      this.state = {
          bukrs:null,
          showDeleteModal:false,
          nodeForDelete: null,
          pathForDelete: null,
          deleteNotifyTxt:''
      }

      this.handleDropdownChange = this.handleDropdownChange.bind(this)
      this.onChanged = this.onChanged.bind(this)
      this.showDeteleModal = this.showDeteleModal.bind(this)
      this.resetDelete = this.resetDelete.bind(this)
      this.deletePyramid = this.deletePyramid.bind(this)
      this.prepareForCreate = this.prepareForCreate.bind(this)
    }

    componentWillMount(){
      this.props.f4FetchPositionList('hr_pyramid')
        this.props.f4FetchBusinessAreaList()
        this.props.f4FetchDepartmentList()
    }

    handleDropdownChange (e, o) {
        let {name, value} = o
        let {bukrs} = this.state
        switch (name) {
            case 'bukrs':
                bukrs = value
                break

            default:
                break
        }

        this.setState({
            ...this.state,
            bukrs:bukrs
        })
    }

    renderSearchPanel(){

        return <div>
            <Header as='h4' attached='top'>
                Расширенный поиск
            </Header>
            <Segment attached>
                <Form>
                    <BukrsF4 handleChange={this.handleDropdownChange} />

                    <Button onClick={() => this.props.fetchBukrsPyramidsTree(this.state.bukrs)} type='submit'>Сформировать</Button>
                </Form>
            </Segment>
        </div>
    }

    onChanged(a){
        this.props.pyramidTreeChanged(a)
    }

    showDeteleModal(node,path){
        this.setState({
            ...this.state,
            showDeleteModal: true,
            nodeForDelete: node,
            pathForDelete: path,
            deleteNotifyTxt: 'Вы действительно хотите удалить ' + node.title + ' ?'
        })
    }

    resetDelete(){
        this.setState({
            ...this.state,
            showDeleteModal: false,
            nodeForDelete: null,
            pathForDelete: null,
            deleteNotifyTxt: ''
        })
    }

    deletePyramid(){
        const {pathForDelete,nodeForDelete} = this.state
        const getNodeKey = ({ node: { id } }) => id
        this.props.deletePyramid(nodeForDelete.id)
        // this.props.pyramidTreeChanged(removeNodeAtPath({
        //     treeData: this.props.treeData,
        //     pathForDelete,
        //     getNodeKey
        // }))
        this.resetDelete()
    }

    renderDeleteNotifyModal(){
        return <Modal open={this.state.showDeleteModal} size={'small'}>
            <Header>Предупреждение!</Header>
            <Modal.Content>
                <h3>{this.state.deleteNotifyTxt}</h3>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={this.resetDelete}>Нет</Button>
                <Button color='red' onClick={this.deletePyramid}>
                     Да
                </Button>
            </Modal.Actions>
        </Modal>
    }

    prepareForCreate(parentId){

    }

  render () {
        const treeData = this.props.treeData || []
        const getNodeKey = ({ node: { id } }) => id;
    return (
    <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
        <Segment clearing>
            <Header as='h3' block floated={'left'}>Иерархия</Header>
        </Segment>
        <Divider />
        <Grid>
            <Grid.Column floated='left' width={4}>
                {this.renderSearchPanel()}
                {this.renderDeleteNotifyModal()}
            <PyramidFormModal/>
            </Grid.Column>

            <Grid.Column floated='left' width={12}>
                <div style={{ height: 1000 }}>
                    <SortableTree
                        getNodeKey={getNodeKey}
                        treeData={treeData}
                        onChange={treeData => this.onChanged(treeData)}
                        generateNodeProps={({ node, path }) => ({
                            buttons: [
                                <Button icon={'plus'} size={'mini'}
                                onClick={() => {
                                    this.props.blankItem(node.id)
                                    this.props.toggleFormModal(true)
                                }}
                                />,
                                <Button size={'mini'}>{node.children?node.children.length:0}</Button>,
                                <Button icon={'trash'} color={'red'} size={'mini'}
                                onClick={() => this.showDeteleModal(node,path)}
                                />
                            ],
                        })}
                    />
                </div>
            </Grid.Column>
        </Grid>
        <Divider/>
    </Container>
        )
    }
}

function mapStateToProps (state) {
    return {
        treeData: state.hrPyramid.treeData,
        item:state.hrPyramid.item
    }
}

export default connect(mapStateToProps, {
    fetchBukrsPyramidsTree,pyramidTreeChanged,deletePyramid,blankItem,
    f4FetchPositionList,f4FetchDepartmentList,f4FetchBusinessAreaList,
    toggleFormModal
})(PyramidTreePage)
