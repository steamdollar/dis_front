import { createAction } from "redux-actions";

const initialState = {
    sort:[],
}

const ADMIN_CONFIRM_DEL = {
    REQUEST:'ADMIN/CONFIRM_DEL_REQUEST',
    SUCCESS:'ADMIN/CONFIRM_DEL_SUCCESS',
    FAILURE:'ADMIN/CONFIRM_DEL_FAILURE',
}

export const admin_confirm_del_request = createAction(ADMIN_CONFIRM_DEL.REQUEST) 
export const admin_confirm_del_success = createAction(ADMIN_CONFIRM_DEL.SUCCESS)
export const admin_confirm_del_failure = createAction(ADMIN_CONFIRM_DEL.FAILURE)

const ADMIN_CONFIRM_STATE = {
    REQUEST:'ADMIN/CONFIRM_STATE_REQUEST',
    SUCCESS:'ADMIN/CONFIRM_STATE_SUCCESS',
    FAILURE:'ADMIN/CONFIRM_STATE_FAILURE',
}

export const admin_confirm_state_request = createAction(ADMIN_CONFIRM_STATE.REQUEST) 
export const admin_confirm_state_success = createAction(ADMIN_CONFIRM_STATE.SUCCESS)
export const admin_confirm_state_failure = createAction(ADMIN_CONFIRM_STATE.FAILURE)

const adminConfirm = (state=initialState,action) => {
    switch(action.type){
        case ADMIN_CONFIRM_DEL.REQUEST:
          
            return {
                ...state,
            }
        case ADMIN_CONFIRM_DEL.SUCCESS:
          
            return {
                ...state,
                sort:action.payload
            }
        case ADMIN_CONFIRM_DEL.FAILURE:
            return {
                ...state
            }
        case ADMIN_CONFIRM_STATE.REQUEST:
            return {
                ...state,
            }
        case ADMIN_CONFIRM_STATE.SUCCESS:
            return {
                ...state,
                sort:action.payload.data.result
                
            }
        case ADMIN_CONFIRM_STATE.FAILURE:
        
            return {
                ...state
            }
        
        default:
            return state;
    }
}

export default adminConfirm