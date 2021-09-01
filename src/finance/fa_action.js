import { doGet, doPost } from '../utils/apiActions';
import {
    handleError,
    notify,
} from '../general/notification/notification_action';
import { modifyLoader } from '../general/loader/loader_action';

export const CHANGE_FA_BKPF = 'CHANGE_FA_BKPF';
export const CLEAR_FA_BKPF = 'CLEAR_FA_BKPF';
export const FETCH_CASHBANKHKONTS_BY_BRANCH = 'FETCH_CASHBANKHKONTS_BY_BRANCH';
export const CLEAR_CASHBANKHKONTS_BY_BRANCH = 'CLEAR_CASHBANKHKONTS_BY_BRANCH';
export const FETCH_EXPENSEHKONTS_BY_BUKRS = 'FETCH_EXPENSEHKONTS_BY_BUKRS';
export const CLEAR_EXPENSEHKONTS_BY_BUKRS = 'CLEAR_EXPENSEHKONTS_BY_BUKRS';
export const FETCH_WORK_ACCOUNTABLE_LIST = 'FETCH_WORK_ACCOUNTABLE_LIST';
export const CLEAR_WORK_ACCOUNTABLE_LIST = 'CLEAR_WORK_ACCOUNTABLE_LIST';

export const FETCH_DYNOBJ_FI = 'FETCH_DYNOBJ_FI';
export const CHANGE_DYNOBJ_FI = 'CHANGE_DYNOBJ_FI';
export const CLEAR_DYNOBJ_FI = 'CLEAR_DYNOBJ_FI';

export const FETCH_FOEA_OUTPUTTABLE = 'FETCH_FOEA_OUTPUTTABLE';
export const FETCH_FOEA_DETAILTABLE = 'FETCH_FOEA_DETAILTABLE';
export const CHANGE_FOEA_SEARCH_PARAMS = 'CHANGE_FOEA_SEARCH_PARAMS';
export const CLEAR_FOEA = 'CLEAR_FOEA';
export const CLEAR_FOEA_OUTPUTTABLE = 'CLEAR_FOEA_OUTPUTTABLE';

export function fetchCashBankHkontsByBranch(a_bukrs, a_brnch) {
    return function(dispatch) {
        doGet(`core/finance/mainoperation/fetchCashBankHkontsByBranch`, {
            bukrs: a_bukrs,
            brnch: a_brnch,
        })
            .then(({ data }) => {
                dispatch({
                    type: FETCH_CASHBANKHKONTS_BY_BRANCH,
                    hkontOptions: data.hkontOptions,
                });
            })
            .catch(error => {
                handleError(error, dispatch);
            });
    };
}
export function fetchExpenseHkontsByBukrs(a_bukrs) {
    return function(dispatch) {
        doGet(`core/finance/mainoperation/fetchExpenseHkontsByBukrs`, {
            bukrs: a_bukrs,
        })
            .then(({ data }) => {
                dispatch({
                    type: FETCH_EXPENSEHKONTS_BY_BUKRS,
                    hkontOptions: data.hkontOptions,
                });
            })
            .catch(error => {
                handleError(error, dispatch);
            });
    };
}

export function fetchIncomeHkontsByBukrs(a_bukrs) {
    return function(dispatch) {
        doGet(`core/finance/mainoperation/fetchIncomeHkontsByBukrs`, {
            bukrs: a_bukrs,
        })
            .then(({ data }) => {
                dispatch({
                    type: FETCH_EXPENSEHKONTS_BY_BUKRS,
                    hkontOptions: data.hkontOptions,
                });
            })
            .catch(error => {
                handleError(error, dispatch);
            });
    };
}

export function changefaBkpf(bkpf) {
    const obj = {
        type: CHANGE_FA_BKPF,
        bkpf,
    };
    return obj;
}
export function clearfaBkpf() {
    const obj = {
        type: CLEAR_FA_BKPF,
    };
    return obj;
}
export function changeDynObj(a_obj) {
    const obj = {
        type: CHANGE_DYNOBJ_FI,
        data: a_obj,
    };
    return obj;
}
export function clearDynObj() {
    const obj = {
        type: CLEAR_DYNOBJ_FI,
    };
    return obj;
}

export function clearAnyObject(a_const) {
    const obj = {
        type: a_const,
    };
    return obj;
}
export function fetchDynamicFAGM(url, params) {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doGet(url, {
            ...params,
        })
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type: FETCH_DYNOBJ_FI,
                    data,
                });
            })
            .catch(error => {
                handleError(error, dispatch);
                dispatch(modifyLoader(false));
            });
    };
}

// FMCP/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function fetchFMCP(a_zregOrConNum) {
    return function(dispatch) {
        dispatch(modifyLoader(true));
        doGet(`core/finance/mainoperation/fmcp/fetch`, {
            zregOrConNum: a_zregOrConNum,
        })
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type: FETCH_DYNOBJ_FI,
                    data,
                });
            })
            .catch(error => {
                handleError(error, dispatch);
                dispatch(modifyLoader(false));
            });
    };
}

