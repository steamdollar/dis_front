import axios from 'axios';
import {takeLatest,call,put} from 'redux-saga/effects';
import { getStore_failure, getStore_request, getStore_success } 
from '../../reducers/writeReview.js';
import { backend } from '../../utils/ip.js';

const option = {
    'Content-type':'application/json',
    withCredentials:true
}

async function createReviewAPI (action) {
    const sidx = {
        ...action.payload
    }
    try {
        const result = await axios.post(`${backend}/review/getStore`, sidx , option )
        const response = {
            ...sidx,
            result
        }
        return response
    }
    catch(e) {
        console.log(e)
    }
}

function* review(action) {
    try {
        const result = yield call(createReviewAPI, action)
        yield put({
            type:getStore_success.toString(), payload: result
        })
    }
    catch (e) {
        yield put ({
            type : getStore_failure.toString(), payload: e.response.data
        })
    }
}

export default function* getStoreSaga() {
    yield takeLatest(getStore_request.toString(), review)
} 