import  { useState } from 'react';
import { Form, Button, Card, Row, Dropdown} from 'react-bootstrap';


const AddNewDataOriginComponent = () => {
    const [formData, setFormData] = useState({
      nombre: '',
      email: '',
      // Agrega más campos según sea necesario
    });

    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelect = (eventKey) => {
      setSelectedOption(eventKey);
      // Puedes realizar cualquier otra acción que necesites con el valor seleccionado
    };

  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Aquí puedes manejar la lógica para enviar los datos del formulario
      console.log('Datos del formulario:', formData);
    };
  
    return (
        <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
          <Card.Header className='title-form-style' style={{ backgroundColor: 'white', marginBottom: 0 }}>
            <Card.Title style={{marginBottom: 0}}>Add New Data Origin</Card.Title>
          </Card.Header>
          <Card.Body> 
            <Row className='text-form-style'style={{marginTop:'10px'}}><p>Specify Source Details</p>
            </Row>         
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNombre" className='text-form-style'>
              <Form.Label>Source name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your source name"
                name="nombre"    /*Revisar*/
                value={formData.nombre}
                onChange={handleChange}
                className="custom-placeholder"
              />
            </Form.Group>
      
            <Form.Group controlId="formEmail" className='text-form-style'>
              <Form.Label>Additional source details</Form.Label>
              <Form.Control
                type="email"    /*Revisar*/
                placeholder="Some details of your source"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="custom-placeholder"
              />
            </Form.Group>

            <Form.Group controlId="formDropdown" className='text-form-style'>
            <Form.Label style={{ marginBottom: '20px' }}>Source Type</Form.Label>
            <Dropdown onSelect={handleSelect}>
              <Dropdown.Toggle variant="light"  className='custom-dropdown-toggle'>
                {selectedOption ? `Option ${selectedOption}` : 'Select an option'}
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white' }}>
                <Dropdown.Item eventKey={1}>Dynatrace</Dropdown.Item>
                <Dropdown.Item eventKey={2}>Option 2</Dropdown.Item>
                <Dropdown.Item eventKey={3}>Option 3</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>


            <Form.Group controlId="formEmail" className='text-form-style'>
              <Form.Label>Token</Form.Label>
              <Form.Control
                type="email"
                placeholder="Token"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="custom-placeholder"
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className='text-form-style'>
              <Form.Label>API token</Form.Label>
              <Form.Control
                type="email"
                placeholder="API Token"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="custom-placeholder"
              />
            </Form.Group>

          </Form>
        </Card.Body>

        <Card.Footer className='card-footer'>
          <Button variant="secondary" style={{ marginRight: '10px' }} className='custom-button-secondary'>
            Cancel
          </Button>
          <Button variant="danger" className='custom-button-primary'>
            Continue
          </Button>
        </Card.Footer>
      </Card>
    );
  };
  
  export default AddNewDataOriginComponent;
  