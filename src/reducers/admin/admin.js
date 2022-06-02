import { createAction } from "redux-actions";


const initialState = {
   store:[],
}

const ADMIN_STORE = {
    REQUEST:'ADMIN/STORE_REQUEST',
    SUCCESS:'ADMIN/STORE_SUCCESS',
    FAILURE:'ADMIN/STORE_FAILURE',
}

export const admin_store_request = createAction(ADMIN_STORE.REQUEST)
export const admin_store_success = createAction(ADMIN_STORE.SUCCESS)
export const admin_store_failure = createAction(ADMIN_STORE.FAILURE)



const admin = (state=initialState,action) => {
    switch(action.type){
        case ADMIN_STORE.REQUEST:
            return {
                ...state,
            }
        case ADMIN_STORE.SUCCESS:
            return {
                ...state,
                store:action.payload.result
            }
        case ADMIN_STORE.FAILURE:
            return {
                ...state
            }
        default:
            return state;
    }
}


export default admin