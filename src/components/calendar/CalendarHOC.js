import React from 'react';
import Modal from 'simple-react-modal'
import EventCategory from '../event_category/EventCategory';
import store from '../../store';

const calendarHOC = (PassedCalendarComponent, data) =>
    class CalendarHOC extends React.Component {

        constructor(props) {
            super(props)
            this.state = {
                data: data,
                showModal: false
            }
            this.month = '';
            this.year = '';
            this.weekDays = [];
            this.days = [];
            this.dayToModal = 0;
            this.tempRef = {}
            this.categories = ['holiday', 'birthday', 'busy', 'anniversary'];
            this.addAndRemoveCategory = this.addAndRemoveCategory.bind(this);


        }

        getFullDate(getDate) {
            return String(getDate + '-' + this.month + '-' + this.year)
        }

        showModalFunction(getDate) {
            this.dayToModal = getDate;
            this.tempRef = this.refs[this.getFullDate(getDate)];
            this.setState({ showModal: true })
        }

        closeModalFunction() {
            this.setState({ showModal: false })
        }

        isToday(getDate) {
            var today = new Date();
            var todayDate = today.getDate();
            var todayMonth = today.getMonth();
            var todayYear = today.getFullYear();

            return ((getDate === todayDate) &&
                (this.state.data.monthsName[todayMonth] === this.month) &&
                this.year === todayYear
            )
        }

        addAndRemoveCategory(getDate, classNameFromModal) {
            var addPrefix = 'Today';
            var tempClassNameFromModal = classNameFromModal;
            var categories = this.categories;
            if (this.isToday(getDate)) {
                tempClassNameFromModal += addPrefix;
                categories = this.categories.map(str => str + addPrefix);
            }
            // toggle class
            for (var classDup of categories) {
                if (classDup === tempClassNameFromModal) {
                    if (this.refs[this.getFullDate(getDate)].className.indexOf(tempClassNameFromModal) !== -1) {
                        this.refs[this.getFullDate(getDate)].classList.remove(classDup);
                        this.props.removeMarkedDateEventCategory(getDate);
                        this.closeModalFunction();
                        return;
                    }
                }
            }

            // change class
            for (var classRemove of categories) {
                this.refs[this.getFullDate(getDate)].classList.remove(classRemove);
                this.props.removeMarkedDateEventCategory(getDate);
            }
            // add class
            for (var classAdd of categories) {
                if (classAdd === tempClassNameFromModal) {
                    this.refs[this.getFullDate(getDate)].classList.add(classAdd);
                    this.props.markDateWithEventCategory(getDate, classAdd);
                }
            }
            this.closeModalFunction();
        }

        initializeCalendarData() {
            var _ = require('lodash');
            this.month = this.state.data.month;
            this.year = this.state.data.year;

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
                                        else if ((value % 7) === 0 || (value % 7) === 1) {
                                            className.push('weekEnd');
                                        } else {
                                            className.push('weekDays');
                                        }
                                        /* event for Holiday Birthday Busy Anniversary */
                                        //var checkstore.getState().

                                        return (
                                            <td className={className} key={value} onClick={() => this.showModalFunction(getDate)}
                                                ref={this.getFullDate(getDate)}>
                                                {getDate}
                                            </td>
                                        );
                                    } else {
                                        return (<td key={value}>{' '}</td>);
                                    }
                                } else {
                                    return (<td key={value}>{' '}</td>);
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
                <>
                    <PassedCalendarComponent
                        month={this.month}
                        weekDays={this.weekDays}
                        days={this.days}
                    />
                    <Modal show={this.state.showModal} onClose={() => this.closeModalFunction()}>
                        <EventCategory close={() => this.closeModalFunction()}
                            day={this.dayToModal}
                            month={this.month}
                            year={this.year}
                            addAndRemoveCategory={this.addAndRemoveCategory}
                            tempRefClassName={this.tempRef.className}
                            categories={this.categories}
                        >
                        </EventCategory>
                    </Modal>
                </>
            )
        }
    }

export default calendarHOC