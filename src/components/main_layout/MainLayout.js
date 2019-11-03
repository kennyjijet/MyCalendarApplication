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
            calendarData: {
                year: new Date().getFullYear(),
                month: "",
                weekDays: ["Su", "M", "Tu", "W", "Th", "F", "Sa"],
                days: [],
                monthsName: ["January", "February", "March", "April", "May", "June", "July",
                    "August", "September", "October", "November", "December"],
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
            var daysInOneMonthList = [];
            /* Create days in one month */
            for (var index = 0; index < this.state.calendarData.monthsName.length; index++) {
                var daysInOneMonth = this.getDaysArray(this.state.calendarData.year, index + 1);
                daysInOneMonthList.push(daysInOneMonth);
            }

            /* create calendar */
            for (var i = 0; i < this.state.calendarData.monthsName.length; i++) {
                var tempCalendarData = Object.assign({}, this.state.calendarData);
                tempCalendarData.month = this.state.calendarData.monthsName[i];
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
            var getDateData = {
                getDate: date.getDate(),
                getDay: date.getDay()
            };
            result.push(
                getDateData
            );
            date.setDate(date.getDate() + 1);
        }
        return result;
    }

    resetPage() {
        this.setState({ screenLoaded: false });
        this.setState({ calendarRow: [] });
    }

    onClickLeftArrow() {
        this.resetPage();
        if (this.state.screenLoaded) {
            var tempCalendarData = Object.assign({}, this.state.calendarData);
            tempCalendarData.year -= 1;
            this.setState({ calendarData: tempCalendarData });
            this.renderCalendar();
        }
    }

    onClickRightArrow() {

        this.resetPage();
        if (this.state.screenLoaded) {
            var tempCalendarData = Object.assign({}, this.state.calendarData);
            tempCalendarData.year += 1;
            this.setState({ calendarData: tempCalendarData });
            this.renderCalendar();
        }

    }

    onClickTodayArrow() {
        this.resetPage();
        if (this.state.screenLoaded) {
            var getCurrentYear = new Date().getFullYear()
            var tempCalendarData = Object.assign({}, this.state.calendarData);
            tempCalendarData.year = getCurrentYear;
            this.setState({ calendarData: tempCalendarData });
            this.renderCalendar();
        }
    }


    render() {
        return (
            <div className="mainLayout">
                <Navigation
                    onClickLeftArrow={this.onClickLeftArrow}
                    onClickRightArrow={this.onClickRightArrow}
                    onClickTodayArrow={this.onClickTodayArrow}
                    year={this.state.calendarData.year}

                />
                {!this.state.screenLoaded ? (
                    <ReactLoading className="AppLoadingStyle" type={"bars"} color={"white"} />
                ) : (
                        <div>

                            {this.state.calendarRow}
                        </div>
                    )
                }
                <div>
                    Developed by Jittarin Jetwiriyanon (I want to get a job).
                </div>
            </div>
        )
    }
}

export default MainLayout