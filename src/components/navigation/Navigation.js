import React, { Component } from 'react';
//import { connect } from 'react-redux';
import { Navbar, Nav, Button } from 'react-bootstrap'

import './style/Navigation.scss'



class Navigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.leftArrow = "<";
        this.todayText = "Today";
        this.rightArrow = ">";

    }

    render() {
        return (
            <div className="navigation">
                <>
                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand><h4>Year {this.props.year}</h4></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav>
                                </Nav>
                            </Nav>
                            <Nav inline>
                                <Button className="navigation-btn" onClick={this.props.onClickLeftArrow}>{this.leftArrow}</Button>
                                <Button className="navigation-btn" onClick={this.props.onClickTodayArrow}>{this.todayText}</Button>
                                <Button className="navigation-btn" onClick={this.props.onClickRightArrow}>{this.rightArrow}</Button>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </>
            </div>
        );
    }
}

export default Navigation