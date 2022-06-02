import axios from 'axios';
import {takeLatest,call,put} from 'redux-saga/effects';
import { review_delete_failure, review_delete_request, review_delete_success } 
from '../../reducers/review.js';
import { backend } from '../../utils/ip.js';

const option = {
    'Content-type':'application/json',
    withCredentials:true
}

async function deleteReviewAPI (action) {
    const data = {
        ...action.payload
    }
    try {
        const result = await axios.post(`${backend}/review/deleteReview`, data , option )
        const response = {
            result: result.data,
            idx: action.payload.idx
        }
        return response
    }
    catch(e) {
        console.log(e)
    }
}

function* reviewDelete(action) {
    try {
        const result = yield call(deleteReviewAPI, action)
        yield put({
            type:review_delete_success.toString(), payload: result
        })
    }
    catch (e) {
        yield put ({
            type : review_delete_failure.toString(), payload: e.response.data
        })
    }
}

export default function* deleteReviewSaga() {
    yield takeLatest(review_delete_request.toString(), reviewDelete)
} 