export const DEMO_RESULT_DONE = 1
export const DEMO_RESULT_MOVED = 2
export const DEMO_RESULT_CANCELLED = 3
export const DEMO_RESULT_SOLD = 4

export const DEMO_RESULT_OPTIONS = [
    {
        key: DEMO_RESULT_DONE,
        value: DEMO_RESULT_DONE,
        text: 'Пройден'
    },

    {
        key: DEMO_RESULT_MOVED,
        value: DEMO_RESULT_MOVED,
        text: 'Перенос'
    },

    {
        key: DEMO_RESULT_CANCELLED,
        value: DEMO_RESULT_CANCELLED,
        text: 'Отменен'
    },

    {
        key: DEMO_RESULT_SOLD,
        value: DEMO_RESULT_SOLD,
        text: 'Продан'
    }
]


//CALL RESULTS
export const CALL_RESULT_DEMO = 1
export const CALL_RESULT_REFUSE = 2
export const CALL_RESULT_RECALL = 3
export const CALL_RESULT_NOT_AVAILABLE = 4
export const CALL_RESULT_NO_ANSWER = 5

export const LOCATION_OPTIONS = [
    {
        key: 1,
        text: 'Город',
        value: 1
    },
    {
        key: 2,
        text: 'ЗАгород',
        value: 2
    }
]

export const RECO_CATEGORIES = [
    {
        key: 1,
        text: 'Золото',
        value: 1
    },
    {
        key: 2,
        text: 'Серебро',
        value: 2
    },
    {
        key: 3,
        text: 'Бронза',
        value: 3
    }
]

export const getRecoCategoriesOptionsByLanguage = (language) => {
    if("en" === language || "tr" === language){
        return [
            {
                key: 1,
                text: 'Gold',
                value: 1
            },
            {
                key: 2,
                text: 'Silver',
                value: 2
            },
            {
                key: 3,
                text: 'Bronze',
                value: 3
            }
        ]
    }

    return RECO_CATEGORIES
}

export const RECO_SWITCH_OPTIONS = [
    {
        key: 0,
        text: 'В любое время',
        value: 0
    },
    {
        key: 1,
        text: 'Задать дату',
        value: 1
    }
]

export const RECO_CALLER_OPTIONS = [
    {
        key: 0,
        text: 'Секретарь',
        value: 0
    },
    {
        key: 1,
        text: 'Дилер',
        value: 1
    }
]

export const RECO_CATEGORY_COLORS = {
    1: 'orange',
    2: 'olive',
    3: 'brown',
    4: 'grey'
}

export const getCallerOptionsByLanguage = (language) => {
    if("en" === language || "tr" == language){
        return [
            {
                key: 0,
                text: 'Demo Secretary',
                value: 0
            },
            {
                key: 1,
                text: 'Dealer',
                value: 1
            }
        ]
    }

    return RECO_CALLER_OPTIONS;
}

export const getLocationOptionsByLanguage = (language) => {
    console.log(language)
    if("en" === language){
        return [
            {
                key: 1,
                text: 'City',
                value: 1
            },
            {
                key: 2,
                text: 'Countryside',
                value: 2
            }
        ]
    } else if("tr" === language){
        return [
            {
                key: 1,
                text: 'City',
                value: 1
            },
            {
                key: 2,
                text: 'Countryside',
                value: 2
            }
        ]
    }

    return [
        {
            key: 1,
            text: 'Город',
            value: 1
        },
        {
            key: 2,
            text: 'ЗАгород',
            value: 2
        }
    ]
}

export function getReasonsByResultId (resultId,reasons) {
    let reasonTypeId = 0
    resultId = parseInt(resultId,10)
    if (resultId === DEMO_RESULT_DONE) {
        reasonTypeId = 2
    } else if (resultId === DEMO_RESULT_CANCELLED) {
        reasonTypeId = 3
    } else if (resultId === DEMO_RESULT_MOVED) {
        reasonTypeId = 4
    }

    let out = []
    for (let k in reasons) {
        if (reasons[k]['typeId'] === reasonTypeId) {
            out.push({
                key: reasons[k]['id'],
                text: reasons[k]['name'],
                value: reasons[k]['id']
            })
        }
    }

    return out
}

export function demoResultOptions(results){
    if(!results){
        return []
    }

    let out = Object.keys(results).map((k) => {
        return {
            key: parseInt(k,10),
            text:results[k],
            value: parseInt(k,10)
        }
    });

    return out;
}

export function callColor(resultId){
    switch (resultId){
        case CALL_RESULT_DEMO:
            return 'green'

        case CALL_RESULT_RECALL:
            return 'brown'

        case CALL_RESULT_REFUSE:
            return 'red'

        default:
            return 'grey'
    }
}