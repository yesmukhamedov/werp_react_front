import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header,Container,Icon,Segment,Divider,Tab,Loader,Menu,Dropdown, Button,Form,Grid,Table } from 'semantic-ui-react'
import ReactTable from 'react-table'
import {f4FetchCountryList,f4FetchDepartmentList,f4FetchBranchesByBukrs,f4ClearBranchesByBukrs} from '../../../reference/f4/f4_action'
import 'react-table/react-table.css'
import {blankWerksRequest,fetchMatnrs,blankWerksRequestItem,createWerksRequest} from '../actions/logisticsActions'
import EnumFormField from './fields/EnumFormField'
import MatnrsModalField from './fields/MatnrsModalField'
import MatnrsGridModal from './MatnrsGridModal'
import { injectIntl } from 'react-intl';
import {messages} from '../../../locales/defineMessages'

class WerksRequestFormPage extends Component{
    constructor (props) {
        super(props)

        this.state = {
            model:{
                id: -1,
                matnrs: []
            },
            matnrsModalOpen: false,
            matnrsSearchModel: {},
            selectedMatnr: {},
            selectedMatnrIdx: null,
            errors:{},
            saveBtnDisabled: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleMatnrsSearchFormHandle = this.handleMatnrsSearchFormHandle.bind(this);
        this.handleSelectedMatnr = this.handleSelectedMatnr.bind(this);
        this.handleItemChange = this.handleItemChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentWillMount(){
        this.props.blankWerksRequest();
        this.props.f4FetchCountryList();
        this.props.f4FetchDepartmentList();
    }

    componentWillReceiveProps (nextProps) {
        if(nextProps.model.id !== this.state.model.id){
            let model = Object.assign({}, nextProps.model);
            this.setState({
                ...this.state,
                model: model
            })
        }
    }

    handleChange(data){
        const {name,value} = data
        let model = Object.assign({},this.state.model);
        model[name] = value
        if(name === 'bukrs'){
            model['branchId'] = null;
            if(value.length > 0){
                this.props.f4FetchBranchesByBukrs(model['bukrs'])
            } else {
                this.props.f4ClearBranchesByBukrs()
            }
        }
        this.setState({
            ...this.state,
            model: model
        })
    }

    handleMatnrsSearchFormHandle (e) {
        let searchModel = Object.assign({},this.state.matnrsSearchModel)
        const {name, value} = e.target
        searchModel[name] = value

        this.setState({
            ...this.state,
            matnrsSearchModel: searchModel
        })
    }

    branchOptions (bukrs){
        const {branchOptions} = this.props;
        return branchOptions[bukrs] || [];
    }

    prepareResBranchOptions = () => {
        let out = [];
        const {bukrsBranches} = this.props;
        if(!bukrsBranches){
            return []
        }
        for(let k in bukrsBranches){
            out.push({
                key: bukrsBranches[k]['branch_id'],
                value: bukrsBranches[k]['branch_id'],
                text: bukrsBranches[k]['text45']
            })
        }

        return out;
    }

    handleSelectedMatnr() {
        if(!this.state.selectedMatnr){
            return;
        }
        let _this = this;
        this.props.blankWerksRequestItem(this.state.selectedMatnr.matnr).then(({data}) => {
            _this.addRow(data)
        }).catch((error) => {
            alert(error);
        })
    }

    addRow(item) {
        let model = Object.assign({},this.state.model)
        model.matnrs.push(item);
        this.setState({
            ...this.state,
            model: model,
            matnrsModalOpen: false,
            selectedMatnr: {},
            selectedMatnrIdx: null
        })
    }

    handleItemChange (fieldName,val, idx) {
        let model = Object.assign({},this.state.model)
        let matnrs = model['matnrs']
        let currMatnr = matnrs[idx]
        currMatnr[fieldName] = val
        matnrs[idx] = currMatnr
        model['matnrs'] = matnrs;
        this.setState({
            ...this.state,
            model: model
        })
    }

    submitForm(e){
        e.preventDefault();
        let _this = this;
        this.props.createWerksRequest(this.state.model).then(({data}) => {
            //window.location.pathname = '/logistics/werks/requests/' + data.id;
        }).catch((error) => {
            let stateErrors = {}
            if(error && error.response && error.response.status){
                if(400 === error.response.status){
                    stateErrors = error.response.data
                }
            }

            _this.setState({
                ..._this.state,
                saveBtnDisabled: false,
                errors: stateErrors
            })
        })
    }

 renderItems = () => {
        const {model} = this.state
        const matnrs = model.matnrs || []
        return <Table celled striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell colSpan='2'>
                        Список товаров
                        <Button size={'small'} icon floated={'right'} primary onClick={() => this.setState({...this.state,matnrsModalOpen: true})}>
                            <Icon name='plus' />
                        </Button>
                    </Table.HeaderCell>
                </Table.Row>

                <Table.Row>
                    <Table.HeaderCell>
                        Наименование товара
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        Количество
                    </Table.HeaderCell>
                </Table.Row>

            </Table.Header>

            <Table.Body>
                {matnrs.map((m,idx) => {
                    return <Table.Row key={idx}>
                        <Table.Cell>{m.matnrName}</Table.Cell>
                        <Table.Cell>
                        <Form.Input
                            onChange={(e) => this.handleItemChange('quantity',e.target.value,idx)}
                            value={m.quantity || 0}
                            type='number' />
                        </Table.Cell>
                    </Table.Row>
                    })}
            </Table.Body>
        </Table>
 }

    render (){
        const {model,errors} = this.state;
        return <div className='ui segments'>
            <div className='ui segment'>
                <h3>Внутренние заявки / {model.new?'Создание':'Редактирование'}</h3>
            </div>
            <div className='ui secondary segment'>
                <Grid celled>
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <Form>
                                <EnumFormField
                                    error={errors['bukrs']}
                                    label='Компания'
                                    fieldName="bukrs"
                                    value={model['bukrs']}
                                    handleChange={this.handleChange}
                                    options={this.props.companyOptions} />

                                <EnumFormField
                                    error={errors['branchId']}
                                    label='Филиал заявитель'
                                    fieldName="branchId"
                                    search={true}
                                    handleChange={this.handleChange}
                                    value={model['branchId']} options={this.branchOptions(model['bukrs'])} />

                                <EnumFormField
                                    label='Филиал исполнитель'
                                    fieldName="resBranchId"
                                    search={true}
                                    handleChange={this.handleChange}
                                    value={model['resBranchId']} options={this.prepareResBranchOptions() || []} />

                                <EnumFormField
                                    label='Департамент'
                                    fieldName="departmentId"
                                    search={true}
                                    handleChange={this.handleChange}
                                    value={model['departmentId']} options={this.props.departmentOptions || []} />
                                <Button disabled={this.state.saveBtnDisabled} onClick={this.submitForm} type='submit'>
                                    {this.state.saveBtnDisabled ? 'Ждемс...':'Сохранить'}
                                </Button>
                            </Form>
                        </Grid.Column>

                        <Grid.Column width={10}>
                            <div style={{color:'red'}}>{errors['matnrs']}</div>
                            {this.renderItems()}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
            <MatnrsGridModal
                matnrs={this.props.matnrs}
                messages={messages}
                formatMessage={this.props.intl.formatMessage}
                open={this.state.matnrsModalOpen}
                cancel={() => this.setState({...this.state,matnrsModalOpen: false})}
                matnrsLoading={this.props.matnrsLoading}
                searchData={() => this.props.fetchMatnrs(this.state.matnrsSearchModel)}
                handleChange={this.handleMatnrsSearchFormHandle}
                handleSelected={this.handleSelectedMatnr}
                selectedIdx={this.state.selectedMatnrIdx}
                onRowClick={(rowInfo) => this.setState({...this.state,selectedMatnr:rowInfo.original,selectedMatnrIdx: rowInfo.index})}
            />
        </div>
    }
}

function mapStateToProps (state) {
    return {
        model: state.logisticsReducer.werksRequestModel,
        pageLoading: state.documentReducer.pageLoading,
        countries: state.f4.countryList,
        departmentOptions: state.f4.departmentOptions,
        companyOptions: state.userInfo.companyOptions,
        branchOptions: state.userInfo.branchOptionsAll,
        bukrsBranches: state.f4.bukrsBranches,
        matnrsLoading: state.logisticsReducer.matnrListLoading,
        matnrs: state.logisticsReducer.matnrs
    }
}

export default connect(mapStateToProps, {
    blankWerksRequest,f4FetchCountryList,f4FetchDepartmentList,f4FetchBranchesByBukrs,f4ClearBranchesByBukrs,
    fetchMatnrs, blankWerksRequestItem,createWerksRequest
})(injectIntl(WerksRequestFormPage))