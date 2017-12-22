import React, {Component} from 'react';
import {Link} from 'react-router';
import {Search, Label} from 'semantic-ui-react';
import _ from 'lodash'
import './Header.css';
import {LEGACY_URL} from "../../utils/constants";
import {browserHistory} from 'react-router';

export default class TransactionSearchbar extends Component {

    componentWillMount() {
        this.resetComponent()
    }

    resetComponent = () => this.setState({isLoading: false, results: [], value: ''});

    handleResultSelect = (e, {result}) => {
        this.setState({value: ''});
        this.props.transactionSelected(result.title);
        browserHistory.push(result.image);        
    };

    handleSearchChange = (e, {value}) => {
        this.setState({isLoading: true, value});

        setTimeout(() => {
            if (this.state.value.length < 1) 
                return this.resetComponent();

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
            const isMatch = result => re.test(result.title);
            const leafNodes = Object.values(this.props.transactions);
            const routes = leafNodes.map(node => {
                return {title: node.transactionCode, image: node.link};
            });

            this.setState({
                isLoading: false,
                results: _.filter(routes, isMatch)
            })
        }, 500)
    };

    resultRenderer({title, image}) {
        return image.endsWith('.xhtml') ?
            <Link target='_blank' to={`${LEGACY_URL}/${image}`}><Label content={title}/></Link> :
            <Link to={image}><Label content={title}/></Link>;
    }

    render() {
        const {isLoading, value, results} = this.state;

        return (<Search
                    loading={isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={this.handleSearchChange}
                    results={results}
                    value={value}
                    noResultsMessage='No transactions found.'
                    resultRenderer={this.resultRenderer} />)
    }
}
