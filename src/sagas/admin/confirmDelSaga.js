import axios from 'axios';
import {takeLatest,call,put} from 'redux-saga/effects';
import { admin_confirm_del_request, admin_confirm_del_success, admin_confirm_del_failure} from '../../reducers/admin/adminStoreConfirm';

async function confirmDelAPI({payload}){
    const idx = payload.payload
    try{
        const result = await axios.post(`http://localhost:4000/dt/admin/menu/store/confirm/delregi/`+idx,payload)
        return result
    }catch(e){
        console.log(e)
    }
}



function* confirmDel(action){
    try{
        const result = yield call(confirmDelAPI,action)
        yield put({
            type:admin_confirm_del_success.toString(),payload:result.data.result2
        })

    }catch(e){
        yield put({
            type:admin_confirm_del_failure.toString(),payload:e.response
        })
       
    }
}

export default function* confirmDelSaga(){
    yield takeLatest(admin_confirm_del_request.toString(),confirmDel)
}