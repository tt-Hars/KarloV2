export const BASE_PATH = '/api';
export const VERSION = 'v1';

export default {
  REGISTER: `${BASE_PATH}/${VERSION}/register`,
  INITIATE_PAYMENT: `${BASE_PATH}/${VERSION}/create_checkout_session`,
  PROCESS_PAYMENT: `${BASE_PATH}/${VERSION}/initiate_payment`,
  LOGIN: `${BASE_PATH}/${VERSION}/one_login`,
  GET_PRODUCTS: `${BASE_PATH}/${VERSION}/get_products`,
  UPDATE_USER_DATA: `${BASE_PATH}/${VERSION}/update_user_data`,
};
