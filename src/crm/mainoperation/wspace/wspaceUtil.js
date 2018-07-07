/**
 * Created by onl on 29/04/2018.
 */
export const RECO_MODAL_ITEMS = 'RECO_MODAL_ITEMS'
export const MENU_DASHBOARD = 'MENU_DASHBOARD'
export const MENU_ALL_RECOS = 'MENU_ALL_RECOS'
export const MENU_BY_RECO = 'MENU_BY_RECO'
export const MENU_BY_DATE = 'MENU_BY_DATE'
export const MENU_MOVED = 'MENU_MOVED'
export const MENU_CURRENT_DEMO = 'MENU_CURRENT_DEMO'
export const MENU_CURRENT_VISIT = 'MENU_CURRENT_VISIT'
export const MENU_ADD_INFO = 'MENU_ADD_INFO'
export const MENU_ITEMS = [
    // {
    //     name: MENU_ALL_RECOS,
    //     label: 'Все рек.',
    //     pageLabel: 'Все рекомендации',
    //     count: 135
    // },
    {
        name: MENU_BY_RECO,
        label: 'По рекомендателям',
        pageLabel: 'Рекомендации по рекомендателям',
        count: 55
    },
    {
        name: MENU_BY_DATE,
        label: 'По дате',
        pageLabel: 'Рекомендации по дате',
        count: 12
    },
    {
        name: MENU_MOVED,
        label: 'Перенесенные',
        pageLabel: 'Перенесенные рекомендации',
        count: 0
    },
    {
        name: MENU_CURRENT_DEMO,
        label: 'Текущие демо',
        pageLabel: 'Текущие демонстрации',
        count: 0
    },
    {
        name: MENU_CURRENT_VISIT,
        label: 'Текущие визиты',
        pageLabel: 'Текущие визиты',
        count: 0
    }
]

export const DASHBOARD_MENU_ITEMS = [
    {
        'name': 'all',
        'label': 'Все звонки',
        'count': 321
    },
    {
        'name': 'success',
        'label': 'Успешные',
        'count': 5
    },
    {
        'name': 'refused',
        'label': 'Отказанные',
        'count': 5
    }
]