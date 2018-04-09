import React, {Component} from 'react'
import {Container,Form, Button,Input} from 'semantic-ui-react'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import moment from 'moment'
import {fetchSingleStaff,createStaff,toggleStaffListModal,fetchAllStaffs} from '../actions/hrStaffAction'
import {f4FetchCountryList,f4FetchStateList,f4FetchCityList,f4FetchCityregList} from '../../../../reference/f4/f4_action'
import StaffAddressForm from  './forms/StaffAddressForm'
import StaffListModal from './StaffListModal'
import {STAFF_BLANK_OBJECT} from '../../../hrUtil'
const genderOptions = [
    { key: 'male', text: 'Мужской', value: 'male' },
    { key: 'female', text: 'Женский', value: 'female' }
]


class StaffUpdatePage extends Component {
    constructor (props) {
        super(props)
        this.state = {
            localStaff:STAFF_BLANK_OBJECT,
            staffListModalOpened:false,
            errors:{
                firstname:false,
                middlename:false,
                lastname:false,
                iinBin:false,
                birthday:false,
                gender:false,
                passportId:false,
                passportGivenBy:false,
                passportGivenDate:false,

            },
            livingAddressErrors:{
                countryId:false,
                stateId:false,
                cityId:false,
                regId:false,
                street:false
            },
            regAddressErrors:{
                countryId:false,
                stateId:false,
                cityId:false,
                regId:false,
                street:false
            }
        }

        this.handleRegisteredAddress = this.handleRegisteredAddress.bind(this)
        this.handleLivingAddress = this.handleLivingAddress.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.submitForm = this.submitForm.bind(this)
        this.onScoutSelected = this.onScoutSelected.bind(this)
        this.removeScout = this.removeScout.bind(this)
    }

    componentWillMount(){
        const id = parseInt(this.props.match.params.id, 10)
        if(id > 0){
            this.props.fetchSingleStaff(id)
        }
        this.props.f4FetchCountryList()
        this.props.f4FetchStateList()
        this.props.f4FetchCityList()
        this.props.f4FetchCityregList()
        this.props.fetchAllStaffs({})
    }

    // componentWillReceiveProps (nextProps) {
    //     if(nextProps.staff !== this.state.staff){
    //         let localStaff = Object.assign({}, this.props.staff);
    //         this.setState({
    //             ...this.state,
    //             localStaff: localStaff
    //         })
    //     }
    // }

    getStateOptions(countryId){
        if(!this.props.stateList){
            return []
        }

        const {stateList} = this.props

        let map = []
        for(let k in stateList){
            if(stateList[k]['countryid'] === countryId){
                map.push({
                    key:stateList[k]['idstate'],
                    text:stateList[k]['statename'],
                    value:stateList[k]['idstate']
                })
            }
        }

        return map
    }

    getCityOptions(stateId){
        if(!this.props.cityList){
            return []
        }

        const {cityList} = this.props
        let map = []
        for(let k in cityList){
            if(cityList[k]['stateid'] === stateId){
                map.push({
                    key:cityList[k]['idcity'],
                    text:cityList[k]['name'],
                    value:cityList[k]['idcity']
                })
            }
        }

        return map
    }

    getRegionOptions(cityId){
        if(!this.props.cityregList){
            return []
        }

        const {cityregList} = this.props

        let map = []
        for(let k in cityregList){
            if(cityregList[k]['city_id'] === cityId){
                map.push({
                    key: cityregList[k]['idcityreg'],
                    value: cityregList[k]['idcityreg'],
                    text: cityregList[k]['regname']
                })
            }
        }

        return map
    }

    getCountryOptions(){
        if(!this.props.countryList){
            return []
        }

        const {countryList} = this.props
        let map = countryList.map((c) => {
            return {
                key:c.countryId,
                text:c.country,
                value:c.countryId
            }
        })

        return map;
    }

    handleRegisteredAddress(e,data){
        let localStaff = Object.assign({}, this.state.localStaff);
        if(!localStaff.registeredAddress){
            return
        }

        let {registeredAddress} = localStaff
        let {name,value} = data
        switch (name){
            case 'countryId':
            case 'stateId':
            case 'cityId':
            case 'regId':
                registeredAddress[name] = value
                break

            case 'microdistrict':
            case 'village':
            case 'avenue':
            case 'street':
            case 'apNumber':
            case 'flatNumber':
                registeredAddress[name] = value
                break
            default:{}
        }

        localStaff['registeredAddress'] = registeredAddress
        this.setState({
            ...this.state,
            localStaff:localStaff
        })
    }

