import axios from 'axios';
import {takeLatest,call,put} from 'redux-saga/effects';
import { admin_black_request, admin_black_success, admin_black_failure} from '../../reducers/admin/adminBlack.js';
import { backend } from '../../utils/ip.js'

async function blackAPI({payload}){
    try{
        const result = await axios.post(`${backend}/dt/admin/menu/user/setting`,null)
        return result
    }catch(e){
        console.log(e)
    }
}



function* black(action){

    try{
        const result = yield call(blackAPI,action)
        yield put({
            type:admin_black_success.toString(),payload:result.data.result
        })

    }catch(e){
        yield put({
            type:admin_black_failure.toString(),payload:e.response
        })
       
    }
}


export default function* adminBlackSaga(){
    yield takeLatest(admin_black_request.toString(),black)
}