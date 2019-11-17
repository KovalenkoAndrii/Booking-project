import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

class FilerAdverts extends React.Component {
    state = {
        priceFrom: '',
        priceTo: '',
        peopleCount: 1,
        possibleAnimals: false,
        dateFrom: '',
        dateTo: ''
    };

    handlePriceFrom = e => {
        const priceFrom = e.target.value;
        this.setState({ priceFrom })
    };

    handlePriceTo = e => {
        const priceTo = e.target.value;
        this.setState({ priceTo })
    };

    handlePeopleCount = e => {
        const peopleCount = e.target.value;
        this.setState({ peopleCount })
    };

    handlePossibleAnimals = e => {
        const possibleAnimals = e.target.value;
        this.setState({ possibleAnimals })
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
                                onChange={this.handlePriceFrom}
                                value={this.state.priceFrom}
                            />
                        </Col>
                        <Col xs={12} sm={6}>
                            <Form.Control
                                type="text"
                                placeholder="100000"
                                onChange={this.handlePriceTo}
                                value={this.state.priceTo}
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group controlId="formCountRooms">
                    <Row>
                        <Col xs={3} sm={4}>
                            <Form.Label>Count people:</Form.Label>
                        </Col>
                        <Col xs={4} sm={6} md={6} lg={4}>
                            <Form.Control
                                as="select"
                                onChange={this.handlePeopleCount}
                                value={this.state.peopleCount}
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
                                name="WithAnimals"
                                value={true}
                                onChange={this.handlePossibleAnimals}
                            />
                            <Form.Check
                                checked
                                label="No"
                                type="radio"
                                value={false}
                                name="WithAnimals"
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
