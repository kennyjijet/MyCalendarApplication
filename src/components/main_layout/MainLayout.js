import React from 'react';
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
            monthsName: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            calendarData: {
                year: 2019,
                month: "",
                weekDays: ["Su", "M", "Tu", "W", "Th", "F", "Sa"],
                days: []
            },
            calendarRow: []
        }

        this.onClickLeftArrow = this.onClickLeftArrow.bind(this);
        this.onClickRightArrow = this.onClickRightArrow.bind(this);
        this.onClickTodayArrow = this.onClickTodayArrow.bind(this);

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
            var daysInOneMonthList = []
            for (var index = 0; index < this.state.monthsName.length; index++) {
                var daysInOneMonth = this.getDaysArray(this.state.calendarData.year, index + 1);
                daysInOneMonthList.push(daysInOneMonth);
            }
            console.log(daysInOneMonthList)
            /* 12 months */
            for (var i = 0; i < this.state.monthsName.length; i++) {
                var tempCalendarData = Object.assign({}, this.state.calendarData);
                tempCalendarData.month = this.state.monthsName[i];
                tempCalendarData.days = daysInOneMonthList[i];
                var MyCalendar = CalendarHOC(Calendar, tempCalendarData);
                this.state.calendarRow.push(<MyCalendar key={i} />);
            }
            this.setState({ screenLoaded: true });
        }, 500);
    }

    getDaysArray(year, month) {
        var monthIndex = month - 1;
        var date = new Date(year, monthIndex, 1);
        var result = [];
        while (date.getMonth() === monthIndex) {
            result.push(date.getDate() + '-' + date.getDay());
            date.setDate(date.getDate() + 1);
        }
        return result;
    }

    year() {
        return this.state.calendarData.year;
    }

    onClickLeftArrow() {
        var tempCalendarData = Object.assign({}, this.state.calendarData);
        tempCalendarData.year -= 1;
        this.setState({ calendarData: tempCalendarData });
    }

    onClickRightArrow() {
        var tempCalendarData = Object.assign({}, this.state.calendarData);
        tempCalendarData.year += 1;
        this.setState({ calendarData: tempCalendarData });
    }

    onClickTodayArrow() {
        var getCurrentYear = new Date().getFullYear()
        var tempCalendarData = Object.assign({}, this.state.calendarData);
        tempCalendarData.year = getCurrentYear;
        this.setState({ calendarData: tempCalendarData });
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
                                year={this.year()}

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