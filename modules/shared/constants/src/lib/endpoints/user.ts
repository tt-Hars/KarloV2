import { BASE_V1 } from './base';

export const AUTH = 'auth';
export const REFRESH = 'refresh';
export const LOGOUT = 'logout';
const USERS = 'users';
export const PROFILE = 'profile';
export const REGISTER = 'register';
const UPDATE_USER_DATA = 'update_user_data';

/**
 * API Endpoint for user authentication.
 */
export const AUTH_V1 = `${BASE_V1}${USERS}/${AUTH}`;

/**
 * API Endpoint for refreshing the access token.
 */
export const REFRESH_V1 = `${AUTH_V1}/${REFRESH}`;

/**
 * API Endpoint for user logout.
 */
export const LOGOUT_V1 = `${BASE_V1}${LOGOUT}`;

/**
 * API Endpoint for fetching user profile.
 */
export const PROFILE_V1 = `${BASE_V1}${USERS}/${PROFILE}`;

/**
 * API Endpoint for user registration.
 */
export const REGISTER_V1 = `${BASE_V1}${REGISTER}`;

/**
 * API Endpoint for updating user data.
 */
export const UPDATE_USER_DATA_V1 = `${BASE_V1}${UPDATE_USER_DATA}`;
