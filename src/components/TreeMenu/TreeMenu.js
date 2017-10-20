import React, {Component} from 'react'
import {Treebeard} from 'react-treebeard'
import Decorators from './Decorators'
import Animations from './Animations'
import Theme from './Theme'
import './TreeMenu.css'

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

export default class TreeMenu extends Component {

    constructor(props) {
        super(props)
        this.state = {}

        this.onToggle = this.onToggle.bind(this)
    }

    onToggle(node, toggled) {
        if (this.state.cursor) {
            this.state.cursor.active = false;
        }

        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }

        this.setState({cursor: node});

        if (node && node.leaf) {
           // Bottom-Up approach to gather the breadcrumb
            const lang = this.props.lang;
            const breadcrumb = [];
            for (let n = node; n; n = n.parent) {
                const translation = n.translations[lang];
                breadcrumb.push(translation);
            }
            console.log("breadcrumb: [%s]", breadcrumb.reverse().join(" / "));
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