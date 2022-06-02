import axios from 'axios';
import {takeLatest,call,put} from 'redux-saga/effects';
import { admin_black_review_request, admin_black_review_success, admin_black_review_failure} from '../../reducers/admin/adminBlackReview.js';

async function adminBlackReviewAPI(payload){
    try{
        const result = await axios.post('http://52.78.175.114:4000/dt/admin/menu/user/setting/checkblack/'+payload,null)
        return result
    }catch(e){
        console.log(e)
    }
}

function* adminBlackReview(action){
    try{
        const result = yield call(adminBlackReviewAPI,action.payload)
        yield put({
            type:admin_black_review_success.toString(),payload:result.data
        })
    }catch(e){
        yield put({
            type:admin_black_review_failure.toString(),payload:e.response.data
        })
       
    }
}

export default function* adminBlackReviewSaga(){
    yield takeLatest(admin_black_review_request.toString(),adminBlackReview)
}