import React,{Component} from 'react'
import { Card,Image,Button,Modal, Segment, Statistic,Icon,Divider } from 'semantic-ui-react'
import WspaceRecoCard from './WspaceRecoCard'
import {RECO_MODAL_ITEMS} from '../wspaceUtil'

export default function WspaceRecoListModal (props) {
    let {opened,items,recommender} = props
    if(!items){
        items = []
    }

    console.log(recommender.phones)

    return <Modal size={'fullscreen'}
                  open={opened} onClose={() => console.log('TEST')}>
        <Modal.Header>
            <span style={{fontSize: '15px',display:'block',float:'left',paddingRight:'5px',borderRight:'1px #ddd solid'}}>
                <Icon name={'user'}/>
                {recommender.clientName},
            </span>
            <span style={{fontSize: '15px',display:'block',float:'left',paddingRight:'5px',borderRight:'1px #ddd solid'}}>
                <Icon name={'checkmark box'}/>
                {recommender.resultName}, </span>

            <span style={{fontSize: '15px',display:'block',float:'left',paddingRight:'5px',borderRight:'1px #ddd solid'}}>
                <Icon name={'marker'}/>
                {recommender.address}
            </span>

            <span style={{float:'left'}} >
                {recommender.phones?recommender.phones.map((p) => {
                    return <span style={{fontSize: '15px',display:'block',float:'left',paddingRight:'5px',borderRight:'1px #ddd solid'}} key={p.id}>
                        <Icon name={'phone'}/>
                        {p.phoneNumber}
                    </span>
                }):''}
            </span>

            <br style={{clear:'both'}}/>
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