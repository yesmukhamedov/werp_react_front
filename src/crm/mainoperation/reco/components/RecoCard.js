import React from 'react'
import { Label, Form, Grid, Segment, Button, Input } from 'semantic-ui-react'
import '../css/recoCard.css';
import {RECO_CALLER_OPTIONS,RECO_CATEGORIES} from '../../../crmUtil'
import moment from 'moment'
import DatePicker from 'react-datepicker'

/**
 * Используется в создании рекомендации
 */

export default function RecoCard(props){

    //Single Card
    const {item,index,phoneErrors,loadingPhones,phonePattern} = props;
    const patternLength = phonePattern.replace(/[^0-9]+/g, '').length

    const getItemName = (name, index) => {
        return name + '[' + index + ']'
    }

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



    return <Grid.Column color={'grey'} key={index} floated='left' width={4}>
        <Segment padded size='small' className='card-segment'>
            <Label as='a' color={'teal'} ribbon>№ {index+1}</Label>
            <Button
                size={'mini'} color={'red'}
                icon='delete' className='right floated' onClick={(e) => props.removeReco(index)}/>
            <Form className='recoGrid'>
                <Form.Input
                        error={!item['clientName'] || item['clientName'].length === 0}
                        name={getItemName('clientName',index)}
                        label="ФИО супруг" placeholder="ФИО супруг"
                        onChange={props.handleChange}
                        value={item.clientName || ''}/>

                <Form.Dropdown
                    value={item.categoryId || 0}
                    error={!item.categoryId || item.categoryId === 0}
                    name={getItemName('categoryId',index)}
                    fluid selection
                    label="Категория клиента"
                    placeholder='Категория клиента'
                    options={RECO_CATEGORIES}
                    onChange={props.handleChange}  />

                <Form.Input name={getItemName('districtName',index)}
                            label="Район" placeholder="Район"
                            onChange={props.handleChange}
                            value={item.districtName || ''}
                />

                <Form.Input value={item.relativeName || ''} name={getItemName('relativeName',index)}
                            label="Род. отношение" placeholder="Род. отношение"
                            onChange={props.handleChange} />
                {/*<Form.Dropdown name={getItemName('switchDate',index)}*/}
                               {/*fluid selection label="Дата время звонка"*/}
                               {/*placeholder='Дата время звонка'*/}
                               {/*options={RECO_SWITCH_OPTIONS}*/}
                               {/*onChange={props.handleChange}  />*/}
                {/*{renderCallDate(item,index)}*/}

                <Form.Dropdown
                    name={getItemName('callerIsDealer',index)}
                    defaultValue={0}
                    fluid selection
                    label="Звонить будет"
                   placeholder='Звонить будет'
                    options={RECO_CALLER_OPTIONS}
                   onChange={props.handleChange}  />

                <Form.TextArea
                            value={item.note || ''}
                            rows={1}
                               name={getItemName('note',index)}
                               label="Примечание"
                               placeholder="Примечание"
                               onChange={props.handleChange}  />

                <Form.Field error={phoneHasError('phoneNumber1')}>
                    <label>Тел. номер</label>
                    <Input
                        label={{ basic:true,content:props.phoneCode}}
                        placeholder={phonePattern}
                        name={getItemName('phoneNumber1',index)}
                        onChange={props.handleChange}
                        value={props.itemPhones[index]['phoneNumber1']}
                        loading={isPhoneLoading('phoneNumber1')}/>
                </Form.Field>

                <Form.Field error={phoneHasError('phoneNumber2')}>
                    <label>Тел. номер</label>
                    <Input
                            label={{ basic:true,content:props.phoneCode}}
                           placeholder={phonePattern}
                           name={getItemName('phoneNumber2',index)}
                           onChange={props.handleChange}
                           value={props.itemPhones[index]['phoneNumber2']}
                           loading={isPhoneLoading('phoneNumber2')}/>
                </Form.Field>



            </Form>
        </Segment>
    </Grid.Column>
}