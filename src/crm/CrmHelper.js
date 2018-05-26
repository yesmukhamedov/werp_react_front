import React,{Component} from 'react'
import { Table,Icon,Label,Button,Message } from 'semantic-ui-react'
import _ from 'lodash'
import {RECO_CATEGORIES,RECO_CATEGORY_COLORS} from './crmUtil'


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