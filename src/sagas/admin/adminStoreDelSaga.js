import axios from 'axios';
import {takeLatest,call,put} from 'redux-saga/effects';
import { admin_delete_store_request, admin_delete_store_success, admin_delete_store_failure} from '../../reducers/admin/deleteStore';

async function deleteStoreAPI({payload}){
    try{
        const result = await axios.post(`http://localhost:4000/dt/admin/menu/store/setting/delete/`+payload,payload)
        return result
    }catch(e){
        console.log(e)
    }
}



function* deleteStore(action){
    try{
        const result = yield call(deleteStoreAPI,action)
        yield put({
            type:admin_delete_store_success.toString(),payload:result.data.result
        })

    }catch(e){
        yield put({
            type:admin_delete_store_failure.toString(),payload:e.response
        })
       
    }
}

export default function* adminStoreDelSaga(){
    yield takeLatest(admin_delete_store_request.toString(),deleteStore)
}