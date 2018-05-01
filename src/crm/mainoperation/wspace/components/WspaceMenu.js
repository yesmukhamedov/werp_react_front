import React, {Component} from 'react'
import _ from 'lodash'
import "react-table/react-table.css";
import { Tab,Header,Container,Icon,Segment,Label,Accordion,Menu,Input } from 'semantic-ui-react'
import moment from 'moment';
import {MENU_ITEMS,MENU_DASHBOARD} from '../wspaceUtil'
import '../css/header-page.css'



export default function WspaceMenu (props) {
    const {activeItem} = props
    return (
        <Menu stackable>
            <Menu.Item
                as='a'
                name={MENU_DASHBOARD}
                active={activeItem === MENU_DASHBOARD}
                onClick={() => props.handleItemClick(MENU_DASHBOARD)}>
                Dashboard
            </Menu.Item>
            {MENU_ITEMS.map(m => (
                <Menu.Item
                    as='a'
                    key={m.id}
                    name={m.id}
                    active={activeItem === m.id}
                    onClick={() => props.handleItemClick(m.id)}>
                    {m.name}
                    <Label color={m.count === 0?'grey':'red'} size={'mini'}>{m.count}</Label>
                </Menu.Item>
            ))}
            <Menu.Item
                as='a'
                name='info'
                active={activeItem === 'info'}
                onClick={props.handleItemClick}>
                Доп. информация
            </Menu.Item>
            <Menu.Item>
                <Input icon='search' placeholder='Поиск...' />
            </Menu.Item>
        </Menu>
    )
}