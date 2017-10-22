import React, { Component } from "react"
import { Link } from 'react-router'
import TreeView from 'react-treeview'
import { connect } from 'react-redux'
import 'react-treeview/react-treeview.css'
import './TreeViewMenu.css'
import { breadcrumbChanged } from "../../actions/tree_menu";
import { LEGACY_SYSTEM_URL } from "../../utils/constants"


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
        id.collapse = !id.collapse
        this.setState({...this.state, selectedNode: id})


        if (id.leaf) {
            // Bottom-Up approach to gather the breadcrumb
            const menuItemNames = [];
            for (let n = id; n; n = n.parent) {
                menuItemNames.push(n.translations);
            }
            const breadcrumb = menuItemNames.reverse();
            this.props.breadcrumbChanged(breadcrumb);
        }
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
            let nodeName = node.translations[this.props.lang]
            return (
                <div key={node.name} 
                    onClick={() => {this.handleClick(node)}}
                    className={`leaf ${(node === this.state.selectedNode ? 'node-active' : '')}`}>
                    <i className="file text outline icon"></i>
                    {(node.link.endsWith('.xhtml') ?
                        <Link target='_blank' to={`${LEGACY_SYSTEM_URL}/${node.link}`}>{nodeName}</Link> :
                        <Link to={node.link}>{nodeName}</Link>
                    )}
                    
                </div>
            )
        } else {
            if (!node.hasOwnProperty('collapse')) {
                node.collapse = true
            }
            node.children.map((child) => {child.parent = node})
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

export default connect(null, { breadcrumbChanged })(TreeViewMenu);