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
        return (
            <div className="calendar">
                <div className="calendar-container">
                    <div className="month">{this.state.month}</div>
                    <table className="tableCustom">
                        <thead className="table-header">
                            <tr>
                                {this.state.weekDays}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.days}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
export default Calendar;