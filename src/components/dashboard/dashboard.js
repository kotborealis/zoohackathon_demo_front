import React from 'react';
import style from './index.css';
import {Card, Col, Container, Row, Table} from 'react-bootstrap';
import 'chart.js';
import {LineChart, PieChart} from 'react-chartkick';

const timestamps = [];
for(let i = 0; i < 10; i++){
    const d = new Date(Date.UTC(2017, 11, 1, 0, 0, 0));
    d.setMinutes(d.getMinutes() + Math.floor(Math.random() + 100 * i));
    timestamps.push(d.getTime());
}

const vesselNames = [
    "PACIFIC HARMONY",
    "KATRINA",
    "JOHN DOE",
    "AGENT SMITH",
];

const vesselName = () => vesselNames[Math.floor(Math.random() * vesselNames.length)];
const eventType = () => ["Illegal fishing", "Refrigerator meeting"][Math.random() > 0.5 ? 0 : 1];
const coords = () => [-150 + Math.random() * 10 * -10, 55 + Math.random() * 10 * -10];

export const Dashboard = () => (
    <Container className={style.container}>
        <Row>
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            Triggers by type (this month)
                        </Card.Title>
                        <PieChart data={[["Illegal fishing", 44], ["Refrigerator meeting", 23]]}/>
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
                    {(() => {
                        const _ = [];
                        for(let i = 0; i < 10; i++){
                            _.push(<tr>
                                <td>{i}</td>
                                <td>{eventType()}</td>
                                <td>
                                    {(new Date(timestamps[i])).toDateString()}
                                    {" at "}
                                    {(new Date(timestamps[i])).toTimeString().split(' ')[0]}
                                </td>
                                <td>{vesselName()}</td>
                                <td>{coords()}</td>
                            </tr>);
                        }
                        return _;
                    })()}
                    </tbody>
                </Table>
            </Col>
        </Row>
    </Container>
);