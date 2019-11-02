import React from 'react';
import moment from 'moment';
import ReactLoading from "react-loading";
import CalendarHOC from '../calendar/CalendarHOC';
import Calendar from '../calendar/Calendar';
import Navigation from '../navigation/Navigation'

import './style/MainLayout.scss';


class MainLayout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            screenLoaded: false,
            months: moment.months(),
            calendarData: {
                month: "",
                days: ["Su", "M", "Tu", "W", "Th", "F", "Sa"],
            },
            calendarRow: []
        }

        this.onClickLeftArrow = this.onClickLeftArrow.bind(this);
    }
    componentDidMount() {
        this.renderCalendar()
    }

    componentWillUnmount() {
        this.calendarData = {}
        this.rows = []
    }

    renderCalendar() {
        setTimeout(() => {
            /* 12 months */
            for (var i = 0; i < this.state.months.length; i++) {
                var monthName = this.state.months[i];
                var tempCalendarData = Object.assign({}, this.state.calendarData);
                tempCalendarData.month = monthName
                this.setState({ calendarData: tempCalendarData })
                var MyCalendar = CalendarHOC(Calendar, this.state.calendarData)
                this.state.calendarRow.push(<MyCalendar key={i} />);
            }
            this.setState({ screenLoaded: true });
        }, 500);
    }

    onClickLeftArrow() {
        this.setState({ calendarRow: [] });
        //this.setState({ screenLoaded: false });
    }

    render() {
        return (
            <div className="mainLayout">
                {!this.state.screenLoaded ? (
                    <ReactLoading className="LoadingStyle" type={"bars"} color={"white"} />
                ) : (
                        <div>
                            <Navigation onClickLeftArrow={this.onClickLeftArrow} />
                            {this.state.calendarRow}
                        </div>
                    )
                }
            </div>
        )
    }
}

export default MainLayout