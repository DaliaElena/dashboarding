import { useState } from 'react';
import { Form, Button, Card, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { API_URL_DATA } from '../config'; 

const AddNewDataOriginComponentNonEditableForm = ({ formData, onEditClick }: { formData: any, onEditClick: () => void }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const postData = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        URL: formData.dynatraceUrl,
        ApiToken: formData.apiToken, 
        details: formData.details
      })
    };
    try {
      const response = await fetch(API_URL_DATA+`?origin=${formData.selectedOption}&name=${formData.source}`, requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      handleShow(); // Mostrar modal de éxito después de que la solicitud sea exitosa
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
      // Manejar errores aquí
    }
  };

  return (
    <Form>
      <Form.Group controlId="formSource" className='text-form-style'>
        <Form.Label>Source name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your source name"
          name="source"
          value={formData.source}
          readOnly
          style={{ backgroundColor: '#f0f0f0' }}
        />
      </Form.Group>

      <Form.Group controlId="formDetails" className='text-form-style'>
        <Form.Label>Additional source details</Form.Label>
        <Form.Control
          type="text"
          placeholder="Some details of your source"
          name="details"
          value={formData.details}
          readOnly
          style={{ backgroundColor: '#f0f0f0' }}
        />
      </Form.Group>

      <Form.Group controlId="formDropdown" className='text-form-style'>
        <Form.Label style={{ marginBottom: '20px' }}>Source Type</Form.Label>
        <Form.Control
          type="text"
          value={formData.selectedOption}
          readOnly
          style={{ backgroundColor: '#f0f0f0' }}
        />
      </Form.Group>

      <Form.Group controlId="formDynatraceUrl" className='text-form-style'>
        <Form.Label>Dynatrace Url</Form.Label>
        <Form.Control
          type="text"
          placeholder="dynatraceUrl"
          name="dynatraceUrl"
          value={formData.dynatraceUrl}
          readOnly
          style={{ backgroundColor: '#f0f0f0' }}
        />
      </Form.Group>

      <Form.Group controlId="formApiToken" className='text-form-style'>
        <Form.Label>API token</Form.Label>
        <Form.Control
          type="password"
          placeholder="API Token"
          name="apiToken"
          value={formData.apiToken}
          readOnly
          style={{ backgroundColor: '#f0f0f0' }}
        />
      </Form.Group>
      <Card.Footer className='card-footer'>
        <Button
          style={{ marginRight: '10px' }}
          className='custom-button-secondary'
          variant='secondary'
          onClick={onEditClick} 
        >
          Return
        </Button>

        <Button className='custom-button-primary' variant="dark" onClick={postData}>
          Add New
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body style={{textAlign:'center'}}>Your data origin has been successfully created</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              <Link to="/DataOriginHistory" style={{textDecoration: 'none' , color:'inherit'}}> Close </Link>
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Footer>
    </Form>
  );
};

export default AddNewDataOriginComponentNonEditableForm;
