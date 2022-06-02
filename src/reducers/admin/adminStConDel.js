import { createAction } from "redux-actions";

const initialState = {
    display:true

}

const ADMIN_DEL_REGI = {
    REQUEST:'ADMIN/DEL_REGI_REQUEST',
    SUCCESS:'ADMIN/DEL_REGI_SUCCESS',
    FAILURE:'ADMIN/DEL_REGI_FAILURE',
}

export const admin_del_regi_request = createAction(ADMIN_DEL_REGI.REQUEST) 
export const admin_del_regi_success = createAction(ADMIN_DEL_REGI.SUCCESS)
export const admin_del_regi_failure = createAction(ADMIN_DEL_REGI.FAILURE)

const adminDelRegi = (state=initialState,action) => {
  
    switch(action.type){
        case ADMIN_DEL_REGI.REQUEST:
            return {
                ...state,
            }
        case ADMIN_DEL_REGI.SUCCESS:
            return {
                ...state,
                display:false
            }
        case ADMIN_DEL_REGI.FAILURE:
            return {
                ...state
            }
        
        default:
            return state;
    }
}

export default adminDelRegi