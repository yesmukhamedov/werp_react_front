import React, {Component} from 'react';
import axios from 'axios';
import {Container,Form,Button,Checkbox,Divider} from 'semantic-ui-react';
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
                middlename:''
            },
            countryOptions: [],
            stateOptions: [],
            cityOptions:[],
            regionOptions:[],
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
    }


    render(){
        return (
            <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
                <h2>Добавление нового сотрудника</h2>
                <Form>
                    <div className="ui segments">
                        <div className="ui segment">
                            <h3>Основные данные</h3>
                        </div>
                        <div className="ui secondary segment">
                            <Form.Group widths='equal'>
                                <Form.Input label='Фамилия' placeholder='Фамилия' />
                                <Form.Input label='Имя' placeholder='Имя' />
                                <Form.Input label='Отчество' placeholder='Отчество' />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input label='ИИН' placeholder='ИИН' />
                                <Form.Field>
                                    <label>Дата рождения</label>
                                    <DatePicker
                                        placeholderText={'Дата рождения'}
                                        showMonthDropdown showYearDropdown dropdownMode="select"
                                        dateFormat="DD.MM.YYYY" />
                                </Form.Field>
                                <Form.Select label='Пол' options={genderOptions} placeholder='Пол' />
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
                                <Form.Input label='Корпоративный email' placeholder='Корпоративный email' />
                                <Form.Input label='Личный email' placeholder='Личный email' />
                                <Form.Input label='Доп. email' placeholder='Доп. email' />
                            </Form.Group>
                        </div>
                    </div>

                    <Button onClick={this.submitForm} className={this.state.sendingData ?'loading':''} color='teal'>Сохранить</Button>
                </Form>
            </Container>
        )
    }
}

export default StaffForm;