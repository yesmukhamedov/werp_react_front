import React, {Component} from 'react'
import _ from 'lodash'
import "react-table/react-table.css";
import { Tab,Header,Container,Icon,Segment,Label,Accordion,Menu,Input } from 'semantic-ui-react'
import moment from 'moment';
import {RECO_CATEGORIES} from '../../../crmUtil'
import '../css/header-page.css'

const MENU_ITEMS = [
    {
        id: 'all',
        name: 'Все рек.',
        count: 135
    },
    {
        id: 'by_recommender',
        name: 'По рекомендателям',
        count: 55
    },
    {
        id: 'new',
        name: 'По дате',
        count: 12
    },
    {
        id: 'moved',
        name: 'Перенесенные',
        count: 0
    }
]

export default function WspaceMenu (props) {
    const activeItem = 'all'
    return (
        <Menu stackable>
            {MENU_ITEMS.map(m => (
                <Menu.Item
                    as='a'
                    key={m.id}
                    name={m.id}
                    active={activeItem === m.id}
                    onClick={props.handleItemClick}>
                    {m.name}
                    <Label color={m.count === 0?'grey':'olive'} size={'mini'}>{m.count}</Label>
                </Menu.Item>
            ))}
            <Menu.Item>
                <Input icon='search' placeholder='Поиск...' />
            </Menu.Item>
        </Menu>
    )
}