import { useState, useEffect, ChangeEvent } from 'react';
import { Form, Button, Card, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; 
import { API_URL_DATA } from '../config.tsx';

interface SelectedData {
  Name: string;
  origin: string;
  lastConnection: string;
  dynatraceUrl: string;
  apiToken: string;
}

const AddNewDataOriginComponent = ({ selectedData }: { selectedData: SelectedData | null }) => {
  const location = useLocation();

  const [currentSelectedData, setSelectedData] = useState<SelectedData | null>(selectedData);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const Name = searchParams.get('Name');
    const origin = searchParams.get('origin');
    const lastConnection = searchParams.get('lastConnection');

    if (Name && origin && lastConnection) {
      setSelectedData({ 
        Name, 
        origin, 
        lastConnection, 
        dynatraceUrl: '', 
        apiToken: '' 
      });
    }
  }, [location.search]);

  const handleReturnClick = () => {
    window.location.href = '/DataOriginHistory';
  };

  const [dynatraceUrl, setDynatraceUrl] = useState(currentSelectedData?.dynatraceUrl || '');
  const [apiToken, setApiToken] = useState(currentSelectedData?.apiToken || '');

  const handleDynatraceUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDynatraceUrl(event.target.value);
  };
  
  const handleApiTokenChange = (event: ChangeEvent<HTMLInputElement>) => {
    setApiToken(event.target.value);
  };

  const handleEditClick = () => {
    if (!currentSelectedData) return;
    
    axios.put(API_URL_DATA + `?origin=${currentSelectedData.origin}&name=${currentSelectedData.Name}`, {
      dynatraceUrl,
      apiToken
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
              onChange={handleDynatraceUrlChange}
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
              onChange={handleApiTokenChange}
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
