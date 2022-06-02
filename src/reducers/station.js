import { createAction } from "redux-actions";

const initialState = {
    name: null,
    store: [],
    no: null
};

const STATION = {
    REQUEST: "STATION_REQUEST",
    SUCCESS: "STATION_SUCCESS",
    NO: "STATION_NO",
    FAILURE: "STATION_FAILURE",
    EXIT: "STATION_EXIT"
};

export const station_request = createAction(STATION.REQUEST, payload => payload);
export const station_success = createAction(STATION.SUCCESS, payload => payload);
export const station_no = createAction(STATION.NO, payload => payload);
export const station_failure = createAction(STATION.FAILURE, payload => payload);
export const station_exit = createAction(STATION.EXIT, payload => payload);

const station = (state = initialState, action) => {
    switch (action.type) {
        case STATION.REQUEST:
            return {
                ...state,
                name: action.payload
            };
        case STATION.SUCCESS:
            return {
                ...state,
                name: action.payload[0].stationKor,
                store: [
                    ...action.payload
                ]
            };
        case STATION.NO:
            return {
                ...state,
                no: true
            }
        case STATION.FAILURE:
            return {
                ...state,
            };
        case STATION.EXIT:
            return {
                ...state,
                name: false,
                store: [],
                no: null
            }
        default:
            return {
                ...state,
            };
    }
};

export default station;