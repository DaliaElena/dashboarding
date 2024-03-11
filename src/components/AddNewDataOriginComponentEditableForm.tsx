import { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Dropdown } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Importa axios para hacer solicitudes HTTP
import { API_URL_DATA } from '../config.tsx';

const AddNewDataOriginComponent = ({ selectedData }: { selectedData: { Name: string; origin: string; lastConnection: string } | null }) => {
  const location = useLocation();

  const [currentSelectedData, setSelectedData] = useState(selectedData);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const Name = searchParams.get('Name');
    const origin = searchParams.get('origin');
    const lastConnection = searchParams.get('lastConnection');

    if (Name && origin && lastConnection) {
      setSelectedData({ Name, origin, lastConnection });
    }
  }, [location.search]);

  const handleReturnClick = () => {
    window.location.href = '/DataOriginHistory';

  };
  const [dynatraceUrl, setDynatraceUrl] = useState(currentSelectedData?.dynatraceUrl || '');
  const [apiToken, setApiToken] = useState(currentSelectedData?.apiToken || '');

  const handleDynatraceUrlChange = (event) => {
    setDynatraceUrl(event.target.value);
  };
  
  const handleApiTokenChange = (event) => {
    setApiToken(event.target.value);
  };

  const handleEditClick = () => {
    axios.put(API_URL_DATA + `?origin=${currentSelectedData?.origin}&name=${currentSelectedData?.Name}`, {
      dynatraceUrl: currentSelectedData?.dynatraceUrl || '',
      apiToken: currentSelectedData?.apiToken || ''
    })
    .then(response => {
      console.log('Response:', response.data);
      window.location.href = '/DataOriginHistory';
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', maxWidth: '500px', margin: '0 auto' }}>
      <Card.Header className='title-form-style' style={{ backgroundColor: 'white', marginBottom: 0 }}>
        <Card.Title style={{ marginBottom: 0 }}>Edit Data Origin</Card.Title>
      </Card.Header>
      <Card.Body>
        <Row className='text-form-style' style={{ marginTop: '10px' }}>
          <p>Specify Source Details</p>
        </Row>
        <Form>
          <Form.Group controlId="formSource" className='text-form-style'>
            <Form.Label>Source name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your source name"
              name="source"
              value={currentSelectedData?.Name || ''}
              readOnly
              className="custom-placeholder"
            />
          </Form.Group>

          <Form.Group controlId="formToken" className='text-form-style'>
          <Form.Label>Dynatrace url</Form.Label>
            <Form.Control
            type="text"
            placeholder="dynatraceUrl"
            name="dynatraceUrl"
            value={dynatraceUrl}
            onChange={handleDynatraceUrlChange} // Utilizar la función de manejo de cambios
            className="custom-placeholder"
            />
          </Form.Group>

          <Form.Group controlId="formApiToken" className='text-form-style'>
          <Form.Label>API token</Form.Label>
            <Form.Control
            type="password"
            placeholder="API Token"
            name="apiToken"
            value={apiToken}
            onChange={handleApiTokenChange} // Utilizar la función de manejo de cambios
            className="custom-placeholder"
            />
          </Form.Group>

          <Card.Footer className='card-footer'>
            <Button
              variant="secondary"
              style={{ marginRight: '10px' }}
              className='custom-button-secondary'
              onClick={handleReturnClick}>
              Cancel
            </Button>
            <Button className='custom-button-primary' variant="dark" onClick={handleEditClick}>
              Edit
            </Button>
          </Card.Footer>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddNewDataOriginComponent;
