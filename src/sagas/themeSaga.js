import axios from "axios";
import { takeLatest, call, put } from "redux-saga/effects";
import { theme_protein_request, theme_protein_success, theme_protein_failure,
    theme_photo_request, theme_photo_success, theme_photo_failure,
    theme_unique_request, theme_unique_success, theme_unique_failure,
    theme_parking_request, theme_parking_success, theme_parking_failure } from ".././reducers/theme.js";
import { backend } from '../utils/ip.js'

async function proteinAPI() {
    const result = await axios.post(`${backend}/theme/protein`, null);
    return result;
}

async function photoAPI() {
    const result = await axios.post(`${backend}/theme/photo`, null);
    return result;
}

async function uniqueAPI() {
    const result = await axios.post(`${backend}/theme/unique`, null);
    return result;
}

async function parkingAPI() {
    const result = await axios.post(`${backend}/theme/parking`, null);
    return result;
}

function* protein(action) {
    try {
        const result = yield call(proteinAPI, action);
        yield put({
            type: theme_protein_success.toString(),
            payload: result.data.result
        });
    } catch (e) {
        yield put({
            type: theme_protein_failure.toString(),
            payload: e.response.data
        });
    }
}

function* photo(action) {
    try {
        const result = yield call(photoAPI, action);
        yield put({
            type: theme_photo_success.toString(),
            payload: result.data.result
        });
    } catch (e) {
        yield put({
            type: theme_photo_failure.toString(),
            payload: e.response.data
        });
    }
}

function* unique(action) {
    try {
        const result = yield call(uniqueAPI, action);
        console.log(result);
        yield put({
            type: theme_unique_success.toString(),
            payload: result.data.result
        });
    } catch (e) {
        yield put({
            type: theme_unique_failure.toString(),
            payload: e.response.data
        });
    }
}

function* parking(action) {
    try {
        const result = yield call(parkingAPI, action);
        yield put({
            type: theme_parking_success.toString(),
            payload: result.data.result
        });
    } catch (e) {
        yield put({
            type: theme_parking_failure.toString(),
            payload: e.response.data
        });
    }
}

export default function* themeSaga() {
    yield takeLatest(theme_protein_request.toString(), protein);
    yield takeLatest(theme_photo_request.toString(), photo);
    yield takeLatest(theme_unique_request.toString(), unique);
    yield takeLatest(theme_parking_request.toString(), parking);
}