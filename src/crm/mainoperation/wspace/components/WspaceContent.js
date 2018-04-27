import React from 'react'
import { Card,Image,Button } from 'semantic-ui-react'
import WspaceRecoCard from './WspaceRecoCard'

export default function WspaceContent(props){
    const {items} = props
    if(!items){
        return (null)
    }

    return <Card.Group>
        {items.map(item => (
            <WspaceRecoCard key={item.id} item={item}/>
        ))}
    </Card.Group>
}