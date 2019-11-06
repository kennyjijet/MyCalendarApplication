import { markDate } from '../actions/markDate';
import store from '../store';

export function testMockUp(getFullDate) {

    var markedDateData = {};
    markedDateData[getFullDate] = {
        markedDate: '1-10-2019',
        eventCategory: 'holiday'
    };
    markDate(markedDateData);
    return store.getState().markedDates['1-10-2019'];
}