import { createAction } from "redux-actions";

const initialState = {
    info: null,
    review: null,
    avg: null,
    img : {
        img1 : null,
        img2 : null,
        img3 : null
    }
};

const SHOP = {
    REQUEST: "SHOP_REQUEST",
    SUCCESS: "SHOP_SUCCESS",
    FAILURE: "SHOP_FAILURE"
};

export const shop_request = createAction(SHOP.REQUEST, payload => payload);
export const shop_success = createAction(SHOP.SUCCESS, payload => payload);
export const shop_failure = createAction(SHOP.FAILURE, payload => payload);

const shop = (state = initialState, action) => {
    switch (action.type) {
        case SHOP.REQUEST:
            return {
                ...state,
            }
        case SHOP.SUCCESS:
            return {
                ...state,
                info: action.payload.info,
                review: action.payload.review,
                avg: action.payload.avg,
                img : {
                    ...state.img,
                    img1 : action.payload.info.img1,
                    img2 : action.payload.info.img2,
                    img3 : action.payload.info.img3
                }
            }
        case SHOP.FAILURE:
            return {
                ...state,
            }
        default:
            return {
                ...state,
            }
    }
};

export default shop;