    handleLivingAddress(e,data){
        let localStaff = Object.assign({}, this.state.localStaff);
        if(!localStaff.livingAddress){
            return
        }

        let {livingAddress} = localStaff
        let {name,value} = data
        switch (name){
            case 'countryId':
            case 'stateId':
            case 'cityId':
            case 'regId':
                livingAddress[name] = value
                break

            case 'microdistrict':
            case 'village':
            case 'avenue':
            case 'street':
            case 'apNumber':
            case 'flatNumber':
                livingAddress[name] = value
                break
            default:{}
        }

        localStaff['livingAddress'] = livingAddress
        this.setState({
            ...this.state,
            localStaff:localStaff
        })
    }

    handleChange (e,data) {
        let localStaff = Object.assign({}, this.state.localStaff);
        let {name,value} = data
        if(localStaff.hasOwnProperty(name)){
            localStaff[name] = value
        }

        this.setState({
            ...this.state,
            localStaff:localStaff
        })
    }

    handleDate(fName,o){
        let localStaff = Object.assign({}, this.state.localStaff);
        if(localStaff.hasOwnProperty(fName)){
            if(o){
                localStaff[fName] = o.valueOf()
            }else{
                localStaff[fName] = null
            }
        }
        this.setState({
            ...this.state,
            localStaff:localStaff
        })
    }

    validateAddress(address,errors){
        for(let k in errors){
            if(errors.hasOwnProperty(k)){
                errors[k] = false
            }
        }
        let fields1 = ['countryId','cityId','stateId','regId']
        for(let k in fields1){
            let field = fields1[k]
            if(typeof address[field] === 'undefined' || parseInt(address[field],10) === 0){
                errors[field] = true
            }
        }
    }

    submitForm () {
        const staffStringRequiredFields = ['firstname','lastname','iinBin','passportId','passportGivenBy','mobile']
        const staffDateRequiredFields = ['birthday','passportGivenDate','passportValidity']
        const staffIntRequiredFields = ['gender']
        let localStaff = Object.assign({}, this.state.localStaff);
        let errors = Object.assign({}, this.state.errors);
        let livingAddressErrors = Object.assign({}, this.state.livingAddressErrors);
        let regAddressErrors = Object.assign({}, this.state.regAddressErrors);

        for(let key in errors){
            if(errors.hasOwnProperty(key)){
                errors[key] = false
            }
        }

        for(let k in staffStringRequiredFields){
            let field = staffStringRequiredFields[k]
            let s = localStaff[field];
            if(typeof s === 'undefined'){
                errors[field] = true
            }else{
                s = s.trim();
                if(s.length === 0){
                    errors[field] = true
                }
            }
        }

        for(let k in staffDateRequiredFields){
            let field = staffDateRequiredFields[k]
            if(!localStaff[field] || localStaff[field] === null){
                errors[field] = true
            }
        }

        for(let k in staffIntRequiredFields){
            let field = staffIntRequiredFields[k]
            let s = localStaff[field];
            if(typeof s === 'undefined'){
                errors[field] = true
            }else{
                s = parseInt(s,10);
                if(s === 0){
                    errors[field] = true
                }
            }
        }

        this.validateAddress(localStaff.livingAddress,livingAddressErrors)
        this.validateAddress(localStaff.registeredAddress,regAddressErrors)
        let hasError = false
        for(let k in errors){
            if(errors.hasOwnProperty(k) && errors[k] === true){
                hasError = true
                break
            }
        }
        if(!hasError){
            for(let k in livingAddressErrors){
                if(livingAddressErrors.hasOwnProperty(k) && livingAddressErrors[k] === true){
                    hasError = true
                    break
                }
            }
        }

        if(!hasError){
            for(let k in regAddressErrors){
                if(regAddressErrors.hasOwnProperty(k) && regAddressErrors[k] === true){
                    hasError = true
                    break
                }
            }
        }


        if(hasError){
            this.setState({
                ...this.state,
                errors:errors,
                livingAddressErrors:livingAddressErrors,
                regAddressErrors:regAddressErrors
            })
            return
        }

        this.props.createStaff(localStaff)
    }

    onScoutSelected(o){
        let {localStaff} = this.state
        localStaff['tsStaffId'] = o['staffId']
        localStaff['tsStaffName'] = o['lastname'] + ' ' + o['firstname']
        this.setState({
            ...this.state,
            localStaff:localStaff,
            staffListModalOpened:false
        })
    }

    removeScout(){
        let {localStaff} = this.state
        localStaff['tsStaffId'] = 0
        localStaff['tsStaffName'] = ''
        this.setState({
            ...this.state,
            localStaff:localStaff
        })
    }

