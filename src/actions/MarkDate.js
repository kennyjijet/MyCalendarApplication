import { MARK_DATE, FETCH_MARK_DATE, FETCH_DATA_FROM_BACKEND } from './types';


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

export const fetchDataFromBackend = () => dispatch => {
    fetch('http://localhost:3001/my')
        .then(res => res.json())
        .then(posts =>
            dispatch({
                type: FETCH_DATA_FROM_BACKEND,
                payload: posts
            })
        );
};