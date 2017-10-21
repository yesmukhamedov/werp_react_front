import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './Header.css';

class Navigate extends Component {
    static contextTypes = {
        router: PropTypes.object
    } 

    state = { code: '' }

    handleChange = (e, { value }) => this.setState({ code: value })

    handleSubmit = () => {
        const { code } = this.state;
        const val = this.props.routes.find(v => v.transactionCode === code);
        const url = (val) ? val.url : '/';
        this.context.router.push(url);
        this.setState({code: '' });
    }

    render() {      
        const { code } = this.state;
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Input value={code}
                    action={{ type: 'submit', content: 'Go' }} 
                    onChange={this.handleChange} 
                    placeholder='Navigate to...'/> 
            </Form>
        );
    }
}

function mapStateToProps(state) {
    return {
        routes: state.menu.routes
    };
}

export default connect(mapStateToProps)(Navigate);