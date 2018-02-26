import React from 'react';
import { Label } from 'semantic-ui-react'

/**
 * Результаты демо
 */

// Результат неизвестно
const RESULT_UNKNOWN = 0;

// Демо пройден
const RESULT_DONE = 1;

// демо перенесен
const RESULT_MOVED = 2;

// демо отменена
const RESULT_CANCELLED = 3;

// Продан
const RESULT_SOLD = 4;

// Мини договор
const RESULT_MINI_CONTRACT = 5;

// Продан, но потом отменен
const RESULT_SOLD_CANCELLED = 6;


export default function DemoResultLabel(props){

    const {resultName,resultId} = props;
    let color = '';
    switch (resultId){
        case RESULT_UNKNOWN:
            color = 'grey';
            break

        case RESULT_DONE:
            color = 'blue';
            break;

        case RESULT_MOVED:
            color = 'orange';
            break;

        case RESULT_CANCELLED:
        case RESULT_SOLD_CANCELLED:
            color = 'yellow';
            break;

        case RESULT_SOLD:
            color = 'green';
            break;

        case RESULT_MINI_CONTRACT:
            color = 'teal';
            break;

        default:
            color = 'grey';
    }

    return <Label color={color} horizontal>{resultName}</Label>;
}