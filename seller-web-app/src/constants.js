const API_URL = 'http://localhost:8080/api/';
export const LOGIN_API = API_URL + 'auth/signin'; 
export const SIGNUP_API = API_URL + 'auth/signup';
export const SCHEDULE_API = API_URL + 'seller'
export const APPOINTMENT_API = API_URL + 'appointment'
export const PENDING_APPOINTMENT_API = API_URL + 'appointment/pending'
export const CURRENT_SELLER_API = API_URL + 'seller'
export const APPOINTMENT_STATUS = {
    PENDING: 0,
    CANCELLED: 1,
    APPROVED: 2,
}
export const APPOINTMENT_STATUS_VALUES = {
    0: 'PENDING FOR APPROVAL',
    1: 'CANCELLED',
    2: 'APPROVED',
}