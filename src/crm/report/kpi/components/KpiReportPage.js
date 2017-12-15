import React, {Component} from 'react';
import axios from 'axios';
import {Container,Header,Segment,Grid,Form,Divider,Breadcrumb,Loader} from 'semantic-ui-react';
import KpiCard from './KpiCard';
import {ROOT_URL,YEAR_OPTIONS,MONTH_OPTIONS} from '../../../../utils/constants';

const currentDate = new Date();
const loadedManagers = {};
class KpiReportPage extends Component{

    constructor(props) {
        super(props)
        this.state = {
            items:[],
            bukrsOptions:[],
            branchOptions:[],
            managerOptions:[],
            yearOptions:[],
            monthOptions:[],
            selectedBukrs:'',
            selectedBranches:[],
            selectedManager:0,
            selectedYear:currentDate.getFullYear(),
            selectedMonth:currentDate.getMonth()+1,
            forGroups:false,
            detail:'',
            detailId:0,
            headerBukrsName:'',
            headerBukrsId:'',
            headerBranchId:0,
            headerBranchName:'',
            headerManagerId:0,
            headerManagerName:'',
            loading:false
        }

        this.loadBranches = this.loadBranches.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.loadItems = this.loadItems.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
        this.loadDetail = this.loadDetail.bind(this);
        this.setHeaderTitle = this.setHeaderTitle.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.breadcrumbLink = this.breadcrumbLink.bind(this);
    }

    handleError(e){
        console.log(e)
    }

    getLoadedManagers(branchId){
        axios.get(`${ROOT_URL}/api/hr/pyramid/managers/by-branch/` + branchId,{
            headers: {
                authorization: localStorage.getItem('token')
            },
            params:{
                year:this.state.selectedYear,
                month:this.state.selectedMonth
            }
        })
            .then((response) => {
                response.data[0] = 'Не выбрано';
                let result = Object.keys(response.data).map((key) => {
                    return {
                        key:key,
                        text:response.data[key],
                        value:key
                    }
                });

                this.setState({
                    ...this.state,
                    managerOptions:result
                })
            }).catch((error) => {
            console.log(error)
        })
    }

