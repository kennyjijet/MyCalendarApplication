import { MARK_DATE, FETCH_MARK_DATE } from '../actions/types';

const initialState = {
    markedDate: {
        markedDate: '',
        eventCategory: ''
    },
    markedDateList: []
};

export default function (state = initialState, action) {
    console.log(state);
    console.log(action.type);
    console.log(action.payload);


    switch (action.type) {
        case MARK_DATE:
            return action.payload
        case FETCH_MARK_DATE:
            return 'test'
        default:
            return state;
    }
}
