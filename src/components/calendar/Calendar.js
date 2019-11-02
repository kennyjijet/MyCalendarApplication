import React from 'react';
import '../calendar/style/Calendar.scss';

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props
        }
    }
    render() {
        var month = this.state.data.month
        var daysData = this.state.data.days.map((value, index) => {
            return (<th key={index}>{value}</th>)
        });
        return (
            <div className="calendar">
                <div className="calendar-container">
                    <div className="month">{month}</div>
                    <table>
                        <thead>
                            <tr>
                                {daysData}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default Calendar;