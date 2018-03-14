import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Container,Divider,Table,Icon,Header,Button,Segment,Form,Grid,Loader,Input,List} from 'semantic-ui-react';
import BukrsF4 from '../../../../reference/f4/bukrs/BukrsF4'
import BranchF4 from '../../../../reference/f4/branch/BranchF4'
import PositionF4 from '../../../../reference/f4/position/PositionF4'
import LazyPagination from '../../../../general/pagination/LazyPagination'
import { connect } from 'react-redux'
import {fetchCurrentStaffs} from '../actions/hrStaffAction'


class StaffListPage extends Component {
  constructor (props) {
    super(props)

        this.state = {
            queryParams:{
                bukrs:'',
                branchIds:[],
                iinBin:'',
                firstName:'',
                lastName:'',
                departmentId:0,
                positionId:0,
                page:0
            }
        }

        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.loadItems = this.loadItems.bind(this);
        this.renderTableFooter = this.renderTableFooter.bind(this);
        this.inputChanged = this.inputChanged.bind(this);
    }

    componentWillMount(){
        this.loadItems(0);
    }

    loadItems(page){
        const {queryParams} = this.state;
        let params = {};
        for(let k in queryParams){
            if(k === 'branchIds'){
                if(typeof queryParams[k] !== 'undefined' && queryParams[k].length > 0){
                    params[k] = queryParams[k].join();
                }
            }else{
                params[k] = queryParams[k];
            }
        }

        params['page'] = page;
        this.props.fetchCurrentStaffs(params)
    }

    renderTableHeader(){
        return (
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>StaffID</Table.HeaderCell>
                    <Table.HeaderCell>Фамилия</Table.HeaderCell>
                    <Table.HeaderCell>Имя</Table.HeaderCell>
                    <Table.HeaderCell>Отчество</Table.HeaderCell>
                    <Table.HeaderCell>Должности</Table.HeaderCell>
                    <Table.HeaderCell>Действия</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        )
    }

    renderPositions(positions){
        if(typeof positions !== 'undefined' && positions.length>0){
            return <List bulleted>
                {positions.map((p,idx) => {
                    return <List.Item key={idx}>{p.positionName} ({p.branchName})</List.Item>;
                })}
            </List>
        }

        return '';
    }

    renderTableBody(){
        const {currentStaffs} = this.props;
        return (
            <Table.Body>
                {(currentStaffs && currentStaffs.length) >0?currentStaffs.map((item,idx) => {

                    return (
                        <Table.Row key={idx}>
                            <Table.Cell>{item.staffId}</Table.Cell>
                            <Table.Cell>{item.lastname}</Table.Cell>
                            <Table.Cell>{item.firstname}</Table.Cell>
                            <Table.Cell>{item.middlename}</Table.Cell>
                            <Table.Cell>{this.renderPositions(item.positions)}</Table.Cell>
                            <Table.Cell width={2}>
                                <Link className={'ui icon button'} to={`/hr/staff/view/${item.staffId}`}>
                                    <Icon name='eye' />
                                </Link>

                <Link className={'ui icon button'} to={`/hr/staff/update/${item.staffId}`}>
                  <Icon name='pencil' />
                </Link>

                            </Table.Cell>
                        </Table.Row>
                    )
                    }):<Table.Row><Table.Cell>{'No Records'}</Table.Cell></Table.Row>}
            </Table.Body>
        )
    }

    renderTableFooter(){
        const {meta} = this.props
        return (
            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan='2'>
                        Количество: {meta['totalRows']}
                    </Table.HeaderCell>
                    <Table.HeaderCell colSpan='5'>
                        <LazyPagination
                            onItemClick={this.loadItems}
                            totalRows={meta['totalRows']}
                            currentPage={meta['page']}
                            perPage={meta['perPage']}/>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        )
    }

    inputChanged(e,data){
        const {name,value} = data;
        const {queryParams} = this.state;
        queryParams[name] = value;
        this.setState({
            ...this.state,
            queryParams:queryParams
        })
    }

    renderSearchPanel(){
        return <div>
            <Header as='h4' attached='top'>
                Расширенный поиск
            </Header>
            <Segment attached>
                <Form>
                    <BukrsF4 handleChange={this.handleDropdownChange} />
                    <BranchF4 search={true} multiple={true} handleChange={this.handleDropdownChange} bukrs={this.state.queryParams.bukrs} />
                    <PositionF4 handleChange={this.handleDropdownChange}/>
                    <Form.Field>
                        <label>Фамилия</label>
                        <Input name="lastName" placeholder='Фамилия' onChange={this.inputChanged} />
                    </Form.Field>

                    <Form.Field>
                        <label>Имя</label>
                        <Input name="firstName" placeholder='Имя' onChange={this.inputChanged} />
                    </Form.Field>

                    <Button loading={this.state.btnLoading} onClick={() => this.loadItems(0)} type='submit'>Сформировать</Button>
                </Form>
            </Segment>
        </div>
    }

  handleDropdownChange (e, o) {
    let {name, value} = o
    let {queryParams} = this.state
    switch (name) {
      case 'bukrs':
        queryParams[name] = value
        queryParams['branchIds'] = []
        break

      case 'branch':
        queryParams['branchIds'] = value
        break

      case 'position':
        queryParams['positionId'] = value
        break

      case 'resultIds':
        queryParams[name] = value
        break

      default:
        queryParams[name] = value
        break
    }

    this.setState({
      ...this.state,
      queryParams: queryParams
    })
  }

  render () {
    return (
      <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
          <Segment clearing>
            <Header as='h3' block floated={'left'}>Список сотрудников</Header>
            <Link  className={'ui button primary right floated '} to={`/hr/staff/update`}>Добавить</Link>
      </Segment>
        <Divider />
        <Grid>
          <Grid.Column floated='left' width={4}>
            {this.renderSearchPanel()}
          </Grid.Column>

                    <Grid.Column floated='left' width={12}>
                        {this.state.loading?<Loader active inline='centered' />:<Table celled striped>
                                {this.renderTableHeader()}
                                {this.renderTableBody()}
                                {this.renderTableFooter()}
                            </Table>}
                    </Grid.Column>
                </Grid>
                <Divider/>
            </Container>
        )
    }
}

function mapStateToProps (state) {
    return {
        currentStaffs:state.hrStaff.currentStaffs,
        meta:state.hrStaff.meta
    }
}

export default connect(mapStateToProps, {fetchCurrentStaffs})(StaffListPage)
