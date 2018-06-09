import React from 'react'
import {Menu, Label } from 'semantic-ui-react'

export default function WspaceDashboardMenu(props){
    const {items,activeItem} = props
    if(!items){
        return (null)
    }

    return <Menu vertical className={'dashboard-menu'}>
        {items.map(m => (
            <Menu.Item
                as='a'
                key={m.name}
                name={m.name}
                active={activeItem === m.name}
                onClick={() => props.handleItemClick(m.name)}>
                <Label>{m.count}</Label>
                {m.label}
            </Menu.Item>
        ))}
    </Menu>
}