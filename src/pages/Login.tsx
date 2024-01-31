import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';

const Login = () => {
  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        if (user) {
          // Si el usuario está autenticado, redirige a la página de inicio
          window.location.href = '/home';
        }
      } catch (error) {
        // El usuario no está autenticado, no se realiza ninguna acción
      }
    };

    checkUser();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    // Aquí puedes agregar la lógica para autenticar al usuario con Amplify
    // Ejemplo de autenticación (cambia esto según tus necesidades):
    try {
      await Auth.signIn('username', 'password');
      window.location.href = '/home'; // Redirige después de iniciar sesión correctamente
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Manejar el error de inicio de sesión, como mostrar un mensaje al usuario
    }
  };

  return (
    <>
      <Row>
        <Col>
          <h1>Welcome</h1>
          <p>Please, enter your username and password</p>
          <Form onSubmit={handleLogin}>
            <Form.Group as={Row} className="mb-4">
              <Form.Label column xs="1">
                <FontAwesomeIcon icon={faUser} />
              </Form.Label>
              <Col xs="10">
                <Form.Control type="text" placeholder="Username" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-4">
              <Form.Label column xs="1">
                <FontAwesomeIcon icon={faLock} />
              </Form.Label>
              <Col xs="10">
                <Form.Control type="password" placeholder="Password" />
              </Col>
            </Form.Group>
            <Button type="submit" style={{ background: 'linear-gradient(to bottom, #FFA500, #FFFFFF)', border: 'none' }}>
              Login
            </Button>
          </Form>
          <br />
          <span>¿No tienes cuenta?<a href="">Registrate</a></span><br />
          <a href="">¿Olvidaste tu contraseña?</a>
        </Col>
        <Col>
          <img src="https://picsum.photos/seed/picsum/200/300" alt="" />
        </Col>
      </Row>
    </>
  );
};

export default withAuthenticator(Login);
