import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { withAuthenticator } from '@aws-amplify/ui-react';
import './Login.css';
import LoginPhoto from '../assets/LoginPhoto.png';
import { blue } from '@mui/material/colors';

const Login = () => {
  return (
    <>
    <div style={{marginTop: '20vh', backgroundColor: 'blue' }}>
      <Row
        style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          width: '50vw',
          height: '30vw',
          
        }}
      >
        <Col>
          <div style={{ textAlign: 'center' }}>
            <h2>WELCOME</h2>
            <p>Please, enter your username and password</p>
            <Form>
              <Form.Group as={Row} className="mb-4" style={{ alignItems: 'center', display: 'flex' }}>
                <Col xs="1">
                  <FontAwesomeIcon icon={faUser} style={{color: '#58595B'}}/>
                </Col>
                <Col xs="11">
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    id="username-input"
                    style={{
                      width: '100%',
                      height: '30px',
                      backgroundColor: '#F0EDFF',
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: '9px',
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-4" style={{ alignItems: 'center', display: 'flex' }}>
                <Col xs="1">
                  <FontAwesomeIcon icon={faLock} style={{color: '#58595B'}} />
                </Col>
                <Col xs="11">
                  <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    className="custom-form-control"  
                    id="username-input"
                    style={{
                      width: '100%',
                      height: '30px',
                      backgroundColor: '#F0EDFF',
                      fontFamily: 'Roboto, sans-serif',
                      fontSize: '9px',
                    }}
                  />
                </Col>
              </Form.Group>
              <Button
                type="submit"
                style={{
                  background: 'linear-gradient(to bottom, #FFA500, rgba(255, 158, 24, 0.55))',
                  border: 'none',
                  width: '30%', // Puedes ajustar el porcentaje o usar un valor en píxeles
                  marginTop: '30px',
                  marginBottom: '30px',
                }}
              >
                Login
              </Button>
            </Form>


            <br />
            <span>
              ¿No tienes cuenta?<a href="">Registrate</a>
            </span>
            <br />
            <a href="">¿Olvidaste tu contraseña?</a>
          </div>
        </Col>
        <Col>
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#f0f0f0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundImage: `url(${LoginPhoto})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
        </Col>
      </Row>
      </div>
    </>
  );
};

export default withAuthenticator(Login);
