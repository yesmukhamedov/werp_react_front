import React from 'react'
import {Segment,Grid,Label, List } from 'semantic-ui-react'
import {formatDMYMS} from '../../../../utils/helpers'

export default function HrDocMainData (props) {
    const {item} = props

    return <Segment raised>
        <Label color="blue" ribbon>
            Информация о документе
        </Label>
        <Grid columns={3} divided stackable>
            <Grid.Row>
                <Grid.Column>
                    <List>
                        <List.Item>
                            <List.Header className="list-header">
                                Номер документа:
                            </List.Header>
                            {'№0001684' || <span>&mdash;</span>}
                        </List.Item>
                        <List.Item>
                            <List.Header className="list-header">
                                Тип документа:
                            </List.Header>
                            {item.typeName || <span>&mdash;</span>}
                        </List.Item>
                        <List.Item>
                            <List.Header className="list-header">Компания:</List.Header>
                            {item.bukrsName || <span>&mdash;</span>}
                        </List.Item>
                    </List>
                </Grid.Column>
                <Grid.Column>
                    <List>
                        <List.Item>
                            <List.Header className="list-header">
                                Филиал:
                            </List.Header>
                            {item.branchName || <span>&mdash;</span>}
                        </List.Item>
                        <List.Item>
                            <List.Header className="list-header">
                                Департамент:
                            </List.Header>
                            {item.departmentName || <span>&mdash;</span>}
                        </List.Item>
                        <List.Item>
                            <List.Header className="list-header">Статус:</List.Header>
                            {item.statusName || <span>&mdash;</span>}
                        </List.Item>
                    </List>
                </Grid.Column>
                <Grid.Column>
                    <List>
                        <List.Item>
                            <List.Header className="list-header">Дата создания:</List.Header>
                            {formatDMYMS(item.createdAt)}
                        </List.Item>
                        <List.Item>
                            <List.Header className="list-header">
                                Ответственный:
                            </List.Header>
                            {item.responsibleName || <span>&mdash;</span>}
                        </List.Item>
                        <List.Item>
                            <List.Header className="list-header">Составил:</List.Header>
                            {item.creatorName || <span>&mdash;</span>}
                        </List.Item>
                    </List>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Segment>
}