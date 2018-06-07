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

export const RECO_ITEMS_TEMP = [
    {
        id:1,
        clientName: 'Testov test',
        relativeName: 'Мұғалім',
        recommenderName: 'Бауыржан Иманкулов',
        note: 'Джармешов Дәулеттің демосы',
        address: 'Шаңырақ 2, Фанфай 13. Алдында Поликлинка 22 бар.',
        shortAddress: 'Шаңырақ 2, Фанфай 13. Алдында Поликлинка 22 бар.',
        categoryId: 1,
        categoryName: 'Золотой',
        resultName: 'Пройден',
        dateTime: '16.05.2018 20:30',
        phones: [
            {
                recoId: 1,
                id: 1,
                phoneNumber: '7052242645'
            },
            {
                recoId: 1,
                id: 2,
                phoneNumber: '7052242645'
            }
        ]
    },
    {
        id:2,
        clientName: 'Асан',
        relativeName: 'Мұғалім',
        address: 'п КызылТу 1 ул Бейбитшилик д 8 в/а бардовый навес жабылган кульжинский трассага карай Аэропорттын жолынан кишкене отип пораллель кошемен кирип страховканын вывезкасы турады сол кошемен тик журе береди аты жок магазин шыгады солдан онга сол жол бейбитшиликке шыгады ',
        shortAddress: 'Шаңырақ 2, Фанфай 13. Алдында Поликлинка 22 бар.',
        resultName: 'Перенесен',
        categoryId: 1,
        categoryName: 'Золотой',
        recommenderName: 'Айнаш',
        note: 'суббота х/п кор. уакытым жок,жаным деди',
        dateTime: '16.05.2018 20:25',
        phones: [
            {
                recoId: 2,
                id: 3,
                phoneNumber: '7052242645'
            },
            {
                recoId: 2,
                id: 4,
                phoneNumber: '7052242645'
            }
        ]
    },
    {
        id:3,
        clientName: 'Ольга',
        resultName: 'Отменен',
        address:'Сапарбаев кошесине тусип тура журе бересин алдыннан 257 мектеп шыгады  сол мектепке карама карсы Ербол Айгерим деген магазиндер бар.Сол еки магазиннин ортасындагы кошеге киресин сол кезде звонда алдыннан кутип алады.Жанадан салынган уйлер болгандыктан номери жокю',
        shortAddress: 'Сапарбаев кошесине тусип тура журе бересин алдыннан 257 мектеп шыгады  сол мектепке карама ',
        categoryId: 2,
        categoryName: 'Серебро',
        recommenderName: 'Димаш',
        note: 'Талдықорғанға кетіп жатыр. Жексенбі хбрл, Р ны айту керек',
        dateTime: '16.05.2018 20:30',
        phones: [
            {
                recoId: 3,
                id: 5,
                phoneNumber: '7052242645'
            },
            {
                recoId: 3,
                id: 6,
                phoneNumber: '7052242645'
            }
        ]
    },
    {
        id:4,
        clientName: 'Асемгуль',
        resultName: 'Пройден',
        categoryId: 3,
        categoryName: 'Бронза',
        recommenderName: 'Димаш',
        shortAddress: 'Шаңырақ 2, Фанфай 13. Алдында Поликлинка 22 бар.',
        note: 'дмео корген,бизге кымбат алмаймыз,керек болса звондаймыз озимиз',
        dateTime: '16.05.2018 20:30',
        phones: [
            {
                recoId: 4,
                id: 7,
                phoneNumber: '7052242645'
            }
        ]
    },
    {
        id:5,
        clientName: 'Аягоз',
        resultName: 'Продан',
        categoryId: 2,
        categoryName: 'Серебро',
        shortAddress: 'Шаңырақ 2, Фанфай 13. Алдында Поликлинка 22 бар.',
        recommenderName: 'Димаш',
        dateTime: '16.05.2018 20:30',
        phones: [
            {
                recoId: 5,
                id: 8,
                phoneNumber: '7052242645'
            }
        ]
    },
    ,
    {
        id:6,
        clientName: 'Сабира',
        resultName: 'Мини контракт',
        categoryId: 4,
        categoryName: 'Железо',
        recommenderName: 'Димаш',
        shortAddress: 'Шаңырақ 2, Фанфай 13. Алдында Поликлинка 22 бар.',
        dateTime: '16.05.2018 20:30',
        phones: [
            {
                recoId: 6,
                id: 9,
                phoneNumber: '7052242645'
            }
        ]
    },

    {
        id:7,
        clientName: 'Аты ең ұзын клиент',
        resultName: 'Мини контракт',
        categoryId: 4,
        categoryName: 'Железо',
        recommenderName: 'Димаш',
        shortAddress: 'Шаңырақ 2, Фанфай 13. Алдында Поликлинка 22 бар.',
        dateTime: '16.05.2018 20:30',
        phones: [
            {
                recoId: 6,
                id: 9,
                phoneNumber: '7052242645'
            }
        ]
    },

    {
        id:8,
        clientName: 'Аты ең ұзын клиент',
        resultName: 'Мини контракт',
        categoryId: 4,
        categoryName: 'Железо',
        recommenderName: 'Димаш',
        shortAddress: 'Шаңырақ 2, Фанфай 13. Алдында Поликлинка 22 бар.',
        dateTime: '16.05.2018 20:30',
        phones: [
            {
                recoId: 6,
                id: 9,
                phoneNumber: '7052242645'
            }
        ]
    },

    {
        id:9,
        clientName: 'Аты ең ұзын клиент',
        resultName: 'Мини контракт',
        categoryId: 4,
        categoryName: 'Железо',
        recommenderName: 'Димаш',
        shortAddress: 'Шаңырақ 2, Фанфай 13. Алдында Поликлинка 22 бар.',
        dateTime: '16.05.2018 20:30',
        phones: [
            {
                recoId: 6,
                id: 9,
                phoneNumber: '7052242645'
            }
        ]
    },
    {
        id:10,
        clientName: 'Аты ең ұзын клиент',
        resultName: 'Мини контракт',
        categoryId: 4,
        categoryName: 'Железо',
        recommenderName: 'Димаш',
        shortAddress: 'Шаңырақ 2, Фанфай 13. Алдында Поликлинка 22 бар.',
        dateTime: '16.05.2018 20:30',
        phones: [
            {
                recoId: 6,
                id: 9,
                phoneNumber: '7052242645'
            }
        ]
    },

    {
        id:11,
        clientName: 'Аты ең ұзын клиент',
        resultName: 'Мини контракт',
        categoryId: 4,
        categoryName: 'Железо',
        recommenderName: 'Димаш',
        shortAddress: 'Шаңырақ 2, Фанфай 13. Алдында Поликлинка 22 бар.',
        dateTime: '16.05.2018 20:30',
        phones: [
            {
                recoId: 6,
                id: 9,
                phoneNumber: '7052242645'
            }
        ]
    },

    {
        id:12,
        clientName: 'Аты ең ұзын клиент',
        resultName: 'Мини контракт',
        categoryId: 4,
        categoryName: 'Железо',
        recommenderName: 'Димаш',
        shortAddress: 'Шаңырақ 2, Фанфай 13. Алдында Поликлинка 22 бар.',
        dateTime: '16.05.2018 20:30',
        phones: [
            {
                recoId: 6,
                id: 9,
                phoneNumber: '7052242645'
            }
        ]
    },

    {
        id:13,
        clientName: 'Аты ең ұзын клиент',
        resultName: 'Мини контракт',
        categoryId: 4,
        categoryName: 'Железо',
        recommenderName: 'Димаш',
        shortAddress: 'Шаңырақ 2, Фанфай 13. Алдында Поликлинка 22 бар.',
        dateTime: '16.05.2018 20:30',
        phones: [
            {
                recoId: 6,
                id: 9,
                phoneNumber: '7052242645'
            }
        ]
    },

    {
        id:14,
        clientName: 'Аты ең ұзын клиент',
        resultName: 'Мини контракт',
        categoryId: 4,
        categoryName: 'Железо',
        recommenderName: 'Димаш',
        shortAddress: 'Шаңырақ 2, Фанфай 13. Алдында Поликлинка 22 бар.',
        dateTime: '16.05.2018 20:30',
        phones: [
            {
                recoId: 6,
                id: 9,
                phoneNumber: '7052242645'
            }
        ]
    },

    {
        id:15,
        clientName: 'Аты ең ұзын клиент',
        resultName: 'Мини контракт',
        categoryId: 4,
        categoryName: 'Железо',
        recommenderName: 'Димаш',
        shortAddress: 'Шаңырақ 2, Фанфай 13. Алдында Поликлинка 22 бар.',
        dateTime: '16.05.2018 20:30',
        phones: [
            {
                recoId: 6,
                id: 9,
                phoneNumber: '7052242645'
            }
        ]
    },

    {
        id:16,
        clientName: 'Аты ең ұзын клиент',
        resultName: 'Мини контракт',
        categoryId: 4,
        categoryName: 'Железо',
        recommenderName: 'Димаш',
        shortAddress: 'Шаңырақ 2, Фанфай 13. Алдында Поликлинка 22 бар.',
        dateTime: '16.05.2018 20:30',
        phones: [
            {
                recoId: 6,
                id: 9,
                phoneNumber: '7052242645'
            }
        ]
    },

    {
        id:17,
        clientName: 'Аты ең ұзын клиент',
        resultName: 'Мини контракт',
        categoryId: 4,
        categoryName: 'Железо',
        recommenderName: 'Димаш',
        shortAddress: 'Шаңырақ 2, Фанфай 13. Алдында Поликлинка 22 бар.',
        dateTime: '16.05.2018 20:30',
        phones: [
            {
                recoId: 6,
                id: 9,
                phoneNumber: '7052242645'
            }
        ]
    },

    {
        id:18,
        clientName: 'Аты ең ұзын клиент',
        resultName: 'Мини контракт',
        categoryId: 4,
        categoryName: 'Железо',
        recommenderName: 'Димаш',
        shortAddress: 'Шаңырақ 2, Фанфай 13. Алдында Поликлинка 22 бар.',
        dateTime: '16.05.2018 20:30',
        phones: [
            {
                recoId: 6,
                id: 9,
                phoneNumber: '7052242645'
            }
        ]
    },
    {
        id:19,
        clientName: 'Аты ең ұзын клиент',
        resultName: 'Мини контракт',
        categoryId: 4,
        categoryName: 'Железо',
        recommenderName: 'Димаш',
        shortAddress: 'Шаңырақ 2, Фанфай 13. Алдында Поликлинка 22 бар.',
        dateTime: '16.05.2018 20:30',
        phones: [
            {
                recoId: 6,
                id: 9,
                phoneNumber: '7052242645'
            }
        ]
    },

    {
        id:20,
        clientName: 'Аты ең ұзын клиент',
        resultName: 'Мини контракт',
        categoryId: 4,
        categoryName: 'Железо',
        recommenderName: 'Димаш',
        shortAddress: 'Шаңырақ 2, Фанфай 13. Алдында Поликлинка 22 бар.',
        dateTime: '16.05.2018 20:30',
        phones: [
            {
                recoId: 6,
                id: 9,
                phoneNumber: '7052242645'
            }
        ]
    },
    {
        id:21,
        clientName: 'Аты ең ұзын клиент',
        resultName: 'Мини контракт',
        categoryId: 4,
        categoryName: 'Железо',
        recommenderName: 'Димаш',
        shortAddress: 'Шаңырақ 2, Фанфай 13. Алдында Поликлинка 22 бар.',
        dateTime: '16.05.2018 20:30',
        phones: [
            {
                recoId: 6,
                id: 9,
                phoneNumber: '7052242645'
            }
        ]
    }
]

