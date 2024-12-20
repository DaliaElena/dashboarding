import { Card, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { API_URL_DATA } from '../config';

interface FormData {
  source: string;
  additionalDetails: string;
  selectedOption: string;
  [key: string]: any; 
}

interface Props {
  formData: FormData;
  onEditClick: () => void;
}

const AddNewDataOriginComponentNonEditableForm: React.FC<Props> = ({ formData, onEditClick }) => {
  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      console.log('Data being sent:', formData);
      const response = await axios.post(
        API_URL_DATA,
        formData,
        {
          params: {
            origin: formData.selectedOption,
            name: formData.source,
          },
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Response:', response.data);
      window.location.href = '/DataOriginHistory';
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Card.Body>
        <Row className='text-form-style' style={{ marginTop: '10px' }}>
          <p>Preview New Data</p>
        </Row>
        <Row className='text-form-style'>
          <Col>
            <p><strong>Source Name:</strong> {formData.source}</p>
            <p><strong>Additional Details:</strong> {formData.additionalDetails}</p>
            <p><strong>Selected Option:</strong> {formData.selectedOption}</p>
            {Object.entries(formData).map(([key, value]) => (
              key !== 'source' && key !== 'additionalDetails' && key !== 'selectedOption' && (
                <p key={key}><strong>{key}:</strong> {value}</p>
              )
            ))}
          </Col>
        </Row>
        <Row className='text-form-style'>
          <Col>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer className='card-footer'>
        <Button className="btn btn-secondary" onClick={onEditClick}>Edit</Button>
        <Button className='custom-button-primary' variant="dark" type='submit' onClick={handleSubmit}>Continue</Button>
      </Card.Footer>
    </>
  );
};

export default AddNewDataOriginComponentNonEditableForm;
