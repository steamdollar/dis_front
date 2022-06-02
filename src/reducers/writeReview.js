import { createAction } from "redux-actions"

const initialState = { 
    name: null, sidx : null, number: { flavor: null, atmosphere : null, cheap: null, service: null }, 
    email: null, text: null, metadata: { loading: false, error: null}
}

/*  store 이름 가져오기  */
const getStore_REQUEST = 'GET_STORE/REQUEST'
const getStore_SUCCESS = 'GET_STORE/SUCCESS'
const getStore_FAILURE = 'GET_STORE/FAILURE' 

export const getStore_request = createAction(getStore_REQUEST)
export const getStore_success = createAction(getStore_SUCCESS)
export const getStore_failure = createAction(getStore_FAILURE)

/* score list */
const review_FLAVOR = `REVIEW/FLAVOR`
const review_ATMOSPHERE = `REVIEW/ATMOSPHERE`
const review_CHEAP = `REVIEW/CHEAP`
const review_SERVICE = `REVIEW/SERVICE`

export const review_flavor = createAction(review_FLAVOR)
export const review_atmosphere = createAction(review_ATMOSPHERE)
export const review_cheap = createAction(review_CHEAP)
export const review_service = createAction(review_SERVICE)

/* review 제출 */
const review_create_REQUEST = 'REVIEW_CREATE/REQUEST'
const review_create_SUCCESS = 'REVIEW_CREATE/SUCCESS'
const review_create_FAILURE = 'REVIEW_CREATE/FAILURE'
const review_WRITE = 'REVIEW_WRITE/DOWN'

export const review_create_request = createAction(review_create_REQUEST)
export const review_create_success = createAction(review_create_SUCCESS)
export const review_create_failure = createAction(review_create_FAILURE)
export const review_write = createAction(review_WRITE)


/*  reducer */

const createReview = (state = initialState, action) => {
    switch (action.type) {
        /* 상점 이름 가져오기 */
        case getStore_REQUEST :
            return {
                ...state,
                metadata : {
                    ...state.metadata,
                    loading: true,
                    error : null
                }
            }
        case getStore_SUCCESS :
            return {
                ...state,
                name: action.payload.result.data.result[0].name,
                sidx: action.payload.sidx,
                metadata : {
                    ...state.metadata,
                    loading: false,
                    error: null
                }
            }
        
        case getStore_FAILURE :
            return {
                ...state
            }

        /* 각 항목 점수 변경 */
        case review_FLAVOR : 
            return {
                ...state,
                number : {
                    ...state.number,
                    flavor: action.payload.flavor
                }
            }
        case review_ATMOSPHERE : 
            return {
                ...state,
                number : {
                    ...state.number,
                    atmosphere: action.payload.atmosphere
                }
            }
        case review_CHEAP : 
            return {
                    ...state,
                    number : {
                        ...state.number,
                        cheap: action.payload.cheap
                    }
                }
        case review_SERVICE: 
            return {
                ...state,
                number : {
                    ...state.number,
                    service: action.payload.service
                }
            }
        /*  리뷰 내용 작성, 제출 */
        case review_WRITE :
            return {
                ...state,
                text : action.payload
            }
        case review_create_REQUEST :
            return {
                ...state,
                number : { ...state.number},
                name: action.payload.name,
                sidx: action.payload.sidx,
                text : action.payload.text,
                email: action.payload.email,
                metadata : {
                    ...state.metadata,
                    loading: true,
                    error: null
                }
            }
        case review_create_SUCCESS :
            return {
                ...state,
                number : {
                    ...state.number,
                },
                metadata : {
                    ...state.metadata,
                    loading: false,
                    error: null
                }
            }
        case review_create_FAILURE :
            return {
                ...state,
                metadata : {
                    ...state.metadata,
                    loading: false,
                    error: true
                }
            }   
        default :
            return state
    }
}

export default createReview