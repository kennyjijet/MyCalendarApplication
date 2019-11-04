import { combineReducers } from 'redux';
import markDateReducer from './markDateReducer';

export default combineReducers({
    markedDates: markDateReducer
});
