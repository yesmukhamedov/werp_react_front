import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { Header,Container,Icon,Segment,Table,Form,Loader } from 'semantic-ui-react'
import axios from 'axios';
import {ROOT_URL} from '../../../../utils/constants';
import Phone from './Phone';
import moment from 'moment';
import BukrsF4 from '../../../../reference/f4/bukrs/BukrsF4'
import BranchF4 from '../../../../reference/f4/branch/BranchF4'
import LazyPagination from '../../../../general/pagination/LazyPagination'
import RecoStatusLabel from './RecoStatusLabel';

class RecoArchivePage extends Component{

    constructor(props) {
        super(props)
        this.loadedSuccess = true;
        this.state = {
            statusOptions:[],
            callRefuseOptions:[],
            items:[],
            loading:false,
            queryParams:{
                bukrs:'',
                branchIds:[]
            },
            totalRows:0,
            perPage:0,
            page:0
        }

        this.renderTable = this.renderTable.bind(this);
        this.renderTableHeader = this.renderTableHeader.bind(this);
        this.renderTableBody = this.renderTableBody.bind(this);
        this.loadItems = this.loadItems.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount(){
        axios.get(`${ROOT_URL}/api/crm/reco/statuses`,{
            headers: {
                authorization: localStorage.getItem('token')}
        }).then((res) => {
            let loaded = Object.keys(res.data).map((k) => {
                return {
                    key:k,
                    text:res.data[k],
                    value:k
                }
            });
            this.setState({
                ...this.state,
                statusOptions:loaded
            })
        }).catch((e) => {
            console.log(e);
        })

        this.loadItems(0);
    }

    loadItems(page){
        this.setState({
            ...this.state,
            loading:true
        });

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

        axios.get(`${ROOT_URL}/api/crm/reco/archive`,{
            headers: {
                authorization: localStorage.getItem('token')
            },
            params:params
        }).then((res) => {
            this.setState({
                ...this.state,
                items:res.data['items'],
                loading:false,
                totalRows:res.data['meta']['totalRows'],
                page:res.data['meta']['page'],
                perPage:res.data['meta']['perPage']
            })
        }).catch((e) => {
            console.log(e);
        })
    }

  renderPhoneNumbers (recoId, phones) {
    return <div>
      {phones.map((p) => {
        return <Phone
          callRefuseOptions={this.state.callRefuseOptions}
          callResultOptions={this.state.callResultOptions}
          key={p.id} phoneNumber={p.phoneNumber} phoneId={p.id}
          context='reco' contextId={recoId}
        />
      })}
    </div>
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
                <Link className={'ui icon button mini'} to={`/crm/reco/view/` + item.id}>
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
        if(this.state.items.length === 0){
            return <Table.Body>
                <Table.Row>
                    <Table.Cell colSpan={8}>Нет данных</Table.Cell>
                </Table.Row>
            </Table.Body>
        }
        return (
            <Table.Body>
                {this.state.items.map((item) => {
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
                        options={this.state.statusOptions} placeholder='Статус' onChange={this.handleDropdownChange}  />
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
                        Количество: {this.state.totalRows}
                    </Table.HeaderCell>
                    <Table.HeaderCell colSpan='6'>
                        <LazyPagination
                            onItemClick={this.loadItems}
                            totalRows={this.state.totalRows}
                            currentPage={this.state.page}
                            perPage={this.state.perPage}/>
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
                {this.state.loading?this.renderLoader():this.renderTableBody()}
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

export default RecoArchivePage;