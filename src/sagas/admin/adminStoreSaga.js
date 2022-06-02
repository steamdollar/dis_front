import axios from 'axios';
import {takeLatest,call,put} from 'redux-saga/effects';
import { admin_store_edit_request, admin_store_edit_success, admin_store_edit_failure} from '../../reducers/admin/adminStoreSet.js';


async function adminStoreAPI({payload}){
    try{
        const result = await axios.post(`http://localhost:4000/dt/admin/menu/store/setting/`+payload,payload)
        return result
    }catch(e){
        console.log(e)
    }
}



function* store(action){
    try{
        const result = yield call(adminStoreAPI,action.payload)

        yield put({
            type:admin_store_edit_success.toString(),payload:result.data.result
        })
    }catch(e){
        yield put({
            type:admin_store_edit_failure.toString(),payload:e.response
        })
       
    }
}


export default function* adminSaga(){
    yield takeLatest(admin_store_edit_request.toString(),store)
}