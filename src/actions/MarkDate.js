import { MARK_DATE, FETCH_MARK_DATE } from './types';


export const markDate = data => dispatch => {
    dispatch({
        type: MARK_DATE,
        payload: data
    })
};


export const fetchData = () => dispatch => {
    dispatch({
        type: FETCH_MARK_DATE,
        payload: null
    })
};
