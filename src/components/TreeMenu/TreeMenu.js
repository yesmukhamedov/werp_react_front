import React, {Component} from 'react'
import {Treebeard} from 'react-treebeard'
import {Link} from 'react-router';
import {
    Sidebar,
    Segment,
    Button,
    Menu,
    Image,
    Icon,
    Header
} from 'semantic-ui-react'
import Decorators from './Decorators'
import Animations from './Animations'
import Theme from './Theme'
import './TreeMenu.css'

const data = [
    {
        "name": "Финанс",
        "translations": {
            "en": "Finance",
            "ru": "Финанс",
            "tr": "Finans"
        },
        "link": "",
        "leaf": false,
        "children": [
            {
                "name": "Касса/Банк операции",
                "translations": {
                    "en": "Cash/Bank operations",
                    "ru": "Касса/Банк операции",
                    "tr": "Kasa/Bank operasyonlari"
                },
                "link": "",
                "leaf": false,
                "children": [
                    {
                        "name": "Расходы без СФ",
                        "translations": {
                            "en": "Expences Without Inv.",
                            "ru": "Расходы без СФ",
                            "tr": "Alınan Hizmet Faturası Ödemesi"
                        },
                        "link": "/finance/cashbankoperations/fkaaec.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Приходы без СФ",
                        "translations": {
                            "en": "Revenue Without Inv.",
                            "ru": "Приходы без СФ",
                            "tr": "Verilen Hizmet Faturası Tahsilatı"
                        },
                        "link": "/finance/cashbankoperations/fdcio.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Массовый взнос по Дог.",
                        "translations": {
                            "en": "Cash Reciepts Buyers'",
                            "ru": "Массовый взнос по Дог.",
                            "tr": "Toplu Tahsilat Girişi"
                        },
                        "link": "/finance/cashbankoperations/facmassin.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Расходы со СФ",
                        "translations": {
                            "en": "Payments to Contragents",
                            "ru": "Расходы со СФ",
                            "tr": "Kontragentlere Ödemeler"
                        },
                        "link": "/finance/cashbankoperations/faco01.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Приходы со СФ",
                        "translations": {
                            "en": "Cash Receipts From Contragents",
                            "ru": "Приходы со СФ",
                            "tr": "Kontragentlerden Tahsilatlar"
                        },
                        "link": "/finance/cashbankoperations/faci01.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Выдача ЗП",
                        "translations": {
                            "en": "Salary Payments",
                            "ru": "Выдача ЗП",
                            "tr": "Ücret Ödemeleri"
                        },
                        "link": "/finance/cashbankoperations/hrpp.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Подотчет",
                        "translations": {
                            "en": "Work Advances",
                            "ru": "Подотчет",
                            "tr": "İş avansı Ödemesi"
                        },
                        "link": "/finance/cashbankoperations/faia.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Перевод денег на фирму",
                        "translations": {
                            "en": "Fond Transfers to Group Companies",
                            "ru": "Перевод денег на фирму",
                            "tr": "Para transferi - Şirketler arası"
                        },
                        "link": "/finance/cashbankoperations/fdint.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Получение денег от фирмы",
                        "translations": {
                            "en": "Fond Receipts From Group Companies",
                            "ru": "Получение денег от фирмы",
                            "tr": "Para kabulu - Şirketler arası"
                        },
                        "link": "/finance/cashbankoperations/fkint.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Внутренние переводы денег",
                        "translations": {
                            "en": "Fond transfers InCompanies",
                            "ru": "Внутренние переводы денег",
                            "tr": "İç Para Transferi"
                        },
                        "link": "/finance/cashbankoperations/faicfp.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Обмен валют",
                        "translations": {
                            "en": "Currency Exchange",
                            "ru": "Обмен валют",
                            "tr": "Döviz Alım-Satımı"
                        },
                        "link": "/finance/cashbankoperations/faicf.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Пополнение и Снятие Касса/Банк",
                        "translations": {
                            "en": "Cash Withdrawal and Deposit",
                            "ru": "Пополнение и Снятие Касса/Банк",
                            "tr": "Cash Withdrawal and Deposit"
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Продажа запчастей",
                        "translations": {
                            "en": "Part sales",
                            "ru": "Продажа запчастей",
                            "tr": "Yedek parça satışi"
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    }
                ]
            },
            {
                "name": "Другие операции",
                "translations": {
                    "en": "Other operations",
                    "ru": "Другие операции",
                    "tr": "Diğer işlemler"
                },
                "link": "",
                "leaf": false,
                "children": [
                    {
                        "name": "Подтверждение заработной платы",
                        "translations": {
                            "en": "Confirmation of wages",
                            "ru": "Подтверждение заработной платы",
                            "tr": "Ücretlerin Onayı"
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Одобрить расходы",
                        "translations": {
                            "en": "Approve expenses",
                            "ru": "Одобрить расходы",
                            "tr": "Masrafları onaylamak"
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Курсы валют",
                        "translations": {
                            "en": "Currency rate Entry",
                            "ru": "Курсы валют",
                            "tr": "Döviz Kur Girişi"
                        },
                        "link": "/finance/other/facur01.xhtml",
                        "leaf": true,
                        "children": []
                    }
                ]
            },
            {
                "name": "Справочник",
                "translations": {
                    "en": "Reference",
                    "ru": "Справочник",
                    "tr": "Referans"
                },
                "link": "",
                "leaf": false,
                "children": [
                    {
                        "name": "Официальные фирмы",
                        "translations": {
                            "en": "Companies - Official",
                            "ru": "Официальные фирмы",
                            "tr": "Resmi Firmalar"
                        },
                        "link": "/reference/sub_company/List.xhtml",
                        "leaf": true,
                        "children": []
                    }
                ]
            },
            {
                "name": "Отчеты",
                "translations": {
                    "en": "Reports",
                    "ru": "Отчеты",
                    "tr": "Raporlar"
                },
                "link": "",
                "leaf": false,
                "children": [
                    {
                        "name": "Статистика взносщиков",
                        "translations": {
                            "en": "Collectors statistic",
                            "ru": "Статистика взносщиков",
                            "tr": "Tahsilatcilarin İstatistigi"
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Расходы Касса/Банк",
                        "translations": {
                            "en": "Cash/Bank expenses",
                            "ru": "Расходы Касса/Банк",
                            "tr": "Cash/Bank expenses"
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Взносы Касса/Банк",
                        "translations": {
                            "en": "Payment Cash/Bank",
                            "ru": "Взносы Касса/Банк",
                            "tr": "Tahsilat Kasa/Bank"
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Отчет по вознаграждениям",
                        "translations": {
                            "en": "Отчет по вознаграждениям",
                            "ru": "Отчет по вознаграждениям",
                            "tr": "Отчет по вознаграждениям"
                        },
                        "link": "/finance/reports/frep2.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Количество продаж",
                        "translations": {
                            "en": "Sales report",
                            "ru": "Количество продаж",
                            "tr": "Satis adet raporu"
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Отчет Внутр. Переводы",
                        "translations": {
                            "en": "Fundings inside Company",
                            "ru": "Отчет Внутр. Переводы",
                            "tr": "Subeler Arasi Transferler"
                        },
                        "link": "/finance/reports/frep1.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Журнал Кассовых Ордер",
                        "translations": {
                            "en": "Cash Journals",
                            "ru": "Журнал Кассовых Ордер",
                            "tr": "Kasa Ekstresi"
                        },
                        "link": "/finance/reports/rfcoj.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Отчет По Счетам",
                        "translations": {
                            "en": "Account Ledger",
                            "ru": "Отчет По Счетам",
                            "tr": "Cari Hesap ekstresi"
                        },
                        "link": "/finance/reports/faglb03.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Баланс Касса/Банк",
                        "translations": {
                            "en": "Balance Cash/Bank",
                            "ru": "Баланс Касса/Банк",
                            "tr": "Bakiye Kasa/Bank"
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Баланс Сотрудники",
                        "translations": {
                            "en": "Balance Employee",
                            "ru": "Баланс Сотрудники",
                            "tr": "Bakiye Personel"
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Официальные взносы",
                        "translations": {
                            "en": "Official payment",
                            "ru": "Официальные взносы",
                            "tr": "Official payment"
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    }
                ]
            }
        ]
    },
    {
        "name": "Бухгалтерия",
        "translations": {
            "en": "Accounting",
            "ru": "Бухгалтерия",
            "tr": "Muhasebe"
        },
        "link": "",
        "leaf": false,
        "children": [
            {
                "name": "Другие операции",
                "translations": {
                    "en": "Other operations",
                    "ru": "Другие операции",
                    "tr": "Diğer işlemler"
                },
                "link": "",
                "leaf": false,
                "children": [
                    {
                        "name": "Оперция по контрагентам",
                        "translations": {
                            "en": "Customer operations",
                            "ru": "Оперция по контрагентам",
                            "tr": "Kontragent işlemleri"
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Список контрагентов",
                        "translations": {
                            "en": "Customer List",
                            "ru": "Список контрагентов",
                            "tr": "Cari Hesaplar Listesi"
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    }
                ]
            },
            {
                "name": "Справочник",
                "translations": {
                    "en": "Reference",
                    "ru": "Справочник",
                    "tr": "Referans"
                },
                "link": "",
                "leaf": true,
                "children": []
            },
            {
                "name": "Отчеты",
                "translations": {
                    "en": "Reports",
                    "ru": "Отчеты",
                    "tr": "Raporlar"
                },
                "link": "",
                "leaf": false,
                "children": [
                    {
                        "name": "Отчет по счетам (Позиция)",
                        "translations": {
                            "en": "Detailled rapor",
                            "ru": "Отчет по счетам (Позиция)",
                            "tr": "GL account detailed report"
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Балансовый отчет",
                        "translations": {
                            "en": "Balance Sheet",
                            "ru": "Балансовый отчет",
                            "tr": "Bilanço"
                        },
                        "link": "/accounting/reports/rfbal.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Отчет по кредиторкам",
                        "translations": {
                            "en": "Report - Creditors",
                            "ru": "Отчет по кредиторкам",
                            "tr": "Kreditör Raporu"
                        },
                        "link": "/accounting/reports/rfklist.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Отчет по дебиторкам",
                        "translations": {
                            "en": "Report - Debitors",
                            "ru": "Отчет по дебиторкам",
                            "tr": "Alacaklar Raporu"
                        },
                        "link": "/accounting/reports/rfdlist.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Просмотр Фин. Док.",
                        "translations": {
                            "en": "View - FinDocuments",
                            "ru": "Просмотр Фин. Док.",
                            "tr": "Fin Dok Görüntüle"
                        },
                        "link": "/accounting/reports/fa03.xhtml",
                        "leaf": true,
                        "children": []
                    }
                ]
            },
            {
                "name": "Начисление",
                "translations": {
                    "en": "Accruals",
                    "ru": "Начисление",
                    "tr": "Tahakkuk İşlemleri"
                },
                "link": "",
                "leaf": false,
                "children": [
                    {
                        "name": "Изменить Фин. Док.",
                        "translations": {
                            "en": "Updete Fin Doc",
                            "ru": "Изменить Фин. Док.",
                            "tr": "Finansal Dokumanı Değiştir"
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Покупка товара",
                        "translations": {
                            "en": "Invoice - Sellers",
                            "ru": "Покупка товара",
                            "tr": "Mal alim Faturası"
                        },
                        "link": "/accounting/assess/fkage.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Счет-фактура",
                        "translations": {
                            "en": "İnvoice - Service Sellers",
                            "ru": "Счет-фактура",
                            "tr": "Hizmet Faturası"
                        },
                        "link": "/accounting/assess/fkaae.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Начисление ЗП Бонусов",
                        "translations": {
                            "en": "Salary/Wage Accruals",
                            "ru": "Начисление ЗП Бонусов",
                            "tr": "Maaş Bonus Tahakkuku"
                        },
                        "link": "/accounting/assess/hrpl.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Налогообложение",
                        "translations": {
                            "en": "Tax - Accruals",
                            "ru": "Налогообложение",
                            "tr": "Vergi Tahakkuku"
                        },
                        "link": "/accounting/assess/ftaxk.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Скидка от поставщика",
                        "translations": {
                            "en": "Discount from supplier",
                            "ru": "Скидка от поставщика",
                            "tr": "Indirim alinan hizmet Faturasınan "
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    }
                ]
            }
        ]
    },
    {
        "name": "Логистика",
        "translations": {
            "en": "Lojistik",
            "ru": "Логистика",
            "tr": "Logistics"
        },
        "link": "",
        "leaf": false,
        "children": [
            {
                "name": "Движение материалов",
                "translations": {
                    "en": "Goods movement",
                    "ru": "Движение материалов",
                    "tr": "Mal hareketleri"
                },
                "link": "",
                "leaf": false,
                "children": [
                    {
                        "name": "Внешние заявки",
                        "translations": {
                            "en": "Purchase Requests",
                            "ru": "Внешние заявки",
                            "tr": "Dış Talep"
                        },
                        "link": "/logistics/request/out/List.xhtml ",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Внутренние заявки",
                        "translations": {
                            "en": "Material Requests",
                            "ru": "Внутренние заявки",
                            "tr": "İç Talep"
                        },
                        "link": "/request/List.xhtml ",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Заказы",
                        "translations": {
                            "en": "Purchase Order",
                            "ru": "Заказы",
                            "tr": "Dış Sipariş"
                        },
                        "link": "/logistics/order/List.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Оприходования материалов",
                        "translations": {
                            "en": "Warehouse Receipt",
                            "ru": "Оприходования материалов",
                            "tr": "Ambar Mal Girişi"
                        },
                        "link": "/logistics/invoice/posting/List.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Внутренние оприходования",
                        "translations": {
                            "en": "Material Handover - Receipt",
                            "ru": "Внутренние оприходования",
                            "tr": "Firma içi Mal Devri - Giriş"
                        },
                        "link": "/logistics/invoice/posting-in/List.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Отправка материала на другой склад",
                        "translations": {
                            "en": "Material Handover - Sent",
                            "ru": "Отправка материала на другой склад",
                            "tr": "Firma içi Mal Devri - Çıkış"
                        },
                        "link": "/logistics/invoice/send/List.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Списания материалов",
                        "translations": {
                            "en": "Warehouse Outsigned - Wastage/Lost/Sold",
                            "ru": "Списания материалов",
                            "tr": "Ambar Çıkış İşlemi - Fire/kayıp/Satıs"
                        },
                        "link": "/logistics/invoice/writeoff/List.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Подотчет ",
                        "translations": {
                            "en": "Embezzlement",
                            "ru": "Подотчет ",
                            "tr": "Mal Zimmetleme"
                        },
                        "link": "/logistics/invoice/accountability/List.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Возврат материала",
                        "translations": {
                            "en": "Materials Returned",
                            "ru": "Возврат материала",
                            "tr": "Mal İadesi"
                        },
                        "link": "/logistics/invoice/return/List.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Документы на списание",
                        "translations": {
                            "en": "Materials Signout Docs.",
                            "ru": "Документы на списание",
                            "tr": "Mal Çıkış Evrakları"
                        },
                        "link": "/logistics/invoice/writeoff-doc/List.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Списание по потере",
                        "translations": {
                            "en": "Signout Document",
                            "ru": "Списание по потере",
                            "tr": "Kayıp Kayıt işlemi"
                        },
                        "link": "/logistics/invoice/writeoff/loss/List.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Возврат с подотчета",
                        "translations": {
                            "en": "Materıals Returned to Accounts",
                            "ru": "Возврат с подотчета",
                            "tr": "Mal Geri İade"
                        },
                        "link": "/logistics/invoice/accountability/return/List.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Восстановление материалов",
                        "translations": {
                            "en": "",
                            "ru": "Восстановление материалов",
                            "tr": ""
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Обновление аппарата",
                        "translations": {
                            "en": "Update - Goods",
                            "ru": "Обновление аппарата",
                            "tr": "Güncelleme - Mallar"
                        },
                        "link": "/logistics/invoice/writeoff/repair/List.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Ревизия",
                        "translations": {
                            "en": "Warehouse Count",
                            "ru": "Ревизия",
                            "tr": "Depo Sayım"
                        },
                        "link": "/logistics/revision/List.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Резервирования материалов",
                        "translations": {
                            "en": "Reserving Goods",
                            "ru": "Резервирования материалов",
                            "tr": "Ürün Rezerv"
                        },
                        "link": "/logistics/invoice/reservation/List.xhtml",
                        "leaf": true,
                        "children": []
                    }
                ]
            },
            {
                "name": "Отчеты",
                "translations": {
                    "en": "Reports",
                    "ru": "Отчеты",
                    "tr": "Raporlar"
                },
                "link": "",
                "leaf": false,
                "children": [
                    {
                        "name": "Материалы на складах",
                        "translations": {
                            "en": "Warehouse Material Status",
                            "ru": "Материалы на складах",
                            "tr": "Ambar Malzeme Durumu"
                        },
                        "link": "/logistics/werks/matnrList.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Движение материалов",
                        "translations": {
                            "en": "Material Movements",
                            "ru": "Движение материалов",
                            "tr": "Malzeme Hareketleri"
                        },
                        "link": "/reports/logistics/werks/logList.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Заводские цены материалов",
                        "translations": {
                            "en": "Purchase Price List",
                            "ru": "Заводские цены материалов",
                            "tr": "Malzeme Alım Fiyat Listesi"
                        },
                        "link": "/logistics/price/factory/lpfList.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Поиск материала по серийному номеру",
                        "translations": {
                            "en": "Search Material by Serial No",
                            "ru": "Поиск материала по серийному номеру",
                            "tr": "Malzeme Arama - Seri No ile"
                        },
                        "link": "/logistics/reports/rep1.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Материалы в подотчете",
                        "translations": {
                            "en": "Materials to Contragents Acc.",
                            "ru": "Материалы в подотчете",
                            "tr": "C/H a Malzeme devri"
                        },
                        "link": "/logistics/invoice/accountability/Report.xhtml?i=2",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Отчет о списанных материалов",
                        "translations": {
                            "en": "Report on Discarded Materials",
                            "ru": "Отчет о списанных материалов",
                            "tr": "Depo Çıkışları Raporu"
                        },
                        "link": "/reports/logistics/WrittenOffMaterials.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Отчет о материалов в подотчете",
                        "translations": {
                            "en": "Report on Accountable Goods",
                            "ru": "Отчет о материалов в подотчете",
                            "tr": "Depoya Ürün İadesi Raporu"
                        },
                        "link": "/reports/logistics/AccountabilityMaterials.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Движение подотчетных материалов",
                        "translations": {
                            "en": "Movement of Accountable Goods",
                            "ru": "Движение подотчетных материалов",
                            "tr": "Depo iade edilen mallar Hareketleri"
                        },
                        "link": "/reports/logistics/Report3.xhtml",
                        "leaf": true,
                        "children": []
                    }
                ]
            },
            {
                "name": "Справочники",
                "translations": {
                    "en": "References",
                    "ru": "Справочники",
                    "tr": "Referans"
                },
                "link": "",
                "leaf": false,
                "children": [
                    {
                        "name": "Склады",
                        "translations": {
                            "en": "Warehouses",
                            "ru": "Склады",
                            "tr": "Depolar"
                        },
                        "link": "/reference/werks/List.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Каталог товаров",
                        "translations": {
                            "en": "Materials Book",
                            "ru": "Каталог товаров",
                            "tr": "Mal Katalogu"
                        },
                        "link": "/reference/matnr/List.xhtml",
                        "leaf": true,
                        "children": []
                    }
                ]
            }
        ]
    },
    {
        "name": "HR",
        "translations": {
            "en": "HR",
            "ru": "HR",
            "tr": "HR"
        },
        "link": "",
        "leaf": false,
        "children": [
            {
                "name": "Операции",
                "translations": {
                    "en": "Operations",
                    "ru": "Операции",
                    "tr": "İşlemler"
                },
                "link": "",
                "leaf": false,
                "children": [
                    {
                        "name": "Сотрудники",
                        "translations": {
                            "en": "Employees",
                            "ru": "Сотрудники",
                            "tr": "Personel Kartları"
                        },
                        "link": "/hr/staff/List.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Новый бонус",
                        "translations": {
                            "en": "New bonus",
                            "ru": "Новый бонус",
                            "tr": "Yeni Bonus"
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Просмотр бонуса",
                        "translations": {
                            "en": "View bonus",
                            "ru": "Просмотр бонуса",
                            "tr": "Bonusu görüntüle"
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Редактирование бонуса",
                        "translations": {
                            "en": "Edit bonus",
                            "ru": "Редактирование бонуса",
                            "tr": "Bonusu değiştir"
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Иерархия",
                        "translations": {
                            "en": "Hierarchy",
                            "ru": "Иерархия",
                            "tr": "Hiyerarşi"
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Заявки о приеме на работу",
                        "translations": {
                            "en": "Job Application Form",
                            "ru": "Заявки о приеме на работу",
                            "tr": "İş Başvuru Formu"
                        },
                        "link": "/hr/document/recruitment/List.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Заявки о переводе",
                        "translations": {
                            "en": "Change Request of Salary/Position/Place",
                            "ru": "Заявки о переводе",
                            "tr": "Personel Maaş/Görev/Yer Değişimi Talebi"
                        },
                        "link": "/hr/doc/transfer/List.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Заявки обу увольнении",
                        "translations": {
                            "en": "Request of Personel Leave",
                            "ru": "Заявки обу увольнении",
                            "tr": "Personel Çıkış Talebi"
                        },
                        "link": "/hr/doc/dismiss/List.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Все документы HR",
                        "translations": {
                            "en": "All Documents - HR",
                            "ru": "Все документы HR",
                            "tr": "Tüm Belgeler - İK"
                        },
                        "link": "/hr/doc/List.xhtml",
                        "leaf": true,
                        "children": []
                    }
                ]
            },
            {
                "name": "Отчеты",
                "translations": {
                    "en": "Reports",
                    "ru": "Отчеты",
                    "tr": "Raporlar"
                },
                "link": "",
                "leaf": false,
                "children": [
                    {
                        "name": "Список должностей",
                        "translations": {
                            "en": "Salary list",
                            "ru": "Список должностей",
                            "tr": "Personel Ünvan listesi"
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Архив иерархии",
                        "translations": {
                            "en": "Hierarchy Archive",
                            "ru": "Архив иерархии",
                            "tr": "Hiyerarşi arşivi"
                        },
                        "link": "/hr/pyramid/hrp04.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Список уволенных",
                        "translations": {
                            "en": "Lıst of the Fired Workers ",
                            "ru": "Список уволенных",
                            "tr": "Işten çıkarılanlar"
                        },
                        "link": "/hr/staff/List.xhtml?dismissed=1",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Роли у пользователей",
                        "translations": {
                            "en": "Roles of Users",
                            "ru": "Роли у пользователей",
                            "tr": "Kullanıcı Rolleri"
                        },
                        "link": "/reports/hr/Report1.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Оклады сотрудников",
                        "translations": {
                            "en": "Salary (Basic) of Personel",
                            "ru": "Оклады сотрудников",
                            "tr": "Çalışanlar (Baz) Maaşlar"
                        },
                        "link": "/reports/hr/Report2.xhtml",
                        "leaf": true,
                        "children": []
                    }
                ]
            },
            {
                "name": "Справочники",
                "translations": {
                    "en": "Reference",
                    "ru": "Справочники",
                    "tr": "Yardım"
                },
                "link": "",
                "leaf": false,
                "children": [
                    {
                        "name": "Списо областей",
                        "translations": {
                            "en": "List of the Regions",
                            "ru": "Списо областей",
                            "tr": "Bölgeler Listesi"
                        },
                        "link": "/reference/state/List.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Список городов",
                        "translations": {
                            "en": "List of the Cities",
                            "ru": "Список городов",
                            "tr": "Şehir Listesi"
                        },
                        "link": "/reference/city/List.xhtml",
                        "leaf": true,
                        "children": []
                    }
                ]
            }
        ]
    },
    {
        "name": "Маркетинг",
        "translations": {
            "en": "Marketing",
            "ru": "Маркетинг",
            "tr": "Marketing"
        },
        "link": "",
        "leaf": false,
        "children": [
            {
                "name": "Операции",
                "translations": {
                    "en": "Operations",
                    "ru": "Операции",
                    "tr": "İşlemler"
                },
                "link": "",
                "leaf": false,
                "children": [
                    {
                        "name": "Новый договор продажи",
                        "translations": {
                            "en": "Create Sales Contract",
                            "ru": "Новый договор продажи",
                            "tr": "Satış Sözleşmesi Girişi"
                        },
                        "link": "/dms/contract/dmsc01.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Расторжение договора и подтверждение",
                        "translations": {
                            "en": "Contract cancellation and confirmation",
                            "ru": "Расторжение договора и подтверждение",
                            "tr": " Sözleşme iptali ve Onaylama"
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Промо-акции",
                        "translations": {
                            "en": "Promotions",
                            "ru": "Промо-акции",
                            "tr": "Promosyonlar"
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Список демо",
                        "translations": {
                            "en": "Demo list",
                            "ru": "Список демо",
                            "tr": "Demo listesi"
                        },
                        "link": "/dms/demo/dmsd01.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Одобрение уцененных товаров",
                        "translations": {
                            "en": "Contracts Waiting for Approval",
                            "ru": "Одобрение уцененных товаров",
                            "tr": "Onaylama beklentideki Sozlesmeler"
                        },
                        "link": "/dms/contract/dmscrepay.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Договор на сервис",
                        "translations": {
                            "en": "Service Contract",
                            "ru": "Договор на сервис",
                            "tr": "Servis Sozlesme"
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Универсальный договор",
                        "translations": {
                            "en": "Universal Pictures",
                            "ru": "Универсальный договор",
                            "tr": "Kainat sozlesmesi"
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    }
                ]
            },
            {
                "name": "Отчеты",
                "translations": {
                    "en": "Reports",
                    "ru": "Отчеты",
                    "tr": "Raporlar"
                },
                "link": "",
                "leaf": false,
                "children": [
                    {
                        "name": "Список Договоров",
                        "translations": {
                            "en": "Contract List",
                            "ru": "Список Договоров",
                            "tr": "Sözleşme Listesi"
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "План ежемесячных взносов",
                        "translations": {
                            "en": "Monthly Payment Plan",
                            "ru": "План ежемесячных взносов",
                            "tr": "Tahsilat Planı"
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Список Демонстраций",
                        "translations": {
                            "en": "Demo List",
                            "ru": "Список Демонстраций",
                            "tr": "Demolar listesi"
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Отчет продаж",
                        "translations": {
                            "en": "Sales Report",
                            "ru": "Отчет продаж",
                            "tr": "Satis raporu"
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Отчет о демо",
                        "translations": {
                            "en": "",
                            "ru": "Отчет о демо",
                            "tr": ""
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Диаграмма",
                        "translations": {
                            "en": "",
                            "ru": "Диаграмма",
                            "tr": ""
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    }
                ]
            },
            {
                "name": "Другие операции",
                "translations": {
                    "en": "Other operations",
                    "ru": "Другие операции",
                    "tr": "Diğer işlemler"
                },
                "link": "",
                "leaf": false,
                "children": [
                    {
                        "name": "Ценообразование",
                        "translations": {
                            "en": "Pricing",
                            "ru": "Ценообразование",
                            "tr": "Fiyatlandırma"
                        },
                        "link": "/logistics/price/List.xhtml",
                        "leaf": true,
                        "children": []
                    }
                ]
            }
        ]
    },
    {
        "name": "Сервис",
        "translations": {
            "en": "Servis",
            "ru": "Сервис",
            "tr": "Servis"
        },
        "link": "",
        "leaf": false,
        "children": [
            {
                "name": "Сервис Отчеты",
                "translations": {
                    "en": "Reports",
                    "ru": "Сервис Отчеты",
                    "tr": "Raporlar"
                },
                "link": "",
                "leaf": false,
                "children": [
                    {
                        "name": "Просмотр Сервис Пакета",
                        "translations": {
                            "en": "View Service Packet",
                            "ru": "Просмотр Сервис Пакета",
                            "tr": "servis Paketi Görüntüleme"
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Список замены фильтров",
                        "translations": {
                            "en": "Filter Change Schedule",
                            "ru": "Список замены фильтров",
                            "tr": "Filtre değişim listesi"
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Просмотр Сервиса",
                        "translations": {
                            "en": "View Service",
                            "ru": "Просмотр Сервиса",
                            "tr": "Servis İşlemi Görüntüleme"
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Список Сервисов",
                        "translations": {
                            "en": "Service List",
                            "ru": "Список Сервисов",
                            "tr": "Servis Listesi"
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Список профилактики Уборочной Системы",
                        "translations": {
                            "en": "Prevention List fo VC",
                            "ru": "Список профилактики Уборочной Системы",
                            "tr": "Temizlik Robotu önleme listesi"
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Отчет заявок",
                        "translations": {
                            "en": "Applications Report",
                            "ru": "Отчет заявок",
                            "tr": "Uygulamalar Raporu"
                        },
                        "link": "/service/applications/salist.xhtml",
                        "leaf": true,
                        "children": []
                    }
                ]
            },
            {
                "name": "Сервис Операции",
                "translations": {
                    "en": "Service Operations",
                    "ru": "Сервис Операции",
                    "tr": "Servis İşlemleri"
                },
                "link": "",
                "leaf": false,
                "children": [
                    {
                        "name": "Новый Сервис Пакет",
                        "translations": {
                            "en": "New Service Packet",
                            "ru": "Новый Сервис Пакет",
                            "tr": "Yeni servis Paketi"
                        },
                        "link": "/service/packets/spnew.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Редактирование Сервис Пакета",
                        "translations": {
                            "en": "Edit Service Packet",
                            "ru": "Редактирование Сервис Пакета",
                            "tr": "servis Paketi Değiştirme"
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Заявки на сервис",
                        "translations": {
                            "en": "Service Request List",
                            "ru": "Заявки на сервис",
                            "tr": "Servis Talep Listesi"
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Редактирование Сервиса",
                        "translations": {
                            "en": "Edit Service",
                            "ru": "Редактирование Сервиса",
                            "tr": "Servis Güncelle"
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Новый сервис",
                        "translations": {
                            "en": "New Service",
                            "ru": "Новый сервис",
                            "tr": "Yeni Servis"
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    }
                ]
            }
        ]
    },
    {
        "name": "Администрирование",
        "translations": {
            "en": "Administration",
            "ru": "Администрирование",
            "tr": "Yönetim"
        },
        "link": "",
        "leaf": false,
        "children": [
            {
                "name": "Транзакции",
                "translations": {
                    "en": "Transactions",
                    "ru": "Транзакции",
                    "tr": "İşlemler"
                },
                "link": "/dit/transaction/List.xhtml",
                "leaf": true,
                "children": []
            },
            {
                "name": "Список меню",
                "translations": {
                    "en": "Menu list",
                    "ru": "Список меню",
                    "tr": "Menü Listesi"
                },
                "link": "/dit/menu/List.xhtml",
                "leaf": true,
                "children": []
            },
            {
                "name": "Список ролей",
                "translations": {
                    "en": "Role list",
                    "ru": "Список ролей",
                    "tr": "Roller Listesi"
                },
                "link": "/dit/role/List.xhtml",
                "leaf": true,
                "children": []
            },
            {
                "name": "Пользователи системы",
                "translations": {
                    "en": "System users",
                    "ru": "Пользователи системы",
                    "tr": "Sistem Kullanıcıları"
                },
                "link": "/dit/user/List.xhtml",
                "leaf": true,
                "children": []
            },
            {
                "name": "Журнал событии",
                "translations": {
                    "en": "Event logs",
                    "ru": "Журнал событии",
                    "tr": "Olay Listesi"
                },
                "link": "/dit/eventlog/List.xhtml",
                "leaf": true,
                "children": []
            },
            {
                "name": "Загрузка отчетов",
                "translations": {
                    "en": "Load reports",
                    "ru": "Загрузка отчетов",
                    "tr": "Load reports"
                },
                "link": "",
                "leaf": true,
                "children": []
            }
        ]
    },
    {
        "name": "Отдел аналитики и методики",
        "translations": {
            "en": "Analytics and Methodics Department",
            "ru": "Отдел аналитики и методики",
            "tr": "Analiz ve Metod Departmanı"
        },
        "link": "",
        "leaf": false,
        "children": [
            {
                "name": "Отчеты",
                "translations": {
                    "en": "Reports",
                    "ru": "Отчеты",
                    "tr": "Raporlar"
                },
                "link": "",
                "leaf": false,
                "children": [
                    {
                        "name": "Отчет о днях рождениях клиентов",
                        "translations": {
                            "en": "Report of Clients' Birthdays",
                            "ru": "Отчет о днях рождениях клиентов",
                            "tr": "Müşteri Doğum Günleri Raporu"
                        },
                        "link": "/reports/analytics/Report1.xhtml",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Отчет о демо",
                        "translations": {
                            "en": "Report of Demo",
                            "ru": "Отчет о демо",
                            "tr": "Demo Raporu"
                        },
                        "link": "/reports/training/Report1.xhtml",
                        "leaf": true,
                        "children": []
                    }
                ]
            }
        ]
    },
    {
        "name": "CRM",
        "translations": {
            "en": "",
            "ru": "CRM",
            "tr": ""
        },
        "link": "",
        "leaf": false,
        "children": [
            {
                "name": "Операции",
                "translations": {
                    "en": "",
                    "ru": "Операции",
                    "tr": ""
                },
                "link": "",
                "leaf": false,
                "children": [
                    {
                        "name": "Текущие рекомендации",
                        "translations": {
                            "en": "",
                            "ru": "Текущие рекомендации",
                            "tr": ""
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Текущие демо",
                        "translations": {
                            "en": "",
                            "ru": "Текущие демо",
                            "tr": ""
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Текущие визиты",
                        "translations": {
                            "en": "",
                            "ru": "Текущие визиты",
                            "tr": ""
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    }
                ]
            },
            {
                "name": "Отчеты",
                "translations": {
                    "en": "",
                    "ru": "Отчеты",
                    "tr": ""
                },
                "link": "",
                "leaf": false,
                "children": [
                    {
                        "name": "Отчет по стандартам",
                        "translations": {
                            "en": "",
                            "ru": "Отчет по стандартам",
                            "tr": ""
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    }
                ]
            },
            {
                "name": "Справочники",
                "translations": {
                    "en": "",
                    "ru": "Справочники",
                    "tr": ""
                },
                "link": "",
                "leaf": false,
                "children": [
                    {
                        "name": "Список причин",
                        "translations": {
                            "en": "",
                            "ru": "Список причин",
                            "tr": ""
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    },
                    {
                        "name": "Список родственных отношении",
                        "translations": {
                            "en": "",
                            "ru": "Список родственных отношении",
                            "tr": ""
                        },
                        "link": "",
                        "leaf": true,
                        "children": []
                    }
                ]
            },
            {
                "name": "Админ",
                "translations": {
                    "en": "",
                    "ru": "Админ",
                    "tr": ""
                },
                "link": "",
                "leaf": true,
                "children": []
            }
        ]
    }
]

export default class TreeMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.onToggle = this
            .onToggle
            .bind(this)
    }

    onToggle(node, toggled) {
        if (this.state.cursor) {
            this.state.cursor.active = false;
        }

        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }

        this.setState({cursor: node});

        if (node && node.leaf) {
            console.log("node", node)
            console.log("link", node.link)
            console.log("isLeaf", node.leaf)
        }

    }

    render() {
        return (
            <div className="tree-menu">
                <Treebeard
                    data={data}
                    style={Theme}
                    animations={Animations}
                    decorators={Decorators}
                    onToggle={this.onToggle} /> 
            </div>
            
        )
    }
}