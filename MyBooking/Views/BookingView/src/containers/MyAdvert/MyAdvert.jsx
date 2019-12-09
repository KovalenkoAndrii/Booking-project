import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Advert from '../../components/Adverts/Advert';

const MyAdverts = (props) => {
    const { userRole, adverts } = props;
    if (userRole === 'landlord') {
        return (
            <Container>
                <Row>
                    {
                        adverts.map(advert => (
                            <Col xs={12} sm={6} md={4} lg={3} key={advert.key}>
                                <Advert advert={advert} />
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        )
    }
    else {
        return (
            <div>Nothing to show</div>
        )
    }
};

export default MyAdverts;
