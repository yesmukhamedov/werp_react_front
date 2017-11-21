import React, {Component} from 'react';
import axios from 'axios';
import {Form,Button,Checkbox,Divider} from 'semantic-ui-react';
import DatePicker from "react-datepicker";
import {ROOT_URL} from '../../../../utils/constants';

const genderOptions = [
    { key: 'm', text: 'Мужской', value: 'male' },
    { key: 'f', text: 'Женский', value: 'female' },
]

class StaffForm extends Component{
    constructor(props) {
        super(props)
        this.state = {
            staff:{
                firstname:'',
                middlename:'',
                lastname:'',
                passport_id:'',
                passport_given_by:'',
                passport_given_date:null,
                birthday:null,
                gender:0,
                passport_id:'',
                passport_given_by:'',
                passport_given_date:null,
                passport_validity:null,
                passport_id2:'',
                passport_given_by2:'',
                passport_given_date2:null,
                passport_validity2:null,
                homephone:'',
                workphone:'',
                mobile:'',
                mobile1:'',
                corp_email:'',
                email:'',
                email2:'',
                regAddress:{
                    country_id:0,
                    state_id:0,
                    city_id:0,
                    region_id:0,
                    postal_code:'',
                    microdistrict:'',
                    village:'',
                    avenue:'',
                    street:'',
                    ap_number:'',
                    ap_drob:'',
                    flat_number:''
                }
            },
            countryOptions1: [],
            stateOptions1: [],
            cityOptions1:[],
            regionOptions1:[],
            countryOptions2: [],
            stateOptions2: [],
            cityOptions2:[],
            regionOptions1:[],
            sendingData:false
        }

        this.loadStates = this.loadStates.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    loadRegions(cityId){
        axios.get(`${ROOT_URL}/api/reference/regions/` + cityId,{
            headers: {
                authorization: localStorage.getItem('token')}
        })
            .then((response) => {
                    const loadedRegions = response.data.map(item => {
                        return {
                            key: item.idcityreg,
                            text: item.regname,
                            value: item.idcityreg
                        }
                    })
                    this.setState({
                        ...this.state,
                        regionOptions:loadedRegions
                    })
                }
            ).catch(function(error){
            alert(error);
        })
    }

    loadCities(stateId){
        axios.get(`${ROOT_URL}/api/reference/cities/` + stateId,{
            headers: {
                authorization: localStorage.getItem('token')}
        })
            .then((response) => {
                    const loadedCities = response.data.map(item => {
                        return {
                            key: item.idcity,
                            text: item.name,
                            value: item.idcity
                        }
                    })
                    this.setState({
                        ...this.state,
                        cityOptions:loadedCities,
                        regionOptions:[]
                    })
                }
            ).catch(function(error){
            alert(error);
        })
    }

    loadStates(countryId){
        axios.get(`${ROOT_URL}/api/reference/states/` + countryId,{
            headers: {
                authorization: localStorage.getItem('token')}
        })
            .then((response) => {
                        const loadedStates = response.data.map(item => {
                            return {
                                key: item.idstate,
                                text: item.statename,
                                value: item.idstate
                            }
                        })
                    this.setState({
                        ...this.state,
                        stateOptions:loadedStates,
                        cityOptions:[],
                        regionOptions:[]
                    })
                }
            ).catch(function(error){
                alert(error);
        })
    }

    componentWillMount() {
        axios.get(`${ROOT_URL}/api/reference/countries`,{
            headers: {
                authorization: localStorage.getItem('token')}
        })
            .then((response) => {
                    const loadedCountries = response.data.map(item => {
                        return {
                            key: item.countryId,
                            text: item.country,
                            value: item.countryId
                        }
                    })
                    this.setState({
                        ...this.state,
                        countryOptions:loadedCountries,
                        cityOptions:[],
                        regionOptions:[]
                    })
                }
            ).catch(function(error){
            alert(error);
        })
    }

    submitForm(){
        this.setState({
            ...this.state,
            sendingData:true
        })

        axios.post(`${ROOT_URL}/api/hr/staff`,this.state.staff)
            .then((response) => {
                    console.log(response);
            }).catch((error) => {
                console.log(error);
        })
    }

    onInputChange(fieldName,fieldValue){
        const stf = this.state.staff;
        if(stf.hasOwnProperty(fieldName)){
            stf[fieldName] = fieldValue;
        }

        this.setState({
            ...this.state,
            staff:stf
        })
    }


    render(){
        return (

                <Form>
                    <div className="ui segments">
                        <div className="ui segment">
                            <h3>Основные данные</h3>
                        </div>
                        <div className="ui secondary segment">
                            <Form.Group widths='equal'>
                                <Form.Input label='Фамилия' placeholder='Фамилия'
                                            onChange={e => this.onInputChange("lastname",e.target.value)} />
                                <Form.Input label='Имя' placeholder='Имя'
                                            onChange={e => this.onInputChange("firstname",e.target.value)}/>
                                <Form.Input label='Отчество' placeholder='Отчество'
                                            onChange={e => this.onInputChange("middlename",e.target.value)}/>
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input label='ИИН' placeholder='ИИН'
                                            onChange={e => this.onInputChange("iin",e.target.value)}/>
                                <Form.Field>
                                    <label>Дата рождения</label>
                                    <DatePicker
                                        placeholderText={'Дата рождения'}
                                        showMonthDropdown showYearDropdown dropdownMode="select"
                                        selected={this.state.staff.birthday}
                                        dateFormat="DD.MM.YYYY"
                                        onChange={(v) => this.onInputChange("birthday",v)}
                                        />
                                </Form.Field>
                                <Form.Select label='Пол' options={genderOptions} placeholder='Пол'
                                             onChange={e => this.onInputChange("gender",e.target.value)}/>
                            </Form.Group>
                        </div>
                    </div>

                    <div className="ui segments">
                        <div className="ui segment">
                            <h3>Документы</h3>
                        </div>
                        <div className="ui secondary segment">
                            <Form.Group widths='equal'>
                                <Form.Input label='Номер уд. личности' placeholder='Номер уд. личности' />
                                <Form.Input label='Кем выдан' placeholder='Кем выдан' />
                                <Form.Field>
                                    <label>Дата выдачи</label>
                                    <DatePicker
                                        label=""
                                        placeholderText={'Дата выдачи'}
                                        showMonthDropdown showYearDropdown dropdownMode="select"
                                        dateFormat="DD.MM.YYYY" />
                                </Form.Field>
                                <Form.Field>
                                    <label>Срок действия уд.</label>
                                    <DatePicker
                                        label=""
                                        placeholderText={'Срок действия уд.'}
                                        showMonthDropdown showYearDropdown dropdownMode="select"
                                        dateFormat="DD.MM.YYYY" />
                                </Form.Field>
                            </Form.Group>


                            <Form.Group widths='equal'>
                                <Form.Input label='Номер паспорта' placeholder='Номер паспорта' />
                                <Form.Input label='Кем выдан (паспорт)' placeholder='Кем выдан (паспорт)' />
                                <Form.Field>
                                    <label>Дата выдачи(паспорт)</label>
                                    <DatePicker
                                        label=""
                                        placeholderText={'Дата выдачи'}
                                        showMonthDropdown showYearDropdown dropdownMode="select"
                                        dateFormat="DD.MM.YYYY" />
                                </Form.Field>
                                <Form.Field>
                                    <label>Срок действия (паспорт)</label>
                                    <DatePicker
                                        label=""
                                        placeholderText={'Срок действия (паспорт)'}
                                        showMonthDropdown showYearDropdown dropdownMode="select"
                                        dateFormat="DD.MM.YYYY" />
                                </Form.Field>
                            </Form.Group>
                        </div>
                    </div>


                    <div className="ui segments">
                        <div className="ui segment">
                            <h3>Контакты</h3>
                        </div>
                        <div className="ui secondary segment">
                            <Form.Group widths='equal'>
                                <Form.Input label='Домашний телефон' placeholder='Домашний телефон' />
                                <Form.Input label='Рабочий телефон' placeholder='Рабочий телефон' />
                                <Form.Input label='Мобильный' placeholder='Мобильный' />
                                <Form.Input label='Мобильный2' placeholder='Мобильный2' />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input label='Корпоративный email' placeholder='Корпоративный email' />
                                <Form.Input label='Личный email' placeholder='Личный email' />
                                <Form.Input label='Доп. email' placeholder='Доп. email' />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="ui segments">
                        <div className="ui segment">
                            <h3>Адрес прописки</h3>
                        </div>
                        <div className="ui secondary segment">
                            <Form.Group widths='equal'>
                                <Form.Select onChange={(e, { value }) => this.loadStates(value)} label='Страна' options={this.state.countryOptions} placeholder='Страна' />
                                <Form.Select onChange={(e, { value }) => this.loadCities(value)}  label='Область' options={this.state.stateOptions} placeholder='Область' />
                                <Form.Select onChange={(e, { value }) => this.loadRegions(value)} label='Город' options={this.state.cityOptions} placeholder='Город' />
                                <Form.Select label='Район' options={this.state.regionOptions} placeholder='Район' />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input label='Почтовый индекс' placeholder='Почтовый индекс' />
                                <Form.Input label='Микрорайон' placeholder='Микрорайон' />
                                <Form.Input label='Поселок' placeholder='Поселок' />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input label='Проспект' placeholder='Проспект' />
                                <Form.Input label='Ул.(просп./мкр.)' placeholder='Ул.(просп./мкр.)' />
                                <Form.Input label='Дом' placeholder='Дом' />
                                <Form.Input label='Квартира №' placeholder='Квартира №' />
                            </Form.Group>
                        </div>
                    </div>

                    <div className="ui segments">
                        <div className="ui segment">
                            <h3>Место проживание</h3>
                        </div>
                        <div className="ui secondary segment">
                            <Form.Group widths='equal'>
                                <Form.Select onChange={(e, { value }) => this.loadStates(value)} label='Страна' options={this.state.countryOptions} placeholder='Страна' />
                                <Form.Select onChange={(e, { value }) => this.loadCities(value)}  label='Область' options={this.state.stateOptions} placeholder='Область' />
                                <Form.Select onChange={(e, { value }) => this.loadRegions(value)} label='Город' options={this.state.cityOptions} placeholder='Город' />
                                <Form.Select label='Район' options={this.state.regionOptions} placeholder='Район' />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input label='Почтовый индекс' placeholder='Почтовый индекс' />
                                <Form.Input label='Микрорайон' placeholder='Микрорайон' />
                                <Form.Input label='Поселок' placeholder='Поселок' />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input label='Проспект' placeholder='Проспект' />
                                <Form.Input label='Ул.(просп./мкр.)' placeholder='Ул.(просп./мкр.)' />
                                <Form.Input label='Дом' placeholder='Дом' />
                                <Form.Input label='Квартира №' placeholder='Квартира №' />
                            </Form.Group>
                        </div>
                    </div>

                    <Button onClick={this.submitForm} className={this.state.sendingData ?'loading':''} color='teal'>Сохранить</Button>
                </Form>
        )
    }
}

export default StaffForm;