import axios from "axios";
import { takeLatest, call, put } from "redux-saga/effects";
import { register_request, register_success, register_failure } from "../reducers/register";

async function registerAPI(action) {
    const result = await axios.post('http://52.78.175.114:4000/register/join', action);
    return result;
}

function* register(action) {
    try {
        const result = yield call(registerAPI, action);
        yield put({
            type: register_success.toString(),
            payload: result
        });
    } catch (e) {
        yield put({
            type: register_failure.toString(),
            payload: e.response.data
        });
    }
}

export default function* registerSaga() {
    yield takeLatest(register_request.toString(), register);
}