import React from 'react';
import {render} from 'react-dom';
import "!style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Index} from './components/index';
import {RegistrationForm} from './components/registration/registration';
import {Nav, Navbar} from 'react-bootstrap';
import {Dashboard} from './components/dashboard/dashboard';

render(
    (<div>
        <Navbar bg="dark" expand="lg" variant="dark">
            <Navbar.Brand href="/">Zoohack-demo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/subscribe">Subscribe</Nav.Link>
                    <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        <BrowserRouter basename={process.env.PUBLIC_PATH}>
            <Switch>
                <Route exact path="/">
                    <Index/>
                </Route>
                <Route path="/subscribe">
                    <RegistrationForm/>
                </Route>
                <Route path="/dashboard">
                    <Dashboard/>
                </Route>
            </Switch>
        </BrowserRouter>
    </div>),
    document.getElementById('App')
);