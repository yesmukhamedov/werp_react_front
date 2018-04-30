import React from 'react'
import { Label, Form, Grid, Segment, Button, Input,Popup,Icon } from 'semantic-ui-react'
import '../css/recoCard.css';
import {RECO_CALLER_OPTIONS,RECO_CATEGORIES} from '../../../crmUtil'
import moment from 'moment'
import DatePicker from 'react-datepicker'

/**
 * Используется в создании рекомендации
 */

export default function RecoCard(props){

    //Single Card
    const {item,index,phoneErrors,loadingPhones,phonePattern,recoErrors} = props;
    const patternLength = phonePattern.replace(/[^0-9]+/g, '').length

    const phoneHasError = (name) => {
        let name2 = name === 'phoneNumber1'?'phoneNumber2':'phoneNumber1'
        if(!item[name]){
            if(!item[name2] || item[name2].length === 0){
                return true
            }
            return false
        }

        if(item[name].length < patternLength){
            return true
        }

        if(!phoneErrors[item[name]]){
            return false
        }

        return phoneErrors[item[name]] > 0
    }

    const isPhoneLoading = (name) => {
        if(!item[name]){
            return false
        }

        return loadingPhones[item[name]]
    }

    const renderCallDate = (item, index) => {
        if (item.switchDate === 1) {
            return <DatePicker
                locale="ru"
                label=''
                placeholderText={'Дата-время звонка'}
                showMonthDropdown showYearDropdown showTimeSelect dropdownMode='select'
                dateFormat='DD.MM.YYYY HH:mm'
                selected={item.callDate ? moment(item.callDate) : null}
                onChange={(v) => props.handleChangeDate(v, index)}
            />
        }

        return ''
    }



    return <Grid.Column color={'grey'} key={item.id} floated='left' width={4}>
        <Segment padded size='small' className='card-segment'>
            {recoErrors[item.id]?<Popup
                trigger={<Label as='a' color={'red'} ribbon>
                    №{index+1} Ошибка <Icon name={'warning sign'} inverted/></Label>}
                content={recoErrors[item.id]}
                on='hover'
            />:<Label as='a' color={'teal'} ribbon>№{index+1}</Label>}

            <Button
                size={'mini'} color={'red'}
                icon='delete' className='right floated' onClick={(e) => props.removeReco(index,item.id)}/>
            {recoErrors[item.id]?recoErrors[item.id]:''}
            <Form className='recoGrid'>
                <Form.Input
                        error={!item['clientName'] || item['clientName'].length === 0}
                        label="ФИО супруг" placeholder="ФИО супруг"
                        onChange={(e,d) => props.handleChange('clientName',item.id,d.value)}
                        value={item.clientName || ''}/>

                <Form.Dropdown
                    value={item.categoryId || 0}
                    error={!item.categoryId || item.categoryId === 0}
                    fluid selection
                    label="Категория клиента"
                    placeholder='Категория клиента'
                    options={RECO_CATEGORIES}
                    onChange={(e,d) => props.handleChange('categoryId',item.id,d.value)}  />

                <Form.Input
                            label="Район" placeholder="Район"
                            onChange={(e,d) => props.handleChange('districtName',item.id,d.value)}
                            value={item.districtName || ''}
                />

                <Form.Input value={item.relativeName || ''}
                            label="Род. отношение" placeholder="Род. отношение"
                            onChange={(e,d) => props.handleChange('relativeName',item.id,d.value)} />

                <Form.Dropdown
                    defaultValue={0}
                    fluid selection
                    label="Звонить будет"
                   placeholder='Звонить будет'
                    options={RECO_CALLER_OPTIONS}
                    onChange={(e,d) => props.handleChange('callerIsDealer',item.id,d.value)}  />

                <Form.TextArea
                            value={item.note || ''}
                            rows={1}
                           label="Примечание"
                           placeholder="Примечание"
                            onChange={(e,d) => props.handleChange('note',item.id,d.value)} />

                <Form.Field error={phoneHasError('phoneNumber1')}>
                    <label>Тел. номер</label>
                    <Input
                        label={{ basic:true,content:props.phoneCode}}
                        placeholder={phonePattern}
                        onChange={(e,d) => props.handleChange('phoneNumber1',item.id,d.value)}
                        value={item.displayPhone1 || ''}
                        loading={isPhoneLoading('phoneNumber1')}/>
                </Form.Field>

                <Form.Field error={phoneHasError('phoneNumber2')}>
                    <label>Тел. номер</label>
                    <Input
                            label={{ basic:true,content:props.phoneCode}}
                           placeholder={phonePattern}
                            onChange={(e,d) => props.handleChange('phoneNumber2',item.id,d.value)}
                           value={item.displayPhone2 || ''}
                           loading={isPhoneLoading('phoneNumber2')}/>
                </Form.Field>

            </Form>
        </Segment>
    </Grid.Column>
}