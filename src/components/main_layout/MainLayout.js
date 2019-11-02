import React from 'react';
import moment from 'moment';
import ReactLoading from "react-loading";

import CalendarHOC from '../calendar/CalendarHOC';
import Calendar from '../calendar/Calendar';

import '../main_layout/style/MainLayout.scss';


class MainLayout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dateContext: moment(),
            days: ["Su", "M", "Tu", "W", "Th", "F", "Sa"],
            months: moment.months(),
            screenLoaded: false,
        }
        this.calendarData = {}
        this.rows = [];

    }
    componentDidMount() {
        setTimeout(() => {
            /* 12 months */
            for (var i = 0; i < 12; i++) {
                var MyCalendar = CalendarHOC(Calendar, this.state)
                this.rows.push(<MyCalendar key={i} />);
            }
            this.setState({ screenLoaded: true });
        }, 500);
    }

    componentWillUnmount() {
        this.calendarData = {}
        this.rows = []
    }


    render() {
        return (
            <div className="mainLayout">
                {!this.state.screenLoaded ? (
                    <ReactLoading className="LoadingStyle" type={"bars"} color={"white"} />
                ) : (
                        this.rows
                    )}
            </div>
        )
    }
}

export default MainLayout