import React from 'react';
import styled from "styled-components";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Home, Navbar, About, Authorization, Alerts} from "./components";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
    setAuthToken(localStorage.token)
}

const App = () => {

    return (
        <BrowserRouter>
            <Navbar/>
            <Container>
                <Alerts />
                <Switch>
                    <Route exact path='/home' component={Home}/>
                    <Route path='/auth' component={Authorization}/>
                    <Route path='/' component={About}/>
                </Switch>
            </Container>
        </BrowserRouter>
    );
}

const Container = styled.div`
  width: 100%;
  max-width: 63rem;
  margin: 0 auto;
`

export default App;
