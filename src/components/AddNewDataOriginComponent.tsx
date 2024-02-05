import  { useState } from 'react';
import { Form, Button, Card, Row, Dropdown, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const NonEditableForm = ({ formData, onEditClick }: { formData: any, onEditClick: () => void }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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

      <Form.Group controlId="formToken" className='text-form-style'>
        <Form.Label>Token</Form.Label>
        <Form.Control
          type="password"
          placeholder="Token"
          name="token"
          value={formData.token}
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
          onClick={onEditClick}  // Llama a la función proporcionada al hacer clic
        >
          Return
        </Button>

        <Button className='custom-button-primary' onClick={handleShow}>
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



const AddNewDataOriginComponent = () => {
  const [formData, setFormData] = useState({
    source: '',
    details: '',
    token: '',
    apiToken: '',
    selectedOption: '',
  });

  const [showEditableForm, setShowEditableForm] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (eventKey: any) => {
    setSelectedOption(eventKey);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Datos del formulario:', formData);
    setShowEditableForm(false);
  };

  const handleReturnClick = () => {
    setShowEditableForm(true);
  };



  return (
    <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', maxWidth: '500px', margin: '0 auto' }}>
      <Card.Header className='title-form-style' style={{ backgroundColor: 'white', marginBottom: 0 }}>
        <Card.Title style={{ marginBottom: 0 }}>Add New Data Origin</Card.Title>
      </Card.Header>
      <Card.Body>
        <Row className='text-form-style' style={{ marginTop: '10px' }}>
          <p>Specify Source Details</p>
        </Row>
        {showEditableForm ? (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formSource" className='text-form-style'>
              <Form.Label>Source name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your source name"
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="custom-placeholder"
              />
            </Form.Group>

            <Form.Group controlId="formDetails" className='text-form-style'>
              <Form.Label>Additional source details</Form.Label>
              <Form.Control
                type="text"
                placeholder="Some details of your source"
                name="details"
                value={formData.details}
                onChange={handleChange}
                className="custom-placeholder"
              />
            </Form.Group>

            <Form.Group controlId="formDropdown" className='text-form-style'>
              <Form.Label style={{ marginBottom: '20px' }}>Source Type</Form.Label>
              <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle variant="light" className='custom-dropdown-toggle'>
                  {selectedOption ? `${selectedOption}` : 'Select an option'}
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white' }}>
                  <Dropdown.Item eventKey={"Dynatrace"}>Dynatrace</Dropdown.Item>
                  <Dropdown.Item eventKey={"Option 2"}>Option 2</Dropdown.Item>
                  <Dropdown.Item eventKey={"Option 3"}>Option 3</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            <Form.Group controlId="formToken" className='text-form-style'>
              <Form.Label>Token</Form.Label>
              <Form.Control
                type="password"
                placeholder="Token"
                name="token"
                value={formData.token}
                onChange={handleChange}
                className="custom-placeholder"
              />
            </Form.Group>

            <Form.Group controlId="formApiToken" className='text-form-style'>
              <Form.Label>API token</Form.Label>
              <Form.Control
                type="password"
                placeholder="API Token"
                name="apiToken"
                value={formData.apiToken}
                onChange={handleChange}
                className="custom-placeholder"
              />
            </Form.Group>

            <Card.Footer className='card-footer'>
              <Button
                variant="secondary"
                style={{ marginRight: '10px' }}
                className='custom-button-secondary'
                onClick={handleReturnClick}
              >
                Cancel
              </Button>
              <Button variant="danger" className='custom-button-primary' type='submit'>
                Continue
              </Button>
            </Card.Footer>
          </Form>
        ) : (
          <NonEditableForm formData={formData} onEditClick={handleReturnClick} />
        )}
      </Card.Body>


    </Card>
  );
};

export default AddNewDataOriginComponent;
