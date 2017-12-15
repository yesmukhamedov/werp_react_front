import React, {Component} from 'react';
import { Card, Icon, Table,Segment,Button,Label,Header,Grid,Divider } from 'semantic-ui-react'

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
                                    <Table.Cell negative>{this.roundedValue(item.percentage)}%</Table.Cell>
                                </Table.Row>
                            })}
                        </Table.Body>
                    </Table>
                    <Divider />
                    <Button onClick={(e) => this.props.loadDetail('branch',cardData)}>
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
                                    <Table.Cell negative>{this.roundedValue(item.percentage)}%</Table.Cell>
                                </Table.Row>
                            })}
                        </Table.Body>
                    </Table>
                    <Divider />
                    <Button onClick={(e) => this.props.loadDetail('group',cardData)}>
                        Деталь
                    </Button>
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
                            <Table.HeaderCell>Значение</Table.HeaderCell>
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
                                <Table.Cell negative>{this.roundedValue(item.score)}</Table.Cell>
                            </Table.Row>
                        })}
                    </Table.Body>
                </Table>
            </Segment>
        </Grid.Column>
    }

    render(){
        const {cardData,cardType} = this.props;
        if(cardType == 'branch'){
            return this.renderForBranches(cardData);
        }else if(cardType == 'group'){
            return this.renderForGroups(cardData);
        }

        return this.renderForBukrs(cardData);
            return (
                <Grid.Column width={8}>
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
                                    <Table.HeaderCell>Значение</Table.HeaderCell>
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
                                        <Table.Cell negative>{this.roundedValue(item.score)}</Table.Cell>
                                    </Table.Row>
                                })}
                            </Table.Body>
                        </Table>
                    </Segment>
                </Grid.Column>
            )
    }

    roundedValue(v){
        return Math.round(v*100)/100;
    }


    render2(){
        return (
            <Card.Group itemsPerRow={2}>
            <Card as={'div'}>
                <Card.Content>
                    <Card.Header>
                        ТУИМЕБАЕВ ЭЛЬМУРОД
                    </Card.Header>
                    <Card.Meta>
                        5.15
                    </Card.Meta>
                </Card.Content>
                <Card.Content>

                </Card.Content>
            </Card>

                <Card as={'div'}>
                    <Card.Content>
                        <Card.Header>
                            ТОКАШЕВ ТОЛЕГЕН
                        </Card.Header>
                    </Card.Content>
                    <Card.Content>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>#</Table.HeaderCell>
                                    <Table.HeaderCell>Индикатор</Table.HeaderCell>
                                    <Table.HeaderCell>Значение</Table.HeaderCell>
                                    <Table.HeaderCell>Балл</Table.HeaderCell>
                                    <Table.HeaderCell>Выполнено</Table.HeaderCell>
                                    <Table.HeaderCell>Набранный бал</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>1</Table.Cell>
                                    <Table.Cell>Демо рекомендации</Table.Cell>
                                    <Table.Cell>300</Table.Cell>
                                    <Table.Cell>25</Table.Cell>
                                    <Table.Cell>62</Table.Cell>
                                    <Table.Cell negative>5.17</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>2</Table.Cell>
                                    <Table.Cell>Визит рекомендации</Table.Cell>
                                    <Table.Cell>35</Table.Cell>
                                    <Table.Cell>10</Table.Cell>
                                    <Table.Cell>0</Table.Cell>
                                    <Table.Cell negative>0</Table.Cell>
                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>3</Table.Cell>
                                    <Table.Cell>Демо</Table.Cell>
                                    <Table.Cell>25</Table.Cell>
                                    <Table.Cell>25</Table.Cell>
                                    <Table.Cell>17</Table.Cell>
                                    <Table.Cell negative>17</Table.Cell>
                                </Table.Row>

                            </Table.Body>
                        </Table>
                    </Card.Content>
                </Card>
            </Card.Group>
        )
    }
}

export  default KpiCard;

