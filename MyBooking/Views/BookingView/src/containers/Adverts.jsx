import React, { Fragment } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Advert from '../components/Adverts/Advert';

class Adverts extends React.Component {
    checkAddAdvertButton = userRole => {
        const { onAddAdvertButtonClick } = this.props;
        if (userRole === 'landlord') {
            return (
                <Row>
                    <Col>
                        <Button className="float-right" variant="outline-dark" onClick={onAddAdvertButtonClick}>+ Add advert</Button>
                    </Col>
                </Row>
            )
        }
    }
    
    render() {
        const { adverts, searchByAddress, selectedAddress, user } = this.props;
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
            {
                this.checkAddAdvertButton(user.role)
            }
        </Fragment>
    )
    }
};

export default Adverts;
