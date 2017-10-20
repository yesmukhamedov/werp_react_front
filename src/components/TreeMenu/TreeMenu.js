import React, {Component} from 'react'
import { connect } from 'react-redux';
import {Treebeard} from 'react-treebeard'
import Decorators from './Decorators'
import Animations from './Animations'
import Theme from './Theme'
import './TreeMenu.css'
import {breadcrumbChanged} from "../../actions/tree_menu";

// Recursively adds parent links to child fields
const addParentLinks = (data) => {
    const setParent = (node) => {
        if (!node.leaf) {
            for (let i = 0; i < node.children.length; i++) {
                node.children[i].parent = node;
                setParent(node.children[i]);
            }
        }
    };
    for (const node of data) {
        setParent(node);
    }
    return data;
};

class TreeMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.onToggle = this.onToggle.bind(this)
    }

    onToggle(node, toggled) {
        if (this.state.cursor) {
            // this.state.cursor.active = false;
            const cursor = this.state.cursor;
            cursor.active = false;
            this.setState({cursor})
        }

        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }

        this.setState({cursor: node});

        if (node && node.leaf) {
            // Bottom-Up approach to gather the breadcrumb
            const menuItemNames = [];
            for (let n = node; n; n = n.parent) {
                menuItemNames.push(n.translations);
            }
            const breadcrumb = menuItemNames.reverse();
            this.props.breadcrumbChanged(breadcrumb);
        }

    }

    render() {
        return this.props.data ?
            (
                <div className="tree-menu">
                    {Decorators.lang = this.props.lang}
                    <Treebeard
                        data={addParentLinks(this.props.data)}
                        style={Theme}
                        animations={Animations}
                        decorators={Decorators}
                        onToggle={this.onToggle}/>
                </div>

            ) : <div className="tree-menu">No Menu</div>
    }
}

export default connect(null, {breadcrumbChanged})(TreeMenu);