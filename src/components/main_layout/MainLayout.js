import React from 'react';
import { connect } from 'react-redux';
import { markDate, fetchData, fetchDataFromBackend } from '../../actions/markDate';
import PropTypes from 'prop-types';
import store from '../../store';
import ReactLoading from "react-loading";
import CalendarHOCWrapper from '../calendar/CalendarHOC';
import Calendar from '../calendar/Calendar';
import Navigation from '../navigation/Navigation'

import './style/MainLayout.scss';


class MainLayout extends React.Component {
    constructor(props) {
        super(props)
        if (process.env.NODE_ENV !== 'production') {
            console.log('this is not production');
        }
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
            calendarRow: [],
            markedDateObj: {}
        }
        this.onClickLeftArrowBtn = this.onClickLeftArrowBtn.bind(this);
        this.onClickTodayBtn = this.onClickTodayBtn.bind(this);
        this.onClickRightArrowBtn = this.onClickRightArrowBtn.bind(this);
        this.markDateWithEventCategory = this.markDateWithEventCategory.bind(this);
        this.removeMarkedDateEventCategory = this.removeMarkedDateEventCategory.bind(this);

    }

    componentWillMount() {
        //this.props.markDate();
        //markedDateData[getFullMarkedDate] = {

        //};
        //this.props.markDate(markedDateData);
        //console.log(this.props.markDate());
        this.props.fetchData();
        //this.props.fetchDataFromBackend();
        //console.log("HEY!!!");
        //markedDates

    }

    componentDidMount() {
        this.renderCalendar()
    }

    componentWillReceiveProps(nextProps) {
        //console.log(nextProps);
        //if (nextProps) {
        //console.log(this.props.items);
        //console.log(nextProps.item.markedDates)
        //this.props.item.markedDates = nextProps.item.markedDates;
        //this.props.item.markedDates.markedDateList.push(nextProps.test1);
        //console.log(this.props.item);
        //this.props.item = 
        //}
    }

    initializeMarkedDate() {
        //this.setState({ markedDateObj: store.getState().markedDates })
        this.setState({ markedDateObj: {} })
    }

    removeMarkedDateEventCategory(getFullMarkedDate) {
        var markedDateData = this.props.items;
        delete markedDateData[getFullMarkedDate];
        this.props.markDate(markedDateData);
        //this.setState({ markedDateObj: markedDateData })
        console.log(this.props.items);
    }

    markDateWithEventCategory(getFullMarkedDate, eventCategory) {
        var markedDateData = this.props.items;
        markedDateData[getFullMarkedDate] = {
            markedDate: getFullMarkedDate,
            eventCategory: eventCategory
        };
        this.props.markDate(markedDateData);
        console.log(this.props.items);
        //this.setState({ markedDateObj: markedDateData })
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
                var MyCalendar = CalendarHOCWrapper(Calendar, tempCalendarData);
                this.state.calendarRow.push(<MyCalendar key={i}
                    markDateWithEventCategory={this.markDateWithEventCategory}
                    removeMarkedDateEventCategory={this.removeMarkedDateEventCategory}
                />);
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
                getDate: date.getDate(), // index of day 0 , 1, 2 ,3 ,4...
                getDay: date.getDay() // index of weekdays Sun, Mon, Tue...
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

    onClickLeftArrowBtn() {
        this.resetPage();
        if (this.state.screenLoaded) {
            var tempCalendarData = Object.assign({}, this.state.calendarData);
            tempCalendarData.year -= 1;
            this.setState({ calendarData: tempCalendarData });
            this.renderCalendar();
        }
    }

    onClickTodayBtn() {
        this.resetPage();
        if (this.state.screenLoaded) {
            var getCurrentYear = new Date().getFullYear()
            var tempCalendarData = Object.assign({}, this.state.calendarData);
            tempCalendarData.year = getCurrentYear;
            this.setState({ calendarData: tempCalendarData });
            this.renderCalendar();
        }
    }

    onClickRightArrowBtn() {

        this.resetPage();
        if (this.state.screenLoaded) {
            var tempCalendarData = Object.assign({}, this.state.calendarData);
            tempCalendarData.year += 1;
            this.setState({ calendarData: tempCalendarData });
            this.renderCalendar();
        }

    }

    render() {
        return (
            <div className="mainLayout">
                <Navigation
                    onClickLeftArrowBtn={this.onClickLeftArrowBtn}
                    onClickTodayBtn={this.onClickTodayBtn}
                    onClickRightArrowBtn={this.onClickRightArrowBtn}
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

MainLayout.propTypes = {
    fetchData: PropTypes.func.isRequired,
    fetchDataFromBackend: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    items: state.markedDates.items
    //items: state

});
//console.log(mapStateToProps);

export default connect(mapStateToProps, { markDate, fetchData, fetchDataFromBackend })(MainLayout);