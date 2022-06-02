// import axios from "axios";
// import { takeLatest, call, put } from "redux-saga/effects";
// import { user_login_request, user_login_success, user_login_failure } from "../reducers/user";

// async function loginAPI(payload) {
//     const result = await axios.post('http://localhost:3500/user/login', payload);
//     const {token} = result.data;
//     const response = await axios.post('http://localhost:3500/user/me', null, {
//         headers:{
//             "Authorization":`Bearer ${token}`
//         }
//     });
//     return response;
// }

// function* login(action) {
//     try {
//         const result = yield call(loginAPI, action.payload);
//         yield put({
//             type: user_login_success.toString(),
//             payload: result.data,
//         });
//         console.log(result);
//     } catch (e) {
//         yield put({
//             type: user_login_failure.toString(),
//             payload: e.response.data,
//         });
//     }
// }

// export default function* userSaga() {
//     yield takeLatest(user_login_request.toString(), login);
// }