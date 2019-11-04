import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import './style/EventCategory.scss';

class EventCategory extends React.Component {
    constructor(props) {
        super(props)
        this.classHolidayBtn = ['listGroupItem', 'holiday'];
        this.classBirthdayBtn = ['listGroupItem', 'birthday'];
        this.classBusyBtn = ['listGroupItem', 'busy'];
        this.classAnniversaryBtn = ['listGroupItem', 'anniversary'];
    }

    setBtn() {
        for (var value of this.props.categories) {
            if ((this.props.tempRefClassName.indexOf(value) > -1)
                ||
                (this.props.tempRefClassName.indexOf(value + 'Today') > -1)
            ) {
                if (value === 'holiday') {
                    this.classHolidayBtn.push('holidayActive');
                }
                else if (value === 'birthday') {
                    this.classBirthdayBtn.push('birthdayActive');
                }
                else if (value === 'busy') {
                    this.classBusyBtn.push('busyActive');
                }
                else if (value === 'anniversary') {
                    this.classAnniversaryBtn.push('anniversaryActive');
                }
            }
        }
    }

    render() {
        this.setBtn();
        return (
            <div className="eventCategoryCustomized">
                <h2 className='eventCategoryTitle'>ADD NEW EVENT</h2>
                <h3 className='eventCategoryDate'>{
                    String((String(this.props.day).length < 2 ? '0' +
                        this.props.day : this.props.day) + ' ' +
                        this.props.month + ' ' +
                        this.props.year)
                }</h3>
                <ListGroup className='listGroup'>
                    <ListGroup.Item className={this.classHolidayBtn}
                        onClick={() => this.props.addAndRemoveCategory(this.props.day, 'holiday')}>Holiday</ListGroup.Item>
                    <ListGroup.Item className={this.classBirthdayBtn}
                        onClick={() => this.props.addAndRemoveCategory(this.props.day, 'birthday')}>Birthday</ListGroup.Item>
                    <ListGroup.Item className={this.classBusyBtn}
                        onClick={() => this.props.addAndRemoveCategory(this.props.day, 'busy')}>Busy</ListGroup.Item>
                    <ListGroup.Item className={this.classAnniversaryBtn}
                        onClick={() => this.props.addAndRemoveCategory(this.props.day, 'anniversary')}>Anniversary</ListGroup.Item>
                </ListGroup>
                <Button className='clostBtn' onClick={this.props.close}> CLOSE </Button>
            </div>
        );
    }
}

export default EventCategory