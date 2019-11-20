import { FETCH_DATA_FROM_BACKEND } from '../actions/types';

const initialState = {
};

export default function (state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case FETCH_DATA_FROM_BACKEND:
            return {
                ...state,
                items: action.payload
            };
        default:
            return state;
    }
}
