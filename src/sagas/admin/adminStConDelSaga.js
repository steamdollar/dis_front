import axios from 'axios';
import {takeLatest,call,put} from 'redux-saga/effects';
import { admin_del_regi_request, admin_del_regi_success, admin_del_regi_failure} from '../../reducers/admin/adminStConDel.js';

async function delRegisterAPI({payload}){
    try{
        const result = await axios.post(`http://52.78.175.114:4000/dt/admin/menu/store/setting/delregi/`+payload,payload)
        return result
    }catch(e){
        console.log(e)
    }
}



function* delRegister(action){
    try{
        const result = yield call(delRegisterAPI,action)
        yield put({
            type:admin_del_regi_success.toString(),payload:result.data.result
        })

    }catch(e){
        yield put({
            type:admin_del_regi_failure.toString(),payload:e.response
        })
       
    }
}

export default function* adminDelRegisterSaga(){
    yield takeLatest(admin_del_regi_request.toString(),delRegister)
}