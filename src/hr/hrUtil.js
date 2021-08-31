export const STAFF_BLANK_OBJECT = {
    staffId: null,
    firstname: '',
    lastname: '',
    middlename: '',
    iinBin: '',
    birthday: '',
    gender: 0,
    passportId: '',
    passportGivenBy: '',
    passportGivenDate: '',
    mobile: '',
    mobile1: '',
    homephone: '',
    workphone: '',
    email: '',
    corpEmail: '',
    email2: '',
    passportId2: '',
    passportValidity: null,
    passportGivenDate2: null,
    passportValidity2: null,
    passportGivenBy2: '',
    countryId: '',
    stateId: 0,
    cityId: 0,
    factCountryId: 0,
    factStateId: 0,
    factCityId: 0,
    factAddress: '',
    tsStaffName: '',
    tsStaffId: 0,
};

export const SALARY_TYPES = [
    {
        key: 'monthly',
        value: 'monthly',
        text: 'Помесячно',
    },
    {
        key: 'daily',
        value: 'daily',
        text: 'Подням',
    },
    {
        key: 'hourly',
        value: 'hourly',
        text: 'Почасовой',
    },
];

/** DOCUMENT TYPES*** */
export const DOC_TYPE_RECRUITMENT = 1;
export const DOC_TYPE_TRANSFER = 2;
export const DOC_TYPE_DISMISS = 3;
export const DOC_TYPE_CHANGE_SALARY = 4;
export const DOC_TYPE_BYPASS_SHEET = 5;
export const DOC_TYPE_EXCLUDE_FROM_KPI = 7;
export const DOC_TYPE_PROBLEM_STAFF = 8;

/** END DOCUMENT TYPES** */

/** **DOCUMENT ACTIONS*** */
export const DOC_ACTION_GO_TO_LIST = 0; // В список
export const DOC_ACTION_CREATE = 1; // Создание
export const DOC_ACTION_UPDATE = 2; // Редактирование
export const DOC_ACTION_VIEW = 3; // Просмотр
export const DOC_ACTION_SEND = 4; // Отправить на просмотр
export const DOC_ACTION_APPROVE = 5;
export const DOC_ACTION_REJECT = 6;
export const DOC_ACTION_ADD_APPROVER = 7; // Добавление согласующих
export const DOC_ACTION_SEND_TO_EXECUTION = 8; // Отправить на исполнение
export const DOC_ACTION_SEND_TO_APPROVER = 9; // Отправить на согласование
export const DOC_ACTION_CREATE_NEW_SALARY = 10;
export const DOC_ACTION_ADD_AMOUNT = 11;
export const DOC_ACTION_ADD_SALARY = 12; // Добавить Должности
export const DOC_ACTION_DISMISS_EMPLOYEE = 13; // Уволить сотрудников
export const DOC_ACTION_CANCEL = 14; // Отменить
export const DOC_ACTION_COMPLETE_DOC = 15; // Завершить
export const DOC_ACTION_CREATE_BYPASS_SHEET = 16; // Создать обходной лист
export const DOC_ACTION_SAVE = 17; // Сохранение документа
export const DOC_CREATE_PROBLEM_DOC = 18; // Создание документа Проблемный
/** **END DOCUMENT ACTIONS** */

export const OFF_DATA = 'OFF_DATA';
export const MAIN_DATA = 'MAIN_DATA';
export const PASSPORT_DATA = 'PASSPORT_DATA';
export const SALARY_DATA = 'SALARY_DATA';
export const CONTACT_DATA = 'CONTACT_DATA';
export const EXPENCE_DATA = 'EXPENCE_DATA';
export const EDU_DATA = 'EDU_DATA';
export const MATNR_DATA = 'MATNR_DATA';
export const FILE_DATA = 'FILE_DATA';

export const STAFF_DATA = [
    MAIN_DATA,
    PASSPORT_DATA,
    SALARY_DATA,
    CONTACT_DATA,
    EXPENCE_DATA,
    OFF_DATA,
    EDU_DATA,
    MATNR_DATA,
    FILE_DATA,
];

export const documentTypeOptions = (firstBlankElement = false) => {
    let out = [];
    if (firstBlankElement) {
        out.push({
            key: null,
            value: null,
            text: 'Не выбрано',
        });
    }
    out.push({
        key: DOC_TYPE_RECRUITMENT,
        value: DOC_TYPE_RECRUITMENT,
        text: 'Прием на работу',
    });

    out.push({
        key: DOC_TYPE_TRANSFER,
        value: DOC_TYPE_TRANSFER,
        text: 'Перевод',
    });

    out.push({
        key: DOC_TYPE_DISMISS,
        value: DOC_TYPE_DISMISS,
        text: 'Увольнение',
    });

    out.push({
        key: DOC_TYPE_CHANGE_SALARY,
        value: DOC_TYPE_CHANGE_SALARY,
        text: 'Изменение оклада',
    });

    out.push({
        key: DOC_TYPE_PROBLEM_STAFF,
        value: DOC_TYPE_PROBLEM_STAFF,
        text: 'Проблемный сотрудник',
    });

    return out;
};

