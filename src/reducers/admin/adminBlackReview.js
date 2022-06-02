import { createAction } from "redux-actions";


const initialState = {
   review:null

}

const ADMIN_BLACK_REVIEW = {
    REQUEST:'ADMIN/BLACK_REVIEW_REQUEST',
    SUCCESS:'ADMIN/BLACK_REVIEW_SUCCESS',
    FAILURE:'ADMIN/BLACK_REVIEW_FAILURE',
}

export const admin_black_review_request = createAction(ADMIN_BLACK_REVIEW.REQUEST)
export const admin_black_review_success = createAction(ADMIN_BLACK_REVIEW.SUCCESS)
export const admin_black_review_failure = createAction(ADMIN_BLACK_REVIEW.FAILURE)

const adminBlackReview = (state=initialState,action) => {
    switch(action.type){
        case ADMIN_BLACK_REVIEW.REQUEST:
            return {
                ...state,
            }
        case ADMIN_BLACK_REVIEW.SUCCESS:
            return {
                ...state,
                review:action.payload.result
            }
        case ADMIN_BLACK_REVIEW.FAILURE:
            return {
                ...state
            }
        
        default:
            return state;
    }
}

export default adminBlackReview