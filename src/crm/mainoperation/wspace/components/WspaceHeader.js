import React, {Component} from 'react'
import _ from 'lodash'
import "react-table/react-table.css";
import { Tab,Header,Container,Icon,Segment,Label,Accordion } from 'semantic-ui-react'
import moment from 'moment';
import {RECO_CATEGORIES} from '../../../crmUtil'
import '../css/header-page.css'

export default function WspaceHeader (props) {
    const {dealers,currentId} = props
    if(!dealers){
        return (null)
    }
    return (
        <Container fluid className={'header-container'}>
            {dealers.map(d => (
                <Label as='a'
                       onClick={() => props.onSelect(d)}
                       size={currentId === d.key?'large':'small'}
                       color={currentId === d.key?'green':'teal'} key={d.key}>
                    <Icon name="user"/>
                    {d.text}
                </Label>
            ))}
        </Container>
    )
}