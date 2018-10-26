import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { Header,Container,Icon,Segment,Table,Form,Loader, Button } from 'semantic-ui-react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import moment from 'moment';
import BukrsF4 from '../../../../reference/f4/bukrs/BukrsF4'
import BranchF4 from '../../../../reference/f4/branch/BranchF4'
import LazyPagination from '../../../../general/pagination/LazyPagination'
import RecoStatusLabel from './RecoStatusLabel';
import {fetchRecoArchive,fetchRecoStatuses} from '../actions/recoAction';
import {fetchGroupDealers} from '../../demo/actions/demoAction'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'

class RecoArchivePage extends Component{

    constructor(props) {
        super(props)
        this.loadedSuccess = true;
        this.state = {
            queryParams:{
                bukrs:'',
                branchIds:[]
            }
        }

        this.renderTable = this.renderTable.bind(this);
        this.renderTableHeader = this.renderTableHeader.bind(this);
        this.renderTableBody = this.renderTableBody.bind(this);
        this.loadItems = this.loadItems.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this)
    }

    componentWillMount(){
        this.props.fetchRecoStatuses()
        this.props.fetchGroupDealers()
        this.loadItems(0);
    }

    loadItems(page){

        const {queryParams} = this.state;
        let params = {};
        for(let k in queryParams){
            if(k === 'branchIds' || k === 'statusIds'){
                if(typeof queryParams[k] !== 'undefined' && queryParams[k].length > 0){
                    params[k] = queryParams[k].join();
                }
            }else{
                params[k] = queryParams[k];
            }
        }

        params['page'] = page;

        this.props.fetchRecoArchive(params)
    }

    renderTableHeader(messages){
        return (
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>№</Table.HeaderCell>
                    <Table.HeaderCell>{messages['Table.ClientFullName']}</Table.HeaderCell>
                    <Table.HeaderCell>{messages['Table.ResponsibleStaff']}</Table.HeaderCell>
                    <Table.HeaderCell>{messages['Table.Category']}</Table.HeaderCell>
                    <Table.HeaderCell>{messages['Table.Status']}</Table.HeaderCell>
                    <Table.HeaderCell>{messages['Table.Date']}</Table.HeaderCell>
                    <Table.HeaderCell>{messages['Table.Actions']}</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        )
    }

    renderTableRow(item){
        return <Table.Row key={item.id}>
            <Table.Cell>{item.id}</Table.Cell>
            <Table.Cell>{item.clientName}</Table.Cell>
            <Table.Cell>{item.responsibleName}</Table.Cell>
            <Table.Cell>{item.categoryName}</Table.Cell>
            <Table.Cell>
                <RecoStatusLabel statusId={item.statusId} statusName={item.statusName}/>
            </Table.Cell>
            <Table.Cell>{moment(item.docDate).format('DD.MM.YYYY')}</Table.Cell>
            <Table.Cell>
                <Link target={'_blank'} className={'ui icon button mini'} to={`/crm/reco/view/` + item.id}>
                    Просмотр
                </Link>
            </Table.Cell>
        </Table.Row>
    }

    handleDropdownChange(e,o){
        let {name,value} = o;
        let queryParams = Object.assign({},this.state.queryParams);
        switch (name){
            case 'bukrs':
                queryParams[name] = value;
                queryParams['branchIds'] = [];
                break;

            case 'branch':
                queryParams['branchIds'] = value;
                break;

            default:
                queryParams[name] = value;
                break;
        }

        this.setState({
            ...this.state,
            queryParams:queryParams
        })
    }

    handleChange(e,data){
        const {name,value} = data;
        const {queryParams} = this.state;
        queryParams[name] = value;

        this.setState({
            ...this.state,
            queryParams:queryParams
        })
    }

    handleChangeDate(field,m){
        let queryParams = Object.assign({},this.state.queryParams);
        if(m){
            queryParams[field] = m.format('YYYY-MM-DD');
        }else {
            queryParams[field] = null;
        }

        this.setState({...this.state,queryParams: queryParams});
    }


    renderTableBody(){
        if(!this.props.items || this.props.items.length === 0){
            return <Table.Body>
                <Table.Row>
                    <Table.Cell colSpan={8}>Нет данных</Table.Cell>
                </Table.Row>
            </Table.Body>
        }
        return (
            <Table.Body>
                {this.props.items.map((item) => {
                    return this.renderTableRow(item);
                })}
            </Table.Body>
        )
    }

    getDealersSelect (dealers, messages){
        return <Form.Select name="responsibleId" multiple={false}
            search={true}
            label={messages['Form.Dealer']}
            options={dealers || []} placeholder={messages['Form.Dealer']} onChange={this.handleDropdownChange}  />
    }

    renderSearchPanel(messages){
        return (
            <Form>
                <Form.Group widths='equal'>
                    <BukrsF4 handleChange={this.handleDropdownChange} />
                    <BranchF4 search={true} multiple={true} handleChange={this.handleDropdownChange} bukrs={this.state.queryParams.bukrs} />
                    <Form.Select
                        name="statusIds"
                        multiple={true}
                        search={true}
                        label={messages['Form.Status']}
                        options={this.props.statuses || []} placeholder={messages['Form.Status']} onChange={this.handleDropdownChange}  />

                    {this.props.dealers?this.getDealersSelect(this.props.dealers,messages):''}
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <label>{messages['Form.SaleDateFrom']}</label>
                        <DatePicker
                            autoComplete="off"
                            label=""
                            placeholderText={messages['Form.SaleDateFrom']}
                            showMonthDropdown showYearDropdown dropdownMode="select"
                            dateFormat="DD.MM.YYYY"
                            selected={this.state.queryParams.docDateFrom?moment(this.state.queryParams.docDateFrom):null}
                            onChange={(v) => this.handleChangeDate('docDateFrom',v)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>{messages['Form.SaleDateTo']}</label>
                        <DatePicker
                            autoComplete="off"
                            label=""
                            placeholderText={messages['Form.SaleDateTo']}
                            showMonthDropdown showYearDropdown dropdownMode="select"
                            dateFormat="DD.MM.YYYY"
                            selected={this.state.queryParams.docDateTo?moment(this.state.queryParams.docDateTo):null}
                            onChange={(v) => this.handleChangeDate('docDateTo',v)}
                        />
                    </Form.Field>
                    <Form.Input name="clientName" onChange={this.handleChange} fluid label={messages['Form.ClientFullName']} placeholder={messages['Form.ClientFullName']} />
                    <Form.Input name="phoneNumber" onChange={this.handleChange}  fluid label={messages['Form.Reco.PhoneNumber']} placeholder={messages['Form.Reco.PhoneNumber']} />
                    <Form.Field>
                        <label>&nbsp;</label>
                        <Button onClick={() => this.loadItems(0)}>{messages['Form.Search']}</Button>
                    </Form.Field>
                </Form.Group>

            </Form>
        )
    }

    renderTableFooter(){
        return (
            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan='2'>
                        Количество: {this.props.meta.totalRows}
                    </Table.HeaderCell>
                    <Table.HeaderCell colSpan='6'>
                        <LazyPagination
                            onItemClick={this.loadItems}
                            totalRows={this.props.meta.totalRows}
                            currentPage={this.props.meta.page}
                            perPage={this.props.meta.perPage}/>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        )
    }

    renderLoader(){
        return <Table.Body>
            <Table.Row>
                <Table.Cell colSpan='8'>
                    <Loader size={'large'} active inline='centered' />
                </Table.Cell>
            </Table.Row>
        </Table.Body>
    }

    renderTable(messages){
        return (
            <Table celled>
                {this.renderTableHeader(messages)}
                {this.props.loader.active?this.renderLoader():this.renderTableBody()}
                {this.renderTableFooter()}
            </Table>
        )
    }

    render(){
        const {messages} = this.props.intl
        return (
            <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                <Segment clearing>
                    <Header as='h2' floated='left'>
                        {messages['Crm.RecoArchiveTitle']}
                    </Header>
                    <Link className={'ui icon button primary right floated'} to={`/crm/reco/create`}>
                        <Icon name='plus' /> {messages['Crm.Wspace.CreateFromArchive']}
                    </Link>
                </Segment>
                {this.renderSearchPanel(messages)}
                {this.renderTable(messages)}
            </Container>
        )
    }
}

function mapStateToProps (state) {
    return {
        items: state.crmReco.items,
        meta: state.crmReco.meta,
        statuses:state.crmReco.statuses,
        loader:state.loader,
        dealers: state.crmDemo.dealers
    }
}

export default connect(mapStateToProps, {
    fetchRecoArchive,fetchRecoStatuses, fetchGroupDealers
})(injectIntl(RecoArchivePage))