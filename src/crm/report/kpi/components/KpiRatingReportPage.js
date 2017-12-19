import React, {Component} from 'react';
import ReactTable from 'react-table';
import axios from 'axios';
import {Container,Header,Segment,Grid,Form,Divider,Loader} from 'semantic-ui-react';
import {ROOT_URL} from '../../../../utils/constants';
import BukrsF4 from '../../../../reference/f4/bukrs/BukrsF4'
import BranchF4 from '../../../../reference/f4/branch/BranchF4'
import YearF4 from '../../../../reference/f4/date/YearF4'
import MonthF4 from '../../../../reference/f4/date/MonthF4'

class KpiRatingReportPage extends Component{
    constructor(props) {
        super(props)
        this.state = {
            items:[],
            loading:false,
            selectedBukrs:'',
            selectedBranches:[],
            selectedYear:2017,
            selectedMonth:12,
            selectedPositionId:0
        }

        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.loadItems = this.loadItems.bind(this);
    }

    componentWillMount(){
    }

    loadItems(){
        this.setState({
            ...this.state,
            loading:true
        })
        axios.get(`${ROOT_URL}/api/crm/report/kpi-rating`,{
            headers: {
                authorization: localStorage.getItem('token')
            },
            params:{
                bukrs:this.state.selectedBukrs,
                branchIds:this.state.selectedBranches.join(','),
                year:this.state.selectedYear,
                month:this.state.selectedMonth
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

    renderDataTable(){
        return <div>
            <ReactTable
                data={this.state.items}
                columns={[
                    {
                        Header:"Компания",
                        accessor:"bukrsName"
                    },
                    {
                        Header:"Филиал",
                        accessor: "branchName"
                    },
                    {
                        Header:"Сотудник",
                        accessor: "staffName"
                    },
                    {
                        Header:"Должность",
                        accessor: "positionName"
                    },
                    {
                        Header:"KPI %",
                        id:"score",
                        accessor: row=>this.roundedValue(row.score)
                    }
                ]}

                defaultSorted={[
                    {
                        id:"score",
                        desc:true
                    }
                ]}
                defaultPageSize={50}
                className="-striped -highlight">

            </ReactTable>
        </div>
    }

    submitSearch(){
        this.loadItems();
    }

    handleDropdownChange(e,result){
        const {name,value,options} = result;
        let {selectedBukrs,selectedYear,selectedMonth,selectedBranches} = this.state;
        switch (name){
            case "bukrs":
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

        this.setState({
            ...this.state,
            selectedBukrs:selectedBukrs,
            selectedBranches:selectedBranches,
            selectedYear:selectedYear,
            selectedMonth:selectedMonth
        })
    }

    renderSearchForm(){
        return <Form>
            <Form.Group widths='equal'>
                <BukrsF4 handleChange={this.handleDropdownChange} />
                <BranchF4 search={true} multiple={true} handleChange={this.handleDropdownChange} bukrs={this.state.selectedBukrs} />
                <YearF4 handleChange={this.handleDropdownChange} />
                <MonthF4 handleChange={this.handleDropdownChange} />
            </Form.Group>
            <Form.Button loading={this.state.loading} onClick={this.loadItems}>Сформировать</Form.Button>
        </Form>
    }

    render(){
            return (
                <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                    <div>
                        <Header as='h2' attached='top'>
                            Рейтинг сотрудников отдела маркетинга
                        </Header>
                        {this.renderSearchForm()}
                        <Divider clearing />
                        <Segment attached>
                            {this.renderDataTable()}
                        </Segment>
                    </div>
                </Container>
            )
    }

    roundedValue(v){
        return Math.round(v*100)/100;
    }
}

export  default KpiRatingReportPage;

