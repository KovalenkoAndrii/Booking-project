import React, { Component } from 'react';
import {Form, Button, Alert} from 'react-bootstrap';

class SignIn extends Component {
    state = {
        email: '',
        password: '',
    };

    handleEmail = e => {
        const email = e.target.value;
        const { onInformationChange } = this.props;
        onInformationChange();
        this.setState({ email });
    };

    handlePassword = e => {
        const password = e.target.value;
        const { onInformationChange } = this.props;
        onInformationChange();
        this.setState({ password });
    };

    handleOnSubmit = e => {
        e.preventDefault();
        const { onSubmit } = this.props;
        onSubmit(this.state);
    };

    render() {
        const { errorMessage } = this.props;
        return (
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        onChange={this.handleEmail}
                        value={this.state.email}
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
                {
                    errorMessage && (
                        <Alert variant={'danger'}>
                            {errorMessage}
                        </Alert>
                    )
                }

                <Button variant="primary" onClick={this.handleOnSubmit}>
                    Submit
                </Button>
            </Form>
        )
    }
}

export default SignIn;
