import React from 'react';

const calendarHOC = (PassedCalendarComponent, data) =>
    class CalendarHOC extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                data: data
            }
            this.month = null;
            this.weekDays = null;
            this.days = null;
        }
        initializeCalendarData() {
            var _ = require('lodash');
            this.month = this.state.data.month;
            this.weekDays = this.state.data.weekDays.map((value, index) => {
                return (<th key={index}>{value}</th>)
            });
            var calendarIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34]
            var calendarChunked = _.chunk(calendarIndex, 7);
            var tempDays = this.state.data.days;
            var daysIndex = 0;
            this.days = calendarChunked.map((index) => {

                return (
                    <tr key={index}>
                        {
                            index.map((value) => {
                                if (tempDays[daysIndex] != null) {
                                    var strSplited = tempDays[daysIndex].split("-");
                                    if (parseInt(strSplited[1]) === (value % 7)) {
                                        daysIndex++;
                                        var className = "weekDays";
                                        if ((value % 7) === 0 || (value % 7) === 6) {
                                            className = "weekEnd";
                                        }
                                        return (<td className={className} key={value}>{strSplited[0]}</td>)
                                    } else {
                                        return (<td key={value}>{' '}</td>)
                                    }
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