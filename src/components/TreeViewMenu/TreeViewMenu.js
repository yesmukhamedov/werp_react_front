import React, {Component} from "react"
import {Link} from 'react-router-dom'
import TreeView from 'react-treeview'
import 'react-treeview/react-treeview.css'
import './TreeViewMenu.css'
import {LEGACY_URL} from "../../utils/constants"
import {calcBreadcrumb} from "../../utils/helpers";

export default class TreeViewMenu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            list: [],
            selectedNode: {}
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(node) {
        node.collapse = !node.collapse
        this.setState({...this.state, selectedNode: node})        

        if (node.leaf) {
            // Bottom-Up approach to gather the breadcrumb
            const breadcrumb = calcBreadcrumb(node);
            this.props.breadcrumbChanged(breadcrumb);
            this.props.toggleMenu();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.list !== nextProps.list) {
            this.setState({
                ...this.state,
                list: [...nextProps.list]
            })
        }
    }

    traverse(node, i) {
        if (node.leaf) {
            let nodeName = node.translations[this.props.lang]
            return (
                <div key={node.name}
                     onClick={() => {
                         this.handleClick(node)
                     }}
                     className={`leaf ${(node === this.state.selectedNode ? 'node-active' : '')}`}>
                    <i className="file text outline icon"></i>
                    {(node.link.endsWith('.xhtml') ?
                            <Link target='_blank' to={`${LEGACY_URL}/${node.link}`}>{nodeName}</Link> :
                            <Link to={node.link}>{nodeName}</Link>
                    )}

                </div>
            )
        } else {
            if (!node.hasOwnProperty('collapse')) {
                node.collapse = true
            }
            node.children.map((child) => {
                child.parent = node
            })
            const label =
                <span className={`node ${(node === this.state.selectedNode ? 'node-active' : '')}`}
                      key={node.name}
                      onClick={() => {
                          this.handleClick(node)
                      }}>{node.translations[this.props.lang]}</span>
            return (
                <TreeView
                    key={node.name}
                    nodeLabel={label}
                    collapsed={node.collapse}>
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
