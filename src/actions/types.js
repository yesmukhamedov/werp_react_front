export const AUTH_USER = 'auth_user';
export const UNAUTH_USER = 'unauth_user';
export const AUTH_ERROR = 'auth_error';
export const FETCH_MESSAGE = 'fetch_message';
export const FETCH_USERS = 'fetch_users';
export const USERS_ERROR = 'users_error';
export const NEW_USER = 'new_user';
export const DELETE_USER = 'delete_user';
export const UPDATE_USER = 'update_user';
export const CHANGE_LANGUAGE = 'change_language';
export const INBOX_UNREAD = 'inbox_unread';
export const TREE_MENU = 'tree_menu';

/*
* This action type is broadcasted after user clicks on the menu item.
* As a payload, array of menu item nodes is passed.
* e.g. ['Home', 'Registration', 'Personal Information']
* */
export const BREADCRUMB = 'breadcrumb';