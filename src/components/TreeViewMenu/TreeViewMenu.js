import React, { Component } from "react"
import { Link } from 'react-router'
import TreeView from 'react-treeview'
import 'react-treeview/react-treeview.css'
import './TreeViewMenu.css'


class TreeViewMenu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            list: [],
            selectedNode: {}
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(id) {
        console.log(id)
        // node.collapsed = false
        id.collapse = !id.collapse
        this.setState({...this.state, selectedNode: id})
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.list !== nextProps.list) {
            this.setState({
                ...this.state,
                list: [...nextProps.list]
            })
            console.log("componentWillReceiveProps executed")
        }
    }

    traverse(node, i) {
        if (node.leaf) {
            return (
                <div key={node.name} 
                    onClick={() => {this.handleClick(node)}}
                    className={`leaf ${(node === this.state.selectedNode ? 'node-active' : '')}`}>
                    <i className="file text outline icon"></i>
                    <Link to={node.link}>{node.translations[this.props.lang]}</Link>
                </div>
            )
        } else {
            if (!node.hasOwnProperty('collapse')) {
                node.collapse = true
            }
            const label =
            <span className={`node ${(node === this.state.selectedNode ? 'node-active' : '')}`} 
                key={node.name}
                onClick={() => {this.handleClick(node)}}>{node.translations[this.props.lang]}</span>
            return (
                <TreeView 
                    key={node.name} 
                    nodeLabel={label} 
                    collapsed={node.collapse} >
                    {node.children.map((el, i) => this.traverse(el, i))}
                </TreeView>
            )
        }
    }


    render() {
        return (
            <div className="menu-container">
                {this.state.list.map(el => this.traverse(el))}
            </div>
        )
    }
}

export default TreeViewMenu