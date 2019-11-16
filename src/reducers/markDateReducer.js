import { MARK_DATE, FETCH_MARK_DATE } from '../actions/types';

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
        case FETCH_MARK_DATE:
            return state
        default:
            return state;
    }
}