export const documentStatusOptions = (firstBlankElement = false) => {
    let out = [];
    if (firstBlankElement) {
        out.push({
            key: null,
            value: null,
            text: 'Не выбрано',
        });
    }
    out.push({
        key: 1,
        value: 1,
        text: 'На создании',
    });

    out.push({
        key: 3,
        value: 3,
        text: 'На согласовании',
    });

    out.push({
        key: 4,
        value: 4,
        text: 'На исполнении',
    });

    out.push({
        key: 5,
        value: 5,
        text: 'Закрытый',
    });

    out.push({
        key: 6,
        value: 6,
        text: 'Отказан',
    });

    out.push({
        key: 7,
        value: 7,
        text: 'Отменен',
    });

    out.push({
        key: 8,
        value: 8,
        text: 'В ожидании',
    });

    return out;
};

export const currencyOptions = currencyList => {
    if (!currencyList) {
        return [];
    }

    const out = [];
    for (const k in currencyList) {
        out.push({
            key: currencyList[k].currency,
            value: currencyList[k].currency,
            text: currencyList[k].text20,
        });
    }

    return out;
};

export const subCompanyOptions = subCompanies => {
    if (!subCompanies) {
        return [];
    }

    const out = [];
    for (const k in subCompanies) {
        out.push({
            key: subCompanies[k].id,
            value: subCompanies[k].id,
            text: subCompanies[k].nameRu,
        });
    }

    return out;
};

export const positionOptions = positionList => {
    if (!positionList) {
        return [];
    }

    const out = [];
    for (const k in positionList) {
        out.push({
            key: positionList[k].position_id,
            value: positionList[k].position_id,
            text: positionList[k].text,
        });
    }

    return out;
};

export const expenceTypeOptions = expenceTypes => {
    if (!expenceTypes) {
        return [];
    }
    const out = [];
    for (const k in expenceTypes) {
        out.push({
            key: expenceTypes[k].et_id,
            value: expenceTypes[k].et_id,
            text: expenceTypes[k].name,
        });
    }

    return out;
};

export const getStaffDataBlankUri = activeData => {
    switch (activeData) {
        case OFF_DATA:
            return 'core/hr/off-data/blank/';

        case EXPENCE_DATA:
            return 'core/hr/expence/blank/';

        case EDU_DATA:
            return 'core/hr/education/blank/';

        case SALARY_DATA:
            return 'core/hr/salary/blank/';

        default:
            return '';
    }
};

export const getStaffDataPostUri = staffData => {
    switch (staffData) {
        case OFF_DATA:
            return 'core/hr/off-data';

        case EXPENCE_DATA:
            return 'core/hr/expence';

        case EDU_DATA:
            return 'core/hr/education';

        case SALARY_DATA:
            return 'core/hr/salary';

        default:
            return '';
    }
};

export const getStaffDataFetchUri = (staffData, staffId) => {
    switch (staffData) {
        case OFF_DATA:
            return `core/hr/off-data/by-staff/${staffId}`;

        case EXPENCE_DATA:
            return `core/hr/expence/by-staff/${staffId}`;

        case EDU_DATA:
            return `core/hr/education/by-staff/${staffId}`;

        case SALARY_DATA:
            return `core/hr/salary/by-staff/${staffId}`;

        case MATNR_DATA:
            return `core/hr/staff/${staffId}/matnrs`;

        case CONTACT_DATA:
            return `core/hr/address/by-staff/${staffId}`;

        case FILE_DATA:
            return `core/hr/file/by-staff/${staffId}`;

        default:
            return '';
    }
};

export const pyramidOptions = (branchPyramids, branchId) => {
    if (!branchPyramids) {
        return [];
    }

    const out = [];
    out.push({
        key: null,
        value: null,
        text: 'Не выбрано',
    });
    for (const k in branchPyramids) {
        out.push({
            key: branchPyramids[k].staffId,
            value: branchPyramids[k].staffId,
            text: `${branchPyramids[k].fullName}(${branchPyramids[k].positionName})`,
        });
    }

    return out;
};

export const departmentOptions = departmentList => {
    if (!departmentList) {
        return [];
    }

    const out = [];
    for (const k in departmentList) {
        out.push({
            key: departmentList[k].id,
            value: departmentList[k].id,
            text: departmentList[k].name_ru,
        });
    }

    return out;
};

export const businessAreaOptions = (businessAreaList, bukrs) => {
    if (!businessAreaList) {
        return [];
    }

    const out = [];
    for (const k in businessAreaList) {
        if (businessAreaList[k].bukrs === bukrs) {
            out.push({
                key: businessAreaList[k].business_area_id,
                value: businessAreaList[k].business_area_id,
                text: businessAreaList[k].name,
            });
        }
    }

    return out;
};
