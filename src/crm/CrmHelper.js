import React from 'react'
import { Label,Button } from 'semantic-ui-react'
import _ from 'lodash'
import {RECO_CATEGORIES,RECO_CATEGORY_COLORS} from './crmUtil'


// Результат неизвестно
const DEMO_RESULT_UNKNOWN = 0;

// Демо пройден
const DEMO_RESULT_DONE = 1;

// демо перенесен
const DEMO_RESULT_MOVED = 2;

// демо отменена
const DEMO_RESULT_CANCELLED = 3;

// Продан
const DEMO_RESULT_SOLD = 4;

// Мини договор
const DEMO_RESULT_MINI_CONTRACT = 5;

// Продан, но потом отменен
const DEMO_RESULT_SOLD_CANCELLED = 6;

// Архивированный
const DEMO_RESULT_ARCHIVED = 7;



/***************************/
export const RECO_STATUS_NEW = 0;
export const RECO_STATUS_PHONED = 1;
export const RECO_STATUS_DEMO_DONE = 2;


///**********************///
export const CALL_RESULT_POSITIVE = 1;
export const CALL_RESULT_REFUSE = 2;
export const CALL_RESULT_RECALL = 3;
export const CALL_RESULT_NOT_AVAILABLE = 4;
export const CALL_RESULT_NO_ANSWER = 5;


export function renderRecoCategoryBtn(categoryId){
    let category = _.find(RECO_CATEGORIES,{'key': categoryId})

    return <Button
        size='tiny'
        basic color={RECO_CATEGORY_COLORS[categoryId] || 'grey'}>
        {(category && category['text'])?category && category['text']:'Неизвестно'}
    </Button>
}

export function renderRecoCategoryAsQty(categoryId,qty){
    let category = _.find(RECO_CATEGORIES,{'key': categoryId})
    let title = category && category.text ? category.text : 'Неизвестно'
    return <Label basic title={title}
                  key={categoryId}
                  color={RECO_CATEGORY_COLORS[categoryId]}>
        {qty}
    </Label>
}

export function renderDemoResultLabel(resultId,resultName){
    let color = '';
    switch (resultId){
        case DEMO_RESULT_UNKNOWN:
            color = 'grey';
            break

        case DEMO_RESULT_DONE:
            color = 'blue';
            break;

        case DEMO_RESULT_MOVED:
            color = 'orange';
            break;

        case DEMO_RESULT_CANCELLED:
        case DEMO_RESULT_SOLD_CANCELLED:
            color = 'yellow';
            break;

        case DEMO_RESULT_SOLD:
            color = 'green';
            break;

        case DEMO_RESULT_MINI_CONTRACT:
            color = 'teal';
            break;

        case DEMO_RESULT_ARCHIVED:
            color = 'black'
            break

        default:
            color = 'grey';
    }

    return <Label color={color} horizontal>{resultName}</Label>;
}



export function renderCallResultLabel (resultId,resultName){
    let color = ''
    switch (resultId){
        case CALL_RESULT_NOT_AVAILABLE:
            color = 'yellow'
            break

        case CALL_RESULT_RECALL:
            color = 'olive'
            break

        case CALL_RESULT_REFUSE:
            color = 'red'
            break

        case CALL_RESULT_NO_ANSWER:
            color = 'violet'
            break

        case CALL_RESULT_POSITIVE:
            color = 'green'
            break

        default:
            color = 'grey'
            break
    }

    return <Label color={color} horizontal>{resultName}</Label>;
}


export function renderRecoStatusLabel(statusId,statusName) {
    let color = '';
    switch (statusId){
        case RECO_STATUS_NEW:
            color = 'blue';
            break

        case RECO_STATUS_PHONED:
            color = 'green';
            break;

        case RECO_STATUS_DEMO_DONE:
            color = 'teal';
            break;

        default:
            color = 'grey';
    }

    return <Label color={color} horizontal>{statusName}</Label>;
}