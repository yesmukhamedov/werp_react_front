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

const bukrsMap = {};
const branchesMap = {};
class KpiReportPage extends Component{

    constructor(props) {
        super(props)
        this.state = {
            items:[],
            context:'',
            contextId:0,
            loading:false,
            bukrs:'',
            branchId:0,
            managerId:0,
            breadcrumbs:[]
        }

        this.loadItems = this.loadItems.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
    }

    handleError(e){
        console.log(e)
    }

    loadBranches(bukrs){
        if(branchesMap[bukrs]){
            return;
        }
        axios.get(`${ROOT_URL}/api/reference/branches/` + bukrs,{
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then((res) => {
            branchesMap[bukrs] = {};
            for(let i = 0; i < res.data.length; i++){
                branchesMap[bukrs][res.data[i]['branch_id']] = res.data[i]['text45'];
            }
        }).catch((e) => {
            console.log(e);
            this.setState({
                ...this.state,
                loading:false
            })
        });
    }

    componentWillMount(){
        axios.get(`${ROOT_URL}/api/reference/companies`,{
            headers: {
                authorization: localStorage.getItem('token')
            }
        }).then((res) => {
            for(let i = 0; i < res.data.length; i++){
                bukrsMap[res.data[i]['id']] = res.data[i]['name'];
            }
        }).catch((e) => {
            console.log(e);
            this.setState({
                ...this.state,
                loading:false
            })
        });

       this.loadItems("",0);
    }

    loadItems(context,contextId){
        let {currentBukrsName,currentBranchName} = this.state;
        this.setState({
            ...this.state,
            loading:true
        });
        axios.get(`${ROOT_URL}/api/crm/report/kpi-current`,{
            headers: {
                authorization: localStorage.getItem('token')
            },
            params:{
                context:context,
                contextId:contextId
            }
        }).then((res) => {
            if(context === 'branch'){
                this.loadBranches(contextId);
                currentBukrsName = bukrsMap[contextId];
            }else if(context === 'group'){
                currentBranchName = branchesMap
            }
            this.setState({
                ...this.state,
                items:res.data.items,
                loading:false,
                context:res.data.context,
                contextId:res.data.contextId,
                currentBukrsName:currentBukrsName,
                currentBranchName:currentBranchName,
                breadcrumbs:res.data.breadcrumbs
            })
        }).catch((e) => {
            console.log(e);
            this.setState({
                ...this.state,
                loading:false
            })
        });
    }

    renderHeader(){
        return (
            <Header as='h3' block>
                <Breadcrumb size='big'>
                    {this.state.breadcrumbs.map((item,idx) => {
                        if(item.clickable){
                            return <span key={idx}><Breadcrumb.Section onClick={(e) => this.loadItems(item.name,item.id)} link>{item.title}</Breadcrumb.Section>
                                <Breadcrumb.Divider icon='right chevron' /></span>
                        }else {
                            if(item.active){
                                return <Breadcrumb.Section key={idx} active>{item.title}</Breadcrumb.Section>
                            }else{
                                return <span key={idx}>
                                    <Breadcrumb.Section>{item.title}</Breadcrumb.Section>
                                    <Breadcrumb.Divider icon='right chevron' />
                                </span>
                            }
                        }
                    })}
                </Breadcrumb>
            </Header>
        )
    }

    render(){
        return (
            <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                <div>
                    <Header as='h2' attached='top'>
                        Текущий KPI сотрудников отдела маркетинга
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
                                    context={this.state.context}
                                    loadItems={this.loadItems}/>
                            })}
                        </Grid>
                    </Segment>
                </div>
            </Container>
        )
    }
}

export default KpiReportPage;