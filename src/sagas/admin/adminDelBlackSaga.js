import axios from 'axios';
import {takeLatest,call,put} from 'redux-saga/effects';
import { admin_del_black_request, admin_del_black_success, admin_del_black_failure} from '../../reducers/admin/adminBlack';
import { backend } from '../../utils/ip.js'
import option from '../option.js'

async function deleteBlackAPI({payload}){
    try{
        const result = await axios.post(`${backend}/dt/admin/menu/user/setting/deleteblack/`+payload,payload)
        return result
    }catch(e){
        console.log(e)
    }
}



function* deleteBlack(action){
    try{
        const result = yield call(deleteBlackAPI,action)
        yield put({
            type:admin_del_black_success.toString(),payload:result.data.result
        })

    }catch(e){
        yield put({
            type:admin_del_black_failure.toString(),payload:e.response
        })
       
    }
}

export default function* adminDelBlackSaga(){
    yield takeLatest(admin_del_black_request.toString(),deleteBlack)
}