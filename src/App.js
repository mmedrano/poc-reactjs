//import React, {useState, useEffect} from 'react'
import {Router, Switch, Route} from "react-router";
import Navbar from './components/Navbar/Navbar';
import S3 from './components/ServiciosAWS/S3';
import Dynamo from './components/ServiciosAWS/Dynamo';
import RDS from './components/ServiciosAWS/RDS'
import SQS from './components/ServiciosAWS/SQS'
import SNS from './components/ServiciosAWS/SNS'
import { createBrowserHistory } from "history";
import './App.css';

const customHistory = createBrowserHistory();
customHistory.listen(location => {
  console.log('Set page to', location.pathname);
  // eslint-disable-next-line no-undef
  ineum('page', location.pathname);
  // Note that the above can result in many useless pages when you are making use of path parameters.
  // In these cases you will have to define the page via different means, e.g. by creating a custom
  // Route component which accepts a 'pageName' property.
});

function App() {
  return (
    <Router history={customHistory}>
      <div className="App">
        <Navbar></Navbar>
        <div className="AppBody">
          <Switch>
            <Route path="/s3">
              <S3/>
            </Route>
            <Route path="/dynamo">
              <Dynamo/>
            </Route>
            <Route path="/rds">
              <RDS/>
            </Route>
            <Route path="/sqs">
              <SQS/>
            </Route>
            <Route path="/sns">
              <SNS/>
            </Route>
            <Route path="/">
              <Home/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="container">
      <div className="form-cabecera">
          POC Rimac / Instana: Monitoreo de Servicios AWS
      </div>
    </div>)
}

export default App;
