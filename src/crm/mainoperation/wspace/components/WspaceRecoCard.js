import React from 'react'
import { Card,Image,Button } from 'semantic-ui-react'

export default function WspaceRecoCard(props){
        const {item} = props
        return <Card>
            <Card.Content>
                <Card.Header>
                    {item.clientName}
                </Card.Header>
                <Card.Meta>
                    {item.recommenderName}
                </Card.Meta>
                <Card.Description>
                    Steve wants to add you to the group <strong>best friends</strong>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                    <Button basic color='green'>Approve</Button>
                    <Button basic color='red'>Decline</Button>
                </div>
            </Card.Content>
        </Card>
}