import { createAction } from "redux-actions";

const initialState = {
    result: null,
    error: null,
    name: false,
    email: false
};

const REGISTER = {
    REQUEST: 'REGISTER_REQUEST',
    SUCCESS: 'REGISTER_SUCCESS',
    FAILURE: 'REGISTER_FAILURE',
    HOME: 'REGISTER_HOME',
    NAME: 'REGISTER_NAME',
    EMAIL: 'REGISTER_EMAIL'
};

export const register_request = createAction(REGISTER.REQUEST, payload => payload);
export const register_success = createAction(REGISTER.SUCCESS, payload => payload);
export const register_failure = createAction(REGISTER.FAILURE, payload => payload);
export const register_gohome = createAction(REGISTER.HOME, payload => payload);
export const register_name = createAction(REGISTER.NAME, payload => payload);
export const register_email = createAction(REGISTER.EMAIL, payload => payload);

const register = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER.REQUEST:
            return {
                ...state,
                name: false,
                email: false
            }
        case REGISTER.SUCCESS:
            return {
                ...state,
                result: true
            }
        case REGISTER.FAILURE:
            return {
                ...state,
                result: null,
                error: action.payload
            }
        case REGISTER.HOME:
            return {
                ...state,
                result: false
            }
        case REGISTER.NAME:
            return {
                ...state,
                name: true
            }
        case REGISTER.EMAIL:
            return {
                ...state,
                email: true
            }
        default:
            return {
                ...state,
            }
    }
};

export default register;