    renderForm(){
        const {} = this.props
        let {localStaff,errors} = this.state
        let {registeredAddress} = localStaff
        let {livingAddress} = localStaff
        return <Form>
            <div className='ui segments'>
                <div className='ui segment'>
                    <h3>Основные данные</h3>
                </div>
                <div className='ui secondary segment'>
                    <Form.Group widths='equal'>
                        <Form.Field
                            name="lastname"
                            error={errors.lastname}
                            onChange={this.handleChange}
                            value={localStaff.lastname}
                            control={Input}
                            required label='Фамилия' placeholder='Фамилия' />

                        <Form.Field
                            name="firstname"
                            error={errors.firstname}
                            onChange={this.handleChange}
                            value={localStaff.firstname}
                            control={Input}
                            required label='Имя' placeholder='Имя' />

                        <Form.Field
                            name="middlename"
                            onChange={this.handleChange}
                            value={localStaff.middlename}
                            control={Input}
                            label='Отчество' placeholder='Отчество' />
                    </Form.Group>

                    <Form.Group widths='equal'>
                        <Form.Field
                            name="iinBin"
                            error={errors.iinBin}
                            onChange={this.handleChange}
                            value={localStaff.iinBin}
                            control={Input} required label='ИИН' placeholder='ИИН' />
                        <Form.Field error={errors.birthday} required>
                            <label>Дата рождения</label>
                            <DatePicker
                                placeholderText={'Дата рождения'}
                                showMonthDropdown showYearDropdown dropdownMode='select'
                                selected={localStaff.birthday?moment(localStaff.birthday):null}
                                dateFormat='DD.MM.YYYY'
                                onChange={(v) => this.handleDate('birthday', v)}
                            />
                        </Form.Field>
                        <Form.Select
                            required
                            error={errors.gender}
                            name="gender"
                            value={localStaff.gender}
                            label='Пол'
                            options={genderOptions}
                            placeholder='Пол'
                            onChange={this.handleChange} />

                            <Form.Field>
                                <label>Scouted By</label>
                                <Button.Group>
                                    <Button
                                        onClick={() => this.setState({...this.state,staffListModalOpened:true})}
                                        content= {localStaff.tsStaffName && localStaff.tsStaffName.length > 0?localStaff.tsStaffName:'Не выбрано'}
                                        icon='search'
                                        labelPosition='left' />
                                    <Button
                                        onClick={() => this.removeScout()}
                                        icon='remove' />
                                </Button.Group>
                            </Form.Field>
                    </Form.Group>
                </div>
            </div>

            <div className='ui segments'>
                <div className='ui segment'>
                    <h3>Документы</h3>
                </div>
                <div className='ui secondary segment'>
                    <Form.Group widths='equal'>
                        <Form.Field
                            name="passportId"
                            error={errors.passportId}
                            onChange={this.handleChange}
                            value={localStaff.passportId}
                            control={Input}
                            required
                            label='Номер уд. личности'
                            placeholder='Номер уд. личности' />
                        <Form.Field
                            name="passportGivenBy"
                            error={errors.passportGivenBy}
                            onChange={this.handleChange}
                            value={localStaff.passportGivenBy}
                            control={Input}
                            required label='Кем выдан' placeholder='Кем выдан' />
                        <Form.Field error={errors.passportGivenDate} required>
                            <label>Дата выдачи</label>
                            <DatePicker
                                label=''
                                selected={localStaff.passportGivenDate?moment(localStaff.passportGivenDate):null}
                                placeholderText={'Дата выдачи'}
                                showMonthDropdown showYearDropdown dropdownMode='select'
                                onChange={(v) => this.handleDate('passportGivenDate', v)}
                                dateFormat='DD.MM.YYYY' />
                        </Form.Field>
                        <Form.Field error={errors.passportValidity} required>
                            <label>Срок действия уд.</label>
                            <DatePicker
                                label=''
                                selected={localStaff.passportValidity?moment(localStaff.passportValidity):null}
                                placeholderText={'Срок действия уд.'}
                                showMonthDropdown showYearDropdown dropdownMode='select'
                                onChange={(v) => this.handleDate('passportValidity', v)}
                                dateFormat='DD.MM.YYYY' />
                        </Form.Field>
                    </Form.Group>

                    <Form.Group widths='equal'>
                        <Form.Field
                            name="passportId2"
                            onChange={this.handleChange}
                            value={localStaff.passportId2}
                            control={Input}
                            label='Номер паспорта' placeholder='Номер паспорта' />

                        <Form.Field
                            name="passportGivenBy2"
                            onChange={this.handleChange}
                            value={localStaff.passportGivenBy2}
                            control={Input} label='Кем выдан (паспорт)' placeholder='Кем выдан (паспорт)' />
                        <Form.Field>
                            <label>Дата выдачи(паспорт)</label>
                            <DatePicker
                                label=''
                                selected={localStaff.passportGivenDate2?moment(localStaff.passportGivenDate2):null}
                                placeholderText={'Дата выдачи'}
                                showMonthDropdown showYearDropdown dropdownMode='select'
                                onChange={(v) => this.handleDate('passportGivenDate2', v)}
                                dateFormat='DD.MM.YYYY' />
                        </Form.Field>
                        <Form.Field>
                            <label>Срок действия (паспорт)</label>
                            <DatePicker
                                label=''
                                selected={localStaff.passportValidity2?moment(localStaff.passportValidity2):null}
                                placeholderText={'Срок действия (паспорт)'}
                                showMonthDropdown showYearDropdown dropdownMode='select'
                                onChange={(v) => this.handleDate('passportValidity2', v)}
                                dateFormat='DD.MM.YYYY' />
                        </Form.Field>
                    </Form.Group>
                </div>
            </div>

            <div className='ui segments'>
                <div className='ui segment'>
                    <h3>Контакты</h3>
                </div>
                <div className='ui secondary segment'>
                    <Form.Group widths='equal'>
                        <Form.Field
                            name="homephone"
                            onChange={this.handleChange}
                            value={localStaff.homephone}
                            control={Input}
                            label='Домашний телефон'
                            placeholder='Домашний телефон' />
                        <Form.Field
                            name="workphone"
                            onChange={this.handleChange}
                            value={localStaff.workphone}
                            control={Input}
                            label='Рабочий телефон'
                            placeholder='Рабочий телефон' />

                        <Form.Field
                            name="mobile"
                            error={errors.mobile}
                            onChange={this.handleChange}
                            value={localStaff.mobile}
                            control={Input}
                            required
                            label='Мобильный'
                            placeholder='Мобильный' />

                        <Form.Field
                            name="mobile1"
                            onChange={this.handleChange}
                            value={localStaff.mobile1}
                            control={Input}
                            label='Мобильный2'
                            placeholder='Мобильный2' />
                    </Form.Group>

                    <Form.Group widths='equal'>
                        <Form.Field
                            name="corpEmail"
                            onChange={this.handleChange}
                            value={localStaff.corpEmail}
                            control={Input}
                            label='Корпоративный email'
                            placeholder='Корпоративный email' />

                        <Form.Field
                            name="email"
                            onChange={this.handleChange}
                            value={localStaff.email}
                            control={Input}
                            label='Личный email'
                            placeholder='Личный email' />

                        <Form.Field
                            name="email2"
                            onChange={this.handleChange}
                            value={localStaff.email2}
                            control={Input}
                            label='Доп. email'
                            placeholder='Доп. email' />
                    </Form.Group>
                </div>
            </div>

            <div className='ui segments'>
                <div className='ui segment'>
                    <h3>Адрес прописки</h3>
                </div>
                <div className='ui secondary segment'>
                    <StaffAddressForm
                        countryOptions={this.getCountryOptions()}
                        stateOptions={this.getStateOptions(registeredAddress?registeredAddress.countryId:0)}
                        cityOptions={this.getCityOptions(registeredAddress?registeredAddress.stateId:0)}
                        regionOptions={this.getRegionOptions(registeredAddress?registeredAddress.cityId:0)}
                        handleChange={this.handleRegisteredAddress}
                        errors={this.state.regAddressErrors}
                        address={registeredAddress}/>
                </div>
            </div>

            <div className='ui segments'>
                <div className='ui segment'>
                    <h3>Место проживание</h3>
                </div>
                <div className='ui secondary segment'>
                    <StaffAddressForm
                        countryOptions={this.getCountryOptions()}
                        stateOptions={this.getStateOptions(livingAddress?livingAddress.countryId:0)}
                        cityOptions={this.getCityOptions(livingAddress?livingAddress.stateId:0)}
                        regionOptions={this.getRegionOptions(livingAddress?livingAddress.cityId:0)}
                        handleChange={this.handleLivingAddress}
                        errors={this.state.livingAddressErrors}
                        address={livingAddress}/>
                </div>
            </div>

            <Button onClick={this.submitForm} className={this.state.sendingData ? 'loading' : ''} color='teal'>Сохранить</Button>
        </Form>
    }

  render () {
      const id = parseInt(this.props.match.params.id, 10)
    return (
      <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
        <h2>{(id && id > 0)?'Редактирование сотрудника':'Добавление нового сотрудника'}</h2>
          {this.renderForm()}
          <StaffListModal
              opened={this.state.staffListModalOpened}
              staffs={this.props.allStaffs}
              onSelect={this.onScoutSelected}/>
      </Container>
    )
  }
}

function mapStateToProps (state) {
    return {
        staff:state.hrStaff.staff,
        allStaffs:state.hrStaff.allStaffs,
        countryList:state.f4.countryList,
        stateList:state.f4.stateList,
        cityList:state.f4.cityList,
        cityregList:state.f4.cityregList
    }
}

export default connect(mapStateToProps, {
    fetchSingleStaff,f4FetchCountryList,f4FetchStateList,f4FetchCityList,f4FetchCityregList,createStaff,
    toggleStaffListModal,fetchAllStaffs
})(StaffUpdatePage)