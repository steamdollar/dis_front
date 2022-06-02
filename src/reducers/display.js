const initialState = {
    display: 'none',
};

const SHOW = 'SHOW';
const HIDDEN = 'HIDDEN';

export const show = (payload) => ({type: SHOW, payload});
export const hidden = (payload) => ({type: HIDDEN, payload});

const display = (state = initialState, action) => {
    switch (action.type) {
        case SHOW:
            return {
                ...state,
                display: 'block',
            }
        case HIDDEN:
            return {
                ...state,
                display: 'none',
            }
        default:
            return {
                ...state,
            }
    }
};

export default display;