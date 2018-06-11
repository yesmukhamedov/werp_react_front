import React from 'react'
import _ from 'lodash'
import { Card,Image,Button,Label,Icon,Message,Popup, Menu, Dropdown } from 'semantic-ui-react'
import {MENU_BY_RECO,MENU_BY_DATE,RECO_MODAL_ITEMS,MENU_MOVED} from '../wspaceUtil'
import {renderRecoCategoryBtn,renderDemoResultLabel,renderRecoStatusLabel} from '../../../CrmHelper'

export default function WspaceRecoCard(props){
        const {item,type} = props
        if(!item){
            return (null)
        }
        switch (type){
            case MENU_BY_RECO:
                return renderByReco(props)

            case MENU_BY_DATE:
                return renderByDate(props)

            case MENU_MOVED:
                return renderMovedReco(props)

            case RECO_MODAL_ITEMS:
                return renderRecosInModal(props)

            default:
                return (null)
        }

}

function renderRecosInModal(props){
    const {item} = props
    return <Card>
            <Card.Content>
                <Card.Header>
                    {item.clientName}
                </Card.Header>
                <Card.Meta>
                    {item.callDate?<Popup style={{float:'left'}}
                           trigger={<Label color={'blue'} size={'small'}>{item.callDate}</Label>}
                           content="Дата-время перезвона"
                           basic
                    />:''}

                    <span style={{float:'right'}}>{renderRecoCategoryBtn(item.categoryId,item.categoryName)}</span>
                </Card.Meta>
                <Card.Description>
                        <span style={{fontSize:'11px'}}>
                            {item.note} <a href="#" onClick={() => console.log('Read More...')}>полностью</a>
                    </span>
                </Card.Description>
            </Card.Content>
        <Card.Content extra  style={{fontSize:'11px',color:'black'}}>
                <i>Статус:</i> {renderRecoStatusLabel(item.statusId,item.statusName)}

            {item.relativeName?<strong><i>Род:</i></strong>:''}
            {item.relativeName?' ' + item.relativeName+';':''}
        </Card.Content>
        <Card.Content extra>

        </Card.Content>
            <Card.Content extra>

            </Card.Content>
            <Card.Content extra>
                {item.phones.map((p) => renderPhone(p))}
            </Card.Content>
        </Card>
}

function renderByDate(props){
    const {item} = props
    let {calls} = item
    if(!calls){
        calls = []
    }

    let lastNote = item.recoNote
    if(calls[calls.length-1] && calls[calls.length-1]['note']){
        lastNote = calls[calls.length-1]['note']
    }
    return <Card>
        <Card.Content>
            <Card.Header className="reco-card-header">
                {_.truncate(item.clientName,{length: 20})}
                <Dropdown icon={'bars'} className='icon bar'>
                    <Dropdown.Menu className='right'>
                        <Dropdown.Item onClick={(e,d) => props.recoCardMenuHandle('view',item.id)}>
                            <Icon name={'eye'}/>
                            Открыть
                        </Dropdown.Item>
                        <Dropdown.Item onClick={(e,d) => props.recoCardMenuHandle('to_archive',item.id)}>
                            <Icon name={'archive'}/>
                            В архив
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Card.Header>
            <Card.Meta>
                    <Popup style={{float:'left'}}
                           trigger={<Label color={'blue'} size={'small'}><i>{item.callDate}</i></Label>}
                        content="Дата-время перезвона"
                        basic
                    />

                <span style={{float:'right'}}>{renderRecoCategoryBtn(item.categoryId,item.categoryName)}</span>
            </Card.Meta>
            <Card.Description style={{borderTop: '1px dotted #ddd',marginTop:'15px'}}>
                    <span style={{fontSize:'11px'}}>
                        <strong><i>ОТ:</i></strong> {item.recommenderName}<br/>
                        <strong><i>Прим:</i></strong>{lastNote}
                </span>
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            {item.phones.map((p) => renderPhone(p))}
        </Card.Content>
    </Card>
}

function renderByReco(props){
    const {item} = props
    return <Card>
        <Card.Content>
            <Card.Header className='reco-card-header'>
                {_.truncate(item.clientName,{length: 20})}
            </Card.Header>
            <Card.Meta>
                <span style={{float:'left'}}>
                    <Popup
                        trigger={<Label><i>{item.demoDate}</i></Label>}
                        content="Дата-время демонстрации"
                        basic
                    />
                </span>
                <span style={{float:'right'}}>{renderRecoCategoryBtn(item.categoryId,item.categoryName)}</span>
            </Card.Meta>
        </Card.Content>
        <Card.Content extra>
            <span style={{fontSize:'11px',color:'black'}}>
                        <strong><i>Адрес: </i></strong>
                {_.truncate(item.address,{length: 150})}
                </span>
        </Card.Content>
        <Card.Content extra>
            {item.phones.map((p) => renderPhone(p))}
        </Card.Content>
        <Card.Content extra>
            {renderDemoResultLabel(item.resultId,item.resultName)}
            <Label>
                <Icon name='users' /> {item.recoCount}
            </Label>
            <Label as={'a'} onClick={() => props.openRecoListModal(item)}>
                <Icon name='unhide' /> Обзвонить
            </Label>

        </Card.Content>
    </Card>
}

function renderMovedReco(props){
    const {item} = props
    return <Card>
        <Card.Content>
            <Card.Header className='reco-card-header'>
                {_.truncate(item.clientName,{length: 20})}
                <Dropdown icon={'bars'} className='icon bar'>
                    <Dropdown.Menu className='right'>
                        <Dropdown.Item onClick={(e,d) => props.recoCardMenuHandle('to_archive',item.id)}>
                            <Icon name={'archive'}/>
                            В архив
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Card.Header>
            <Card.Meta>
                <span style={{float:'left'}}>
                    {item.callDate?<Popup
                        trigger={<Label color={'blue'}>{item.callDate}</Label>}
                        content="Дата-время перезвона"
                        basic
                    />:''}
                </span>
                <span style={{float:'right'}}>{renderRecoCategoryBtn(item.categoryId,item.categoryName)}</span>
            </Card.Meta>
            <Card.Description style={{marginTop:'45px'}}>
                <span style={{display:'block',fontSize:'11px',borderTop:'1px dotted #ddd',marginTop:'3px'}}>
                    <strong><i>Демо:</i></strong> {item.lastDemoDateTime}<br/>
                    <strong><i>ОТ:</i></strong> {item.recommenderName}<br/>
                </span>
            </Card.Description>
            <Card.Description>
                    <span style={{fontSize:'11px'}}>
                        <strong><i>Адрес:</i></strong>
                    {_.truncate(item.address,{length: 150})}
                </span>
            </Card.Description>
        </Card.Content>
        <Card.Content extra>

        </Card.Content>
        <Card.Content extra>
            {item.phones.map((p) => renderPhone(p))}
        </Card.Content>
    </Card>
}

function renderPhone(phone){
    return <Label key={phone.id} as='a' horizontal onClick={() => console.log(phone.phoneNumber)}>
        <Icon disabled name='phone' />
        {phone.phoneNumber}
    </Label>
}