import React from 'react'
import "react-table/react-table.css";
import { Label,Menu,Loader } from 'semantic-ui-react'
import {MENU_DASHBOARD,MENU_ADD_INFO} from '../wspaceUtil'
import '../css/header-page.css'



export default function WspaceMenu (props) {
    const {activeItem,items,loaders} = props

    return (
        <Menu stackable>
            <Menu.Item
                as='a'
                name={MENU_DASHBOARD}
                active={activeItem === MENU_DASHBOARD}
                onClick={() => props.handleItemClick(MENU_DASHBOARD)}>
                Dashboard
            </Menu.Item>
            {items.map(m => (
                <Menu.Item
                    as='a'
                    key={m.name}
                    name={m.name}
                    active={activeItem === m.name}
                    onClick={() => props.handleItemClick(m.name)}>
                    {loaders[m.name]?'':m.label}

                    {loaders[m.name]?<Loader size={'mini'} active/>:<Label color={m.count === 0?'grey':'red'} size={'mini'}>
                            {m.count}
                        </Label>}

                </Menu.Item>
            ))}
            <Menu.Item
                as='a'
                name={MENU_ADD_INFO}
                active={activeItem === 'info'}
                onClick={props.handleItemClick}>
                Доп. информация
            </Menu.Item>
        </Menu>
    )
}