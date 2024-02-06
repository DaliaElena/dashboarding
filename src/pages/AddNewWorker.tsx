import React, { useState } from 'react';
import { Card, Form, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';




const AddNewWorker = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const textFieldValue = formData.get('textField');
    
    // Lógica para manejar los datos del formulario
    console.log('Text Field Value:', textFieldValue);
  };

  return (
    <div className="column-dbos-center" >
      <h2 style={{textAlign:'left', marginTop:'40px', marginBottom:'40px'}}>Add New Worker</h2>
      <Card className="text-center" style={{ width: '18rem', margin: 'auto' }}>

        <Card.Body>
          <div className="text-center" style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
            <img src="./src/assets/jupyter_logo_icon_169453.png" alt="jupyter" style={{ width: '90px', height: '40px', marginLeft: '0px' }} />
          </div>

            <Form onSubmit={handleSubmit} style={{marginTop: '20px', marginBottom: '0px'}}>
              <Form.Group controlId="formTextField">
                <Form.Label style={{ marginBottom: '20px' }}>Password</Form.Label>
                <Form.Control type="text" name="textField" placeholder="DBOSPassword" required className="text-center"/>
                <FontAwesomeIcon icon={faCopy} style={{ marginLeft: '10px', marginTop: '25px'}} />
                <FontAwesomeIcon icon={faEye} style={{ marginLeft: '10px', marginTop: '25px'}}/> 
              </Form.Group>
            <Button className="custom-button-primary" variant='dark' type="submit" style={{marginTop: '20px', marginBottom: '20px'}} onClick={handleShow}>
              Confirm
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
              </Modal.Header>
              <Modal.Body style={{textAlign:'center'}}>Reenter or paste the password you previously copied directly into your laboratory.
              </Modal.Body>
              <Modal.Footer>
                <Button className='custom-button-primary' variant="dark" onClick={handleClose}>
                  <Link to="http://notebook.netjerdbos.cloud/tree" style={{textDecoration: 'none' , color:'inherit'}}> Go to lab </Link>
                </Button>
              </Modal.Footer>
            </Modal>
          </Form>
          
        </Card.Body>
      </Card>
    </div>
  );
};



export default AddNewWorker;