export function saveFMCP(a_contract) {
    const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
    const language = localStorage.getItem('language');
    return function(dispatch) {
        dispatch(modifyLoader(true));

        doPost(`core/finance/mainoperation/fmcp/save`, {
            ...a_contract,
        })
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                if (data) {
                    dispatch(
                        notify(
                            'success',
                            errorTable[`104${language}`],
                            errorTable[`101${language}`],
                        ),
                    );
                    dispatch(
                        changeDynObj({
                            zregOrConNum: '',
                            lifnr: null,
                            lifnrName: '',
                            psRows: [],
                            price: 0,
                            paid: 0,
                            waers: '',
                            dealerName: '',
                            collectorName: '',
                            iscontractnumber: false,
                            summa: 0,
                            hkont_d: '',
                        }),
                    );
                    // dispatch(fetchFMCP(a_contract.zregOrConNum));
                } else {
                    dispatch(
                        notify(
                            'info',
                            errorTable[`133${language}`],
                            errorTable[`132${language}`],
                        ),
                    );
                }
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
}
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FCIS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function saveFcis(a_bkpf, a_bseg) {
    const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
    const language = localStorage.getItem('language');
    return function(dispatch) {
        doPost(`core/finance/mainoperation/fcis/save`, {
            bkpf: a_bkpf,
            ...a_bseg,
        })
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                if (data) {
                    dispatch(
                        notify(
                            'success',
                            errorTable[`104${language}`],
                            errorTable[`101${language}`],
                        ),
                    );
                    dispatch(clearfaBkpf());
                    dispatch(changeDynObj({ reset: true }));
                } else {
                    dispatch(
                        notify(
                            'info',
                            errorTable[`133${language}`],
                            errorTable[`132${language}`],
                        ),
                    );
                }
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
}
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FA03-FA02////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function saveFA02(
    a_bukrs,
    a_belnr,
    a_gjahr,
    a_bktxt,
    a_official,
    al_bseg,
) {
    return function(dispatch) {
        doPost(`core/finance/mainoperation/fa02/save`, {
            bukrs: a_bukrs,
            belnr: a_belnr,
            gjahr: a_gjahr,
            bktxt: a_bktxt,
            official: a_official,
            bseg: al_bseg,
        })
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                dispatch(notify(data.type, data.message, data.header));
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
}

export function cancelFA02(a_bukrs, a_belnr, a_gjahr) {
    return function(dispatch) {
        doPost(`core/finance/mainoperation/fa02/cancel`, {
            bukrs: a_bukrs,
            belnr: a_belnr,
            gjahr: a_gjahr,
        })
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                dispatch(notify(data.type, data.message, data.header));

                if (data.result) {
                    const searchParameters = {
                        bukrs: a_bukrs,
                        belnr: a_belnr,
                        gjahr: a_gjahr,
                    };
                    dispatch(fetchFA03(searchParameters));
                }
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
}
export function fetchFA02(a_searchParameters) {
    return function(dispatch) {
        dispatch(clearDynObj());
        doGet(`core/finance/mainoperation/fa02/fetch`, {
            ...a_searchParameters,
        })
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type: FETCH_DYNOBJ_FI,
                    data,
                });
            })
            .catch(error => {
                handleError(error, dispatch);
                dispatch(modifyLoader(false));
            });
    };
}
export function fetchFA03(a_searchParameters) {
    return function(dispatch) {
        dispatch(clearDynObj());
        doGet(`core/finance/mainoperation/fa03/fetch`, {
            ...a_searchParameters,
        })
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                dispatch({
                    type: FETCH_DYNOBJ_FI,
                    data,
                });
            })
            .catch(error => {
                handleError(error, dispatch);
                dispatch(modifyLoader(false));
            });
    };
}
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function saveFiSrcDocs(args, tcode) {
    let url = '';
    if (tcode === 'FACI01') url = `core/finance/mainoperation/faci01/save`;
    else if (tcode === 'FACO01') url = `core/finance/mainoperation/faco01/save`;
    else if (tcode === 'FAICFP2')
        url = `core/finance/mainoperation/faicfp2/save`;
    else if (tcode === 'FAICFP') url = `core/finance/mainoperation/faicfp/save`;

    const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
    const language = localStorage.getItem('language');
    return function(dispatch) {
        doPost(url, {
            ...args,
        })
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                if (data) {
                    dispatch(
                        notify(
                            'success',
                            errorTable[`104${language}`],
                            errorTable[`101${language}`],
                        ),
                    );
                    dispatch(changeDynObj({ reset: true }));
                } else {
                    dispatch(
                        notify(
                            'error',
                            errorTable[`133${language}`],
                            errorTable[`132${language}`],
                        ),
                    );
                }
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
}
///////////////////////////////////////////////////////////////////////
// FAIA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export function fetchFaiaWorkAccList(a_bukrs, a_branch, a_callBackFun) {
    return function(dispatch) {
        doGet(`core/finance/mainoperation/faia/fetchWorkAccountableList`, {
            bukrs: a_bukrs,
            branch: a_branch,
        }).then(({ data }) => {
            a_callBackFun();
            dispatch({
                type: FETCH_WORK_ACCOUNTABLE_LIST,
                data: data.workAccountableList,
            });
        });
    };
}

