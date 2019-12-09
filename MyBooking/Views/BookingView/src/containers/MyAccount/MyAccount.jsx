import React, { Component } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';

class MyAccount extends Component {
    state = {
        email: '',
        name: '',
        surname: '',
        phoneNumber: '',
        password: '',
        repeatPassword: '',
        isLandLord: false,
        isError: false,
    };

    handleName = e => {
        const name = e.target.value;
        this.setState({ name });
    };

    handleSurame = e => {
        const surname = e.target.value;
        this.setState({ surname });
    };

    handlePhoneNumber = e => {
        const phoneNumber = e.target.value;
        this.setState({ phoneNumber });
    };

    handleEmail = e => {
        const email = e.target.value;
        this.setState({ email });
    };

    handlePassword = e => {
        const password = e.target.value;
        this.setState({ password });
    };

    handleRepeatPassword = e => {
        const repeatPassword = e.target.value;
        this.setState({ repeatPassword, isError: false });
    };

    handleIsLandLord = e => {
        const isLandLord = e.target.checked;
        this.setState({ isLandLord });
    };

    handleOnSubmit = e => {
        e.preventDefault();
        const { onSubmit } = this.props;
        onSubmit(this.state);
    };

    handleCheckPasswords = () => {
        const { password, repeatPassword } = this.state;
        if (password !== repeatPassword) {
            this.setState({ isError: true })
        }
    };

    render() {
        const { isError } = this.state;
        return (
            <Form>
                <Row className="justify-content-md-center">
                    <Col xs={8} sm={4}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                onChange={this.handleEmail}
                                value={this.state.email}
                            />
                        </Form.Group>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                onChange={this.handleName}
                                value={this.state.name}
                            />
                        </Form.Group>
                        <Form.Group controlId="formSurname">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter surname"
                                onChange={this.handleSurame}
                                value={this.state.surname}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPhoneNumber">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter phone number"
                                onChange={this.handlePhoneNumber}
                                value={this.state.phoneNumber}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={this.handlePassword}
                                value={this.state.password}
                            />
                        </Form.Group>
                        <Form.Group controlId="formRepeatPassword">
                            <Form.Label>Repeat password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Repeat password"
                                onChange={this.handleRepeatPassword}
                                onBlur={this.handleCheckPasswords}
                                value={this.state.repeatPassword}
                            />
                        </Form.Group>
                        {
                            isError && (
                                <Alert variant={'warning'}>
                                    Your passwords are not similar !
                        </Alert>
                            )
                        }
                        <Button
                            variant="primary"
                            onClick={this.handleOnSubmit}
                            disabled={this.state.isError}
                        >
                            Submit
                </Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default MyAccount;
