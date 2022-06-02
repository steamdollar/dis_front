import axios from "axios";
import { takeLatest, call, put } from "redux-saga/effects";
import { shop_request, shop_success, shop_failure } from '../reducers/shop.js';
import { backend } from '../utils/ip.js'

async function shopAPI(action) {
    const result = await axios.post(`${backend}/shop/:idx`, action);
    return result;
}

function* shop(action) {
    try {
        const result = yield call(shopAPI, action);
        yield put({
            type: shop_success.toString(),
            payload: result.data
        });
    } catch (e) {
        yield put({
            type: shop_failure.toString(),
            payload: e.response
        });
    }
}

export default function* shopSaga() {
    yield takeLatest(shop_request.toString(), shop);
}