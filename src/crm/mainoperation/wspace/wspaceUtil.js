/**
 * Created by onl on 29/04/2018.
 */
export const MENU_DASHBOARD = 'MENU_DASHBOARD'
export const MENU_ALL_RECOS = 'MENU_ALL_RECOS'
export const MENU_BY_RECO = 'MENU_BY_RECO'
export const MENU_BY_DATE = 'MENU_BY_DATE'
export const MENU_MOVED = 'MENU_MOVED'
export const MENU_CURRENT_DEMO = 'MENU_CURRENT_DEMO'
export const MENU_ADD_INFO = 'MENU_ADD_INFO'
export const MENU_ITEMS = [
    {
        id: 'all',
        name: 'Все рек.',
        count: 135
    },
    {
        id: 'by_recommender',
        name: 'По рекомендателям',
        count: 55
    },
    {
        id: 'new',
        name: 'По дате',
        count: 12
    },
    {
        id: 'moved',
        name: 'Перенесенные',
        count: 0
    },
    {
        id: 'demo',
        name: 'Текущие демо',
        count: 8
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