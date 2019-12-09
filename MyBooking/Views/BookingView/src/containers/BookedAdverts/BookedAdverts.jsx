import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Advert from '../../components/Adverts/Advert';

const BookedAdverts = (props) => {
    const { adverts } = props;
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
};

export default BookedAdverts;
