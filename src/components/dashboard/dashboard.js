import React from 'react';
import style from './index.css';
import {Card, Col, Container, Row, Table} from 'react-bootstrap';
import 'chart.js';
import {LineChart, PieChart} from 'react-chartkick';

export const Dashboard = () => (
    <Container className={style.container}>
        <Row>
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            Triggers by type (this month)
                        </Card.Title>
                        <PieChart data={[["Slow vessel", 44], ["Suspicious meeting", 23]]}/>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            Triggers by day
                        </Card.Title>
                        <LineChart data={{
                            "2017-12-01": 2,
                            "2017-12-02": 5,
                            "2017-12-03": 10,
                            "2017-12-04": 1,
                            "2017-12-05": 3,
                            "2017-12-06": 0,
                            "2017-12-07": 6,
                            "2017-12-08": 3,
                        }}/>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col>
                <br/>
            </Col>
        </Row>
        <Row>
            <Col>
                <Table striped bordered hover style={{background: 'white'}}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Trigger type</th>
                        <th>Timestamp</th>
                        <th>Vessel(s)</th>
                        <th>Location</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>Slow vessel</td>
                        <td>2017-12-01 03:55</td>
                        <td>SAINT BORIS</td>
                        <td>-150, 55</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Slow vessel</td>
                        <td>2017-12-01 03:55</td>
                        <td>SAINT BORIS</td>
                        <td>-150, 55</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Slow vessel</td>
                        <td>2017-12-01 03:55</td>
                        <td>SAINT BORIS</td>
                        <td>-150, 55</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Slow vessel</td>
                        <td>2017-12-01 03:55</td>
                        <td>SAINT BORIS</td>
                        <td>-150, 55</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Slow vessel</td>
                        <td>2017-12-01 03:55</td>
                        <td>SAINT BORIS</td>
                        <td>-150, 55</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Slow vessel</td>
                        <td>2017-12-01 03:55</td>
                        <td>SAINT BORIS</td>
                        <td>-150, 55</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Slow vessel</td>
                        <td>2017-12-01 03:55</td>
                        <td>SAINT BORIS</td>
                        <td>-150, 55</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Slow vessel</td>
                        <td>2017-12-01 03:55</td>
                        <td>SAINT BORIS</td>
                        <td>-150, 55</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Slow vessel</td>
                        <td>2017-12-01 03:55</td>
                        <td>SAINT BORIS</td>
                        <td>-150, 55</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Slow vessel</td>
                        <td>2017-12-01 03:55</td>
                        <td>SAINT BORIS</td>
                        <td>-150, 55</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Slow vessel</td>
                        <td>2017-12-01 03:55</td>
                        <td>SAINT BORIS</td>
                        <td>-150, 55</td>
                    </tr>
                    </tbody>
                </Table>
            </Col>
        </Row>
    </Container>
);