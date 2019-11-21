import { MARK_DATE, FETCH_MARK_DATE } from '../actions/types';

const initialState = {
    /*
    markedDate: {
        markedDate: '',
        eventCategory: ''
    },
    markedDateList: []
    */
    items: {}
};

export default function (state = initialState, action) {
    console.log(action.type);
    switch (action.type) {
        case MARK_DATE:
            return {
                //items: action.payload
                //...state
                //...state, //return current state???
                items: action.payload
                //test: 'test'
            }
        //{ items: action.payload }
        //return { ...state, items: action.payload }
        //return action.payload;
        case FETCH_MARK_DATE:
            console.log("HERER");
            //return { test1: 'test', test: 'TEST' };
            return {
                ...state
            };

        default:
            console.log("HERER too");
            return state;
    }
}
