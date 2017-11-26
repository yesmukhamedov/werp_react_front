import React, {Component} from 'react';
import axios from 'axios';
import {Container,Header,Segment,Grid} from 'semantic-ui-react';
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

class KpiReportPage extends Component{

    constructor(props) {
        super(props)
        this.state = {
            items:[],
            queryParams:{
                month:10
            }
        }
    }

    componentWillMount(){
        axios.get(`${ROOT_URL}/crm/report/kpi`,{
            headers: {
                authorization: localStorage.getItem('token')
            },
            params:this.state.queryParams
        });
    }

    render(){
        return (
            <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                <div>
                    <Header as='h2' attached='top'>
                        KPI отчет сотрудников отдела маркетинга
                    </Header>
                    <Segment attached>
                        <Grid columns={2}>
                            {a.map((item) => {
                                return <KpiCard key={item.name} cardData={item} />
                            })}
                        </Grid>
                    </Segment>
                </div>
            </Container>
        )
    }
}

export default KpiReportPage;