import React, {Component} from 'react';
import {Link} from 'react-router';
import {Search, Label} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash'
import './Header.css';


export default class TransactionSearchbar extends Component {
    componentWillMount() {
        this.resetComponent()
    }

    resetComponent = () => this.setState({isLoading: false, results: [], value: ''})

    handleResultSelect = (e, {result}) => this.setState({value: ''})

    handleSearchChange = (e, {value}) => {
        this.setState({isLoading: true, value})

        setTimeout(() => {
            if (this.state.value.length < 1) 
                return this.resetComponent()

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = result => re.test(result.title)
            let routes = this.props.routes.map((route) => { return {title: route.transactionCode, image: route.url} })
            this.setState({
                isLoading: false,
                results: _.filter(routes, isMatch)
            })
        }, 500)
    }

    render() {
        const {isLoading, value, results} = this.state

        return (<Search
                    loading={isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={this.handleSearchChange}
                    results={results}
                    value={value}
                    noResultsMessage='No transactions found.'
                    resultRenderer={resultRenderer} />)
    }
}

const resultRenderer = ({ title, image }) => <Link to={image}><Label content={title}/></Link>
resultRenderer.propTypes = {
    title: PropTypes.string,
    image: PropTypes.string
}

