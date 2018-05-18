import React from 'react'
import { Card,Image,Button } from 'semantic-ui-react'
import WspaceRecoCard from './WspaceRecoCard'

export default function WspaceRecoList(props){
    const {items,menu} = props
    if(!items){
        return <h3>Нет данных!</h3>
    }

    return <Card.Group>
        {items.map(item => (
            <WspaceRecoCard openRecoListModal={props.openRecoListModal}  type={menu} key={item.id} item={item}/>
        ))}
    </Card.Group>
}