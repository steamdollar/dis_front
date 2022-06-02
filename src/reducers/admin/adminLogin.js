import { createAction } from "redux-actions";

const initialState = { admin: null, isLogin : false }

/* get review */
const adminLogin_REQUEST = 'adminLogin/REQUEST'
const adminLogin_SUCCESS = 'adminLogin/SUCCESS'
const adminLogin_FAILURE = 'adminLogin/FAILURE'

export const adminLogin_request = createAction(adminLogin_REQUEST)
export const adminLogin_success = createAction(adminLogin_SUCCESS)
export const adminLogin_failure = createAction(adminLogin_FAILURE)

/* reducer */
const adminLogin = (state = initialState, action) => {
    switch (action.type) {

        case adminLogin_REQUEST :
            return {
                ...state,
            }
        case adminLogin_SUCCESS :
            localStorage.setItem('persist:user',{"adminLogin":"{\"admin\":some_secret_key,\"isLogin\":true}","user":"{\"me\":{\"isLogin\":true,\"nickname\":\"null\",\"email\":\"null\"},\"error\":null,\"loading\":false}",
            "_persist":"{\"version\":-1,\"rehydrated\":true}"})
            return {
                ...state,
                admin: 'some_secret_key',
                isLogin: true
            }    
        case adminLogin_FAILURE :
            return {
                ...state,
            }
        default :
            return state
    }
}

export default adminLogin;