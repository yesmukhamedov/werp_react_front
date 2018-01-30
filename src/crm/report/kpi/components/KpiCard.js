import React, {Component} from 'react';
import { Table,Segment,Button,Label,Header,Grid,Divider } from 'semantic-ui-react'

const cardHeader = {
    maxWidth: '80%'
};

class KpiCard extends Component{
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    renderForBukrs(cardData){
        return (
            <Grid.Column width={8}>
                <Segment padded size={'small'}>
                    <Label attached='top'>
                        <Header as='h3' floated={'left'}>{cardData.name}</Header>
                        <Button floated={'right'}>{this.roundedValue(cardData.totalPercentage)}%</Button>
                    </Label>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>#</Table.HeaderCell>
                                <Table.HeaderCell>Индикатор</Table.HeaderCell>
                                <Table.HeaderCell>Цель</Table.HeaderCell>
                                <Table.HeaderCell>Выполнено</Table.HeaderCell>
                                <Table.HeaderCell>% выполнения</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {cardData.items.map((item,idx) => {
                                return <Table.Row key={item.indicatorId}>
                                    <Table.Cell>{idx+1}</Table.Cell>
                                    <Table.Cell>{item.indicatorName}</Table.Cell>
                                    <Table.Cell>{item.value}</Table.Cell>
                                    <Table.Cell>{item.doneValue}</Table.Cell>
                                    <Table.Cell negative={item.percentage < 60} positive={item.percentage > 80} warning={item.percentage >= 60 && item.percentage <= 80}>{this.roundedValue(item.percentage)}%</Table.Cell>
                                </Table.Row>
                            })}
                        </Table.Body>
                    </Table>
                    <Divider />
                    <Button onClick={(e) => this.props.loadItems('branch',cardData.id)}>
                        Деталь
                    </Button>
                </Segment>
            </Grid.Column>
        )
    }

    renderForBranches(cardData){
        return (
            <Grid.Column width={8}>
                <Segment padded size={'small'}>
                    <Label attached='top'>
                        {cardData.name.length > 30
                            ?<Header style={cardHeader} as='h4' floated={'left'}>{cardData.name} ({cardData.totalItemCount} чел.)</Header>
                            :<Header style={cardHeader} as='h3' floated={'left'}>{cardData.name} ({cardData.totalItemCount} чел.)</Header>}
                        <Button floated={'right'}>{this.roundedValue(cardData.totalAverageScore)}%</Button>
                    </Label>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>#</Table.HeaderCell>
                                <Table.HeaderCell>Индикатор</Table.HeaderCell>
                                <Table.HeaderCell>Цель</Table.HeaderCell>
                                <Table.HeaderCell>Выполнено</Table.HeaderCell>
                                <Table.HeaderCell>% выполнения</Table.HeaderCell>
                                <Table.HeaderCell>Набранный балл</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {cardData.items.map((item,idx) => {
                                return <Table.Row key={item.indicatorId}>
                                    <Table.Cell>{idx+1}</Table.Cell>
                                    <Table.Cell>{item.indicatorName}</Table.Cell>
                                    <Table.Cell>{item.value}</Table.Cell>
                                    <Table.Cell>{item.doneValue}</Table.Cell>
                                    <Table.Cell>
                                        {this.roundedValue(item.performancePercentage)}%
                                    </Table.Cell>
                                    <Table.Cell
                                        negative={item.averageScore < 60}
                                        positive={item.averageScore > 80}
                                        warning={item.averageScore >= 60 && item.averageScore <= 80}
                                    >{this.roundedValue(item.averageScore)}</Table.Cell>
                                </Table.Row>
                            })}
                        </Table.Body>
                    </Table>
                    <Divider />
                    {cardData.detailable?<Button onClick={(e) => this.props.loadItems(cardData.detailContext,cardData.id)}>
                            Деталь
                        </Button>:''}

                </Segment>
            </Grid.Column>
        )
    }

    renderForGroups(cardData){
        return <Grid.Column width={8}>
            <Segment padded size={'small'}>
                <Label attached='top'>
                    <Header as='h3' floated={'left'}>{cardData.name}</Header>
                    <Button floated={'right'}>{this.roundedValue(cardData.totalScore)}</Button>
                </Label>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>#</Table.HeaderCell>
                            <Table.HeaderCell>Индикатор</Table.HeaderCell>
                            <Table.HeaderCell>Цель</Table.HeaderCell>
                            <Table.HeaderCell>Выполнено</Table.HeaderCell>
                            <Table.HeaderCell>Балл</Table.HeaderCell>
                            <Table.HeaderCell>Набранный балл</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {cardData.items.map((item,idx) => {
                            return <Table.Row key={item.indicatorId}>
                                <Table.Cell>{idx+1}</Table.Cell>
                                <Table.Cell>{item.indicatorName}</Table.Cell>
                                <Table.Cell>{item.value}</Table.Cell>
                                <Table.Cell>{item.doneValue}</Table.Cell>
                                <Table.Cell>{item.point}</Table.Cell>
                                <Table.Cell negative={item.percentage < 60}
                                            positive={item.percentage > 80}
                                            warning={item.percentage >= 60 && item.percentage <= 80}>
                                    {this.roundedValue(item.score)}
                                </Table.Cell>
                            </Table.Row>
                        })}
                    </Table.Body>
                </Table>
                <Divider />
                <Button onClick={(e) => this.props.loadItems('manager',cardData.id)}>
                    Деталь
                </Button>
            </Segment>
        </Grid.Column>
    }

    renderForManager(cardData){
        return <Grid.Column width={8}>
            <Segment padded size={'small'}>
                <Label attached='top'>
                    <Header as='h3' floated={'left'}>{cardData.name}</Header>
                    <Button floated={'right'}>{this.roundedValue(cardData.totalScore)}</Button>
                </Label>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>#</Table.HeaderCell>
                            <Table.HeaderCell>Индикатор</Table.HeaderCell>
                            <Table.HeaderCell>Цель</Table.HeaderCell>
                            <Table.HeaderCell>Выполнено</Table.HeaderCell>
                            <Table.HeaderCell>Балл</Table.HeaderCell>
                            <Table.HeaderCell>Набранный балл</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {cardData.items.map((item,idx) => {
                            return <Table.Row key={item.indicatorId}>
                                <Table.Cell>{idx+1}</Table.Cell>
                                <Table.Cell>{item.indicatorName}</Table.Cell>
                                <Table.Cell>{item.value}</Table.Cell>
                                <Table.Cell>{item.doneValue}</Table.Cell>
                                <Table.Cell>{item.point}</Table.Cell>
                                <Table.Cell negative={item.percentage < 60}
                                            positive={item.percentage > 80}
                                            warning={item.percentage >= 60 && item.percentage <= 80}>
                                    {this.roundedValue(item.score)}
                                </Table.Cell>
                            </Table.Row>
                        })}
                    </Table.Body>
                </Table>
            </Segment>
        </Grid.Column>
    }

    render(){
        const {cardData,context} = this.props;
        if(context === 'manager'){
            return this.renderForManager(cardData);
        }
        return this.renderForBranches(cardData);
    }

    roundedValue(v){
        return Math.round(v*100)/100;
    }
}

export  default KpiCard;

