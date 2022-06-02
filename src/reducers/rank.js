import { createAction } from "redux-actions";

const initialState = {
    topFive: []
};

const RANK_TOTAL = {
    REQUEST: "RANK/TOTAL_REQUEST",
    SUCCESS: "RANK/TOTAL_SUCCESS",
    FAILURE: "RANK/TOTAL_FAILURE"
};

const RANK_FLAVOR = {
    REQUEST: "RANK/FLAVOR_REQUEST",
    SUCCESS: "RANK/FLAVOR_SUCCESS",
    FAILURE: "RANK/FLAVOR_FAILURE"
};

const RANK_ATMOSPHERE = {
    REQUEST: "RANK/ATMOSPHERE_REQUEST",
    SUCCESS: "RANK/ATMOSPHERE_SUCCESS",
    FAILURE: "RANK/ATMOSPHERE_FAILURE"
};

const RANK_CHEAP = {
    REQUEST: "RANK/CHEAP_REQUEST",
    SUCCESS: "RANK/CHEAP_SUCCESS",
    FAILURE: "RANK/CHEAP_FAILURE"
};

const RANK_SERVICE = {
    REQUEST: "RANK/SERVICE_REQUEST",
    SUCCESS: "RANK/SERVICE_SUCCESS",
    FAILURE: "RANK/SERVICE_FAILURE"
};

export const rank_total_request = createAction(RANK_TOTAL.REQUEST, payload => payload);
export const rank_total_success = createAction(RANK_TOTAL.SUCCESS, payload => payload);
export const rank_total_failure = createAction(RANK_TOTAL.FAILURE, payload => payload);

export const rank_flavor_request = createAction(RANK_FLAVOR.REQUEST, payload => payload);
export const rank_flavor_success = createAction(RANK_FLAVOR.SUCCESS, payload => payload);
export const rank_flavor_failure = createAction(RANK_FLAVOR.FAILURE, payload => payload);

export const rank_atmosphere_request = createAction(RANK_ATMOSPHERE.REQUEST, payload => payload);
export const rank_atmosphere_success = createAction(RANK_ATMOSPHERE.SUCCESS, payload => payload);
export const rank_atmosphere_failure = createAction(RANK_ATMOSPHERE.FAILURE, payload => payload);

export const rank_cheap_request = createAction(RANK_CHEAP.REQUEST, payload => payload);
export const rank_cheap_success = createAction(RANK_CHEAP.SUCCESS, payload => payload);
export const rank_cheap_failure = createAction(RANK_CHEAP.FAILURE, payload => payload);

export const rank_service_request = createAction(RANK_SERVICE.REQUEST, payload => payload);
export const rank_service_success = createAction(RANK_SERVICE.SUCCESS, payload => payload);
export const rank_service_failure = createAction(RANK_SERVICE.FAILURE, payload => payload);

const rank = (state = initialState, action) => {
    switch (action.type) {
        case RANK_TOTAL.REQUEST: case RANK_FLAVOR.REQUEST: case RANK_ATMOSPHERE.REQUEST: case RANK_CHEAP.REQUEST: case RANK_SERVICE.REQUEST:
            return {
                ...state,
            }
        case RANK_TOTAL.SUCCESS: case RANK_FLAVOR.SUCCESS: case RANK_ATMOSPHERE.SUCCESS: case RANK_CHEAP.SUCCESS: case RANK_SERVICE.SUCCESS:
            return {
                ...state,
                topFive: [...action.payload]
            }
        case RANK_TOTAL.FAILURE: case RANK_FLAVOR.FAILURE: case RANK_ATMOSPHERE.FAILURE: case RANK_CHEAP.FAILURE: case RANK_SERVICE.FAILURE:
            return {
                ...state,
            }
        default:
            return {
                ...state,
            }
    }
};

export default rank;