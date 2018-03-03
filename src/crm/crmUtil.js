
export const DEMO_RESULT_DONE = 1
export const DEMO_RESULT_MOVED = 2
export const DEMO_RESULT_CANCELLED = 3
export const DEMO_RESULT_SOLD = 4


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
            key:k,
            text:results[k],
            value:k
        }
    });

    return out;
}