import {
    notify,
    handleError,
} from '../../general/notification/notification_action';
import { doGet } from '../../utils/apiActions';

/* action types */
export const FETCH_USER_INFO = 'FETCH_USER_INFO';

const userInfoUrl = `core/reference/userInfo`;

export function fetchUserInfo() {
    const request = doGet(userInfoUrl);
    return dispatch => {
        request
            .then(({ data }) => {
                const newCompanyOptions = data.bukrs.map(item => ({
                    key: item.id,
                    value: item.id,
                    text: item.name,
                }));

                dispatch({
                    type: FETCH_USER_INFO,
                    bukrs: newCompanyOptions,
                    all: data.all,
                    marketing: data.marketing,
                    service: data.service,
                });
            })
            .catch(error => {
                // console.log(error);
                handleError(error, dispatch);
                // if (error.response) {
                //   if (error.response.status && error.response.status === 403) {
                //     // blog post has been created, navigate the user to the index
                //     // We navigate by calling this.context.router.push with the new path to navigate to
                //     this.context.router.push('/forbidden');
                //   } else if (error.response.status && error.response.status === 500) {
                //     // blog post has been created, navigate the user to the index
                //     // We navigate by calling this.context.router.push with the new path to navigate to
                //     if (this && this.context && this.context.router)
                //       this.context.router.push('/');
                //   }
                //   dispatch(notify('error', error.response.data.message, 'Ошибка'));
                // }
                // // else {
                // //   Promise.resolve({ error }).then(response =>
                // //     dispatch(notify('error', error.response.data.message, 'Ошибка')));
                // // }
            });
    };
}
