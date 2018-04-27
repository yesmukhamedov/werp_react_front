import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { Header,Container,Icon,Segment,Table,Form,Loader } from 'semantic-ui-react'
import moment from 'moment';
import BukrsF4 from '../../../../reference/f4/bukrs/BukrsF4'
import BranchF4 from '../../../../reference/f4/branch/BranchF4'
import LazyPagination from '../../../../general/pagination/LazyPagination'
import RecoStatusLabel from './RecoStatusLabel';
import {fetchRecoArchive,fetchRecoStatuses} from '../actions/recoAction';
import { connect } from 'react-redux'

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
    }

    componentWillMount(){
        this.props.fetchRecoStatuses()
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

    renderTableHeader(){
        return (
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>№</Table.HeaderCell>
                    <Table.HeaderCell>ФИО супруг</Table.HeaderCell>
                    <Table.HeaderCell>Отв. сотрудник</Table.HeaderCell>
                    <Table.HeaderCell>Категория</Table.HeaderCell>
                    <Table.HeaderCell>Статус</Table.HeaderCell>
                    <Table.HeaderCell>Дата рекомендации</Table.HeaderCell>
                    <Table.HeaderCell>Действия</Table.HeaderCell>
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
        let {queryParams} = this.state;
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

    renderSearchPanel(){
        return (
            <Form>
                <Form.Group widths='equal'>
                    <BukrsF4 handleChange={this.handleDropdownChange} />
                    <BranchF4 search={true} multiple={true} handleChange={this.handleDropdownChange} bukrs={this.state.queryParams.bukrs} />
                    <Form.Select
                        name="statusIds"
                        multiple={true}
                        search={true}
                        label='Статус'
                        options={this.props.statuses || []} placeholder='Статус' onChange={this.handleDropdownChange}  />
                    <Form.Input name="clientName" onChange={this.handleChange} fluid label='ФИО клиента' placeholder='ФИО клиента' />
                    <Form.Input name="phoneNumber" onChange={this.handleChange}  fluid label='Тел. номер' placeholder='Тел. номер' />
                </Form.Group>
                <Form.Button onClick={() => this.loadItems(0)}>Поиск</Form.Button>
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

    renderTable(){
        return (
            <Table celled>
                {this.renderTableHeader()}
                {this.props.loader.active?this.renderLoader():this.renderTableBody()}
                {this.renderTableFooter()}
            </Table>
        )
    }

    render(){
        return (
            <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                <Segment clearing>
                    <Header as='h2' floated='left'>
                        Архив рекомендации
                    </Header>
                    <Link className={'ui icon button primary right floated'} to={`/crm/reco/create`}>
                        <Icon name='plus' /> Добавить
                    </Link>
                </Segment>
                {this.renderSearchPanel()}
                {this.renderTable()}
            </Container>
        )
    }
}

function mapStateToProps (state) {
    return {
        items: state.crmReco.items,
        meta: state.crmReco.meta,
        statuses:state.crmReco.statuses,
        loader:state.loader
    }
}

export default connect(mapStateToProps, {fetchRecoArchive,fetchRecoStatuses})(RecoArchivePage)