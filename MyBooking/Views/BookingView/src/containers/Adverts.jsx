import React, { Fragment } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import Advert from '../components/Adverts/Advert';

const Adverts = (props) => {
    const { adverts, searchByAddress, selectedAddress } = props;
    return (
        <Fragment>
            <Row>
                <Col xs={12}>
                    <Form.Group controlId="searchByAddress">
                        <Form.Control
                            type="text"
                            placeholder="Search by address"
                            value={selectedAddress}
                            onChange={searchByAddress}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                {
                    adverts.map(advert => (
                        <Col xs={12} sm={6} md={6} lg={3} key={advert.key}>
                            <Advert advert={advert}/>
                        </Col>
                    ))
                }
            </Row>
        </Fragment>
    )
};

export default Adverts;
