import { createAction } from "redux-actions";


const initialState = {
    check:null
}

const CHECK_ROUTEMAP = {
    REQUEST:'CHECK/MAP_REQUEST',
    SUCCESS:'CHECK/MAP_SUCCESS',
    FAILURE:'CHECK/MAP_FAILURE',
}

export const check_map_request = createAction(CHECK_ROUTEMAP.REQUEST)
export const check_map_success = createAction(CHECK_ROUTEMAP.SUCCESS)
export const check_map_failure = createAction(CHECK_ROUTEMAP.FAILURE)

const route_map = (state=initialState,action) => {
    switch(action.type){
        case CHECK_ROUTEMAP.REQUEST:
            return {
                ...state,
            }
        case CHECK_ROUTEMAP.SUCCESS:

            return {
                ...state,
                check:'OK'
            }
        case CHECK_ROUTEMAP.FAILURE:
            return {
                ...state
            }
        
        default:
            return state;
    }
}

export default route_map