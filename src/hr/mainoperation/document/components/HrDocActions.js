import React from 'react'
import {Button } from 'semantic-ui-react'

export default function HrDocActions (props) {
    return <div style={{'float':'left'}}>
        <Button content='Добавить согласующих' />
        <Button content='Проставить оклады' />
        <Button content='**Отменить**' />
        <Button content='Добавить должности' />
        <Button content='В список' />
    </div>
}