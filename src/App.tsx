import { Amplify } from 'aws-amplify';
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from './amplifyconfiguration.json';
Amplify.configure(config);

import {  Col, Row  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuLatLeft from './components/MenuLatLeft';
import MenuTop from './components/MenuTop';
import MenuLatRight from './components/MenuLatRight';

import  Home from './pages/Home';
import  AddNewWorker from './pages/AddNewWorker';
import  AddNewDataOrigin from './pages/AddNewDataOrigin';
import  DataOriginHistory from './pages/DataOriginHistory';
import  WorkersHistory from './pages/WorkersHistory';
import  MyDashboards from './pages/MyDashboards';

export function App({ signOut, user }: WithAuthenticatorProps) {
  return (

  <>
    <Router>

    <div style={{ fontFamily: 'Roboto', fontSize: '16px' }}>
      <Row className='justify-content-start'>
        <Col xs={3} style={{ textAlign: 'left' }} >
          <MenuLatLeft signOut={signOut} />
        </Col>
        <Col xs={6}>
          <MenuTop/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/AddNewWorker" element={<AddNewWorker />} />
              <Route path="/AddNewDataOrigin" element={<AddNewDataOrigin />} />
              <Route path="/DataOriginHistory" element={<DataOriginHistory />} />
              <Route path="/WorkersHistory" element={<WorkersHistory />} />
              <Route path="/MyDashboards" element={<MyDashboards />} />
            </Routes>
        </Col>
        <Col xs={3}>
          <MenuLatRight/>
        </Col>
      </Row>
      </div>
    </Router>
   </>

  )
}

export default withAuthenticator(App, { hideSignUp: { hidden: true } });
