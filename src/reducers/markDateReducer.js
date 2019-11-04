import { MARK_DATE, GET_MARK_DATE } from '../actions/types';

const initialState = {
    markedDate: {
        markedDate: '',
        eventCategory: ''
    },
    markedDateList: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case MARK_DATE:
            return action.payload
        case GET_MARK_DATE:
            return state
        default:
            return state;
    }
}
