export const MODIFY_LOADER = 'MODIFY_LOADER';



export function modifyLoader(a_boolean) {
    const obj = {
        type: MODIFY_LOADER,
        payload: a_boolean
    };
    return obj;
}