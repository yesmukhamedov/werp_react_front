import React, { Component } from 'react'
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux'
import {messages} from '../../../../locales/defineMessages'
import {fetchMatnrs} from '../../actions/logisticsActions'
import MatnrsGridModal from '../MatnrsGridModal'

class MatnrsModalField extends Component{
    constructor (props) {
        super(props)

        this.state = {
            open: false,
            selected: null,
            selectedIdx:null,
            searchModel: {}
        }

        this.handleChange = this.handleChange.bind(this)
    }

    componentWillMount(){}

    handleChange (e){
        const {name, value} = e.target;
        let model = Object.assign({},this.state.searchModel)
        model[name] = value

        this.setState({
            ...this.state,
            searchModel: model
        })

    }

    handleSelected = () => {
        if(!this.state.selected){
            return;
        }

        this.props.handleSelected(this.state.selected)
        this.setState({
            ...this.state,
            open: false,
            selected: null,
            selectedIdx: null
        })
    }

    searchData = (e) => {
        e.preventDefault();
        this.props.fetchMatnrs(this.state.searchModel)
    }

    render (){
        const {value} = this.props
        const { formatMessage } = this.props.intl;
        return <div style={{width:'90%'}} className="ui small mini transparent right left icon input">
                <button className="ui small icon button">
                    <i className="trash icon"></i>
                </button>
                <input value={value || ''} style={{width:'90%'}} type="text" readOnly placeholder="Goods..." />
                <button onClick={() => this.setState({open:true})} className="ui small icon button">
                    <i className="search icon"></i>
                </button>
            <MatnrsGridModal
                handleChange={this.handleChange}
                searchData={this.searchData}
                cancel={() => this.setState({open: false})}
                handleSelected={this.handleSelected}
                formatMessage={formatMessage}
                open={this.state.open}
                messages={messages}
                matnrs={this.props.matnrs}
                matnrsLoading={this.props.matnrsLoading}
                selectedIdx={this.state.selectedIdx}
                onRowClick={(rowInfo) => this.setState({...this.state,selected:rowInfo.original,selectedIdx: rowInfo.index})}
            />
        </div>
    }
}

function mapStateToProps(state) {
    return {
        messages,
        result: state.taskList.result,
        lang: state.locales.lang,
        matnrsLoading: state.logisticsReducer.matnrListLoading,
        matnrs: state.logisticsReducer.matnrs
    };
}

export default connect(mapStateToProps, {
    fetchMatnrs
})(injectIntl(MatnrsModalField))