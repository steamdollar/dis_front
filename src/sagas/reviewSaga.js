import axios from 'axios';
import {takeLatest,call,put} from 'redux-saga/effects';
import { review_failure, review_request, review_success } from '../reducers/review.js';
import { backend } from '../utils/ip.js'

const option = {
    'Content-type':'application/json',
    withCredentials:true
}

async function reviewAPI (action) {
    const data = {
        email: action.payload.email
    }
    try {
        const result = await axios.post(`${backend}/user/getReview`, data , option )
        return result.data
    }
    catch(e) {
        console.log(e)
    }
}

function* review(action) {
    try {
        const result = yield call(reviewAPI, action)
        yield put({
            type:review_success.toString(), payload: result
        })
    }
    catch (e) {
        yield put ({
            type : review_failure.toString(), payload: e.response.data
        })
    }
}

export default function* reviewSaga() {
    yield takeLatest(review_request.toString(), review)
} 