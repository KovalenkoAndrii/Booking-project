import React, { Component } from 'react';
import {Form, Button, Alert, Col, Row } from 'react-bootstrap';

class AddAdvert extends Component {
    state = {
        address: '',
        description: '',
        countPeople: 1,
        withAnimals: false,
        price: 0,
        photoPath: '',
        isError: false
    };

    handleAddress = e => {
        const address = e.target.value;
        const { onAddAdvertInfoChange } = this.props;
        onAddAdvertInfoChange();
        this.setState({ address, isError: false });
    };

    handleDescription = e => {
        const description = e.target.value;
        const { onAddAdvertInfoChange } = this.props;
        onAddAdvertInfoChange();
        this.setState({ description, isError: false });
    };

    handleCountPeople = e => {
        const countPeople = e.target.value;
        const { onAddAdvertInfoChange } = this.props;
        onAddAdvertInfoChange();
        this.setState({ countPeople, isError: false });
    };

    handleWithAnimals = e => {
        const withAnimals = e.target.checked;
        const { onAddAdvertInfoChange } = this.props;
        onAddAdvertInfoChange();
        this.setState({ withAnimals });
    };

    handlePrice = e => {
        const price = e.target.value;
        const { onAddAdvertInfoChange } = this.props;
        onAddAdvertInfoChange();
        this.setState({ price, isError: false });
    };

    handlePhotoPath = e => {
        const photoPath = e.target.value;
        const { onAddAdvertInfoChange } = this.props;
        onAddAdvertInfoChange();
        this.setState({ photoPath, isError: false });
    };

    handleOnSubmit = e => {
        e.preventDefault();
        this.handleCheckFields();
        if (!this.isError) {
            const { onSubmit } = this.props;
            onSubmit(this.state);
        }
    };

    handleCheckFields = () => {
        const { address, description, price, photoPath } = this.state;

        if (address === '' || description === '' || price === 0 || photoPath === '') {
            this.setState({ isError: true });
        }
    }

    render() {
        const { errorMessage } = this.props;
        const { isError } = this.state;
        return (
            <Form>
                <Form.Group controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter address"
                        onChange={this.handleAddress}
                        value={this.state.address}
                    />
                </Form.Group>
                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter description"
                        onChange={this.handleDescription}
                        value={this.state.description}
                    />
                </Form.Group>
                <Form.Group controlId="formAddCountPeople">
                    <Row>
                        <Col xs={3} sm={4}>
                            <Form.Label>Count people:</Form.Label>
                        </Col>
                        <Col lg={3} sm={3} xs={3}>
                            <Form.Control
                                as="select"
                                onChange={this.handleCountPeople}
                                value={this.state.countPeople}
                            >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </Form.Control>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check
                        type="checkbox"
                        label="Allow with animals"
                        onChange={this.handleWithAnimals}
                        value={this.state.withAnimals}
                    />
                </Form.Group>
                <Form.Group controlId="formPrice">
                    <Form.Label>Price per day</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter price"
                        onChange={this.handlePrice}
                        value={this.state.price}
                    />
                </Form.Group>
                <Form.Group controlId="formDescription">
                    <Form.Label>Input path to the photo</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter path"
                        onChange={this.handlePhotoPath}
                        value={this.state.photoPath}
                    />
                </Form.Group>

                {
                    isError && (
                        <Alert variant={'warning'}>
                            Please fill all the fields !
                        </Alert>
                    )
                }
                {
                    errorMessage && (
                        <Alert variant={'danger'}>
                            {errorMessage}
                        </Alert>
                    )
                }

                <Button 
                    variant="primary" 
                    onClick={this.handleOnSubmit}
                    disabled={this.state.isError}>
                    Submit
                </Button>
            </Form>
        )
    }
}

export default AddAdvert;
