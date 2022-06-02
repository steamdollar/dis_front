import { createAction } from "redux-actions";


const initialState = {
   storeEdit:[]
}



const ADMIN_STORE_EDIT = {
    REQUEST:'ADMIN/STORE_EDIT_REQUEST',
    SUCCESS:'ADMIN/STORE_EDIT_SUCCESS',
    FAILURE:'ADMIN/STORE_EDIT_FAILURE',
}

export const admin_store_edit_request = createAction(ADMIN_STORE_EDIT.REQUEST) 
export const admin_store_edit_success = createAction(ADMIN_STORE_EDIT.SUCCESS)
export const admin_store_edit_failure = createAction(ADMIN_STORE_EDIT.FAILURE)

const adminStoreSet = (state=initialState,action) => {
    switch(action.type){
        case ADMIN_STORE_EDIT.REQUEST:
            return {
                ...state,
                storeEdit : []
               
            }
        case ADMIN_STORE_EDIT.SUCCESS:
            console.log('reducer',action)
            return {
                ...state,
                storeEdit : [
                    action.payload[0]
                ] // [{}]
            }
        case ADMIN_STORE_EDIT.FAILURE:
            return {
                ...state
            }
        
        default:
            return state;
    }
}


export default adminStoreSet