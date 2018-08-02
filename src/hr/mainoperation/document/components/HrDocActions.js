import React from 'react'
import {Button } from 'semantic-ui-react'
import {DOC_ACTION_GO_TO_LIST} from '../../../hrUtil'

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

function actionHandler (actionType){
    switch (actionType){
        case DOC_ACTION_GO_TO_LIST:
            break

        default:
            window.alert('Unknown Action');
    }
}