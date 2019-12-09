import React, { Component, Fragment } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './containers/Header/HeaderContainer';
import Home from './containers/Home/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import AddAdvert from './components/AddAdvert';
import AllAdverts from './containers/AllAdverts/AllAdverts';
import BookedAdverts from './containers/BookedAdverts/BookedAdverts';
import MyAccount from './containers/MyAccount/MyAccount';
import MyAdverts from './containers/MyAdvert/MyAdvert';
import Users from './containers/Users/Users';
import { fetchAdverts, userLogIn, userRegister, fetchFilterAdverts } from './utils/apiHandlers';

class App extends Component {
    state = {
        searchResult: [],
        adverts: [],
        selectedAddress: '',
        user: {
            role: null,
            name: null,
            email: null
        },
        isSignUpModalOpen: false,
        isSignInModalOpen: false,
        logInErrorMessage: null,
        addAdvertErrorMessage: null,
        isAddAdvertModalOpen: false
    };

    componentDidMount() {
        /**
         * Retrieve list of adverts limited by 4, when page is loaded
         */
        const params = {_limit: 4};
        this.getAdverts(params);
    }

    getAdverts = async params => {
        const { error, data: adverts } = await fetchAdverts(params);
        if (!error) {
            this.setState({
                searchResult: adverts,
                adverts: adverts
            });
        }
    };

    getAdvertsByUser = async params => {
        const { error, data: adverts } = await fetchAdverts(params);
        if (!error) {
            this.setState({
                adverts: adverts
            });
        }
    };

    getBookedAdvertsByUser = async params => {
        const { error, data: adverts } = await fetchAdverts(params);
        if (!error) {
            this.setState({
                adverts: adverts
            });
        }
    };

    handleRegisterUser = async params => {
        const { error, data: user } = await userRegister(params);
        if (!error) {
            this.setState({
                user,
                isSignUpModalOpen: false
            });
        } else {
            this.setState({
                logInErrorMessage: error
            })
        }
    };

    handleLogInUser = async params => {
        const { error, data: user } = await userLogIn(params);
        if (!error) {
            this.setState({
                user,
                isSignInModalOpen: false
            });
        } else {
            this.setState({
                logInErrorMessage: 'No such user or password is incorrect'
            })
        }
    };

    handleAddAdvert = params => {
        //TODO: Add axios call

        //On success
        // this.setState({isAddAdvertModalOpen: false});
        //On error
        // this.setState( { addAdvertErrorMessage: 'Please fill all fields' } )
    };

    handleAddressesSearch = e => {
        const selectedAddress = e.target.value;
        const searchResult = this.state.adverts.filter(advert => advert.address.match(selectedAddress));
        this.setState({ searchResult, selectedAddress });
    };

    checkParams = params => {
        var new_params = []
        Object.entries(params).forEach(([key, value]) => {
            if(value !== "") {
                new_params.push({key: value});
            }
        });
        console.log(new_params);
        return new_params;
    }

    handleFilterAdverts = async params => {
        const new_params = this.checkParams(params);
        console.log(new_params);
        const { error, data: adverts } = await fetchFilterAdverts(new_params);
        if (!error) {
            this.setState({
                searchResult: adverts,
                adverts: adverts
            });
        }
    };

    handleSignUpSubmit = params => {
        this.setState({ isSignUpModalOpen: false });
        this.handleRegisterUser(params);
    };

    handleSignInSubmit = params => {
        this.handleLogInUser(params);
    };

    handleAddAdvertSubmit = params => {
        this.handleAddAdvert(params)
    };

    handleSignUpButtonClick = () => {
        this.setState({ isSignUpModalOpen: true })
    };

    handleAddAdvertButtonClick = () => {
        this.setState({ isAddAdvertModalOpen: true })
    };

    handleSignInButtonClick = () => {
        this.setState({ isSignInModalOpen: true })
    };

    handleLogOutButton = () => {
        //TODO: Do we need to send request to API ?
        this.setState({ user: {} })
    };

    handleOnSignUpHide = () => {
        this.setState( {isSignUpModalOpen: false})
    };

    handleOnSignInHide = () => {
        this.setState( {isSignInModalOpen: false})
    };

    handleOnAddAdvertHide = () => {
        this.setState( {isAddAdvertModalOpen: false})
    };

    onInformationChange = () => {
        this.setState({logInErrorMessage: null})
    };

    onAddAdvertInfoChange = () => {
        this.setState({addAdvertErrorMessage: null})
    };

    render() {
        return (
            <div className="App">
                <Router>
                    <Fragment>
                        <header>
                            <Container>
                                <Row className="justify-content-md-center">
                                    <Col xs={12}>
                                        <Header
                                            user={this.state.user}
                                            onLogOutClick={this.handleLogOutButton}
                                            onSignUpButtonClick={this.handleSignUpButtonClick}
                                            onSignInButtonClick={this.handleSignInButtonClick}
                                            onMyAdvertsClick={this.getAdvertsByUser}
                                            onBookedAdvertClick={this.getBookedAdvertsByUser}
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        </header>
                        <Switch>
                            <Route path="/all-adverts">
                                <AllAdverts />
                            </Route>
                            <Route path="/booked-advert">
                                <BookedAdverts
                                    adverts={this.state.adverts}
                                />
                            </Route>
                            <Route path="/my-advert">
                                <MyAdverts
                                    userRole={this.state.user.role}
                                    adverts={this.state.adverts} 
                                />
                            </Route>
                            <Route path="/my-account">
                                <MyAccount />
                            </Route>
                            <Route path="/users">
                                <Users />
                            </Route>
                            <Route path="/">
                                <section className="adverts-section">
                                    <Home
                                        searchResult={this.state.searchResult}
                                        selectedAddress={this.state.selectedAddress}
                                        user={this.state.user}
                                        handleFilterAdverts={this.handleFilterAdverts}
                                        handleAddressesSearch={this.handleAddressesSearch}
                                        handleAddAdvertButtonClick={this.handleAddAdvertButtonClick}
                                    />
                                </section>
                            </Route>
                        </Switch>
                    </Fragment>
                </Router>
                <Modal show={this.state.isSignUpModalOpen} onHide={this.handleOnSignUpHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>User registration</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <SignUp
                            onSubmit={this.handleSignUpSubmit}
                        />
                    </Modal.Body>
                </Modal>
                <Modal show={this.state.isSignInModalOpen} onHide={this.handleOnSignInHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>User authentication</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <SignIn
                            onSubmit={this.handleSignInSubmit}
                            errorMessage={this.state.logInErrorMessage}
                            onInformationChange={this.onInformationChange}
                        />
                    </Modal.Body>
                </Modal>
                <Modal show={this.state.isAddAdvertModalOpen} onHide={this.handleOnAddAdvertHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add advert</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <AddAdvert
                            onSubmit={this.handleAddAdvertSubmit}
                            errorMessage={this.state.addAdvertErrorMessage}
                            onAddAdvertInfoChange={this.onAddAdvertInfoChange}
                        />
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default App;
