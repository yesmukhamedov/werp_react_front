export const CLEAR_ALL = 'CLEAR_ALL';

export function clearAll() {
    return function(dispatch) {
        dispatch({
            type: CLEAR_ALL,
        });
    };
}
