import axios from 'axios';
import {takeLatest,call,put} from 'redux-saga/effects';
import { admin_search_request, admin_search_success, admin_search_failure} from '../../reducers/admin/adminBlack';


async function searchAPI(action){

    try{
        const result = await axios.post(`http://52.78.175.114:4000/dt/admin/menu/search/black`,action)
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


export default function* blackSearchSaga(){
    yield takeLatest(admin_search_request.toString(),search)
}