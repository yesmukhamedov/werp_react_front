import React,{Component} from 'react'
import { Card,Image,Button,Modal, Segment, Statistic } from 'semantic-ui-react'
import WspaceRecoCard from './WspaceRecoCard'
import {RECO_MODAL_ITEMS} from '../wspaceUtil'

export default function WspaceRecoListModal (props) {
    let {opened,items,recommender} = props
    if(!items){
        items = []
    }

    return <Modal size={'fullscreen'}
                  open={opened} onClose={() => console.log('TEST')}>
        <Modal.Header>
            Рекомендатель: {recommender.clientName}, Статус демо: {recommender.resultName}
        </Modal.Header>
        <Modal.Content scrolling>
            <Card.Group>
                {items.map(item => (
                    <WspaceRecoCard  type={RECO_MODAL_ITEMS} key={item.id} item={item}/>
                ))}
            </Card.Group>
        </Modal.Content>
        <Modal.Actions>
            <Button color='black' onClick={props.closeRecoListModal}>
                Закрыть
            </Button>
            <Button positive icon='checkmark' labelPosition='right' content="Yep, that's me" onClick={props.closeRecoListModal} />
        </Modal.Actions>
    </Modal>
}