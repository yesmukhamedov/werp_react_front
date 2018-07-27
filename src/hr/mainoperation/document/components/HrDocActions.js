import React from 'react'
import {Button } from 'semantic-ui-react'

export default function HrDocActions (props) {
    const {items} = props
    if(!items){
        return (null)
    }
    return <div style={{'float':'left','clear':'both'}}>
        {items.map(item => {
            return <Button key={item.actionType} content={item.label} onClick={() => props.handleAction(item.actionType)} />
        })}
    </div>
}