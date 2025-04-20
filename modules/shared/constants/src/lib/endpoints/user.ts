import { BASE_V1 } from './base';

export const AUTH = 'auth';
export const REFRESH = 'refresh';
export const LOGOUT = 'logout';
const USERS = 'users';
export const PROFILE = 'profile';
export const REGISTER = 'register';
const UPDATE_USER_DATA = 'update_user_data';
export const AUTH_V1 = `${BASE_V1}${AUTH}`;
export const REFRESH_V1 = `${AUTH}/${REFRESH}`;
export const LOGOUT_V1 = `${BASE_V1}${LOGOUT}`;
export const PROFILE_V1 = `${BASE_V1}/${USERS}/${PROFILE}`;
export const REGISTER_V1 = `${BASE_V1}${REGISTER}`;
export const UPDATE_USER_DATA_V1 = `${BASE_V1}${UPDATE_USER_DATA}`;
