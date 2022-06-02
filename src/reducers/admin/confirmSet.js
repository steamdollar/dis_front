import { createAction } from "redux-actions";

const initialState = {
    name:null,
    station:null,
    line:null,
    address:null,
    parking:null,
    protein:null,
    photo:null,
    special:null,
    operhour:null,
    website:null,
    menu:null,
    beverage:null,
    tel:null,
    intro:null,
    user : { email : null}
}

const ADMIN_CONFIRM_SET = {
    REQUEST:'ADMIN/CONFIRM_SET_REQUEST',
    SUCCESS:'ADMIN/CONFIRM_SET_SUCCESS',
    FAILURE:'ADMIN/CONFIRM_SET_FAILURE',
}

export const admin_confirm_set_request = createAction(ADMIN_CONFIRM_SET.REQUEST) 
export const admin_confirm_set_success = createAction(ADMIN_CONFIRM_SET.SUCCESS)
export const admin_confirm_set_failure = createAction(ADMIN_CONFIRM_SET.FAILURE)

const confirmSet = (state=initialState,action) => {
    switch(action.type){
        case ADMIN_CONFIRM_SET.REQUEST:
            return {
                ...state,
            }
        case ADMIN_CONFIRM_SET.SUCCESS:
            return {
                ...state,
                name:action.payload[0].store,
                station:action.payload[0].station,
                line:action.payload[0].line,
                address:action.payload[0].address,
                parking:action.payload[0].parking,
                protein:action.payload[0].protein,
                photo:action.payload[0].photo,
                special:action.payload[0].special,
                operhour:action.payload[0].operhour,
                website:action.payload[0].sns,
                menu:action.payload[0].menu,
                beverage:action.payload[0].beverage,
                tel:action.payload[0].contact,
                intro:action.payload[0].intro,
                user : { ...state.user,
                    email : action.payload[0].email
                }
            }
        case ADMIN_CONFIRM_SET.FAILURE:
            return {
                ...state
            }
        
        default:
            return state;
    }
}

export default confirmSet