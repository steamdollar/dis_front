import axios from 'axios';
import {takeLatest,call,put} from 'redux-saga/effects';
import { admin_del_review_request, admin_del_review_success, admin_del_review_failure} from '../../reducers/admin/adminReview.js';
import { backend } from '../../utils/ip.js'
import option from '../option.js'


async function deleteReviewAPI({payload}){
    try{
        const result = await axios.post(`${backend}/dt/admin/menu/review/setting/deletereview/`+payload,payload)
        return result
    }catch(e){
        console.log(e)
    }
}



function* deleteReview(action){
    try{
        const result = yield call(deleteReviewAPI,action)
        yield put({
            type:admin_del_review_success.toString(),payload:result.data
        })

    }catch(e){
        yield put({
            type:admin_del_review_failure.toString(),payload:e.response
        })
       
    }
}

export default function* adminDelReviewSaga(){
    yield takeLatest(admin_del_review_request.toString(),deleteReview)
}