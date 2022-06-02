import { createAction } from "redux-actions";


const initialState = {
    user:[],
    search:[],

}

const ADMIN_BLACK = {
    REQUEST:'ADMIN/BLACK_REQUEST',
    SUCCESS:'ADMIN/BLACK_SUCCESS',
    FAILURE:'ADMIN/BLACK_FAILURE',
}

export const admin_black_request = createAction(ADMIN_BLACK.REQUEST) 
export const admin_black_success = createAction(ADMIN_BLACK.SUCCESS)
export const admin_black_failure = createAction(ADMIN_BLACK.FAILURE)


const ADMIN_DEL_BLACK = {
    REQUEST:'ADMIN/DEL_BLACK_REQUEST',
    SUCCESS:'ADMIN/DEL_BLACK_SUCCESS',
    FAILURE:'ADMIN/DEL_BLACK_FAILURE',
}

export const admin_del_black_request = createAction(ADMIN_DEL_BLACK.REQUEST) 
export const admin_del_black_success = createAction(ADMIN_DEL_BLACK.SUCCESS)
export const admin_del_black_failure = createAction(ADMIN_DEL_BLACK.FAILURE)


const ADMIN_NEW_BLACK = {
    REQUEST:'ADMIN/NEW_BLACK_REQUEST',
    SUCCESS:'ADMIN/NEW_BLACK_SUCCESS',
    FAILURE:'ADMIN/NEW_BLACK_FAILURE',
}

export const admin_new_black_request = createAction(ADMIN_NEW_BLACK.REQUEST) 
export const admin_new_black_success = createAction(ADMIN_NEW_BLACK.SUCCESS)
export const admin_new_black_failure = createAction(ADMIN_NEW_BLACK.FAILURE)


const ADMIN_SEARCH = {
    REQUEST:'ADMIN/SEARCH_REQUEST',
    SUCCESS:'ADMIN/SEARCH_SUCCESS',
    FAILURE:'ADMIN/SEARCH_FAILURE',
}

export const admin_search_request = createAction(ADMIN_SEARCH.REQUEST) 
export const admin_search_success = createAction(ADMIN_SEARCH.SUCCESS)
export const admin_search_failure = createAction(ADMIN_SEARCH.FAILURE)


const adminBlack = (state=initialState,action) => {
  
    switch(action.type){
        case ADMIN_BLACK.REQUEST:
            return {
                ...state,
            }
        case ADMIN_BLACK.SUCCESS:
            console.log('읽어오기', action.payload)
            return {
                ...state,
                user:action.payload
            }
        case ADMIN_BLACK.FAILURE:
            return {
                ...state
            }
        case ADMIN_NEW_BLACK.REQUEST:
            return {
                ...state,
            }
        case ADMIN_NEW_BLACK.SUCCESS:

            return {
                ...state,
                user:action.payload
            }
        case ADMIN_NEW_BLACK.FAILURE:
            return {
                ...state
            }

        case ADMIN_DEL_BLACK.REQUEST:
      
            return {
                ...state,
            }
        case ADMIN_DEL_BLACK.SUCCESS:
   
            return {
                ...state,
                user:action.payload
            }
        case ADMIN_DEL_BLACK.FAILURE:
            return {
                ...state
            }
        case ADMIN_SEARCH.REQUEST:
            return {
                ...state,
            }
        case ADMIN_SEARCH.SUCCESS:
          
            return {
                ...state,
                search:action.payload
            }
        case ADMIN_SEARCH.FAILURE:
            return {
                ...state
            }
        
        default:
            return state;
    }
}



export default adminBlack