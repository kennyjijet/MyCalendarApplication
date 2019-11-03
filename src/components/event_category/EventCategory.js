import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import './style/EventCategory.scss';

class EventCategory extends React.Component {
    render() {
        return (
            <div className="eventCategoryCustomized">
                <h2 className='eventCategoryTitle'>ADD NEW EVENT</h2>
                <h3 className='eventCategoryDate'>{

                    String((String(this.props.day).length < 2 ? '0' + this.props.day : this.props.day) + ' ' + this.props.month + ' ' + this.props.year)
                }</h3>
                <ListGroup className='listGroup'>
                    <ListGroup.Item className='listGroupItem'>Holiday</ListGroup.Item>
                    <ListGroup.Item className='listGroupItem'>Birthday</ListGroup.Item>
                    <ListGroup.Item className='listGroupItem'>Busy</ListGroup.Item>
                    <ListGroup.Item className='listGroupItem'>Anniversary</ListGroup.Item>
                </ListGroup>
                <Button className='clostBtn' onClick={this.props.close}> CLOSE </Button>
            </div>
        );
    }
}

export default EventCategory