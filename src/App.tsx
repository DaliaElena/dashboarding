import {  Col, Row,  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  Home from './pages/Home';
import MenuLatLeft from './components/MenuLatLeft';
import MenuTop from './components/MenuTop';
import MenuLatRight from './components/MenuLatRight';


function App() {
  return (
   <Router>
    <>
    <div style={{ fontFamily: 'Roboto', fontSize: '16px' }}>

      <Row className='justify-content-start'>

        <Col xs={3} style={{ textAlign: 'left' }} >
          <MenuLatLeft/>

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

   </>
  </Router>

  )
}

export default App
