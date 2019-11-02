import React from 'react';
import moment from 'moment';

import CalendarHOC from '../calendar/CalendarHOC';
import Calendar from '../calendar/Calendar';

import '../main_layout/style/MainLayout.scss';


class MainLayout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dateContext: moment(),
            days: ["Su", "M", "Tu", "W", "Th", "F", "Sa"]
        }
    }

    componentDidMount() {

    }

    render() {

        var rows = [];
        for (var i = 0; i < 12; i++) {
            var MyCalendar = CalendarHOC(Calendar, this.state)
            rows.push(<MyCalendar key={i} />);
        }
        return (
            <div className="mainLayout">
                {
                    rows
                }
            </div>
        )
    }
}

export default MainLayout