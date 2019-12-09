import React, { Component, Fragment } from 'react';
import { Navbar, Nav, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import userRoles from './../../utils/userRoles';
import './Header.css';

class Header extends Component {
    handleLogOutClick = () => {
        const { onLogOutClick } = this.props;
        onLogOutClick();
    };
    getRoleContent = userRole => {
        const { onSignUpButtonClick, onSignInButtonClick, onMyAdvertsClick, onBookedAdvertClick } = this.props;
        if (userRole === userRoles.tenant) {
            return (
                <Fragment>
                    <Link to="/my-account" className="nav-link">My account</Link>
                    <Link to="/booked-advert" className="nav-link" onClick={onBookedAdvertClick}>Booked adverts</Link>
                    <Link to="/" className="nav-link" onClick={this.handleLogOutClick}>Log out</Link>
                </Fragment>
            )
        } else if (userRole === userRoles.landlord) {
            return (
                <Fragment>
                    <Link to="/my-account" className="nav-link">My account</Link>
                    <Link to="/my-advert" className="nav-link" onClick={onMyAdvertsClick}>My adverts</Link>
                    <Link to="/booked-advert" className="nav-link" onClick={onBookedAdvertClick}>Booked adverts</Link>
                    <Link to="/" className="nav-link" onClick={this.handleLogOutClick}>Log out</Link>
                </Fragment>
            )
        } else if (userRole === userRoles.admin) {
            return (
                <Fragment>
                    <Link to="/my-account" className="nav-link">My account</Link>
                    <Link to="/users" className="nav-link">Users</Link>
                    <Link to="/all-adverts" className="nav-link">Adverts</Link>
                    <Link to="/" className="nav-link" onClick={this.handleLogOutClick}>Log out</Link>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <Nav.Link href="#signin" onClick={onSignInButtonClick}>Sign in</Nav.Link>
                    <Nav.Link href="#signup" onClick={onSignUpButtonClick}>Sign up</Nav.Link>
                </Fragment>
            )
        }
    };

    render() {
        const { user } = this.props;
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand><Link to='/'>Find your dream</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav>{this.getRoleContent(user.role)}</Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Header;