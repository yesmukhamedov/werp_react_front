import React, {Component} from 'react';
import axios from 'axios';
import {Container,Header,Segment,Grid,Form,Divider} from 'semantic-ui-react';
import KpiCard from './KpiCard';
import {ROOT_URL} from '../../../../utils/constants';

const a = [
    {
        "name":"ТУИМЕБАЕВ ЭЛЬМУРОД",
        "totalScore":"25.03",
        "indicators":[
            {
                name:"Демо рекомендации",
                value:300,
                point:25,
                doneValue:62,
                score:5.17
            },
            {
                name:"Визит рекомендации",
                value:"35",
                point:"10",
                doneValue:0,
                score:0
            },
            {
                name:"Демо",
                value:"25",
                point:"25",
                doneValue:17,
                score:17
            },
            {
                name:"С демо на демо (Instant set)",
                value:"3",
                point:"10",
                doneValue:0,
                score:0
            },
            {
                name:"Демо продажи",
                value:"4",
                point:"20",
                doneValue:0,
                score:0
            },
            {
                name:"Визит клиенту",
                value:"7",
                point:"10",
                doneValue:2,
                score:2.86
            }
        ]
    },

    {
        "name":"ТОКАШЕВ ТОЛЕГЕН",
        "totalScore":"25.03",
        "indicators":[
            {
                name:"Демо рекомендации",
                value:"300",
                point:"14",
                doneValue:62,
                score:1.17
            }
        ]
    }
];

const yearOptions = [
    {
        key:2017,
        text:2017,
        value:2017
    },
    {
        key:2018,
        text:2018,
        value:2018
    },
    {
        key:2019,
        text:2019,
        value:2019
    }
];

const monthOptions = [
    {
        key:1,
        text:'Январь',
        value:1
    },
    {
        key:2,
        text:'Февраль',
        value:2
    },
    {
        key:3,
        text:'Март',
        value:3
    },
    {
        key:4,
        text:'Апрель',
        value:4
    },
    {
        key:5,
        text:'Май',
        value:5
    },
    {
        key:6,
        text:'Июнь',
        value:6
    },
    {
        key:7,
        text:'Июль',
        value:7
    },
    {
        key:8,
        text:'Август',
        value:8
    },
    {
        key:9,
        text:'Сентябрь',
        value:9
    },
    {
        key:10,
        text:'Октябрь',
        value:10
    },
    {
        key:11,
        text:'Ноябрь',
        value:11
    },
    {
        key:12,
        text:'Декабрь',
        value:12
    }
];

const currentDate = new Date();

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
            selectedYear:0,
            selectedMonth:0
        }

        this.loadBranches = this.loadBranches.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.loadItems = this.loadItems.bind(this);
    }

    handleError(e){
        console.log(e)
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
            if(loaded.length > 0){
                selectedBukrs = loaded[0]['text'];
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

    loadItems(){
        if(!this.state.selectedBukrs || this.state.selectedBukrs.length == 0){
            return;
        }
        axios.get(`${ROOT_URL}/api/crm/report/kpi/` + this.state.selectedBukrs,{
            headers: {
                authorization: localStorage.getItem('token')
            },
            params:{
                branchIds:this.state.selectedBranches.join(','),
                year:this.state.selectedYear,
                month:this.state.selectedMonth
            }
        }).then((res) => {
            this.setState({
                ...this.state,
                items:res.data
            })
        }).catch((e) => {
            console.log(e);
        });
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

    handleDropdownChange(e,result){
        const {name,value} = result;
        switch (name){
            case "bukrs":
                this.setState({
                    ...this.state,
                    selectedBukrs:value,
                    selectedBranches:[]
                })
                this.loadBranches(value)
                break

            case "branch":
                this.setState({
                    ...this.state,
                    selectedBranches:value,
                    managerOptions:[],
                    selectedManager:0
                })

                if(value.length == 1){
                    this.loadManagers(value[0]);
                }

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
                    <Form.Select defaultValue={selectedBukrs} error={this.state.selectedBukrs.length == 0} name="bukrs" label='Компания' options={bukrsOptions} placeholder='Компания' onChange={this.handleDropdownChange} />
                    <Form.Select name="branch" fluid multiple search selection label='Филиал' options={branchOptions} placeholder='Филиал' onChange={this.handleDropdownChange} />
                    <Form.Select name="manager" label='Менеджер' options={managerOptions} placeholder='Менеджер' />
                    <Form.Select defaultValue={currentDate.getFullYear()} name="year" label='Год' options={yearOptions} placeholder='Год' onChange={this.handleDropdownChange} />
                    <Form.Select defaultValue={currentDate.getMonth()} name="month" label='Месяц' options={monthOptions} placeholder='Месяц' onChange={this.handleDropdownChange} />
                </Form.Group>
                <Form.Button onClick={this.loadItems}>Сформировать</Form.Button>
            </Form>
        )
    }

    render(){
        return (
            <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                <div>
                    <Header as='h2' attached='top'>
                        KPI отчет сотрудников отдела маркетинга
                    </Header>
                    {this.renderSearchForm()}
                    <Divider clearing />
                    <Segment attached>
                        <Grid columns={2}>
                            {this.state.items.map((item) => {
                                return <KpiCard key={item.id} cardData={item} />
                            })}
                        </Grid>
                    </Segment>
                </div>
            </Container>
        )
    }
}

export default KpiReportPage;