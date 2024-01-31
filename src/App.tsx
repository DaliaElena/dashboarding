import { Amplify } from 'aws-amplify';
import { withAuthenticator, WithAuthenticatorProps } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from './amplifyconfiguration.json';
Amplify.configure(config);

import { Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MenuLatLeft from './components/MenuLatLeft';
import MenuTop from './components/MenuTop';
import MenuLatRight from './components/MenuLatRight';

import Login from './pages/Login';
import Home from './pages/Home';
import AddNewWorker from './pages/AddNewWorker';
import AddNewDataOrigin from './pages/AddNewDataOrigin';
import DataOriginHistory from './pages/DataOriginHistory';
import WorkersHistory from './pages/WorkersHistory';
import MyDashboards from './pages/MyDashboards';

export function App({ signOut }: WithAuthenticatorProps) {
  const isLoginPage = window.location.pathname === '/';

  return (
    <>
      <Router>
        <Row className="justify-content-start">
          <Col xs={3} style={{ textAlign: 'left' }}>
            {!isLoginPage && <MenuLatLeft signOut={signOut} />}
          </Col>
        <Col xs={6}>
            {!isLoginPage && <MenuTop />}
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/AddNewWorker" element={<AddNewWorker />} />
              <Route path="/AddNewDataOrigin" element={<AddNewDataOrigin />} />
              <Route path="/DataOriginHistory" element={<DataOriginHistory />} />
              <Route path="/WorkersHistory" element={<WorkersHistory />} />
              <Route path="/MyDashboards" element={<MyDashboards />} />
            </Routes>
          </Col>
          <Col xs={3}>
            {!isLoginPage && <MenuLatRight />}
          </Col>
        </Row>
      </Router>
    </>
  );
}

export default withAuthenticator(App, { hideSignUp: { hidden: true } });