    componentWillMount(){
        axios.get(`${ROOT_URL}/api/reference/companies`,{
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then((res) => {
            let loaded = res.data.map((c) => {
                return {
                    key:c.id,
                    text:c.name,
                    value:c.id
                }
            })

            let selectedBukrs = '';
            if(loaded.length == 1){
                selectedBukrs = loaded[0]['value'];
            }
            this.setState({
                ...this.state,
                bukrsOptions:loaded,
                selectedBukrs:selectedBukrs
            })
        }).catch((e) => {
            this.handleError(e);
        })
    }

    loadItems(detail,detailId){
        axios.get(`${ROOT_URL}/api/crm/report/kpi/` + this.state.selectedBukrs,{
            headers: {
                authorization: localStorage.getItem('token')
            },
            params:{
                branchIds:this.state.selectedBranches.join(','),
                year:this.state.selectedYear,
                month:this.state.selectedMonth,
                detail:detail,
                detailId:detailId
            }
        }).then((res) => {
            this.setState({
                ...this.state,
                items:res.data,
                loading:false
            })
        }).catch((e) => {
            console.log(e);
            this.setState({
                ...this.state,
                loading:false
            })
        });
    }

    submitSearch(){
        if(!this.state.selectedBukrs || this.state.selectedBukrs.length == 0){
            return;
        }
        this.setState({
            ...this.state,
            detail:'',
            detailId:0,
            loading:true,
            items:[]
        })
        this.loadItems('',0);
    }

    loadDetail(detailName,cardData){
        if(detailName == 'branch'){
            this.setState({
                ...this.state,
                headerBukrsId:cardData.bukrs,
                headerBukrsName:cardData.bukrsName,
                headerBranchId:0,
                headerBranchName:cardData.branchName,
                headerManagerName:'',
                headerManagerId:0,
                detail:detailName,
                detailId:cardData.id,
                loading:true,
                items:[]
            })
        }else if(detailName == 'group'){
            this.setState({
                ...this.state,
                headerBukrsId:cardData.bukrs,
                headerBukrsName:cardData.bukrsName,
                headerBranchId:cardData.branchId,
                headerBranchName:cardData.branchName,
                headerManagerName:cardData.name,
                headerManagerId:cardData.id,
                detail:detailName,
                detailId:cardData.id,
                loading:true,
                items:[]
            })
        }else{

        }

        this.loadItems(detailName,cardData.id);

    }

    loadBranches(bukrs){
        axios.get(`${ROOT_URL}/api/reference/branches/` + bukrs,{
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then((res) => {
            let loaded = res.data.map((b) => {
                return {
                    key:b.branch_id,
                    text:b.text45,
                    value:b.branch_id
                }
            })
            this.setState({
                ...this.state,
                branchOptions:loaded
            })
        }).catch((e) => {
            console.log(e);
        })
    }

    loadManagers(branchId){
        console.log(branchId);
    }

    setHeaderTitle(){
    }

    handleDropdownChange(e,result){
        const {name,value} = result;
        switch (name){
            case "bukrs":
                let bukrsName = this.state.bukrsOptions.map((b) => {
                    if(b.value == value){
                        return b.text;
                    }
                })
                this.setState({
                    ...this.state,
                    selectedBukrs:value,
                    selectedBranches:[],
                    headerTitle:bukrsName
                })
                this.loadBranches(value)
                break

            case "branch":
                let {managerOptions} = this.state;
                if(value.length == 1){
                    if(loadedManagers[value[0]]){
                        managerOptions = loadedManagers[value[0]];
                    }else{
                        let t = this.getLoadedManagers(value[0]);
                    }
                }else{
                    managerOptions = [];
                }
                this.setState({
                    ...this.state,
                    selectedBranches:value,
                    managerOptions:[],
                    selectedManager:0
                })

                break

            case "year":
                this.setState({
                    ...this.state,
                    selectedYear:value
                })
                break

            case "month":
                this.setState({
                    ...this.state,
                    selectedMonth:value
                })
                break


        }
    }

    handleChange(e){
        console.log(e.target.value);
        console.log(e)
    }

    renderSearchForm() {
        const { bukrsOptions,branchOptions,managerOptions,selectedBukrs} = this.state
        let value ='';
        return (
            <Form>
                <Form.Group widths='equal'>
                    <Form.Select defaultValue={selectedBukrs} error={this.state.selectedBukrs.length == 0}
                                 name="bukrs" label='Компания' options={bukrsOptions} placeholder='Компания' onChange={this.handleDropdownChange} />
                    <Form.Select name="branch" multiple search selection label='Филиал' options={branchOptions} placeholder='Филиал' onChange={this.handleDropdownChange} />
                    <Form.Select defaultValue={currentDate.getFullYear()} name="year" label='Год' options={YEAR_OPTIONS} placeholder='Год' onChange={this.handleDropdownChange} />
                    <Form.Select defaultValue={currentDate.getMonth()+1} name="month" label='Месяц' options={MONTH_OPTIONS} placeholder='Месяц' onChange={this.handleDropdownChange} />
                </Form.Group>
                <Form.Button onClick={this.submitSearch}>Сформировать</Form.Button>
            </Form>
        )
    }

    breadcrumbLink(key){
        switch (key){
            case 'bukrs':
                this.submitSearch();
                break

            case 'branch':
                this.setState({
                    ...this.state,
                    detail:'branch',
                    detailId:this.state.headerBranchId,
                    loading:true,
                    items:[]
                })
                this.loadItems('branch',this.state.headerBranchId);
                break
        }
    }

    renderHeader(){

        if(this.state.detail === 'branch'){
            return (
                <Header as='h3' block>
                    <Breadcrumb size='big'>
                        <Breadcrumb.Section onClick={(e) => this.breadcrumbLink('bukrs')} link>Компания {this.state.headerBukrsName}</Breadcrumb.Section>
                        <Breadcrumb.Divider icon='right chevron' />
                        <Breadcrumb.Section active>{this.state.headerBranchName}</Breadcrumb.Section>
                    </Breadcrumb>
                </Header>
            )
        }else if(this.state.detail == 'group'){
            return (
                <Header as='h3' block>
                    <Breadcrumb size='big'>
                        <Breadcrumb.Section onClick={(e) => this.breadcrumbLink('bukrs')} link>Компания {this.state.headerBukrsName}</Breadcrumb.Section>
                        <Breadcrumb.Divider icon='right chevron' />
                        <Breadcrumb.Section onClick={(e) => this.breadcrumbLink('branch')} link>{this.state.headerBranchName}</Breadcrumb.Section>
                        <Breadcrumb.Divider icon='right chevron' />
                        <Breadcrumb.Section active>{this.state.headerManagerName}</Breadcrumb.Section>
                    </Breadcrumb>
                </Header>
            )
        }
        return this.renderSearchForm();
    }

    render(){
        return (
            <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                <div>
                    <Header as='h2' attached='top'>
                        KPI отчет сотрудников отдела маркетинга
                    </Header>
                    {this.renderHeader()}
                    <Divider clearing />
                    <Segment attached>
                        <Grid columns={2}>
                            <Loader active={this.state.loading}/>
                            {this.state.items.map((item) => {
                                return <KpiCard
                                    key={item.id}
                                    cardData={item}
                                    cardType={this.state.detail}
                                    loadDetail={this.loadDetail}/>
                            })}
                        </Grid>
                    </Segment>
                </div>
            </Container>
        )
    }
}

export default KpiReportPage;