import React, {Component} from 'react';
import axios from 'axios';
import {Container,Header,Segment,Grid,Form,Divider,Breadcrumb,Loader} from 'semantic-ui-react';
import KpiCard from './KpiCard';
import {ROOT_URL} from '../../../../utils/constants';
import BukrsF4 from '../../../../reference/f4/bukrs/BukrsF4'
import BranchF4 from '../../../../reference/f4/branch/BranchF4'
import YearF4 from '../../../../reference/f4/date/YearF4'
import MonthF4 from '../../../../reference/f4/date/MonthF4'
const currentDate = new Date();

class KpiReportPage extends Component{

    constructor(props) {
        super(props)
        this.state = {
            items:[],
            selectedBukrs:'',
            selectedBranches:[],
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

        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.loadItems = this.loadItems.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
        this.loadDetail = this.loadDetail.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.breadcrumbLink = this.breadcrumbLink.bind(this);
    }

    handleError(e){
        console.log(e)
    }

    componentWillMount(){
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
        const {selectedBukrs} = this.state;
        if(!selectedBukrs || selectedBukrs.length === 0){
            return;
        }

        this.setState({
            ...this.state,
            detail: '',
            detailId: 0,
            loading: true,
            items: []
        })
        this.loadItems('',0);
    }

    loadDetail(detailName,cardData){
        if(detailName === 'branch'){
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
        }else if(detailName === 'group'){
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

    handleDropdownChange(e,result){
        const {name,value,options} = result;
        let {selectedBukrs,headerBukrsName,selectedYear,selectedMonth,selectedBranches} = this.state;
        switch (name){
            case "bukrs":
                headerBukrsName = options.map((b) => {
                    if(b.value == value){
                        return b.text;
                    }
                })
                selectedBukrs = value;
                break

            case "branch":
                selectedBranches = value;
                break

            case "year":
                selectedYear = value;
                break

            case "month":
                selectedMonth = value;
                break
        }

        console.log(selectedBukrs);

        this.setState({
            ...this.state,
            selectedBukrs:selectedBukrs,
            selectedBranches:selectedBranches,
            headerBukrsName:headerBukrsName,
            selectedYear:selectedYear,
            selectedMonth:selectedMonth
        })
    }

    renderSearchForm() {
        let value ='';
        return (
            <Form>
                <Form.Group widths='equal'>
                    <BukrsF4 handleChange={this.handleDropdownChange} />
                    <BranchF4 search={true} multiple={true} handleChange={this.handleDropdownChange} bukrs={this.state.selectedBukrs} />
                    <YearF4 handleChange={this.handleDropdownChange} />
                    <MonthF4 handleChange={this.handleDropdownChange} />
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