import { MARK_DATE, FETCH_MARK_DATE } from '../actions/types';

const initialState = {
    markedDate: {
        markedDate: '',
        eventCategory: ''
    },
    markedDateList: []
};

export default function (state = initialState, action) {
    console.log(action.type);
    switch (action.type) {
        case MARK_DATE:
            return action.payload;
        case FETCH_MARK_DATE:
            console.log("HERER");
            return { test1: 'test', test: 'TEST' };
        /* 
         return {
            ...state,
            items: action.payload
        };
        */
        default:
            console.log("HERER too");
            return state;
    }
}
