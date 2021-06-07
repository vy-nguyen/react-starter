/*
 * Written by Vy Nguyen
 */
import React from 'react';
import {Col, Row, Container} from 'react-bootstrap';

import logo from '../img/logo.svg';

class IndexView extends React.Component {
    render() {
        return (
            <div>
                <header className='App-header'>
                    <img src={logo} className='App-logo' alt='logo'/>
                    <p>Edit file view/IndexView.js to see changes</p>
                </header>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col xs lg="2">
                            1 of 3
                        </Col>
                        <Col md="auto">
                            Variable width content
                        </Col>
                        <Col xs lg="2">
                            3 of 3
                        </Col>
                    </Row>
                    <Row>
                        <Col>1 of 3</Col>
                        <Col md="auto">Variable width content</Col>
                        <Col xs lg="2">3 of 3</Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default IndexView;
