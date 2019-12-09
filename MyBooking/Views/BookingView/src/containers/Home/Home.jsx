import React, { Component } from "react";
import {Col, Container, Row} from "react-bootstrap";
import FilerAdverts from "../../components/FilterAdverts";
import AdvertList from "../../components/AdvertList/AdvertList";

class Home extends Component {
    render() {
        const {
            handleFilterAdverts,
            handleAddressesSearch,
            handleAddAdvertButtonClick,
            searchResult,
            selectedAddress,
            user
        } = this.props;
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs={12} sm={4}>
                        <FilerAdverts
                            handleFilterAdverts={params => handleFilterAdverts(params)}
                        />
                    </Col>
                    <Col xs={12} sm={8}>
                        {
                            searchResult && (
                                <AdvertList
                                    adverts={searchResult}
                                    searchByAddress={handleAddressesSearch}
                                    selectedAddress={selectedAddress}
                                    user={user}
                                    onAddAdvertButtonClick={handleAddAdvertButtonClick}
                                />
                            )
                        }
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Home;
