import axios from 'axios';
import {takeLatest,call,put} from 'redux-saga/effects';
import { admin_confirm_store_request, admin_confirm_store_success, admin_confirm_store_failure} from '../../reducers/admin/confirmStore';

async function confirmStoreAPI({payload}){
    let qwert = []
    for (let regi_id of payload.values()) {
        qwert.push(regi_id)
    }
    const config = {
        Headers : {
            'content-type' : 'multipart/form-data'
        }
    }
    const idx = qwert[0]
    try{
        const result = await axios.post(`http://52.78.175.114:4000/dt/admin/menu/store/confirm/addstore/`+ idx,payload, config)

        return result
    }catch(e){
        console.log(e)
    }
}



function* confirmStore(action){
    try{
        const result = yield call(confirmStoreAPI,action)
        yield put({
            type:admin_confirm_store_success.toString(),payload:result.data.result
        })

    }catch(e){
        yield put({
            type:admin_confirm_store_failure.toString(),payload:e.response
        })
       
    }
}

export default function* confirmStoreSaga(){
    yield takeLatest(admin_confirm_store_request.toString(),confirmStore)
}