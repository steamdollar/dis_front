import axios from 'axios';
import {takeLatest,call,put} from 'redux-saga/effects';
import { review_create_failure, review_create_request, review_create_success } 
from '../../reducers/writeReview.js';

const option = {
    'Content-type':'application/json',
    withCredentials:true
}

async function createReviewAPI (action) {
    console.log(action.payload)
    const data = {
        ...action.payload
    }
    try {
        const result = await axios.post('http://52.78.175.114:4000/review/createReview', data , option )
        return result.data
    }
    catch(e) {
        console.log(e)
    }
}

function* review(action) {
    try {
        const result = yield call(createReviewAPI, action)
        yield put({
            type:review_create_success.toString(), payload: result.result
        })
    }
    catch (e) {
        yield put ({
            type : review_create_failure.toString(), payload: e.response.data
        })
    }
}

export default function* createReviewSaga() {
    yield takeLatest(review_create_request.toString(), review)
} 