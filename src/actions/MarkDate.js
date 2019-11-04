import { MARK_DATE } from './types';


export const markDate = data => dispatch => {
    dispatch({
        type: MARK_DATE,
        payload: data
    })
};
