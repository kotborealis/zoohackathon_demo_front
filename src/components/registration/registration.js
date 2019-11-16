import React, {useState} from 'react';
import {Button, Card, Col, Container, Form, InputGroup, Row, Spinner} from 'react-bootstrap';
import style from './index.css';

export const RegistrationForm = ({} = {}) => {
    const [loading, setLoading] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => location.href = '/', 500);
    };

    return (<Container className={style.container}>
        <Row>
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            Notifications subscription
                        </Card.Title>
                        <Form noValidate onSubmit={submitHandler}>
                            <Form.Row>
                                <Form.Group as={Col} md="6" controlId="validationFormik01">
                                    <Form.Label>First name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        placeholder={"John"}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationFormik02">
                                    <Form.Label>Last name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        placeholder={"Doe"}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} md="6" controlId="validationFormikUsername">
                                    <Form.Label>Telephone number for SMS notifications</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroupPrepend">+7</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            type="text"
                                            placeholder="800-555-35-35"
                                            aria-describedby="inputGroupPrepend"
                                            name="telephone"
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationFormikUsername">
                                    <Form.Label>Email (email notifications)</Form.Label>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            placeholder="a@aaaaaaaaa.aaa"
                                            aria-describedby="inputGroupPrepend"
                                            name="email"
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Button type="submit" disabled={loading}>
                                {loading ?
                                    <div>
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        Loading...
                                    </div>
                                    :
                                    <div>Subscribe</div>
                                }
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>);
};