import axios from "axios";
import { takeLatest, call, put } from "redux-saga/effects";
import { shop_request, shop_success, shop_failure } from '../reducers/shop.js';

async function shopAPI(action) {
    const result = await axios.post('http://52.78.175.114:4000/shop/:idx', action);
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