export function saveFaia(a_bkpf, a_bseg) {
    const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
    const language = localStorage.getItem('language');
    return function(dispatch) {
        doPost(`core/finance/mainoperation/faia/save`, {
            bkpf: a_bkpf,
            ...a_bseg,
        })
            .then(({ data }) => {
                dispatch(modifyLoader(false));
                if (data) {
                    dispatch(
                        notify(
                            'success',
                            errorTable[`104${language}`],
                            errorTable[`101${language}`],
                        ),
                    );
                    dispatch(clearfaBkpf());
                    dispatch(changeDynObj({ reset: true }));
                } else {
                    dispatch(
                        notify(
                            'info',
                            errorTable[`133${language}`],
                            errorTable[`132${language}`],
                        ),
                    );
                }
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
}

export function saveFahrb(a_searchParameters) {
    const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
    const language = localStorage.getItem('language');
    return function(dispatch) {
        doPost(`core/finance/mainoperation/fahrb/save`, {
            ...a_searchParameters,
        })
            .then(({ data }) => {
                dispatch(modifyLoader(false));

                if (data.result) {
                    dispatch(
                        notify(
                            'success',
                            errorTable[`104${language}`],
                            errorTable[`101${language}`],
                        ),
                    );

                    dispatch(modifyLoader(false));
                    dispatch({
                        type: FETCH_DYNOBJ_FI,
                        data,
                    });
                } else {
                    dispatch(
                        notify(
                            'info',
                            errorTable[`133${language}`],
                            errorTable[`132${language}`],
                        ),
                    );
                }
            })
            .catch(error => {
                dispatch(modifyLoader(false));
                handleError(error, dispatch);
            });
    };
}
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function fetchFoeaOutputTableAction(
    params,
    callBackBeforeAxios,
    callBackOnSuccess,
    callBackOnerror,
) {
    const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
    const language = localStorage.getItem('language');
    return function(dispatch) {
        callBackBeforeAxios();
        doGet(`core/finance/other/foea/search`, {
            ...params,
        })
            .then(({ data }) => {
                // console.log('action', data);
                dispatch(modifyLoader(false));
                dispatch({
                    type: FETCH_FOEA_OUTPUTTABLE,
                    data: data.outputTable,
                });
                callBackOnSuccess();
            })
            .catch(error => {
                handleError(error, dispatch);
                dispatch(modifyLoader(false));
                callBackOnerror();
            });
    };
}

export function fetchFoeaDetailTableAction(
    params,
    callBackBeforeAxios,
    callBackOnSuccess,
    callBackOnerror,
) {
    const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
    const language = localStorage.getItem('language');
    return function(dispatch) {
        callBackBeforeAxios();
        doGet(`core/finance/other/foea/searchDetail`, {
            ...params,
        })
            .then(({ data }) => {
                // console.log('action', data);
                dispatch(modifyLoader(false));
                dispatch({
                    type: FETCH_FOEA_DETAILTABLE,
                    data: data.detailTable,
                });
                callBackOnSuccess();
            })
            .catch(error => {
                handleError(error, dispatch);
                dispatch(modifyLoader(false));
                callBackOnerror();
            });
    };
}
export function processSelectedItemsAction(
    body,
    params,
    callBackBeforeAxios,
    callBackOnSuccess,
    callBackOnerror,
) {
    return function(dispatch) {
        const errorTable = JSON.parse(localStorage.getItem('errorTableString'));
        const language = localStorage.getItem('language');
        callBackBeforeAxios();

        doPost(`core/finance/other/foea/process`, body, { ...params })
            .then(({ data }) => {
                // console.log('action', data);
                if (data.result) {
                    dispatch(
                        notify(
                            'success',
                            errorTable[`104${language}`],
                            errorTable[`101${language}`],
                        ),
                    );
                } else {
                    dispatch(
                        notify(
                            'info',
                            errorTable[`133${language}`],
                            errorTable[`132${language}`],
                        ),
                    );
                }
                callBackOnSuccess();
            })
            .catch(error => {
                handleError(error, dispatch);
                callBackOnerror();
            });
    };
}

export function changeFoeaSearchParamsAction(a_obj) {
    const obj = {
        type: CHANGE_FOEA_SEARCH_PARAMS,
        data: a_obj,
    };
    return obj;
}
