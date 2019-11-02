import React from 'react';

const calendarHOC = (PassedCalendarComponent, data) =>
    class CalendarHOC extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                data: data
            }
        }
        componentDidMount() {

        }
        render() {
            return (
                <PassedCalendarComponent
                    data={this.state.data}
                />
            )
        }
    }

export default calendarHOC