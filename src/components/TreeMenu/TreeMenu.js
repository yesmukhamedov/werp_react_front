import React, {Component} from 'react'
import {Treebeard} from 'react-treebeard'
import {Link} from 'react-router';
import {
    Sidebar,
    Segment,
    Button,
    Menu,
    Image,
    Icon,
    Header
} from 'semantic-ui-react'
import Decorators from './Decorators'
import Animations from './Animations'
import Theme from './Theme'
import './TreeMenu.css'

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
            console.log("node", node)
            console.log("link", node.link)
            console.log("isLeaf", node.leaf)
        }

    }

    render() {
        // console.log('TreeMenu.data:', this.props.data);
        return this.props.data ?
            (
                <div className="tree-menu">
                    {Decorators.lang = this.props.lang}
                    <Treebeard
                        data={this.props.data}
                        style={Theme}
                        animations={Animations}
                        decorators={Decorators}
                        onToggle={this.onToggle}/>
                </div>

            ) : <div className="tree-menu">No Menu</div>
    }
}