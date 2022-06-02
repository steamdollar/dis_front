import axios from 'axios';
import {takeLatest,call,put} from 'redux-saga/effects';
import { review_update_failure, review_update_request, review_update_success } 
from '../../reducers/review.js';
import { backend } from '../../utils/ip.js';

const option = {
    'Content-type':'application/json',
    withCredentials:true
}

async function updateReviewAPI (action) {
    const data = {
        ...action.payload
    }
    try {
        const result = await axios.post(`${backend}/review/updateReview`, data , option )
        return result.data
    }
    catch(e) {
        console.log(e)
    }
}

function* updateReview(action) {
    try {
        const result = yield call(updateReviewAPI, action)
        const result2 = {...action.payload}
        yield put({
            type:review_update_success.toString(), payload : result2
        })
    }
    catch (e) {
        yield put ({
            type : review_update_failure.toString()
        })
    }
}

export default function* updateReviewSaga() {
    yield takeLatest(review_update_request.toString(), updateReview)
} 