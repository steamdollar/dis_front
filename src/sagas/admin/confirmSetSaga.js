import axios from 'axios';
import {takeLatest,call,put} from 'redux-saga/effects';
import { admin_confirm_set_request, admin_confirm_set_success, admin_confirm_set_failure} from '../../reducers/admin/confirmSet.js';

async function confirmSetAPI({payload}){
    const idx = payload.payload
    try{
        const result = await axios.post(`http://localhost:4000/dt/admin/menu/store/confirm/`+idx,payload)
        return result
    }catch(e){
        console.log(e)
    }
}

function* confirmSet(action){
    try{
        const result = yield call(confirmSetAPI,action)
        yield put({
            type:admin_confirm_set_success.toString(),payload:result.data.result
        })

    }catch(e){
        yield put({
            type:admin_confirm_set_failure.toString(),payload:e.response
        })
       
    }
}

export default function* confirmSetSaga(){
    yield takeLatest(admin_confirm_set_request.toString(),confirmSet)
}