import { createAction } from "redux-actions";

const initialState = {
    display:true

}

const ADMIN_DELETE_STORE = {
    REQUEST:'ADMIN/DELETE_STORE_REQUEST',
    SUCCESS:'ADMIN/DELETE_STORE_SUCCESS',
    FAILURE:'ADMIN/DELETE_STORE_FAILURE',
}

export const admin_delete_store_request = createAction(ADMIN_DELETE_STORE.REQUEST) 
export const admin_delete_store_success = createAction(ADMIN_DELETE_STORE.SUCCESS)
export const admin_delete_store_failure = createAction(ADMIN_DELETE_STORE.FAILURE)

const adminDeleteStore = (state=initialState,action) => {
  
    switch(action.type){
        case ADMIN_DELETE_STORE.REQUEST:
            console.log('req',action.payload)
            return {
                ...state,
            }
        case ADMIN_DELETE_STORE.SUCCESS:
            console.log('suc',action.payload)
            return {
                ...state,
                display:false
            }
        case ADMIN_DELETE_STORE.FAILURE:
            return {
                ...state
            }
        
        default:
            return state;
    }
}

export default adminDeleteStore