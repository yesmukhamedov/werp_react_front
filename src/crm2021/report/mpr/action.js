import { handleError } from '../../../general/notification/notification_action';
import { doGet } from '../../../utils/apiActions';

export const CLEAR_ALL = 'CLEAR_ALL';
export const FETCH_HIGHEST_DEMO_ACHIEVERS = 'FETCH_HIGHEST_DEMO_ACHIEVERS';
export const FETCH_HIGHEST_DEMO_PRODUCERS = 'FETCH_HIGHEST_DEMO_PRODUCERS';
export const FETCH_HIGHEST_SALES_ACHIEVERS = 'FETCH_HIGHEST_SALES_ACHIEVERS';
export const FETCH_SALES_OFFICES = 'FETCH_SALES_OFFICES';
export const FETCH_SALES_MANAGER = 'FETCH_SALES_MANAGER';
export const FETCH_BUSINESS_AREAS = 'FETCH_BUSINESS_AREAS';

export function clearAll() {
    return function(dispatch) {
        dispatch({
            type: CLEAR_ALL,
        });
    };
}

export const fetchHighestDemoAchievers = (params, loadingCompleted) => {
    return dispatch => {
        doGet(`crm2/mpr-report/highest-demo-achievers`, params)
            .then(({ data }) => {
                if (params.toExcel) {
                    downloadExcelFile('HighesDemoAchievers', data);
                } else {
                    dispatch({
                        type: FETCH_HIGHEST_DEMO_ACHIEVERS,
                        payload: data,
                    });
                }
                loadingCompleted();
            })
            .catch(error => {
                handleError(error, dispatch);
                loadingCompleted();
            });
    };
};

export const fetchHighestDemoProducers = (params, loadingCompleted) => {
    return dispatch => {
        doGet(`crm2/mpr-report/highest-demo-producers`, params)
            .then(({ data }) => {
                if (params.toExcel) {
                    downloadExcelFile('HighesDemoProducers', data);
                } else {
                    dispatch({
                        type: FETCH_HIGHEST_DEMO_PRODUCERS,
                        payload: data,
                    });
                }
                loadingCompleted();
            })
            .catch(error => {
                handleError(error, dispatch);
                loadingCompleted();
            });
    };
};

export const fetchHighestSalesAchievers = (params, loadingCompleted) => {
    return dispatch => {
        doGet(`crm2/mpr-report/highest-sales-achievers`, params)
            .then(({ data }) => {
                if (params.toExcel) {
                    downloadExcelFile('HighestSalesAchievers', data);
                } else {
                    dispatch({
                        type: FETCH_HIGHEST_SALES_ACHIEVERS,
                        payload: data,
                    });
                }
                loadingCompleted();
            })
            .catch(error => {
                handleError(error, dispatch);
                loadingCompleted();
            });
    };
};

export const fetchSalesOffices = (params, loadingCompleted) => {
    return dispatch => {
        doGet(`crm2/mpr-report/sales-branches`, params)
            .then(({ data }) => {
                if (params.toExcel) {
                    downloadExcelFile('SalesOffices', data);
                } else {
                    dispatch({
                        type: FETCH_SALES_OFFICES,
                        payload: data,
                    });
                }
                loadingCompleted();
            })
            .catch(error => {
                handleError(error, dispatch);
                loadingCompleted();
            });
    };
};

export const fetchSalesManager = (params, loadingCompleted) => {
    return dispatch => {
        doGet(`crm2/mpr-report/sales-managers`, params)
            .then(({ data }) => {
                if (params.toExcel) {
                    downloadExcelFile('SalesManager', data);
                } else {
                    dispatch({
                        type: FETCH_SALES_MANAGER,
                        payload: data,
                    });
                }
                loadingCompleted();
            })
            .catch(error => {
                handleError(error, dispatch);
                loadingCompleted();
            });
    };
};

export const fetchBusinessAreas = () => {
    return dispatch => {
        doGet(`core/reference/business-areas`)
            .then(({ data }) => {
                dispatch({
                    type: FETCH_BUSINESS_AREAS,
                    payload: data,
                });
            })
            .catch(error => {
                handleError(error, dispatch);
            });
    };
};

const downloadExcelFile = (fileName, data) => {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName + '.xlsx');
    document.body.appendChild(link);
    link.click();
};