export const ITEMS = {
    MENU_BY_RECO: [
        {
            id:1,
            clientName: 'Testov test',
            recommenderName: 'Бауыржан Иманкулов',
            note: 'Джармешов Дәулеттің демосы',
            address: 'Шаңырақ 2, Фанфай 13. Алдында Поликлинка 22 бар.',
            shortAddress: 'Шаңырақ 2, Фанфай 13. Алдында Поликлинка 22 бар.',
            categoryId: 1,
            categoryName: 'Золотой',
            resultName: 'Пройден',
            dateTime: '16.05.2018 20:30',
            phones: [
                {
                    recoId: 1,
                    id: 1,
                    phoneNumber: '7052242645'
                },
                {
                    recoId: 1,
                    id: 2,
                    phoneNumber: '7052242645'
                }
            ]
        },
        {
            id:2,
            clientName: 'Асан',
            address: 'п КызылТу 1 ул Бейбитшилик д 8 в/а бардовый навес жабылган кульжинский трассага карай Аэропорттын жолынан кишкене отип пораллель кошемен кирип страховканын вывезкасы турады сол кошемен тик журе береди аты жок магазин шыгады солдан онга сол жол бейбитшиликке шыгады ',
            shortAddress: 'Шаңырақ 2, Фанфай 13. Алдында Поликлинка 22 бар.',
            resultName: 'Перенесен',
            categoryId: 1,
            categoryName: 'Золотой',
            recommenderName: 'Айнаш',
            note: 'суббота х/п кор. уакытым жок,жаным деди',
            dateTime: '16.05.2018 20:25',
            phones: [
                {
                    recoId: 2,
                    id: 3,
                    phoneNumber: '7052242645'
                },
                {
                    recoId: 2,
                    id: 4,
                    phoneNumber: '7052242645'
                }
            ]
        },
        {
            id:3,
            clientName: 'Ольга',
            resultName: 'Отменен',
            address:'Сапарбаев кошесине тусип тура журе бересин алдыннан 257 мектеп шыгады  сол мектепке карама карсы Ербол Айгерим деген магазиндер бар.Сол еки магазиннин ортасындагы кошеге киресин сол кезде звонда алдыннан кутип алады.Жанадан салынган уйлер болгандыктан номери жокю',
            shortAddress: 'Сапарбаев кошесине тусип тура журе бересин алдыннан 257 мектеп шыгады  сол мектепке карама ',
            categoryId: 2,
            categoryName: 'Серебро',
            recommenderName: 'Димаш',
            note: 'Талдықорғанға кетіп жатыр. Жексенбі хбрл, Р ны айту керек',
            dateTime: '16.05.2018 20:30',
            phones: [
                {
                    recoId: 3,
                    id: 5,
                    phoneNumber: '7052242645'
                },
                {
                    recoId: 3,
                    id: 6,
                    phoneNumber: '7052242645'
                }
            ]
        },
        {
            id:4,
            clientName: 'Асемгуль',
            resultName: 'Пройден',
            categoryId: 3,
            categoryName: 'Бронза',
            recommenderName: 'Димаш',
            shortAddress: 'Шаңырақ 2, Фанфай 13. Алдында Поликлинка 22 бар.',
            note: 'дмео корген,бизге кымбат алмаймыз,керек болса звондаймыз озимиз',
            dateTime: '16.05.2018 20:30',
            phones: [
                {
                    recoId: 4,
                    id: 7,
                    phoneNumber: '7052242645'
                }
            ]
        },
        {
            id:5,
            clientName: 'Аягоз',
            resultName: 'Продан',
            categoryId: 2,
            categoryName: 'Серебро',
            shortAddress: 'Шаңырақ 2, Фанфай 13. Алдында Поликлинка 22 бар.',
            recommenderName: 'Димаш',
            dateTime: '16.05.2018 20:30',
            phones: [
                {
                    recoId: 5,
                    id: 8,
                    phoneNumber: '7052242645'
                }
            ]
        },
        ,
        {
            id:6,
            clientName: 'Сабира',
            resultName: 'Мини контракт',
            categoryId: 4,
            categoryName: 'Железо',
            recommenderName: 'Димаш',
            shortAddress: 'Шаңырақ 2, Фанфай 13. Алдында Поликлинка 22 бар.',
            dateTime: '16.05.2018 20:30',
            phones: [
                {
                    recoId: 6,
                    id: 9,
                    phoneNumber: '7052242645'
                }
            ]
        },

        {
            id:7,
            clientName: 'Аты ең ұзын клиент',
            resultName: 'Мини контракт',
            categoryId: 4,
            categoryName: 'Железо',
            recommenderName: 'Димаш',
            shortAddress: 'Шаңырақ 2, Фанфай 13. Алдында Поликлинка 22 бар.',
            dateTime: '16.05.2018 20:30',
            phones: [
                {
                    recoId: 6,
                    id: 9,
                    phoneNumber: '7052242645'
                }
            ]
        }
    ],

    MENU_BY_DATE: [
        {
            id:1,
            clientName: 'Байтұрсын Сәуле',
            recommenderName: 'Бауыржан Иманкулов',
            note: 'Джармешов Дәулеттің демосы',
            address: 'Шаңырақ 2, Фанфай 13. Алдында Поликлинка 22 бар.',
            shortAddress: 'Шаңырақ 2, Фанфай 13. Алдында Поликлинка 22 бар.',
            categoryId: 1,
            categoryName: 'Золотой',
            resultName: 'Пройден',
            dateTime: '16.05.2018 20:30',
            phones: [
                {
                    recoId: 1,
                    id: 1,
                    phoneNumber: '7052242645'
                },
                {
                    recoId: 1,
                    id: 2,
                    phoneNumber: '7052242645'
                }
            ]
        },
        {
            id:2,
            clientName: 'Серік',
            address: 'п КызылТу 1 ул Бейбитшилик д 8 в/а бардовый навес жабылган кульжинский трассага карай Аэропорттын жолынан кишкене отип пораллель кошемен кирип страховканын вывезкасы турады сол кошемен тик журе береди аты жок магазин шыгады солдан онга сол жол бейбитшиликке шыгады ',
            shortAddress: 'Шаңырақ 2, Фанфай 13. Алдында Поликлинка 22 бар.',
            resultName: 'Перенесен',
            categoryId: 1,
            categoryName: 'Золотой',
            recommenderName: 'Айнаш',
            note: 'суббота х/п кор. уакытым жок,жаным деди',
            dateTime: '16.05.2018 20:25',
            phones: [
                {
                    recoId: 2,
                    id: 3,
                    phoneNumber: '7052242645'
                },
                {
                    recoId: 2,
                    id: 4,
                    phoneNumber: '7052242645'
                }
            ]
        },
        {
            id:3,
            clientName: 'Қарлығаш Бегалы',
            resultName: 'Отменен',
            address:'Сапарбаев кошесине тусип тура журе бересин алдыннан 257 мектеп шыгады  сол мектепке карама карсы Ербол Айгерим деген магазиндер бар.Сол еки магазиннин ортасындагы кошеге киресин сол кезде звонда алдыннан кутип алады.Жанадан салынган уйлер болгандыктан номери жокю',
            shortAddress: 'Сапарбаев кошесине тусип тура журе бересин алдыннан 257 мектеп шыгады  сол мектепке карама ',
            categoryId: 2,
            categoryName: 'Серебро',
            recommenderName: 'Димаш',
            note: 'Талдықорғанға кетіп жатыр. Жексенбі хбрл, Р ны айту керек',
            dateTime: '16.05.2018 20:30',
            phones: [
                {
                    recoId: 3,
                    id: 5,
                    phoneNumber: '7052242645'
                },
                {
                    recoId: 3,
                    id: 6,
                    phoneNumber: '7052242645'
                }
            ]
        },
        {
            id:4,
            clientName: 'Дастан',
            resultName: 'Пройден',
            categoryId: 3,
            categoryName: 'Бронза',
            recommenderName: 'Димаш',
            shortAddress: 'Шаңырақ 2, Фанфай 13. Алдында Поликлинка 22 бар.',
            note: 'дмео корген,бизге кымбат алмаймыз,керек болса звондаймыз озимиз',
            dateTime: '16.05.2018 20:30',
            phones: [
                {
                    recoId: 4,
                    id: 7,
                    phoneNumber: '7052242645'
                }
            ]
        },
        {
            id:5,
            clientName: 'By Date Client 5',
            resultName: 'Продан',
            categoryId: 2,
            categoryName: 'Серебро',
            shortAddress: 'Шаңырақ 2, Фанфай 13. Алдында Поликлинка 22 бар.',
            recommenderName: 'Димаш',
            dateTime: '16.05.2018 20:30',
            phones: [
                {
                    recoId: 5,
                    id: 8,
                    phoneNumber: '7052242645'
                }
            ]
        },
        ,
        {
            id:6,
            clientName: 'By Date Client 6',
            resultName: 'Мини контракт',
            categoryId: 4,
            categoryName: 'Железо',
            recommenderName: 'Димаш',
            shortAddress: 'Шаңырақ 2, Фанфай 13. Алдында Поликлинка 22 бар.',
            dateTime: '16.05.2018 20:30',
            phones: [
                {
                    recoId: 6,
                    id: 9,
                    phoneNumber: '7052242645'
                }
            ]
        },

        {
            id:7,
            clientName: 'By Date Client 7',
            resultName: 'Мини контракт',
            categoryId: 4,
            categoryName: 'Железо',
            recommenderName: 'Димаш',
            shortAddress: 'Шаңырақ 2, Фанфай 13. Алдында Поликлинка 22 бар.',
            dateTime: '16.05.2018 20:30',
            phones: [
                {
                    recoId: 6,
                    id: 9,
                    phoneNumber: '7052242645'
                }
            ]
        }
    ]
}

//Keys For Loaders