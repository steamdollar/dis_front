import axios from 'axios';
import {takeLatest,call,put} from 'redux-saga/effects';
import {admin_new_black_request,admin_new_black_success,admin_new_black_failure} from '../../reducers/admin/adminBlack';
import { backend } from '../../utils/ip.js'


async function newBlackAPI({payload}){
    try{
        const result = await axios.post(`${backend}/dt/admin/menu/user/setting/addblack`,payload)
        return result
    }catch(e){
        console.log(e)
    }
}


function* newBlack(action){
    try{
        const result = yield call(newBlackAPI,action)
        yield put({
            type:admin_new_black_success.toString(),payload:result.data.result
        })

    }catch(e){
        yield put({
            type:admin_new_black_failure.toString(),payload:e.response
        })
       
    }
}

export default function* adminNewBlackSaga(){
    yield takeLatest(admin_new_black_request.toString(),newBlack)
}