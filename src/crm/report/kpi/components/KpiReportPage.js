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
            context:'',
            contextId:0,
            headerBukrsName:'',
            headerBukrsId:'',
            headerBranchId:0,
            headerBranchName:'',
            headerManagerId:0,
            headerManagerName:'',
            loading:false
        }

        this.loadItems = this.loadItems.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.breadcrumbLink = this.breadcrumbLink.bind(this);
    }

    handleError(e){
        console.log(e)
    }

    componentWillMount(){
       this.loadItems("",0);
    }

    loadItems(context,contextId){
        console.log(context);
        axios.get(`${ROOT_URL}/api/crm/report/kpi-current`,{
            headers: {
                authorization: localStorage.getItem('token')
            },
            params:{
                context:context,
                contextId:contextId
            }
        }).then((res) => {
            this.setState({
                ...this.state,
                items:res.data,
                loading:false,
                context:context
            })
        }).catch((e) => {
            console.log(e);
            this.setState({
                ...this.state,
                loading:false
            })
        });
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
        return '';
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