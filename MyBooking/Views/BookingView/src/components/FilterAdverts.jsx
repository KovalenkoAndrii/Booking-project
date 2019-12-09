import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

class FilerAdverts extends React.Component {
    state = {
        minCost: '',
        maxCost: '',
        countPeople: 1,
        animal: false,
        dateFrom: '',
        dateTo: ''
    };

    handleMinCost = e => {
        const minCost = e.target.value;
        this.setState({ minCost })
    };

    handleMaxCost = e => {
        const maxCost = e.target.value;
        this.setState({ maxCost })
    };

    handlePeopleCount = e => {
        const countPeople = e.target.value;
        this.setState({ countPeople })
    };

    handlePossibleAnimals = e => {
        const animal = e.target.value;
        this.setState({ animal })
    };

    handleDateFrom = e => {
        const dateFrom = e.target.value;
        this.setState({ dateFrom })
    };

    handleDateTo = e => {
        const dateTo = e.target.value;
        this.setState({ dateTo })
    };

    handleSubmitButton = (e) => {
        e.preventDefault();
        const { handleFilterAdverts } = this.props;
        handleFilterAdverts({ ...this.state });
    };

    render() {
        return (
            <Form>
                <Form.Group controlId="formPrice">
                    <Form.Label>Price:</Form.Label>
                    <Row>
                        <Col xs={12} sm={6}>
                            <Form.Control
                                type="text"
                                placeholder="0"
                                onChange={this.handleMinCost}
                                value={this.state.minCost}
                            />
                        </Col>
                        <Col xs={12} sm={6}>
                            <Form.Control
                                type="text"
                                placeholder="100000"
                                onChange={this.handleMaxCost}
                                value={this.state.maxCost}
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group controlId="formCountPeople">
                    <Row>
                        <Col xs={3} sm={4}>
                            <Form.Label>Count people:</Form.Label>
                        </Col>
                        <Col xs={4} sm={6} md={6} lg={4}>
                            <Form.Control
                                as="select"
                                onChange={this.handlePeopleCount}
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
                <Form.Group controlId="formAllowAnimals">
                    <Row>
                        <Col xs={3} sm={4}>
                            <Form.Label>With animals:</Form.Label>
                        </Col>
                        <Col>
                            <Form.Check
                                label="Yes"
                                type="radio"
                                name="animal"
                                value={true}
                                onChange={this.handlePossibleAnimals}
                            />
                            <Form.Check
                                checked
                                label="No"
                                type="radio"
                                value={false}
                                name="animal"
                                onChange={this.handlePossibleAnimals}
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group controlId="formDates">
                    <Row>
                        <Col  xs={12} sm={6}>
                            <Form.Label className="margin-top">Date from:</Form.Label>
                            <Form.Control type="date" onChange={this.handleDateFrom} />
                        </Col>
                        <Col  xs={12} sm={6}>
                            <Form.Label className="margin-top">Date to:</Form.Label>
                            <Form.Control type="date" onChange={this.handleDateTo} />
                        </Col>
                    </Row>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={this.handleSubmitButton}>
                    Search
                </Button>
            </Form>
        )
    }
}

export default FilerAdverts;
