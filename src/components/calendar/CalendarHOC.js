import React from 'react';

const calendarHOC = (PassedCalendarComponent, data) =>
    class CalendarHOC extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                data: data
            }
            this.month = "";
            this.weekDays = [];
            this.days = [];
        }

        isToday(getDate) {
            var today = new Date();
            var todayDate = today.getDate();
            var todayMonth = today.getMonth();
            var todayYear = today.getFullYear();

            return ((getDate === todayDate) &&
                (this.state.data.monthsName[todayMonth] === this.month) &&
                this.state.data.year === todayYear
            )
        }

        onClickToMark

        initializeCalendarData() {
            var _ = require('lodash');
            this.month = this.state.data.month;
            this.weekDays = this.state.data.weekDays.map((value, index) => {
                return (<th key={index}>{value}</th>)
            });
            var calendarSize = [
                1, 2, 3, 4, 5, 6, 7,
                8, 9, 10, 11, 12, 13, 14,
                15, 16, 17, 18, 19, 20, 21,
                22, 23, 24, 25, 26, 27, 28,
                29, 30, 31, 32, 33, 34, 35,
                36, 37, 38, 39, 40, 41, 42
            ];

            var calendarChunked = _.chunk(calendarSize, 7);
            var days = this.state.data.days;
            var daysIndex = 0;


            this.days = calendarChunked.map((index) => {
                return (
                    <tr key={index}>
                        {
                            index.map((value) => {
                                if (days[daysIndex] != null) {
                                    var getDate = days[daysIndex].getDate;
                                    var getDay = days[daysIndex].getDay;
                                    if (parseInt(getDay) === (value % 7)) {
                                        daysIndex++;
                                        var className = [];
                                        if (this.isToday(getDate)) {
                                            className.push('currentDay');
                                        }
                                        else if ((value % 7) === 0 || (value % 7) === 6) {
                                            className.push('weekEnd');
                                        } else {
                                            className.push('weekDays');
                                        }

                                        /* status for Holiday Birthday Busy Anniversary */


                                        return (<td className={className} key={value}>{getDate}</td>)
                                    } else {
                                        return (<td key={value}>{' '}</td>)
                                    }
                                } else {
                                    return (<td key={value}>{' '}</td>)
                                }
                            })
                        }
                    </tr>
                );
            });
        }
        render() {
            this.initializeCalendarData();
            return (
                <PassedCalendarComponent
                    month={this.month}
                    weekDays={this.weekDays}
                    days={this.days}
                />
            )
        }
    }

export default calendarHOC