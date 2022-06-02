import { createAction } from "redux-actions";

const initialState = {
   review:[],
   search:[],

}

const ADMIN_REVIEW = {
    REQUEST:'ADMIN/REVIEW_REQUEST',
    SUCCESS:'ADMIN/REVIEW_SUCCESS',
    FAILURE:'ADMIN/REVIEW_FAILURE',
}

export const admin_review_request = createAction(ADMIN_REVIEW.REQUEST)
export const admin_review_success = createAction(ADMIN_REVIEW.SUCCESS)
export const admin_review_failure = createAction(ADMIN_REVIEW.FAILURE)

const ADMIN_DEL_REVIEW = {
    REQUEST:'ADMIN/DEL_REVIEW_REQUEST',
    SUCCESS:'ADMIN/DEL_REVIEW_SUCCESS',
    FAILURE:'ADMIN/DEL_REVIEW_FAILURE',
}

export const admin_del_review_request = createAction(ADMIN_DEL_REVIEW.REQUEST) 
export const admin_del_review_success = createAction(ADMIN_DEL_REVIEW.SUCCESS)
export const admin_del_review_failure = createAction(ADMIN_DEL_REVIEW.FAILURE)

const ADMIN_SEARCH = {
    REQUEST:'ADMIN/SEARCH_REQUEST',
    SUCCESS:'ADMIN/SEARCH_SUCCESS',
    FAILURE:'ADMIN/SEARCH_FAILURE',
}

export const admin_search_request = createAction(ADMIN_SEARCH.REQUEST) 
export const admin_search_success = createAction(ADMIN_SEARCH.SUCCESS)
export const admin_search_failure = createAction(ADMIN_SEARCH.FAILURE)

const adminReview = (state=initialState,action) => {
    switch(action.type){
        case ADMIN_REVIEW.REQUEST:
            console.log('review req',action.payload)
            return {
                ...state,
            }
        case ADMIN_REVIEW.SUCCESS:
            return {
                ...state,
                review:action.payload
            }
        case ADMIN_REVIEW.FAILURE:
            return {
                ...state
            }
        case ADMIN_DEL_REVIEW.REQUEST:
        return {
            ...state,
        }
        case ADMIN_DEL_REVIEW.SUCCESS:
            return {
                ...state,
                review:action.payload
            }
        case ADMIN_DEL_REVIEW.FAILURE:
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

export default adminReview