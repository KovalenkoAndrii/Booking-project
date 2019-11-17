import React, { Component, Fragment } from 'react';
import { Navbar, Nav, } from 'react-bootstrap';

class Header extends Component {

    getRoleContent = userRole => {
        if (userRole === 'tenant') {
            return (
                <Fragment>
                    <Nav.Link href="#myaccount">My account</Nav.Link>
                    <Nav.Link href="#booked">Booked adverts</Nav.Link>
                    <Nav.Link href="#logout">Log out</Nav.Link>
                </Fragment>
            )
        } else if (userRole === 'landlord') {
            return (
                <Fragment>
                    <Nav.Link href="#myaccount">My account</Nav.Link>
                    <Nav.Link href="#myadverts">My adverts</Nav.Link>
                    <Nav.Link href="#booked">Booked adverts</Nav.Link>
                    <Nav.Link href="#logout">Log out</Nav.Link>
                </Fragment>
            )
        } else if (userRole === 'admin') {
            return (
                <Fragment>
                    <Nav.Link href="#myaccount">My account</Nav.Link>
                    <Nav.Link href="#users">Users</Nav.Link>
                    <Nav.Link href="#adverts">Adverts</Nav.Link>
                    <Nav.Link href="#logout">Log out</Nav.Link>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <Nav.Link href="#signin">Sign in</Nav.Link>
                    <Nav.Link href="#signup">Sign up</Nav.Link>
                </Fragment>
            )
        }
    };

    render() {
        const { user } = this.props;
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">Find your dream</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav>
                        {
                            user && this.getRoleContent(user.role)
                        }

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Header;