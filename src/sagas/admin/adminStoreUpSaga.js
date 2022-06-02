import axios from 'axios';
import {takeLatest,call,put} from 'redux-saga/effects';
import { admin_edit_store_request, admin_edit_store_success, admin_edit_store_failure} from '../../reducers/admin/editStore.js';
import { backend } from '../../utils/ip.js'

async function editStoreAPI({payload}){
    const idx = payload.store_id
    try{
        const result = await axios.post(`${backend}/dt/admin/menu/store/setting/update/`+idx,payload)
        return result
    }catch(e){
        console.log(e)
    }
}



function* editStore(action){
    try{
        const result = yield call(editStoreAPI,action)
        yield put({
            type:admin_edit_store_success.toString(),payload:result.data.result
        })

    }catch(e){
        yield put({
            type:admin_edit_store_failure.toString(),payload:e.response
        })
       
    }
}

export default function* adminStoreUpSaga(){
    yield takeLatest(admin_edit_store_request.toString(),editStore)
}