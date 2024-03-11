import { Amplify } from 'aws-amplify';
import type { WithAuthenticatorProps } from '@aws-amplify/ui-react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from './amplifyconfiguration.json';
Amplify.configure(config);

import {  Col, Row  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import MenuLatLeft from './components/MenuLatLeft';
import MenuTop from './components/MenuTop';
import MenuLatRight from './components/MenuLatRight';

import  Home from './pages/Home';
import  AddNewWorker from './pages/AddNewWorker';
import  AddNewDataOrigin from './pages/AddNewDataOrigin';
import  AddNewDataOriginEditable from './pages/AddNewDataOriginEditable';
import  DataOriginHistory from './pages/DataOriginHistory';
import  WorkersHistory from './pages/WorkersHistory';
import  MyDashboards from './pages/MyDashboards';
import AnomalyDetection from './pages/AnomalyDetection';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Help from './pages/Help';


export function App({ signOut}: WithAuthenticatorProps) {
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
              <Route path="/AddNewDataOriginEditable" element={<AddNewDataOriginEditable />} />
              <Route path="/DataOriginHistory" element={<DataOriginHistory />} />
              <Route path="/WorkersHistory" element={<WorkersHistory />} />
              <Route path="/MyDashboards" element={<MyDashboards />} />
              <Route path="/AnomalyDetection" element={<AnomalyDetection />} />
              <Route path="/Settings" element={<Settings />} />
              <Route path="/Account" element={<Account />} />
              <Route path="/Help" element={<Help />} />
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

export default withAuthenticator(App, { hideSignUp: true });