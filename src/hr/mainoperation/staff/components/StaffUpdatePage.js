import React, {Component} from 'react'
import {Container,Form, Button} from 'semantic-ui-react'
import { connect } from 'react-redux'
import {fetchSingleStaff,createStaff,toggleStaffListModal,fetchAllStaffs,fetchBlankStaff,updateStaff} from '../actions/hrStaffAction'
import {f4FetchCountryList,f4FetchStateList,f4FetchCityList,f4FetchCityregList} from '../../../../reference/f4/f4_action'
import StaffAddressForm from  './forms/StaffAddressForm'
import StaffListModal from './StaffListModal'
import StaffForm from './forms/StaffForm'

class StaffUpdatePage extends Component {
    constructor (props) {
        super(props)
        this.state = {
            localStaff:{},
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

        this.handleAddressData = this.handleAddressData.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.submitForm = this.submitForm.bind(this)
        this.onScoutSelected = this.onScoutSelected.bind(this)
        this.removeScout = this.removeScout.bind(this)
        this.handleDate = this.handleDate.bind(this)
    }

    componentWillMount(){
        const id = parseInt(this.props.match.params.id, 10)
        if(id > 0){
            this.props.fetchSingleStaff(id)
        }else{
            this.props.fetchBlankStaff()
        }
        this.props.f4FetchCountryList()
        this.props.f4FetchStateList()
        this.props.f4FetchCityList()
        this.props.f4FetchCityregList()
        this.props.fetchAllStaffs({})
    }

    componentWillReceiveProps (nextProps) {
        if(nextProps.staff.id !== this.state.localStaff.id){
            let localStaff = Object.assign({}, nextProps.staff);
            this.setState({
                ...this.state,
                localStaff: localStaff
            })
        }
    }

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
        let out = countryList.map((c) => {
            return {
                key:parseInt(c.countryId,10),
                text:c.country,
                value:parseInt(c.countryId,10)
            }
        })

        return out;
    }

    handleAddressData(type,data){
        let localStaff = Object.assign({}, this.state.localStaff);
        if(!localStaff['addresses']){
            return
        }

        let addresses = localStaff['addresses']
        let selectedAddress = null
        let index = -1;
        for(let k in addresses){
            if(addresses[k]['type'] === type){
                selectedAddress = addresses[k]
                index = k;
                break
            }
        }

        if(index < 0){
            return
        }

        const {name,value} = data
        switch (name){
            case 'countryId':
            case 'stateId':
            case 'cityId':
            case 'regId':
                selectedAddress[name] = value
                break

            case 'microdistrict':
            case 'village':
            case 'avenue':
            case 'street':
            case 'apNumber':
            case 'flatNumber':
                selectedAddress[name] = value
                break
            default:{}
        }

        addresses[index] = selectedAddress
        localStaff['addresses'] = addresses

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
        // for(let k in errors){
        //     if(errors.hasOwnProperty(k)){
        //         errors[k] = false
        //     }
        // }
        // let fields1 = ['countryId','cityId','stateId','regId']
        // for(let k in fields1){
        //     let field = fields1[k]
        //     if(typeof address[field] === 'undefined' || parseInt(address[field],10) === 0){
        //         errors[field] = true
        //     }
        // }
    }

    submitForm () {
        let localStaff = Object.assign({}, this.state.localStaff);
        let errors = Object.assign({}, this.state.errors);
        let livingAddressErrors = Object.assign({}, this.state.livingAddressErrors);
        let regAddressErrors = Object.assign({}, this.state.regAddressErrors);

        for(let key in errors){
            if(errors.hasOwnProperty(key)){
                errors[key] = false
            }
        }

        this.validateAddress(localStaff.livingAddress,livingAddressErrors)
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
                livingAddressErrors:livingAddressErrors,
                regAddressErrors:regAddressErrors
            })
            return
        }

        if(localStaff.id && localStaff.id > 0){
            this.props.updateStaff(localStaff)
        }else{
            this.props.createStaff(localStaff)
        }

    }

    onScoutSelected(o){
        let {localStaff} = this.state
        localStaff['tsStaffId'] = o['staffId']
        localStaff['tsStaffName'] = o['lastname'] + ' ' + o['firstname']
        this.setState({
            ...this.state,
            localStaff:localStaff
        })
        this.props.toggleStaffListModal(false)
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

    onClickScoutBtn(){

    }

    renderForm(){
        const {staffFormErrors} = this.props
        let {localStaff,errors} = this.state
        let addresses = localStaff.addresses || []
        return <div>
        <StaffForm
            errors={staffFormErrors}
            staff={localStaff}
            handleChange={this.handleChange}
            handleDate={this.handleDate}
            removeScout = {this.removeScout}
            onClickScoutBtn={() => this.props.toggleStaffListModal(true)}
        />
        <br />
        <Form>
            {addresses.map((address,idx) => {
                return <div key={address['type']} className='ui segments'>
                    <div className='ui segment'>
                        <h3>{address['typeName']}</h3>
                    </div>
                    <div className='ui secondary segment'>
                        <StaffAddressForm
                            countryOptions={this.getCountryOptions()}
                            stateOptions={this.getStateOptions(address.countryId || 0)}
                            cityOptions={this.getCityOptions(address.stateId || 0)}
                            regionOptions={this.getRegionOptions(address.cityId || 0)}
                            handleChange={this.handleAddressData}
                            address={address}/>
                    </div>
                </div>
            })}
        </Form>
            <br />
        <Button onClick={this.submitForm} className={this.state.sendingData ? 'loading' : ''} color='teal'>Сохранить</Button>
        </div>
    }

  render () {
      const id = parseInt(this.props.match.params.id, 10)
    return (
      <Container fluid style={{ marginTop: '2em', marginBottom: '2em', paddingLeft: '2em', paddingRight: '2em'}}>
        <h2>{(id && id > 0)?'Редактирование сотрудника':'Добавление нового сотрудника'}</h2>
          {this.renderForm()}
          <StaffListModal
              opened={this.props.staffListModalOpened}
              staffs={this.props.allStaffs}
              onSelect={this.onScoutSelected}/>
      </Container>
    )
  }
}

function mapStateToProps (state) {
    return {
        staff:state.hrStaff.staff,
        staffFormErrors:state.hrStaff.staffFormErrors,
        staffListModalOpened: state.hrStaff.staffListModalOpened,
        allStaffs:state.hrStaff.allStaffs,
        countryList:state.f4.countryList,
        stateList:state.f4.stateList,
        cityList:state.f4.cityList,
        cityregList:state.f4.cityregList
    }
}

export default connect(mapStateToProps, {
    fetchSingleStaff,f4FetchCountryList,f4FetchStateList,f4FetchCityList,f4FetchCityregList,createStaff,
    toggleStaffListModal,fetchAllStaffs,fetchBlankStaff,updateStaff
})(StaffUpdatePage)