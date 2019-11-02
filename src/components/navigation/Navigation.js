import React, { Component } from 'react';
//import { connect } from 'react-redux';
import { Navbar, Nav, Button } from 'react-bootstrap'

import './style/Navigation.scss'



class Navigation extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.leftArrow = "<"
        this.todayText = "Today"
        this.rightArrow = ">"

    }

    render() {
        return (
            <div className="navigation">
                <>
                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link >Home</Nav.Link>
                            </Nav>
                            <Nav inline>
                                <Button className="navigationBtn" variant="outline-success" onClick={this.props.onClickLeftArrow}>{this.leftArrow}</Button>
                                <Button className="navigationBtn" variant="outline-success" onClick={this.props.onClickLeftArrow}>{this.todayText}</Button>
                                <Button className="navigationBtn" variant="outline-success" onClick={this.props.onClickLeftArrow}>{this.rightArrow}</Button>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </>
            </div>
        );
    }
}

export default Navigation