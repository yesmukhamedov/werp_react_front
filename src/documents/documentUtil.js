//Mydocs Statuses
export const MD_STATUS_CREATE = 1;// Созданные
export const MD_STATUS_IN = 2;// Входящие
export const MD_STATUS_SENT = 3;// Отправленные
export const MD_STATUS_CONFIRMED = 4;// Согласованные
export const MD_STATUS_CLOSED = 5;// Закрыт
export const MD_STATUS_REFUSED = 6;//Отклоненные

//Contexts
export const MD_HR_DOCUMENT_REC = 'HR_DOCUMENT_REC'
export const MD_HR_DOCUMENT_TRANS = 'HR_DOCUMENT_TRANS'
export const MD_HR_DOCUMENT_CHANGE_SALARY = 'HR_DOCUMENT_CHANGE_SALARY'
export const MD_HR_DOCUMENT_DISMISS = 'HR_DOCUMENT_DISMISS'
export const MD_TASK = 'TASK'

export const getMdContexts = () => {
    let out = {}
    out[MD_HR_DOCUMENT_REC] = 'Заявки о приеме на работу'
    out[MD_HR_DOCUMENT_TRANS] = 'Заявки о переводе',
    out[MD_HR_DOCUMENT_CHANGE_SALARY] = 'Заявки об изменении оклада',
    out[MD_HR_DOCUMENT_DISMISS] = 'Заявки об увольнении'
    out[MD_TASK] = 'Задачи'

    return out
}

export const getMdStatuses = () => {
    return {
        MD_STATUS_CREATE: "Созданные",
        MD_STATUS_IN: "Входящие",
        MD_STATUS_SENT: "Отправленные",
        MD_STATUS_CONFIRMED: "Согласованные",
        MD_STATUS_CLOSED: "Закрыт",
        MD_STATUS_REFUSED: "Отклоненные"
    }
}

export const getDocViewLink = (context,contextId) => {
    switch (context){
        case MD_HR_DOCUMENT_REC:
        case MD_HR_DOCUMENT_TRANS:
        case MD_HR_DOCUMENT_CHANGE_SALARY:
        case MD_HR_DOCUMENT_DISMISS:
            return '/hr/doc/view/' + contextId

        case MD_TASK:
            return '/dit/task/dtskedit/' + contextId
        default:
            return ''
    }
}

export const getDocCreateLink = (context) => {
    switch (context){
        case MD_HR_DOCUMENT_REC:
            return '/hr/doc/create/1'

        case MD_HR_DOCUMENT_TRANS:
            return '/hr/doc/create/2'

        case MD_HR_DOCUMENT_DISMISS:
            return '/hr/doc/create/3'

        case MD_HR_DOCUMENT_CHANGE_SALARY:
            return '/hr/doc/create/4'

        case MD_TASK:
            return '/dit/task/dtskc'


        default:
            return ''
    }
}