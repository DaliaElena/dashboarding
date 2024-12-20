import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import AddNewDataOriginComponentNonEditableForm from '../components/AddNewDataOriginComponentNonEditableForm';
import { API_URL_DATA_SOURCE } from '../config';

interface FormData {
  source: string;
  additionalDetails: string;
  selectedOption: string;
  [key: string]: string; 
}

const AddNewDataOriginComponent = () => {
  const [formData, setFormData] = useState<FormData>({
    source: '',
    additionalDetails: '',
    selectedOption: ''
  });

  const [dataSourceOptions, setDataSourceOptions] = useState<{ [key: string]: { [key: string]: string } }>({});
  const [showEditableForm, setShowEditableForm] = useState<boolean>(true);
  const [selectedDataSourceFields, setSelectedDataSourceFields] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL_DATA_SOURCE);
        const sanitizedData = sanitizeData(response.data);
        setDataSourceOptions(sanitizedData);
      } catch (error) {
        console.error('Error fetching data source options:', error);
      }
    };

    fetchData();
  }, []);

  const sanitizeData = (data: { [key: string]: { [key: string]: string } }): { [key: string]: { [key: string]: string } } => {
    const sanitizedData: { [key: string]: { [key: string]: string } } = {};
    for (const [key, value] of Object.entries(data)) {
      const sanitizedValue: { [key: string]: string } = {};
      for (const field in value) {
        sanitizedValue[field] = '';
      }
      sanitizedData[key] = sanitizedValue;
    }
    return sanitizedData;
  };

  const handleSelect = (eventKey: string | null) => { 
    if (eventKey !== null) {
      const selectedFields = dataSourceOptions[eventKey] || {};
      setFormData({ source: formData.source, additionalDetails: formData.additionalDetails, selectedOption: eventKey, ...selectedFields });
      setSelectedDataSourceFields(selectedFields);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
        </Row>
        {showEditableForm ? (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formSource" className='text-form-style'>
              <Form.Label>Source name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter source name"
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="custom-placeholder"
              />
            </Form.Group>

            <Form.Group controlId="formAdditionalDetails" className='text-form-style'>
              <Form.Label>Additional source details</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter additional details"
                name="additionalDetails"
                value={formData.additionalDetails}
                onChange={handleChange}
                className="custom-placeholder"
              />
            </Form.Group>

            <Form.Group controlId="formDropdown" className='text-form-style'>
              <Form.Label style={{ marginBottom: '20px' }}>Source Type</Form.Label>
              <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle variant="light" className='custom-dropdown-toggle'>
                  {formData.selectedOption ? `${formData.selectedOption}` : 'Select an option'}
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white' }}>
                  {Object.keys(dataSourceOptions).map((option, index) => (
                    <Dropdown.Item key={index} eventKey={option}>{option}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            {Object.entries(selectedDataSourceFields).map(([key]) => (
              <Form.Group key={key} controlId={`form${key}`} className='text-form-style'>
                <Form.Label>{key}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={`Enter ${key}`}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="custom-placeholder"
                />
              </Form.Group>
            ))}

            <Card.Footer className='card-footer'>
              <Button
                variant="secondary"
                style={{ marginRight: '10px' }}
                className='custom-button-secondary'
                onClick={handleReturnClick}>
                Cancel
              </Button>
              <Button className='custom-button-primary' variant="dark" type='submit'>
                Continue
              </Button>
            </Card.Footer>
          </Form>
        ) : (
          <AddNewDataOriginComponentNonEditableForm
            formData={{ ...formData }}
            onEditClick={handleReturnClick}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default AddNewDataOriginComponent;
