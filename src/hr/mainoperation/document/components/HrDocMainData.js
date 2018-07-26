import React from 'react'
import {Segment,Grid,Label, List } from 'semantic-ui-react'

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
                            {'Заявление о приеме на работу' || <span>&mdash;</span>}
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
                            <List.Header className="list-header">Дата создания:</List.Header>
                            2018-07-26 15:20:11.036
                        </List.Item>
                        <List.Item>
                            <List.Header className="list-header">Статус:</List.Header>
                            НА ИСПОЛНЕНИИ
                        </List.Item>
                    </List>
                </Grid.Column>
                <Grid.Column>
                    <List>
                        <List.Item>
                            <List.Header className="list-header">
                                Ответственный:
                            </List.Header>
                            АЯПОВ БАХТИЯР
                        </List.Item>
                        <List.Item>
                            <List.Header className="list-header">Составил:</List.Header>
                            УМБЕТАЛИЕВА ГУЛЬШАТ
                        </List.Item>
                        <List.Item>
                            <List.Header className="list-header">Статус:</List.Header>
                            НА ИСПОЛНЕНИИ
                        </List.Item>
                    </List>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Segment>
}