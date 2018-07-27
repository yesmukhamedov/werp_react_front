
export const STAFF_BLANK_OBJECT = {
    staffId:null,
    firstname:'',
    lastname:'',
    middlename:'',
    iinBin:'',
    birthday:'',
    gender:0,
    passportId:'',
    passportGivenBy:'',
    passportGivenDate:'',
    mobile:'',
    mobile1:'',
    homephone:'',
    workphone:'',
    email:'',
    corpEmail:'',
    email2:'',
    passportId2:'',
    passportValidity:null,
    passportGivenDate2:null,
    passportValidity2:null,
    passportGivenBy2:'',
    countryId:'',
    stateId:0,
    cityId:0,
    factCountryId:0,
    factStateId:0,
    factCityId:0,
    factAddress:'',
    tsStaffName:'',
    tsStaffId:0
}

export const SALARY_TYPES = [
    {
        key:'monthly',
        value:'monthly',
        text:'Помесячно'
    },
    {
        key:'daily',
        value:'daily',
        text:'Подням'
    },
    {
        key:'hourly',
        value:'hourly',
        text:'Почасовой'
    }
]

/**DOCUMENT TYPES****/
export const DOC_TYPE_RECRUITMENT = 1;
export const DOC_TYPE_TRANSFER = 2;
export const DOC_TYPE_DISMISS = 3;
export const DOC_TYPE_CHANGE_SALARY = 4;
export const DOC_TYPE_BYPASS_SHEET = 5;

/**END DOCUMENT TYPES***/

export const OFF_DATA = 'OFF_DATA'
export const MAIN_DATA = 'MAIN_DATA'
export const PASSPORT_DATA = 'PASSPORT_DATA'
export const SALARY_DATA = 'SALARY_DATA'
export const CONTACT_DATA = 'CONTACT_DATA'
export const EXPENCE_DATA = 'EXPENCE_DATA'
export const EDU_DATA = 'EDU_DATA'
export const MATNR_DATA = 'MATNR_DATA'

export const STAFF_DATA = [MAIN_DATA,PASSPORT_DATA,SALARY_DATA,CONTACT_DATA,EXPENCE_DATA,OFF_DATA,EDU_DATA,MATNR_DATA]

export const currencyOptions = (currencyList) => {
    if(!currencyList){
        return []
    }

    let out = []
    for(let k in currencyList){
        out.push({
            key:currencyList[k]['currency'],
            value:currencyList[k]['currency'],
            text:currencyList[k]['text20']
        })
    }

    return out
}

export const subCompanyOptions = (subCompanies) => {
    if(!subCompanies){
        return []
    }

    let out = []
    for(let k in subCompanies){
        out.push({
            key:subCompanies[k]['sc_id'],
            value:subCompanies[k]['sc_id'],
            text:subCompanies[k]['name_ru']
        })
    }

    return out
}

export const positionOptions = (positionList) => {
    if(!positionList){
        return []
    }

    let out = []
    for(let k in positionList){
        out.push({
            key:positionList[k]['position_id'],
            value:positionList[k]['position_id'],
            text:positionList[k]['text']
        })
    }

    return out
}

export const expenceTypeOptions = (expenceTypes) => {
    if(!expenceTypes){
        return []
    }
    let out = []
    for(let k in expenceTypes){
        out.push({
            key:expenceTypes[k]['et_id'],
            value:expenceTypes[k]['et_id'],
            text:expenceTypes[k]['name']
        })
    }

    return out
}

export const getStaffDataBlankUri = (activeData) => {
    switch (activeData){
        case OFF_DATA:
            return '/api/hr/off-data/blank/'

        case EXPENCE_DATA:
            return '/api/hr/expence/blank/'

        case EDU_DATA:
            return '/api/hr/education/blank/'

        case SALARY_DATA:
            return '/api/hr/salary/blank/'

        default:
            return ''
    }
}

export const getStaffDataPostUri = (staffData) => {
    switch (staffData){
        case OFF_DATA:
            return '/api/hr/off-data'

        case EXPENCE_DATA:
            return '/api/hr/expence'

        case EDU_DATA:
            return '/api/hr/education'

        case SALARY_DATA:
            return '/api/hr/salary'

        default:
            return ''
    }
}

export const getStaffDataFetchUri = (staffData,staffId) => {
    switch (staffData){
        case OFF_DATA:
            return '/api/hr/off-data/by-staff/' + staffId

        case EXPENCE_DATA:
            return '/api/hr/expence/by-staff/' + staffId

        case EDU_DATA:
            return '/api/hr/education/by-staff/' + staffId

        case SALARY_DATA:
            return '/api/hr/salary/by-staff/' + staffId

        case MATNR_DATA:
            return '/api/hr/staff/' + staffId + '/matnrs'

        case CONTACT_DATA:
            return '/api/hr/address/by-staff/' + staffId

        default:
            return ''
    }
}

export const pyramidOptions = (branchPyramids,branchId) => {
    if(!branchPyramids){
        return []
    }

    let out = []
    out.push({
        key:null,
        value:null,
        text:"Не выбрано"
    })
    for(let k in branchPyramids){
        out.push({
            key: branchPyramids[k]['staffId'],
            value:branchPyramids[k]['staffId'],
            text: branchPyramids[k]['fullName'] + '(' + branchPyramids[k]['positionName'] + ')'
        })
    }

    return out
}

export const departmentOptions = (departmentList) =>{
    if(!departmentList){
        return []
    }

    let out = []
    for(let k in departmentList){
        out.push({
            key:departmentList[k]['id'],
            value:departmentList[k]['id'],
            text:departmentList[k]['name_ru']
        })
    }

    return out
}

export const businessAreaOptions = (businessAreaList,bukrs) => {
    if (!businessAreaList) {
        return []
    }

    let out = []
    for (let k in businessAreaList) {
        if (businessAreaList[k]['bukrs'] === bukrs) {
            out.push({
                key: businessAreaList[k]['business_area_id'],
                value: businessAreaList[k]['business_area_id'],
                text: businessAreaList[k]['name']
            })
        }
    }

    return out
}