import React from 'react'
import {Segment,Button} from 'semantic-ui-react'
import 'react-datepicker/dist/react-datepicker.css';
import VisitCreateModal from '../../visit/components/VisitCreateModal'

export default function WspaceVisitTableHeader (props){
    return <Segment padded clearing>
            <VisitCreateModal/>
            <Button onClick={props.prepareForCreate} primary floated={'right'}>Добавить</Button>
        </Segment>
}