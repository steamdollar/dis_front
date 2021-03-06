import axios from "axios";
import { takeLatest, call, put } from "redux-saga/effects";
import { station_request, station_success, station_no, station_failure } from "../reducers/station";
import { backend } from '../utils/ip.js'
import option from './option.js'

async function stationAPI(action) {
    const result = await axios.post(`${backend}/station/info`, action, option);
    return result;
}

function* station(action) {
    try {
        const result = yield call(stationAPI, action);
        if (result.data.length > 0) {
            yield put({
                type: station_success.toString(),
                payload: result.data
            });
        } else {
            yield put({
                type: station_no.toString(),
            });
        }
    } catch (e) {
        yield put({
            type: station_failure.toString(),
            payload: e.response.data
        });
    }
}

export default function* stationSaga() {
    yield takeLatest(station_request.toString(), station);
}