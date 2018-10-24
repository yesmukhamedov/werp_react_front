import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Container,Divider,Header,Button,Segment,Form,Grid,Input} from 'semantic-ui-react';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
import { connect } from 'react-redux'

import {fetchBukrsPyramidsTree,pyramidTreeChanged} from  '../actions/hrPyramidAction'
import BukrsF4 from '../../../../reference/f4/bukrs/BukrsF4'

class PyramidTreePage extends Component {
  constructor (props) {
      super(props)
      this.state = {
          bukrs:null
      }

      this.handleDropdownChange = this.handleDropdownChange.bind(this)
      this.onChanged = this.onChanged.bind(this)
    }

    componentWillMount(){
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
            </Grid.Column>

            <Grid.Column floated='left' width={12}>
                <div style={{ height: 1000 }}>
                    <SortableTree
                        getNodeKey={getNodeKey}
                        treeData={treeData}
                        onChange={treeData => this.onChanged(treeData)}
                        generateNodeProps = {({node,path}) => {
                            buttons:[
                                <button onClick={console.log('asd')}>Test</button>
                            ]
                        }}
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
        treeData: state.hrPyramid.treeData
    }
}

export default connect(mapStateToProps, {fetchBukrsPyramidsTree,pyramidTreeChanged})(PyramidTreePage)
