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
            this.classNameList = []
            this.categories = ['holiday', 'birthday', 'busy', 'anniversary'];
            this.addAndRemoveCategory = this.addAndRemoveCategory.bind(this);
        }

        getFullDate(getDate) {
            return String(getDate + '-' + this.month + '-' + this.year)
        }

        showModalFunction(getDate) {
            this.dayToModal = getDate;
            this.classNameList = this.refs[this.getFullDate(getDate)].className;
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

        isTodayFullDate(fullDate) {
            var today = new Date();
            var checkDate = new Date(fullDate);
            return (checkDate.getDate() === today.getDate() &&
                checkDate.getMonth() === today.getMonth() &&
                checkDate.getFullYear() === today.getFullYear()
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
                        this.props.removeMarkedDateEventCategory(this.getFullDate(getDate));
                        this.closeModalFunction();
                        return;
                    }
                }
            }

            // change class
            for (var classRemove of categories) {
                this.refs[this.getFullDate(getDate)].classList.remove(classRemove);
                this.props.removeMarkedDateEventCategory(this.getFullDate(this.getFullDate(getDate)));
            }

            // add class
            for (var classAdd of categories) {
                if (classAdd === tempClassNameFromModal) {
                    this.refs[this.getFullDate(getDate)].classList.add(classAdd);
                    this.props.markDateWithEventCategory(this.getFullDate(getDate), classAdd);
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
                0, 1, 2, 3, 4, 5, 6,
                7, 8, 9, 10, 11, 12, 13,
                14, 15, 16, 17, 18, 19, 20,
                21, 22, 23, 24, 25, 26, 27,
                28, 29, 30, 31, 32, 33, 34,
                35, 36, 37, 38, 39, 40, 41
            ];

            var calendarChunked = _.chunk(calendarSize, 7);
            var days = this.state.data.days;
            var daysIndex = 0;
            this.days = calendarChunked.map((indexRow) => {
                return (
                    <tr key={indexRow}>
                        {
                            indexRow.map((indexCol) => {
                                if (days[daysIndex] != null) {
                                    var getDate = days[daysIndex].getDate;
                                    var getDay = days[daysIndex].getDay;
                                    if (parseInt(getDay) === (indexCol % 7)) {
                                        daysIndex++;
                                        var classNameList = [];
                                        if (this.isToday(getDate)) {
                                            classNameList.push('currentDay');
                                        }
                                        else if ((indexCol % 7) === 0 || (indexCol % 7) === 6) {
                                            classNameList.push('weekEnd');
                                        } else {
                                            classNameList.push('weekDays');
                                        }
                                        /* event for Holiday Birthday Busy Anniversary */
                                        var markedDate = store.getState().markedDates[this.getFullDate(getDate)];
                                        if (markedDate != null) {
                                            if (!this.isTodayFullDate(markedDate.markedDate) &&
                                                markedDate.eventCategory.indexOf('Today') !== -1) {
                                                var removeTodayClass = markedDate.eventCategory.replace("Today", "");
                                                this.props.markDateWithEventCategory(this.getFullDate(getDate), removeTodayClass);
                                                classNameList.push(removeTodayClass);
                                            } else {
                                                classNameList.push(markedDate.eventCategory);
                                            }
                                        }
                                        return (
                                            <td className={classNameList.toString().replace(",", " ")} key={indexCol}
                                                onClick={() => this.showModalFunction(getDate)}
                                                ref={this.getFullDate(getDate)}>
                                                {getDate}
                                            </td>
                                        );
                                    } else {
                                        return (<td key={indexCol}>{' '}</td>);
                                    }
                                } else {
                                    return (<td key={indexCol}>{' '}</td>);
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
                            tempRefClassName={this.classNameList}
                            categories={this.categories}
                        >
                        </EventCategory>
                    </Modal>
                </>
            )
        }
    }

export default calendarHOC