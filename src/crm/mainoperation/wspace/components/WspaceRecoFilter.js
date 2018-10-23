import React from 'react'
import {Segment,Form} from 'semantic-ui-react'
import 'react-datepicker/dist/react-datepicker.css';
import {MENU_BY_RECO} from '../wspaceUtil'
import {RECO_CATEGORIES,DEMO_RESULT_OPTIONS} from '../../../crmUtil'

export default function WspaceRecoFilter (props){
    const {filters, menu, messages} = props
    let cats = [{
        key: null,
        text: 'Категория',
        value: null
    }].concat(RECO_CATEGORIES)

    const resultOptions = [{
        key: null,
        text: 'Результат',
        value: null
    }].concat(DEMO_RESULT_OPTIONS)

    return <Segment padded>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input
                            width={3}
                            onChange={(e,d) => props.handleFilter('clientName',menu,d.value)}
                                    value={filters.clientName || ''}
                                    fluid placeholder={messages['Form.Client']} />

                        <Form.Select
                                width={3}
                            options={cats} onChange={(e,d) => props.handleFilter('categoryId',menu,d.value)} placeholder={messages['Form.Category']}
                            />

                        {menu === MENU_BY_RECO?<Form.Select
                                width={3}
                                options={resultOptions} onChange={(e,d) => props.handleFilter('resultId',menu,d.value)} placeholder={messages['Form.Result']}
                            />:''}

                        {menu !== MENU_BY_RECO?<Form.Input
                                width={3}
                                onChange={(e,d) => props.handleFilter('phoneNumber',menu,d.value)}
                                value={filters.phoneNumber || ''}
                                fluid placeholder={messages['Form.MobNumber']} />:''}
                        <Form.Input
                            width={3}
                            onChange={(e,d) => props.handleFilter('docDate',menu,d.value)}
                            value={filters.docDate || ''}
                            fluid placeholder={messages['Form.Date']} />

                    </Form.Group>
                </Form>
        </Segment>
}