import axios from 'axios';
import {takeLatest,call,put} from 'redux-saga/effects';
import { admin_search_request, admin_search_success, admin_search_failure} from '../../reducers/admin/adminReview';
import { backend } from '../../utils/ip.js'


async function searchAPI(action){

    try{
        const result = await axios.post(`${backend}/dt/admin/menu/search/review`,action)
        return result
    }catch(e){
        console.log(e)
    }
}



function* search(action){
    try{
        const result = yield call(searchAPI,action)
        yield put({
            type:admin_search_success.toString(),payload:result.data.result
        })
    }catch(e){
        yield put({
            type:admin_search_failure.toString(),payload:e.response
        })
       
    }
}


export default function* reviewSearchSaga(){
    yield takeLatest(admin_search_request.toString(),search)
}