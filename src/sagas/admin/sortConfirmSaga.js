import axios from 'axios';
import {takeLatest,call,put} from 'redux-saga/effects';
import { admin_confirm_state_request, admin_confirm_state_success, admin_confirm_state_failure} from '../../reducers/admin/adminStoreConfirm';
import { backend } from '../../utils/ip.js'

async function sortConfirmAPI(action){
    try{
        const result = await axios.post(`${backend}/dt/admin/menu/store/confirm/sort`,action)
        return result
    }catch(e){
        console.log(e)
    }
}



function* sortConfirm(action){
    try{
        const result = yield call(sortConfirmAPI,action)
        yield put({
            type:admin_confirm_state_success.toString(),payload:result
        })

    }catch(e){
        yield put({
            type:admin_confirm_state_failure.toString(),payload:e.response
        })
       
    }
}

export default function* sortConfirmSaga(){
    yield takeLatest(admin_confirm_state_request.toString(),sortConfirm)
}