import { Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import MenuLatLeft from './components/MenuLatLeft';
import MenuTop from './components/MenuTop';
import MenuLatRight from './components/MenuLatRight';

import Home from './pages/Home';
import AddNewWorker from './pages/AddNewWorker';
import AddNewDataOrigin from './pages/AddNewDataOrigin';
import AddNewDataOriginEditable from './pages/AddNewDataOriginEditable';
import DataOriginHistory from './pages/DataOriginHistory';
import WorkersHistory from './pages/WorkersHistory';
import Settings from './pages/Settings';
import Account from './pages/Account';

function Layout() {
  return (
    <div style={{ fontFamily: 'Roboto', fontSize: '16px' }}>
      <Row className="justify-content-start">
        <Col xs={3} style={{ textAlign: 'left' }}>
          <MenuLatLeft />
        </Col>
        <Col xs={6}>
          <MenuTop />
          <Outlet /> 
        </Col>
        <Col xs={3}>
          <MenuLatRight />
        </Col>
      </Row>
    </div>
  );
}

export function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta base para "dashboarding" */}
        <Route path="dashboarding" element={<Layout />}>
          <Route index element={<Home />} /> {/* Ruta base: /dashboarding */}
          <Route path="AddNewWorker" element={<AddNewWorker />} />
          <Route path="AddNewDataOrigin" element={<AddNewDataOrigin />} />
          <Route path="AddNewDataOriginEditable" element={<AddNewDataOriginEditable />} />
          <Route path="DataOriginHistory" element={<DataOriginHistory />} />
          <Route path="WorkersHistory" element={<WorkersHistory />} />
          <Route path="Settings" element={<Settings />} />
          <Route path="Account" element={<Account />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
