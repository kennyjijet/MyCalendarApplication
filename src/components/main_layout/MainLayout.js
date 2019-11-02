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
            dateMoment: moment(),
            screenLoaded: false,
            months: moment.months(),
            calendarData: {
                month: "",
                days: ["Su", "M", "Tu", "W", "Th", "F", "Sa"],
            },
            calendarRow: [],
            navigationData: {}
        }
        this.onClickLeftArrow = this.onClickLeftArrow.bind(this);
        this.onClickRightArrow = this.onClickRightArrow.bind(this);
        this.onClickTodayArrow = this.onClickTodayArrow.bind(this);

    }
    componentDidMount() {
        alert(this.year())
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

    year() {
        return this.state.dateMoment.format("Y");
    }

    onClickLeftArrow() {
        //this.setState({ calendarRow: [] });
    }
    onClickRightArrow() {
        //this.setState({ calendarRow: [] });
    }
    onClickTodayArrow() {
        //this.setState({ calendarRow: [] });
    }


    render() {
        return (
            <div className="mainLayout">
                {!this.state.screenLoaded ? (
                    <ReactLoading className="LoadingStyle" type={"bars"} color={"white"} />
                ) : (
                        <div>
                            <Navigation
                                onClickLeftArrow={this.onClickLeftArrow}
                                onClickRightArrow={this.onClickRightArrow}
                                onClickTodayArrow={this.onClickTodayArrow}

                            />
                            {this.state.calendarRow}
                        </div>
                    )
                }
            </div>
        )
    }
}

export default MainLayout