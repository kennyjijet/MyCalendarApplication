import { combineReducers } from 'redux';
import markDateReducer from './markDateReducer';
import backendDataReducer from './backendDataReducer';


export default combineReducers({
    markedDates: markDateReducer,
    backendDatas: backendDataReducer
});
