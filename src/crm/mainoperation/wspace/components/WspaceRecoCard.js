import React from 'react'
import _ from 'lodash'
import { Card,Label,Icon,Popup, Dropdown,List } from 'semantic-ui-react'
import {MENU_BY_RECO,MENU_BY_DATE,RECO_MODAL_ITEMS,MENU_MOVED} from '../wspaceUtil'
import {
        renderRecoCategoryBtn,renderDemoResultLabel,renderRecoStatusLabel,
        RECO_STATUS_NEW,RECO_STATUS_DEMO_DONE,RECO_STATUS_PHONED,
        CALL_RESULT_POSITIVE,CALL_RESULT_RECALL} from '../../../CrmHelper'
import moment from 'moment'

import WspacePhone from './WspacePhone'

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
    switch (item.statusId){
        case RECO_STATUS_NEW:
            return renderNewReco(item)

        case RECO_STATUS_PHONED:
            return renderPhonedReco(item,(e,v) => props.recoCardMenuHandle(e,v))
    }
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

function renderPhonedReco(item,recoCardMenuHandle){
    let lastNote = ''
    let recallDate = ''
    for(let k in item.calls){
        k = parseInt(k,10)
        if(item.calls[k]['note']){
            lastNote = item.calls[k]['note']
        }

        if(k === 0){
            if(item.calls[k]['resultId'] === CALL_RESULT_RECALL){
                recallDate = item.callDate
            }
        }
    }
    return <Card>
        <Card.Content>
            <Card.Header className="reco-card-header">
                {_.truncate(item.clientName,{length: 20})}
                <Dropdown icon={'bars'} className='icon bar'>
                    <Dropdown.Menu className='right'>
                        <Dropdown.Item onClick={(e,d) => recoCardMenuHandle('view',item.id)}>
                            <Icon name={'eye'}/>
                            Открыть
                        </Dropdown.Item>
                        <Dropdown.Item onClick={(e,d) => recoCardMenuHandle('to_archive',item.id)}>
                            <Icon name={'archive'}/>
                            В архив
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Card.Header>
            <Card.Meta>
                <span style={{float:'left'}}>
                    {recallDate?<Popup
                            trigger={<Label color={'blue'}>{recallDate}</Label>}
                            content="Дата-время перезвона"
                            basic
                        />:''}
                </span>

                <span style={{float:'right'}}>{renderRecoCategoryBtn(item.categoryId,item.categoryName)}</span>
            </Card.Meta>
        </Card.Content>
        <Card.Content extra  style={{fontSize:'11px',color:'black'}}>
            {item.relativeName?<strong><i>Род:</i></strong>:''}
            {item.relativeName?' ' + item.relativeName+';':''}
        </Card.Content>
        <Card.Content extra  style={{fontSize:'11px',color:'black'}}>
            <Popup
                position='right center'
                trigger={renderRecoStatusLabel(item.statusId,item.statusName)}>
                <Popup.Content>
                        <List celled style={{fontSize:'11px'}}>
                            {item.calls.map(call => {
                                return <List.Item key={call.id} style={{marginButtom: '5px'}}>
                                            <List.Content>
                                                <List.Header>{moment(call.dateTime).format('DD.MM.YYYY HH:mm')} ({call.resultName})</List.Header>
                                                <List.Description>
                                                    {call.note?<i>Прим:</i>:''} {call.note}
                                                </List.Description>
                                            </List.Content>
                                        </List.Item>
                            })}
                        </List>
                </Popup.Content>
            </Popup>



            {item.relativeName?<strong><i>Род:</i></strong>:''}
            {item.relativeName?' ' + item.relativeName+';':''}
        </Card.Content>
        <Card.Content extra>
            {item.phones.map((p) => renderPhone(p))}
        </Card.Content>
    </Card>
}

function renderNewReco(item){
    return <Card>
        <Card.Content>
            <Card.Header>
                {item.clientName}
            </Card.Header>
            <Card.Meta>
                <span style={{float:'right'}}>{renderRecoCategoryBtn(item.categoryId,item.categoryName)}</span>
            </Card.Meta>
            <Card.Description>
                        <span style={{fontSize:'11px'}}>
                            {item.note} <a href="#" onClick={() => console.log('Read More...')}>полностью</a>
                    </span>
            </Card.Description>
        </Card.Content>
        <Card.Content extra  style={{fontSize:'11px',color:'black'}}>
            {renderRecoStatusLabel(item.statusId,item.statusName)}<br/>

            {item.relativeName?<strong><i>Род:</i></strong>:''}
            {item.relativeName?' ' + item.relativeName+';':''}
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
    return <WspacePhone key={phone.id} phone={phone}/>
}