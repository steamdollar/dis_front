import axios from 'axios';
import {takeLatest,call,put} from 'redux-saga/effects';
import { admin_store_request, admin_store_success, admin_store_failure} from '../../reducers/admin/admin.js';
import { backend } from '../../utils/ip.js'

async function adminAPI(){
    try{
        const result = await axios.post(`${backend}/dt/admin/menu/store/setting`,null)
        return result
    }catch(e){
        console.log(e)
    }
}

function* admin(action){
    try{
        const result = yield call(adminAPI,action.payload)
        yield put({
            type:admin_store_success.toString(),payload:result.data
        })
    }catch(e){
        yield put({
            type:admin_store_failure.toString(),payload:e.response.data
        })
       
    }
}

export default function* adminSaga(){
    yield takeLatest(admin_store_request.toString(),admin)
}