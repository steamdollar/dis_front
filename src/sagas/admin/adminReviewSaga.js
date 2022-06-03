import axios from 'axios';
import {takeLatest,call,put} from 'redux-saga/effects';
import { admin_review_request, admin_review_success, admin_review_failure} from '../../reducers/admin/adminReview.js';
import { backend } from '../../utils/ip.js'
import option from '../option.js'

async function adminReviewAPI(){
    try{
        const result = await axios.post(`${backend}/dt/admin/menu/review/setting`,null)
        return result
    }catch(e){
        console.log(e)
    }
}

function* adminReview(action){
    try{
        const result = yield call(adminReviewAPI,action.payload)
        yield put({
            type:admin_review_success.toString(),payload:result.data
        })
    }catch(e){
        yield put({
            type:admin_review_failure.toString(),payload:e.response.data
        })
       
    }
}

export default function* adminReviewSaga(){
    yield takeLatest(admin_review_request.toString(),adminReview)
}